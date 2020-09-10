// const path = require('path')
// const fs = require('fs')
const express = require('express')
const router = require('./routes')
var history = require('connect-history-api-fallback');
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const db = require('./db/index.js')
const jwt = require('jsonwebtoken')

const app = express()
app.use(history());
// //登录拦截器
// app.use(function(req, res, next) {
// 	var url = req.originalUrl;
// 	if (url != "/login" && !req.session.user) {
// 		return res.redirect("/login");
// 	}
// 	next();
// });
app.use((req, res, next) => {
	// console.log('243434')
	console.log(req.url)
	if (req.url != '/api/v1/login') {
		// console.log(22)
		console.log("authorization>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + req.headers.authorization)
		const token = req.headers.authorization
		console.log(token)
		if (token) {
			jwt.verify(token, 'weizxx', (err, decoded) => {
				if (err) {
					console.log(err)
					res.sendStatus(401);
				} else {
					next()
					// console.log(decoded)
				}
			})
		} else {
			res.sendStatus(401);
		}
	} else {
		// console.log('34434343434443')

		next()
	}

})
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
// app.use(cookieParser('9826zxx'))
app.use(router)
// app.post('/api/v1/login', async (req, res) => {
// 	console.log(req.body)
// 	res.send(req.body)
// 	// res.send(req.())
// 	// const user = await db.User.findOne({
// 	// 	// username:'wei'
// 	// 	username: req.body.username
// 	// })
// 	// if (user) {
// 	// 	res.send(user)
// 	// } else {
// 	// 	res.status(422).send({
// 	// 		message: '用户不存在'
// 	// 	})
// 	// }

// })
// app.get('*', function(req, res) {
// 	console.log(111)
// 	// console.log(path.resolve(__dirname, '..', 'public/index.html'))
// 	// let html = fs.readFileSync(path.resolve(__dirname, '..', 'public/index.html'), 'utf-8')
// 	// res.send(html)
// })
app.listen(3000, () => {
	console.log('成功启动3000')
})

// const path = require('path')
// const fs = require('fs')
const express = require('express')
const router = require('./routes')
var history = require('connect-history-api-fallback');
var bodyParser = require('body-parser')

const app = express()
app.use(history());


app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
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

// const path = require('path')
// const fs = require('fs')
const express = require('express')
const router = require('./routes')
var history = require('connect-history-api-fallback');

const app = express()
app.use(history());
app.use(router)

// app.get('*', function(req, res) {
// 	console.log(111)
// 	// console.log(path.resolve(__dirname, '..', 'public/index.html'))
// 	// let html = fs.readFileSync(path.resolve(__dirname, '..', 'public/index.html'), 'utf-8')
// 	// res.send(html)
// })
app.listen(3000, () => {
	console.log('成功启动3000')
})

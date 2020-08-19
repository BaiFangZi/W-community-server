var express = require('express');

const router = express.Router()

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'wCommunity';


router.post('/api/v1/login', function(req, res) {
	MongoClient.connect(url, (err, client) => {
		if (err) {
			console.log("数据库连接失败");
			return false;
		}
		const db = client.db('wCommunity');
		db.collection('users').findOne({
			username: req.body.username
		}, (error, result) => {
			if (error) { //链接出错
				res.send('登陆失败')
				return false;
			} else { //判断是否有此用户，有的话判断密码是否一致
				if (result && result.password === req.body.password) {
					res.send({
						mes: '登陆成功',
						code: 0,
					})
				} else {
					res.send({
						msg: '用户名或密码错误',
						code: 10001,
					})
				}
			}
			client.close();
		})
	});
})


router.post('/api/v1/regist', (req, res) => {
	MongoClient.connect(url, (err, client) => {
		if (err) {
			console.log("数据库连接失败");
			return false;
		}
		const db = client.db('wCommunity');
		db.collection('users').insertOne(req.body, (error, result) => {
			if (error) {
				console.log("增加数据失败");
				return false;
			}
			res.send("增加数据成功");
			client.close();
		})
	});
})

module.exports = router

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
		db.collection('user').findOne({
			username: req.body.username
		}, (error, result) => {
			if (error) { //链接出错
				res.send('登陆失败')
				return false;
			} else { //判断是否有此用户，有的话判断密码是否一致
				if (result && result.password === req.body.password) {
					// console.log(result._id)
					// res.cookie('role', result.username, {
					// 	maxAge: 1000 * 60 * 60 * 24,
					// 	// signed: true,
					// 	// httpOnly: true,
					// 	// domain:'',//域名
					// });
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
		db.collection('user').insertOne(req.body, (error, result) => {
			if (error) {
				console.log("增加数据失败");
				return false;
			}
			res.send("增加数据成功");
			client.close();
		})
	});
})
//获取最新文章
router.get('/api/v1/artical/latest', (req, res) => {
	MongoClient.connect(url, (err, client) => {
		if (err) {
			console.log("数据库连接失败");
			return false;
		}
		const db = client.db('wCommunity');
		db.collection('articalInfo').find({}, {
			projection: {
				title: 1
			}
		}).limit(20).toArray((err, result) => {
			if (err)
				throw err
			res.json({
				msg: '成功',
				data: result
			})
			client.close()
		})

	});
})

//获取最新问答
router.get('/api/v1/problem/latest', (req, res) => {
	MongoClient.connect(url, (err, client) => {
		if (err) {
			console.log("数据库连接失败");
			return false;
		}
		const db = client.db('wCommunity');
		db.collection('problemInfo').find({}, {
			projection: {
				title: 1
			}
		}).limit(20).toArray((err, result) => {
			if (err)
				throw err
			res.json({
				msg: '成功',
				data: result
			})
			client.close()
		})
	});
})

//发布文章

router.post('/api/v1/artical/create', (req, res) => {
	MongoClient.connect(url, (err, client) => {
		if (err) {
			console.log("数据库连接失败");
			return false;
		}
		const db = client.db('wCommunity');
		db.collection('artical').insertOne({
			title: req.body.title,
			content: req.body.content
		}, (err, result) => {
			if (err)
				throw err
			res.json({
				msg: '成功',
			})
			client.close()
		})
	});
})

module.exports = router

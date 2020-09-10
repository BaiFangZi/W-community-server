const express = require('express');

const router = express.Router()


const users = require('../model/user.js')
const notes = require('../model/note.js')
const problems = require('../model/problem.js')

const jwt = require('jsonwebtoken')


router.post('/api/v1/login', (req, res) => {
	users.findOne({
			user_name: req.body.username
		})
		.then(result => {
			if (result && result.password === req.body.password) {
				const token = jwt.sign({
					name: result.user_name,
					_id: result._id
				}, 'weizxx', {
					expiresIn: '24h'
				})
				res.send({
					code: 0,
					data: token,
					msg: '操作成功'
				})
			} else {
				res.send({
					code: 10001,
					msg: '用户名或密码错误'
				})
			}
		}).catch(err => {
			console.log(err)
		})
})

router.post('/api/v1/regist', (req, res) => {
	users.findOne({
		user_name: req.body.username
	}).then(result => {
		if (result) {
			res.send({
				msg: '用户名重复',
				code: 10002
			})
		} else {
			users.create({
				user_name: req.body.username,
				password: req.body.password
			}).then(result => {
				res.send({
					msg: '注册成功',
					code: 0
				})
			}).catch(err => {
				console.log(err)
			})
		}
	}).catch(err => {
		console.log(err)
	})
})



router.get('/api/v1/artical/latest', (req, res) => {
	console.time()
	const noteList = notes.find({}, {
		title: 1,
	}).limit(20)
	const problemList = problems.find({}, {
		title: 1,
	}).limit(20)
	Promise.all([noteList, problemList]).then(result => {
		res.send({
			msg: '操作成功',
			code: 0,
			noteList: result[0],
			problemList: result[1],

		})
		console.timeEnd()
	}).catch(err => {
		console.log(err.message)
	})
})

//发布文章

router.post('/api/v1/note/create', (req, res) => {
	notes.create({
		title,
		content,
		userId,
		date,
		likeNum,
		viewNum,
		commentNum,
	} = req.body).then(result => {
		res.send({
			msg: '操作成功',
			code: 0
		})
	}).catch(err => {
		console.log(err)
	})
})



//发布问题

router.post('/api/v1/problem/create', (req, res) => {
	problems.create({
		title,
		content,
		userId,
		date,
		likeNum,
		viewNum,
		commentNum,
	} = req.body).then(result => {
		res.send({
			msg: '操作成功',
			code: 0
		})
	}).catch(err => {
		console.log(err)
	})
})




//获取随笔分页列表
router.get('/api/v1/note/list', (req, res) => {
	const {
		page,
		limit
	} = req.query
	const result = notes.find().limit(page * limit).skip((page - 1) * limit)
	const count = notes.count()
	Promise.all([result, count]).then(data => {
		res.send({
			msg: '操作成功',
			data: data[0],
			count: data[1]
		})
	}).catch(err => {
		console.log(err)
	}).finally(() => {
		client.close()
	})
})
//获取问题分页列表
router.get('/api/v1/problem/list', (req, res) => {
	const {
		page,
		limit
	} = req.query
	const result = problems.find().limit(page * limit).skip((page - 1) * limit)
	const count = problems.count()
	Promise.all([result, count]).then(data => {
		res.send({
			msg: '操作成功',
			data: data[0],
			count: data[1]
		})
	}).catch(err => {
		console.log(err)
	}).finally(() => {
		client.close()
	})
})
// //获取文章内容
router.get('/api/v1/note/content', (req, res) => {
	notes.findById(req.query.articalId).then(result => {
		res.send({
			msg: '操作成功',
			code: 0,
			data: result
		})
	}).catch(err => {
		console.log(err)
	})
})
// //获取问题内容
router.get('/api/v1/problem/content', (req, res) => {
	problems.findById(req.query.articalId).then(result => {
		res.send({
			msg: '操作成功',
			code: 0,
			data: result
		})
	}).catch(err => {
		console.log(err)
	})
})

//点赞这篇随笔
router.get('/api/v1/note/like', (req, res) => {
	notes.findByIdAndUpdate(req.query.articalId, {
		$inc: {
			likeNum: 1
		},
	}).then(result => {
		res.send({
			msg: '操作成功',
			code: 0,
			likeNum: result.likeNum + 1
		})
	}).catch(err => {
		console.log(err)
	})
})

//点赞这篇提问
router.get('/api/v1/problem/like', (req, res) => {
	problems.findByIdAndUpdate(req.query.articalId, {
		$inc: {
			likeNum: 1
		},
	}).then(result => {
		res.send({
			msg: '操作成功',
			code: 0,
			likeNum: result.likeNum + 1
		})
	}).catch(err => {
		console.log(err)
	})
})

//搜索随笔
router.get('/api/v1/note/search', (req, res) => {
	let regValue = new RegExp(req.query.value)
	notes.find({
		$or: [{
				title: regValue
			},
			{
				content: regValue
			}
		]
	}, 'title').then(result => {
		res.send({
			msg: '操作成功',
			code: 0,
			data: result
		})
	}).catch(err => {
		console.log(err)
	})
})
//搜索问答
router.get('/api/v1/problem/search', (req, res) => {
	let regValue = new RegExp(req.query.value)
	problems.find({
		$or: [{
				title: regValue
			},
			{
				content: regValue
			}
		]
	}, 'title').then(result => {
		regValue = null
		res.send({
			msg: '操作成功',
			code: 0,
			data: result
		})
	}).catch(err => {
		console.log(err)
	})
})

module.exports = router

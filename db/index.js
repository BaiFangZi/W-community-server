const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/wCommunity')

const db = mongoose.connection
db.on('error', err => {
	console.error('连接数据库出错' + err);
	mongoose.disconnect();
})
db.once('open', () => {
	console.log('数据库连接成功')
})
db.on('close', () => {
	console.log('数据库断开连接')
})

module.exports = db




// const userSchema = new mongoose.Schema({
//   name: String,
//   password: String
// })

// const articleSchema = new mongoose.Schema({
//   title: String,
//   date: String,
//   content: String,
//   gist: String,
//   labels: Array
// })

// const Models = {
//   User: mongoose.model('User', userSchema),
//   Article: mongoose.model('Article', articleSchema)
// }

// module.exports = Models

// const MongoClient = require('mongodb').MongoClient;


// const UserSchema = new mongoose.Schema({
// 	username: String,
// 	paaasors: String,
// })
// const ArticalSchema = new mongoose.Schema({
// 	title: String, //标题
// 	date: String, //日期
// 	content: String, //内容
// 	label: Array, //标签分类
// 	// articalId: String //文章id    _id ???
// })
// const Models = {
// 	User: mongoose.model('User', UserSchema),
// 	Artical: mongoose.model('Artical', ArticalSchema)
// }

// module.exports = Models

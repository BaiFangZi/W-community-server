

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
	user_name: String,
	password: String,
	_token:String,
})
const User = mongoose.model('user', userSchema)

module.exports = User

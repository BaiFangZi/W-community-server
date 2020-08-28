const mongoose = require('mongoose')
const Schema = mongoose.Schema
const noteSchema = new mongoose.Schema({

	title: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	userId: {
		type: String,
		default: ''
	},
	date: {
		type: String,
		default: ''
	},
	likeNum: {
		type: Number,
		default: 0
	},
	commentNum: {
		type: Number,
		default: 0
	},
	viewNum: {
		type: Number,
		default: 0
	},
})
const Note = mongoose.model('note', noteSchema)

module.exports = Note

var express = require('express');
const router = express.Router()


// router.post('/api/v1/regist', (req, res) => {
// 	console.log(req.url)
// 	res.send()
// })


router.post('/api/v1/regist', function(req, res) {
	res.send('11')
	// new db.User(req.body.userInfo).save(function (err) {
	//   if (err) {
	//     res.status(500).send()
	//     return
	//   }
	//   res.send()
	// })
})

module.exports = router

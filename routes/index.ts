var express = require('express');
var router = express.Router();
const airton =require('../src/AirtonService/AirtonDriver');
/* GET home page. */
router.get('/', function(req: any, res: any, nxt:any) {
  res.render('index', { title: 'Express' });
});


router.get('/heating/:room/off', function(req:any, res:any) {
	airton.setOff();
	res.status(200);
});

//FIXME should be post
router.get('/heating/:room/:temperature', function(req:any, res:any, next:any) {
	const room = req.query.room; // currently ignoring room 
	const temp = req.query.temperature;
	airton.setOn24Hot();
	res.status(200);
});



module.exports = router;

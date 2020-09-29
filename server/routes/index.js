
var express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/////////////////////////////Video Chat Routes///////////////////////////////////////
const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};




router.get('/video/token',function (req, res) {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});
router.post('/video/token',function (req, res) {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

////////////////////////////////////////////////////////////////////////////////////

module.exports = router;

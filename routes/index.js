var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', quizController.init );

router.get('/quizes/question',	quizController.question );
router.get('/quizes/answer',	quizController.answer );

module.exports = router;
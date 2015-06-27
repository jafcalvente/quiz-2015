var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// GET home page
router.get('/', quizController.init );

// Autoload de comandos con :quizId
// Este middleware se instala antes que 'show' y 'answer' para que se ejecute sólo 
// en el caso de que la cabecera HTTP (query, body o param) contenga ':quizId'
router.param('quizId', quizController.load);

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer)

// Definición de ruta de /author
router.get('/author', quizController.author );

module.exports = router;

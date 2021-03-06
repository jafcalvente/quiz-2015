var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

// Página de entrada (home page)
router.get('/', quizController.init );

// Autoload de comandos con :quizId
// Este middleware se instala antes que 'show' y 'answer' para que se ejecute sólo 
// en el caso de que la cabecera HTTP (query, body o param) contenga ':quizId'
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

// Definición de rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);
router.get('/quizes/statistics', statisticsController.index);

// Definición de rutas de /comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
	sessionController.loginRequired, commentController.publish);

// Definición de ruta de /author
router.get('/author', quizController.author );

module.exports = router;

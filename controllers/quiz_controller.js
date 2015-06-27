// importamos el módulo 'models' para poder acceder a las tablas de la BBDD
var models = require('../models/models.js');

// GET /
exports.init = function(req, res) {

	res.render('index', { title: 'Quiz' });
};


// GET /quizes
exports.index = function(req, res) {

	models.Quiz.findAll().success(function(quizes) {

		res.render('quizes/index', { quizes: quizes });
	});
};

// GET /quizes/:quizId
exports.show = function(req, res) {

	models.Quiz.find(req.params.quizId).then(function(quiz) {

		res.render('quizes/show', { quiz: quiz });
	});
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {

	models.Quiz.find(req.params.quizId).then(function(quiz) {

		var answer = (req.query.respuesta.toUpperCase() === quiz.respuesta) ? 
			'Correcto' : 'Incorrecto';

		res.render('quizes/answer', { 
			title: 'Quiz',
			quiz: quiz,
			respuesta: answer
		});
	});
};

// GET /author
exports.author = function(req, res) {
	res.render('author', { author: 'Jose A. Fuentes'});
};

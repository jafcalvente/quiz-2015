// importamos el módulo 'models' para poder acceder a las tablas de la BBDD
var models = require('../models/models.js');

// GET /
exports.init = function(req, res) {
	res.render('index', { title: 'Quiz' });
};

// Autload - Factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {

	models.Quiz.find(quizId)
	.then(function(quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId=' + quizId));
		}
	})
	.catch(function(error) {
		next(error);
	});
};

// GET /quizes
exports.index = function(req, res) {

	if(req.query.search) {
		var search = '%' + req.query.search.replace(/\s/g, '%') + '%';

		models.Quiz.findAll(
			{ 
				where: { pregunta: { like: search}},
				order: [[ 'pregunta', 'ASC' ]]
			})
		.then(function(quizes) {
			res.render('quizes/index', { quizes: quizes });
		})
		.catch(function(error) {
			next(error);
		});
	} else {
		models.Quiz.findAll()
		.then(function(quizes) {
			res.render('quizes/index', { quizes: quizes });
		})
		.catch(function(error) {
			next(error);
		});
	}
};

// GET /quizes/:quizId
exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {

	var result = (req.query.respuesta.toUpperCase() === req.quiz.respuesta) ?
		'Correcto' : 'Incorrecto';

	res.render('quizes/answer', 
		{ 
			quiz: req.quiz, 
			respuesta : result 
		});
};

// GET /author
exports.author = function(req, res) {
	res.render('author', { author: 'Jose A. Fuentes'});
};

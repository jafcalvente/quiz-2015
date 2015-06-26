// importamos el módulo 'models' para poder acceder a las tablas de la BBDD
var models = require('../models/models.js');

// GET /
exports.init = function(req, res) {

	res.render('index', { title: 'Quiz' });
};

// GET /quizes/question
exports.question = function(req, res) {

	models.Quiz.findAll().success(function(quiz) {

		res.render('quizes/question',
			{
				title: 'Quiz',
				pregunta: quiz[0].pregunta
			});
	});
};

// GET /quizes/answer
exports.answer = function(req, res) {

	models.Quiz.findAll().success(function(quiz) {

		var answer = 'Incorrecto';
		if (req.query.respuesta && 
				req.query.respuesta.toUpperCase() === quiz[0].respuesta) {
			answer = 'Correcto'
		}

		res.render('quizes/answer', 
			{ 
				title: 'Quiz',
				respuesta: answer 
			});
	});
};

// GET /author
exports.author = function(req, res) {
	res.render('author', { author: 'Jose A. Fuentes'});
};

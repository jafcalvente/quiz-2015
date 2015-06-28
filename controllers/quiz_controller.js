// importamos el módulo 'models' para poder acceder a las tablas de la BBDD
var models = require('../models/models.js');

// GET /
exports.init = function(req, res) {
	res.render('index', { title: 'Quiz', errors: [] });
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
exports.index = function(req, res, next) {

	if(req.query.search) {
		var search = '%' + req.query.search.replace(/\s/g, '%') + '%';

		models.Quiz.findAll(
			{ 
				where: { pregunta: { like: search}},
				order: [[ 'pregunta', 'ASC' ]]
			})
		.then(function(quizes) {
			res.render('quizes/index', { quizes: quizes, errors: [] });
		})
		.catch(function(error) {
			next(error);
		});
	} else {
		models.Quiz.findAll()
		.then(function(quizes) {
			res.render('quizes/index', { quizes: quizes, errors: [] });
		})
		.catch(function(error) {
			next(error);
		});
	}
};

// GET /quizes/:quizId
exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {

	var result = (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) ?
		'Correcto' : 'Incorrecto';

	res.render('quizes/answer', 
		{ 
			quiz: req.quiz, 
			respuesta : result,
			errors: []
		});
};

// GET /quizes/new
exports.new = function(req, res) {

	var quiz = models.Quiz.build(
		{	// Crea objeto Quiz no persistido
			pregunta: 'Pregunta',
			respuesta: 'Respuesta'
		});
	res.render('quizes/new', { quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function(req, res) {

	var quiz = models.Quiz.build( req.body.quiz );

	quiz
	.validate()
	.then(function(err) {
		if (err) {
			res.render('quizes/new', 
				{
					quiz: quiz,
					errors: err.errors
				});
		} else {
			// Guarda quiz en la BBDD
			quiz.save({ fields: ['pregunta', 'respuesta']})
			.then(function() { res.redirect('/quizes') });	
		}
	});
};

// GET /quizes/:quizId/edit
exports.edit = function(req, res) {

	var quiz = req.quiz; // Autoload de instancia de quiz
	res.render('quizes/edit', { quiz: quiz, errors: []});
};

// PUT /quizes/:quizId
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz
	.validate()
	.then(function(err) {
		if(err) {
			res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });
		} else {
			req.quiz.save({ fields: ['pregunta', 'respuesta']})
			.then(function() { res.redirect('/quizes') });
		}
	});
};

// DELETE /quizes/:quizId
exports.destroy = function(req, res) {

	req.quiz.destroy()
	.then(function() {
		res.redirect('/quizes');
	})
	.catch(function(error) { next(error) });
};

// GET /author
exports.author = function(req, res) {
	res.render('author', { author: 'Jose A. Fuentes', errors: []});
};

// Importamos el módulo 'models' para poder acceder a las tablas de la BBDD
var models = require('../models/models.js');

// GET /quizes/statistics
exports.index = function(req, res, next) {

	var numQuestions = 0, numComments = 0, commentsAvg = 0,
		numQuestionsWithoutComments = 0, numQuestionsWithComments = 0;

	// Función que construirá la respuesta en caso de que ocurriese algún error
	var errorResponse = function(error) {
		return res.render('quizes/statistics', { 
			numQuestions: numQuestions,
			numComments: numComments,
			commentsAvg: commentsAvg,
			numQuestionsWithoutComments: numQuestionsWithoutComments,
			numQuestionsWithComments: numQuestionsWithoutComments,
			errors: [error]
		});
	};

	// Calcular el número de preguntas
	models.Quiz.count()
	.then( function(num) {
		numQuestions = num;

		// Calcular el número de comentarios
		models.Comment.count()
		.then( function(num) {
			numComments = num;

			// Calcular la media de comentarios por pregunta
			if (numQuestions > 0) {
				commentsAvg = numComments / numQuestions;
			}

			// Calcular el número de preguntas con comentarios
			models.Quiz.findAll({
				include: [{ 
					model: models.Comment,
					required: true 
				}]
			})
			.then( function(quizes) {
				numQuestionsWithComments = quizes.length;

				// Calcular el número de preguntas sin comentarios
				models.Quiz.findAll()
				.then( function(quizes) {
					numQuestionsWithoutComments = quizes.length - numQuestionsWithComments;

					// Construimos la respuesta
					res.render('quizes/statistics', { 
						numQuestions: numQuestions,
						numComments: numComments,
						commentsAvg: commentsAvg,
						numQuestionsWithoutComments: numQuestionsWithoutComments,
						numQuestionsWithComments: numQuestionsWithComments,
						errors: []
					});
				})
				.catch( function(error) { errorResponse(new Error('Error al obtener el número de preguntas sin comentarios.')); });
			})
			.catch( function(error) { errorResponse(new Error('Error al obtener el número de preguntas con comentarios.')); });
		})
		.catch( function(error) { errorResponse(new Error('Error al obtener el número de comentarios.')); });
	})
	.catch( function(error) { errorResponse(new Error('Error al obtener el número de preguntas.')); });

};

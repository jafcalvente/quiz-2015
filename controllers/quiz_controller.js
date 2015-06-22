// GET /
exports.init = function(req, res) {
  res.render('index', { title: 'Quiz' });
};

// GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', 
		{ 
			title: 'Quiz',
			pregunta:  'Capital de Italia' 
		});
};

// GET /quizes/answer
exports.answer = function(req, res) {

	var answer = 'Incorrecto';
	if (req.query.respuesta && 
			req.query.respuesta.toUpperCase() === 'ROMA') {
		answer = 'Correcto'
	}

	res.render('quizes/answer', 
		{ 
			title: 'Quiz',
			respuesta: answer 
		});
};

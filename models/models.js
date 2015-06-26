var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Importar la definición de la tabla Quiz desde quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar definición de la tabla Quiz
exports.Quiz = Quiz;

// Crear e inicializar la tabla en la BBDD con el método 'sync'
sequelize.sync().success(function() {

	// Contamos el número de registros de la tabla Quiz
	Quiz.count().success(function(count) {

		// Si la tabla no tiene registros la inicializamos
		if (count === 0) {

			Quiz.create({
				pregunta: "¿Capital de Italia?",
				respuesta: "ROMA"
			}).success(function(){
				console.log("Base de datos inicializada...");
			});
		}
	});
});
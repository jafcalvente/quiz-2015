var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite 	DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*?)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
	{
		dialect: protocol,
		protocol: protocol,
		port: port,
		host: host, 
		storage: storage,	// Solo SQLite (.env)
		omitNull: true	// Solo Postgres
	});

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
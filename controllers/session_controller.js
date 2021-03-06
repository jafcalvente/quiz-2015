// Importamos el módulo de autenticación
var userController = require('./user_controller');

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// GET /login - Formulario de login
exports.new = function(req, res) {

	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', { errors: errors});
};

// POST /login - Crear la sesión
exports.create = function(req, res) {

	var login = req.body.login;
	var password = req.body.password;

	userController.autenticar(login, password, function(error, user) {
		
		if(error) {
			req.session.errors = [{ 'message': 'Se ha producido un error: ' + error}];
			res.redirect('/login');
			return;
		}

		// Crear req.session.user y guardar id y username.
		// La sesión se define por la existencia de req.session.user
		req.session.user = { id: user.id, username: user.username};

		// Redireccionar al path anterior a login
		res.redirect(req.session.redir.toString());
	});
};

// GET /logout - Destruir sesión
exports.destroy = function(req, res) {

	delete req.session.user;
	res.redirect(req.session.redir.toString());
};

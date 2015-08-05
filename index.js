var passport = require('passport');

function login(req, res, next) {
	passport.authenticate('local', function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.forbidden('Authentication failure.');
		}
		return res.ok('Authenticated.');
	})(req, res, next);
}

module.exports = function(sails) {
	return {
		/**
		 * Adds the passport middleware to sails config.
		 * @return {}
		 */
		configure: function() {
			// Get configurations.
			var middleware = sails.config.http.middleware;
			var config = sails.config.passport;
			var sessionIndex = middleware.order.indexOf('session');
			if (sessionIndex == -1) {
				return false;
			}
			// Add passport.initialize() and session() middleware.
			middleware.passportInit = passport.initialize();
			middleware.passportSession = passport.session();
			middleware.order.splice(sessionIndex + 1, 0, 'passportInit', 'passportSession');
			// Supply configured strategies.
			config.strategies.forEach(function(strategy) {
				passport.use(strategy);
			});
			passport.serializeUser(config.serializeUser);
			passport.deserializeUser(config.deserializeUser);
		},
		routes: {
			before: {
				'get /user/login': passport.authenticate('login'),
				'post /user/login': passport.authenticate('login'),
				'get /user/logout': function(req, res, next) {
					req.logout();
					return res.ok('Logged out.');
				}
			}
		}
	};
};
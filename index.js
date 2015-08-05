var passport = require('passport');

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
			// Add passport.initialize() middleware.
			middleware.passportInit = passport.initialize();
			middleware.order.unshift('passportInit');
			// If using session middleware, add passport.session() middleware.
			var sessionIndex = middleware.order.indexOf('session');
			if (sessionIndex != -1) {
				middleware.passportSession = passport.session();
				middleware.order.splice(sessionIndex + 1, 0, 'passportSession');
			}
			// Supply configured strategies.
			config.strategies.forEach(function(strategy) {
				passport.use(strategy);
			});
			passport.serializeUser(config.serializeUser);
			passport.deserializeUser(config.deserializeUser);
		}
	};
};
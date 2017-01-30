const nExpress = require('@financial-times/n-express');
const nHandlebars = require('@financial-times/n-handlebars');
const authS3O = require('s3o-middleware');

const path = require('path');

const handlebars = function ({app, directory, options}) {
	const viewsDirectory = options.viewsDirectory || '/views';
	const partialsDir = [
		directory + viewsDirectory + '/partials'
	];

	partialsDir.unshift(path.join(__dirname, 'layouts/partials'));

	if (options.partialsDirectory) {
		partialsDir.push(options.partialsDirectory);
	}

	return nHandlebars(app, {
		partialsDir,
		defaultLayout: options.defaultLayout || false,
		layoutsDir: options.layoutsDir || path.join(__dirname, 'layouts'),
		helpers: options.helpers || {},
		directory: directory,
		viewsDirectory: viewsDirectory
	})
}

module.exports = options => {
	options = options || {};

	const {app, meta, addInitPromise} = nExpress.getAppContainer({
		systemCode: options.systemCode,
		healthChecks: options.healthchecks || []
	})

	addInitPromise(handlebars({
		app,
		directory: meta.directory,
		options
	}));

	app.use('/' + meta.name, nExpress.static(meta.directory + '/public', { redirect: false }));
	if (options.s3o !== false) {
		app.use((req, res, next) => {
			if (req.url.indexOf('/__') === 0) {
				next()
			}
			authS3O(req, res, next)
		});
	}

	app.locals.__name = meta.name;

	// to avoid errors
	app.locals.origami = {};
	return app;
}

module.exports.Router = nExpress.Router;
module.exports.static = nExpress.static;
module.exports.metrics = nExpress.metrics;

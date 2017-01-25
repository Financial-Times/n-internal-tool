const nExpress = require('@financial-times/n-express');
const nHandlebars = require('@financial-times/n-handlebars');
const path = require('path');

const handlebars = function ({app, directory, options}) {
	const viewsDirectory = options.viewsDirectory || '/views';
	const partialsDir = [
		directory + viewsDirectory + '/partials',
	];

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

	return app;
}

module.exports.Router = nExpress.Router;
module.exports.static = nExpress.static;
module.exports.metrics = nExpress.metrics;

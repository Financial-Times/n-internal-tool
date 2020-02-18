const nExpress = require('@financial-times/n-express');
const nHandlebars = require('@financial-times/n-handlebars');
const path = require('path');

const handlebars = function ({app, directory, options}) {
	const viewsDirectory = options.viewsDirectory || '/views';
	const partialsDir = [
		directory + viewsDirectory + '/partials'
	];

	partialsDir.unshift(path.join(__dirname, 'layouts/partials'));

	if (options.partialsDirectory) {
		options.partialsDirectory = Array.isArray(options.partialsDirectory) ? options.partialsDirectory : [options.partialsDirectory];
		options.partialsDirectory.forEach(dir => partialsDir.push(dir));
	}

	return nHandlebars(app, {
		partialsDir,
		extname: options.extname || '.html',
		defaultLayout: options.defaultLayout || false,
		layoutsDir: options.layoutsDir || path.join(__dirname, 'layouts'),
		helpers: options.helpers || {},
		directory: directory,
		viewsDirectory: viewsDirectory
	});
};

module.exports = options => {
	options = options || {};

	const {app, meta, addInitPromise} = nExpress.getAppContainer(options);

	addInitPromise(handlebars({
		app,
		directory: meta.directory,
		options
	}));

	app.use('/' + meta.name, nExpress.static(meta.directory + '/public', { redirect: false }));

	app.locals.__name = meta.name;

	// to avoid errors
	app.locals.origami = {};
	return app;
};

module.exports.Router = nExpress.Router;
module.exports.static = nExpress.static;
module.exports.metrics = nExpress.metrics;

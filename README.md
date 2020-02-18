# n-internal-tool
Simple nodejs server intended for internal, web-based tools


## Introducing
* n-express - next's standard issue server, with error-handling, metrics, utility endpoints (e.g. /__about) and healthchecks built in
* n-handlebars - handlebarsjs with a few additional helpers introduced by next
* o-header-services - origami header for non user-facing websites


## Options
- `options.viewsDirectory` - directory containing your handlebars views (default `/views`)
- `options.partialsDirectory` - array of directories containing your handlebars partials (default `/views/partials`)
- `options.defaultLayout` - name of the default layout to use (default `false`)
- `options.layoutsDir` - directory containing your handlebars layouts (default `/node_modules/n-internal-tool/layouts`)
- `options.helpers` - map of handlebars helpers
- `options.systemCode` - system code for the app
- `options.healthchecks` - array of healthchecks for the app (see n-express for details)
- `options.extname` - file extension of files to use as handlebars templates (default: `'.html'`)


## Modules
* `Router` - Next's Express router
* `static` - common static data
* `metrics` - Next metrics

```js
import express from `@financial-times/n-internal-tool`;
```

## Data model
To render the header and nav set `app.locals.header` or `res.locals.header` to an object matching this structure:
```
{
	serviceName: 'Next code ombudsman',
	tagLine: 'As defined in section a), subsection 3biii',
	primaryNav: [
		{
			href: 'http://ft.com',
			text: 'next site'
		}
	],
	relatedContent: [
		{
			href: 'http://ft.com/signIn',
			text: 'sign in'
		}
	],
}

```

To include additional origami components via the build service set an object like the following as `app.locals.origami`

```
{
	css: 'module1@x.y.z,module2@x.y.z',
	js: 'module1@x.y.z,module2@x.y.z'
}

```


## Custom document title
In the server of your own app, assign a string value to `res.locals.title`, which will be picked up within `n-internal-tool`'s `<head>` tags and displayed in the browser tab.

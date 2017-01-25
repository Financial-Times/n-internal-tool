<!DOCTYPE html>
<html lang="en-GB">
	<head>
		<meta charset="utf-8">
		<title>{{#title}}{{{this}}}{{/title}}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="//{{__name}}/main.css">
		{{#outputBlock 'head'}}{{/outputBlock}}
	</head>
	<body>
		{{{body}}}
		{{#if @root.flags.javascript}}
		<script src="//{{__name}}/main.js"></script>
	</body>
</html>

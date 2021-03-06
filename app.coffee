express = require 'express'
request = require 'request'
getimage = require './lib/getimage.js'

app = express()

app.get '/', (req, res) ->
	res.send('hello')

app.get '/face/:q', (req, res) ->
	q = req.param 'q'

	#request "http://www.google.com/search?&q=luke+donald&tbs=itp:face#q=#{q}&safe=off&tbm=isch&tbs=itp:face", (err, response, body) ->
	request "http://prerender1.herokuapp.com/http://bing.com/images/search?qpvt=#{q}&q=#{q}&qft=+filterui:face-face&FORM=R5IR30", (err, response, body) ->
		ok = false
		console.log(response.statusCode + ' - ' + err)
		if !err and response.statusCode == 200
			img_url = getimage.get body
			console.log('url: ' + img_url)
			if img_url
				ok = true

		if ok
			res.redirect img_url
		else
			res.status(500).send('500')
			#res.set('Content-Type', 'text/plain').send(body);


app.get '/flag/:q', (req, res) ->
	q = req.param 'q'
	q = q + '+national+flag'

	request "http://prerender1.herokuapp.com/http://bing.com/images/search?qpvt=#{q}&q=#{q}", (err, response, body) ->
		ok = false
		console.log(response.statusCode + ' - ' + err)
		if !err and response.statusCode == 200
			img_url = getimage.get body
			console.log('url: ' + img_url)
			if img_url
				ok = true

		if ok
			res.redirect img_url
		else
			res.status(500).send('500')
			#res.set('Content-Type', 'text/plain').send(body);	

app.get '/proxy', (req, res) ->
	url = req.param 'url'

	request {uri: url, headers:{'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'}}, (err, response, body) ->
		if !err and response.statusCode == 200
			res.send body
		else
			res.status(500).send('500 ' + response.statusCode)
		

exports.app = app

port = process.env.PORT || 5000
app.listen(port)


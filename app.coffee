express = require 'express'
request = require 'request'
getimage = require './lib/getimage.js'

app = express()

app.get '/', (req, res) ->
	res.send('hello')

app.get '/:q', (req, res) ->
	q = req.param 'q'

	#request "http://www.google.com/search?&q=luke+donald&tbs=itp:face#q=#{q}&safe=off&tbm=isch&tbs=itp:face", (err, response, body) ->
	request "http://bing.com/images/search?qpvt=#{q}&q=#{q}&qft=+filterui:face-face&FORM=R5IR30", (err, response, body) ->
		ok = false
		console.log(response.statusCode, err)
		if !err and response.statusCode == 200
			img_url = getimage.get body
			console.log('url: ' + img_url)
			if img_url
				ok = true

		if ok
			res.redirect img_url
		else
			res.status(500).send('500')
		

exports.app = app

port = process.env.PORT || 5000
app.listen(port)


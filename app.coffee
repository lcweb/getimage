express = require 'express'
app = express()

app.get '/', (req, res) ->
	res.send('hello')


port = process.env.PORT || 5000;
app.listen(port)
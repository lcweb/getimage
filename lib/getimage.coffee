exports.awesome = () ->
	'awesome'

exports.get = (body) ->
	a = s_from_multi body, ['class="sg_u', 'src="']
	if !a
		return null
	a = s_to a, '"'



# taglia s from tok; es: s = "1234" tok = "2" result = "34"
# return None if fails
s_from = (s, tok) ->
	pos = s.indexOf(tok)
	if pos == -1
		return null
	s.substr(pos + tok.length)


# tok is list: s = 4123456 tok=[2, 4] result= 56
s_from_multi = (s, tok) ->
	for t in tok
		s = s_from(s, t)
		if s == null
			return null
	s

# taglia s to tok; es: s = "1234" tok = "2" result = "1"
# return None if fails
s_to = (s, tok) ->
	pos = s.indexOf(tok)
	if pos == -1
		return null
	s.substr(0, pos)
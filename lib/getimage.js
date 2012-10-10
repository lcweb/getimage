var s_from, s_from_multi, s_to;

exports.awesome = function() {
  return 'awesome';
};

exports.get = function(body) {
  var a;
  a = s_from_multi(body, ['class="sg_u', 'src="']);
  if (!a) {
    return null;
  }
  return a = s_to(a, '"');
};

s_from = function(s, tok) {
  var pos;
  pos = s.indexOf(tok);
  if (pos === -1) {
    return null;
  }
  return s.substr(pos + tok.length);
};

s_from_multi = function(s, tok) {
  var t, _i, _len;
  for (_i = 0, _len = tok.length; _i < _len; _i++) {
    t = tok[_i];
    s = s_from(s, t);
    if (s === null) {
      return null;
    }
  }
  return s;
};

s_to = function(s, tok) {
  var pos;
  pos = s.indexOf(tok);
  if (pos === -1) {
    return null;
  }
  return s.substr(0, pos);
};

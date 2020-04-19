
const parseCookies = (req, res, next) => {
  var cookieObj = {};
  // console.log(req.headers);
  if (req.header('Cookie')) {
  // if (req.headers.cookie) {
    // console.log('req.headers.cookie', req.headers.cookie);
    req.headers.cookie.split(';').forEach( (cookie) => {
    // req.header('Cookie').split(';').forEach( (cookie) => {
      var index = cookie.indexOf('=');
      var id = cookie.slice(0, index).trim();
      var value = cookie.slice(index + 1).trim();
      cookieObj[id] = value;
    });
  }
  req.cookies = cookieObj;
  // console.log('req.cookies', req.cookies);
  next();
};

module.exports = parseCookies;
function RequestLoggger(request, response, next) {
  console.log(request.originalUrl);
  next();
}
module.exports = RequestLoggger;

// next is called when the middleware is complete. passes the request off to the next middleware in the chain
module.exports = (req, res, next) => {
  // if user is not logged in
  if (!req.user) {
    return res.status(401).send({ error: 'you must be logged in'});
  }

  // everything is good.....next
  next();
};

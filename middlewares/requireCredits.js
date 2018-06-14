// next is called when the middleware is complete. passes the request off to the next middleware in the chain
module.exports = (req, res, next) => {
  // if user is not logged in
  if (req.user.credits < 1 ) {
    return res.status(403).send({ error: 'Not enough credits'});
  }

  // everything is good.....next
  next();
};

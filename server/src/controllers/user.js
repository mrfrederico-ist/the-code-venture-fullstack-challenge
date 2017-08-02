exports.getLogin = (req, res, next) => {
  req.session.redirectTo = req.header('referer')
  res.redirect('auth/github')
  next()
}

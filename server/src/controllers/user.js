exports.login = (req, res, next) => {
  req.session.redirectTo = req.header('referer')
  res.redirect('auth/github')
  next()
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect(req.header('referer'))
}

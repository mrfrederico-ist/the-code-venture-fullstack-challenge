const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ github: profile.id }, (err, existingUser) => {
        if (err) return done(err)
        if (existingUser) return done(null, existingUser)

        const user = new User()
        user.github = profile.id
        user.token = accessToken

        user.save(err => done(err, user))
      })
    },
  ),
)

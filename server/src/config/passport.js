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
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile.id }, (err, existingUser) => {
        if (err) return done(err)
        if (existingUser) return done(null, existingUser)

        const user = new User()
        user.githubId = profile.id
        user.token = accessToken

        user.save(err => done(err, user))
      })
    },
  ),
)

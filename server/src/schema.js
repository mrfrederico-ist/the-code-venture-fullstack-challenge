const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('./resolvers')

const typeDefs = `
  type User {
    id: ID!
    token: String
  }

  type Query {
    loggedInUser: User
  }
`

// =================
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema

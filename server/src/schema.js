const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('./resolvers')

const typeDefs = `
  type User {
    id: ID!
    githubId: ID!
    token: String
  }

  type Query {
    user: User
  }
`

// =================
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema

const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('./resolvers')

const typeDefs = `
  type User {
    id: ID!
    githubId: ID
    token: String
  }

  type Story {
    id: ID!
    title: String
    url: String
    numComments: Int
    creationDate: Int
  }

  type Comment {
    id: ID!
    author: String
    text: String
    creationDate: Int
  }

  type Query {
    user: User
    topStories(first: Int, after: Int): [Story]
    storyComments(storyId: Int): [Comment]
  }
`

// =================
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema

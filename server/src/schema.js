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
    creationDate: Int
    score: Int
    numComments: Int
    comments: [Comment]
  }

  type Comment {
    id: ID!
    parent: ID!
    author: String
    creationDate: Int
    text: String
    hasKids: Boolean
    comments: [Comment]
  }

  type Query {
    user: User
    topStories(first: Int, after: Int, reload: Boolean): [Story]
    storyComments(id: Int): [Comment]
  }
`

// =================
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema

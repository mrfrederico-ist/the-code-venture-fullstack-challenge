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
    score: Int
    numComments: Int
    commentsIds: [Int]
    creationDate: Int
  }

  type Comment {
    id: ID!
    author: String
    text: String
    subCommentsIds: [Int]
    creationDate: Int
  }

  type Query {
    user: User
    topStories(first: Int, after: Int, reload: Boolean): [Story]
    comments(ids: [Int]): [Comment]
  }
`

// =================
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema

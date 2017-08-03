const userHandler = (rootValue, args, { user }) => {
  if (user) return user
  return null
}

const resolverMap = {
  Query: {
    user: userHandler,
  },
}

// ================
module.exports = resolverMap

const loggedInUserHandler = async (rootValue, args, { user }) => {
  if (user) return user
  return null
}

const resolverMap = {
  Query: {
    loggedInUser: loggedInUserHandler,
  },
}

// ================
module.exports = resolverMap

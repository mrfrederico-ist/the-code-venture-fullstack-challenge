const axios = require('axios')

// handlers =======
const user = (rootValue, args, { user }) => {
  if (user) return user
  return null
}

const topStories = async (root, { first, after }) => {
  const res = await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json',
  )

  return res.data.slice(after, after + first).map(async storyId => {
    const res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
    )

    const { id, title, url, descendants, kids, time } = res.data
    return {
      id,
      title,
      url,
      numComments: descendants,
      commentsIds: kids,
      creationDate: time,
    }
  })
}

const storyComments = async (root, { storyId }) => {
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
  )

  return res.data.kids.map(async commentId => {
    const res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
    )

    const { id, by, text, time } = res.data
    return {
      id,
      author: by,
      text,
      creationDate: time,
    }
  })
}

// ================
const resolverMap = {
  Query: { user, topStories, storyComments },
}

// ================
module.exports = resolverMap

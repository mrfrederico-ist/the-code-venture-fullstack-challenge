const axios = require('axios')

// constants ======
const HACKER_NEWS_TOP_STORIES_URI =
  'https://hacker-news.firebaseio.com/v0/topstories.json'
const HACKER_NEWS_ITEM_URI = 'https://hacker-news.firebaseio.com/v0/item/'

// handlers =======
const user = (rootValue, _, { user }) => {
  if (user) return user
  return null
}

const topStories = async (root, { first, after }, { session }) => {
  let data
  if (!session.storyIds) {
    const res = await axios.get(HACKER_NEWS_TOP_STORIES_URI)
    session.storyIds = res.data
    data = res.data
  } else {
    data = session.storyIds
  }

  const stories = data.slice(after, after + first).map(async storyId => {
    const res = await axios.get(`${HACKER_NEWS_ITEM_URI}${storyId}.json`)

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

  if (stories.length === 0) session.storyIds = undefined

  return stories
}

const storyComments = async (root, { storyId }) => {
  const res = await axios.get(`${HACKER_NEWS_ITEM_URI}${storyId}.json`)

  return res.data.kids.map(async commentId => {
    const res = await axios.get(`${HACKER_NEWS_ITEM_URI}${commentId}.json`)

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

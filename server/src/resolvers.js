const axios = require('axios')

// constants ======
const HACKER_NEWS_TOP_STORIES_URI =
  'https://hacker-news.firebaseio.com/v0/topstories.json'
const HACKER_NEWS_ITEM_URI = 'https://hacker-news.firebaseio.com/v0/item/'

// helpers ========
const fetchData = async url => {
  let res
  try {
    res = await axios.get(url)
  } catch (error) {
    if (error.code === 'ETIMEDOUT') {
      try {
        res = await axios.get(url)
      } catch (error) {
        throw new Error(error)
      }
    } else throw new Error(error)
  }
  return res
}

// handlers =======
const user = (rootValue, args, { user }) => {
  if (user) return user
  return null
}

const topStories = async (root, { first, after, reload }, { session }) => {
  let data
  if (!session.storyIds || reload) {
    const res = await fetchData(HACKER_NEWS_TOP_STORIES_URI)
    session.storyIds = res.data
    data = res.data
  } else {
    data = session.storyIds
  }

  const stories = data.slice(after, after + first).map(async storyId => {
    const res = await fetchData(`${HACKER_NEWS_ITEM_URI}${storyId}.json`)

    const { id, title, url, score, descendants, kids, time } = res.data
    return {
      id,
      title,
      url,
      score,
      numComments: descendants,
      commentsIds: kids,
      creationDate: time,
    }
  })

  if (stories.length === 0) session.storyIds = undefined

  return stories
}

const comments = async (root, { id }) => {
  let storyId
  if (root) storyId = root.id
  else storyId = id

  const res = await fetchData(`${HACKER_NEWS_ITEM_URI}${storyId}.json`)
  const ids = res.data.kids

  if (!ids) return []

  return ids.map(async commentId => {
    const res = await fetchData(`${HACKER_NEWS_ITEM_URI}${commentId}.json`)

    const { id, by, text, kids, time } = res.data
    return {
      id,
      author: by,
      text,
      hasKids: !!kids,
      creationDate: time,
    }
  })
}

// ================
const resolverMap = {
  Query: {
    user,
    topStories,
    storyComments: comments,
  },
  Story: { comments },
  Comment: { comments },
}

// ================
module.exports = resolverMap


const hackerNews = require('../axios/axios')

module.exports.get = async () => {
  const stories = await hackerNews.get('/newstories.json', {
    params: {
      print: 'pretty'
    }
  })
  return stories
}

module.exports.getOne = async (parent) => {
  const item = await hackerNews.get(`/item/${parent}.json`, {
    params: {
      print: 'pretty'
    }
  })
  return item
}
const db = require('../models');
const { Story } = db;

const storiesService = require('../services/stories')

const { successResponse, errorResponse } = require('../helpers/index')

let parentStoryChildren = [];

async function loopIntoNestedChildren (parent) {  
  if (Object.prototype.hasOwnProperty.call(parent.data, 'kids')) {
    for (const kidsId of parent.data.kids) {
      /**
       * query parent --> children --> kids --> kids --> ...
       */
      const nestedChildren = await storiesService.getOne(kidsId)
      console.log('type: children', nestedChildren.data.id);
      parentStoryChildren.push(nestedChildren.data)
      await loopIntoNestedChildren(nestedChildren)
    }
  }
}

async function fetchChildrenOfParentStory (limit) {
  const topStories = []

  /**
   * fetch parent story ids
   * example storyIds that has kids arr [27747931, 27747859, 27744044]
   */
  const { data } = await storiesService.get()
  let storyIds = data;

  /**
   * add simple limitation for testing as
   * 500 records request takes some time to process
   */
  if (limit) {
    storyIds = data.splice(0, limit)
  }

  console.log('# of query request: ', storyIds.length);
  for (const story of storyIds) {
    // query parent story 
    const parent = await storiesService.getOne(story)
    /**
     * exclude deleted story
     */
    if (parent.data) {
      topStories.push(parent.data)
      console.log('type parent: ', parent.data.id);
  
      await loopIntoNestedChildren(parent)
    }
  }

  return [
    ...topStories,
    ...parentStoryChildren
  ]
}

module.exports.saveStories = async (req, res) => {
  try {
    const { limit } = req.body
    const result = await fetchChildrenOfParentStory(limit)
    const stories = await Story.bulkCreate(result)
    return successResponse(req, res, stories, 200)
  } catch (error) {
    return errorResponse(req, res, error.message, 500)
  }
}
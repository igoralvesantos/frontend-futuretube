const initialState = {
  allVideos: [],
  userVideos: [],
  videoDetails: null,
  videoReaction: null,
  videoComments: []
}

const video = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_ALL_VIDEOS':
      const allVideos = action.payload.allVideos
      return {...state, allVideos: allVideos}
    case 'SET_USER_VIDEOS':
      const userVideos = action.payload.userVideos
      return {...state, userVideos: userVideos}
    case 'SET_VIDEO_DETAILS':
      const videoDetails = action.payload.videoDetails
      return {...state, videoDetails: videoDetails}
    case 'SET_VIDEO_REACTION':
      const videoReaction = action.payload.videoReaction
      return {...state, videoReaction: videoReaction}
    case 'SET_VIDEO_COMMENTS':
      const videoComments = action.payload.videoComments
      return {...state, videoComments: videoComments}
    default:
      return state
  }
}


export default video;
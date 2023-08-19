import React from 'react'

const StyledContext = React.createContext({
  addVideos: () => {},
  savedVideos: [],
})

export default StyledContext

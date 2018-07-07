import React from 'react'

const UpvoteIcon = (props) => {
  return <svg onClick={props.onClick} width="35px" height="35px" viewBox="0 0 45 41" version="1.1">
    <g id="Upvote">
      <path d="M0,41 L8,41 L8,17 L0,17 L0,41 Z M44,19 C44.5,16.3 42.7,15 40.5,15 L27.88,15 L29.78,5.36 L29.84,4.72 C29.84,3.9 29.5,3.14 28.96,2.6 L26.84,0.5 L13.68,13.68 C12.94,14.4 12,15.4 12,16.5 L12,36.5 C12,38.7 14.3,41 16.5,41 L34.5,41 C36.16,41 37.58,39.5 38.18,38.06 L44.22,23.96 C44.4,23.5 44,23.02 44,22.5 L44,18.68 L44.48,18.66 L44,19 Z" fill="#ed0968"></path>
    </g>
  </svg>
}

export default UpvoteIcon
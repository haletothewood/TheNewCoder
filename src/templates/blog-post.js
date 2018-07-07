import React, { Component } from 'react'
import Helmet from 'react-helmet'
import UpvoteIcon from '../icons/upvote-icon'

import formurlencoded from 'form-urlencoded';

const FIELD = {
  VIEWS: "views",
  UPVOTES: "upvotes"
}
export class Template extends Component {
  constructor(){
    super()
    this.state = { 
      views: 0,
      upvotes: 0,
      stateInitializing: true
    }
  }

  componentDidMount() {
    const {data} = this.props
    const post = data.markdownRemark
    this.addView()
    this.getPost(post)
  }

  getPost = (post) => {
    fetch('https://the-new-coder-api.herokuapp.com/posts/' + `${post.frontmatter.id}`, {
      method: 'GET',
      headers: {'Content-Type': "application/x-www-form-urlencoded"}
    })
    .then(result => result.json())
    .then(payload => payload.body.item)
    .then(item => {
      this.setState({
        views: item.views,
        upvotes: item.upvotes,
        stateInitializing: false
      })
    })
  }

  addUpvote = () => {
    this.incrementField(FIELD.UPVOTES)
  }

  addView = () => {
    this.incrementField(FIELD.VIEWS)
  }

  incrementField = (field) => {
    const {data} = this.props
    const post = data.markdownRemark

    fetch('https://the-new-coder-api.herokuapp.com/posts/' + `${post.frontmatter.id}`, {
      method: "PATCH",
      headers: {'Content-Type': "application/x-www-form-urlencoded"},
      body: formurlencoded({
        "field": field
      })
    })
    .then(() => this.getPost(post))
  }

  render() {
    const {data} = this.props
    const post = data.markdownRemark
    return <div className="blog-post-container">
      <Helmet 
      title={`The New Coder - ${post.frontmatter.title}`} 
      />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="blog-post-info">
          <div className="blog-post-upvotes bounce">
            <UpvoteIcon 
            onClick={this.addUpvote}
            upvoteCount={this.state.upvotes}
            />
          </div>
          <div className="blog-post-views">
            {this.state.stateInitializing ? "loading": this.state.views} views
          </div>
        </div>
      </div>
    </div>
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        id
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
export default Template;
import React, { Component } from 'react'
import Helmet from 'react-helmet'

export class Template extends Component {
  constructor(){
    super()
    this.state = { 
      views: 0,
      upvotes: 0
    }
  }

  componentDidMount() {
    const {data} = this.props
    const post = data.markdownRemark

    this.getPost(post)
  }

  getPost = (post) => {
    fetch('https://the-new-coder-api.herokuapp.com/posts/' + `${post.frontmatter.id}`, {
      method: 'get',
      headers: {'Content-Type': "application/x-www-form-urlencoded"}
    })
    .then(result => result.json())
    .then(payload => payload.body.item)
    .then(item => {
      this.setState({
        views: item.views,
        upvotes: item.upvotes
      })
    })
  }

  render() {
    const {data} = this.props
    const post = data.markdownRemark
    return <div className="blog-post-container">
      <Helmet title={`The New Coder - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="blog-post-views"onClick={this.incrementField}>
          {this.state.views} views
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
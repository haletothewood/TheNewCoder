const path = require('path')
const fetch = require('node-fetch')
const formurlencoded = require('form-urlencoded').default

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              path
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      fetch('https://the-new-coder-api.herokuapp.com/posts', {
        method: 'post',
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        body: formurlencoded({
          "title": `${node.frontmatter.title}`
        })
      }).then(res => console.log(res))
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

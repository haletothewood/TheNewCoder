const path = require('path')
const fetch = require('node-fetch')
const formurlencoded = require('form-urlencoded').default

const createPostIfNotExist = async (node) => {
  const response = await fetch('https://the-new-coder-api.herokuapp.com/posts', {
    method: 'post',
    headers: {'Content-Type': "application/x-www-form-urlencoded"},
    body: formurlencoded({
      "id": node.frontmatter.id,
      "title": node.frontmatter.title
    })
  })
  const result = await response.json()
  return result
}

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
              id
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
      createPostIfNotExist(node)
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

exports.modifyWebpackConfig = (config, env) => {
  if (env === 'build-javascript' || env === 'develop') {
    const previous = config.resolve().entry
    config._config.entry = []
    config.merge({
      entry: ['babel-polyfill'].concat(previous)
    })
  }
  return config
}
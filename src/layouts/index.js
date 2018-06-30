import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/header'
import Media from 'react-media'
import Sidebar from '../components/sidebar'

import './index.css'
import "../styles/layout-overide.css";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="The New Coder"
      meta={[
        { name: "description", content: "Nuggets of knowledge gleaned by coders, engineers and developers in their first year on the job." },
        { name: "keywords", content: "learn to code, coding, fullstack, react, codenewbie" }
      ]}
    />
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 980,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%"
      }}
    >
      <Media query={{ maxWidth: 848 }}>
        {matches =>
          matches ? (
            <div
              style={{
                margin: "0 auto",
                maxWidth: 980,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "100%",
                padding: "25px"
              }}
            >
              <div style={{ flex: 1 }}>{children()}</div>
            </div>
          ) : (
            <div
              style={{
                margin: "0 auto",
                maxWidth: 980,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "100%",
                padding: "25px"
              }}
            >
              <div style={{ flex: 2.5, paddingRight: "30px" }}>
                {children()}
              </div>
              <div style={{ flex: 1 }}>
                <Sidebar
                  title="What is this?"
                  description="Nuggets of knowledge gleaned by coders, engineers and developers in their first year on the job."
                />
                <Sidebar
                  title="Get involved."
                  description="To submit a story click on the github link in the header and follow the instructions."
                />
              </div>
            </div>
          )
        }
      </Media>
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

import React from 'react'
import { PopoverTitle } from 'react-bootstrap'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <div>
              <Helmet>
        <title>{title}</title>
        <meta name='description'content={description}></meta>
        <meta name='keywords'content={keywords}></meta>
      </Helmet>
            
        </div>
    )
}

Meta.defaultProps = {
    title: "Welcome to Keyboardshop",
    description: "hello there",
    keywords: "electronics",
}

export default Meta

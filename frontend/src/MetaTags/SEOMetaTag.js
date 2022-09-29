import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTag = props => {
  let title;
  if(props.title){title = props.title}
  let description;
  if(props.description){description = props.description}
      return (
        <Helmet>
          <title>{title}</title>
  
          <meta name="description" content={description} />
          <meta name="keywords" content={props.keywords} />
  
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={props.imgsrc} />
          <meta property="og:url" content={props.url} />
  
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={props.imgsrc} />
  
          <link rel="canonical" href={props.url} />
        </Helmet>
      );
  };
  
  export default MetaTag;
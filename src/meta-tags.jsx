import { h } from 'preact';
import {Helmet} from "react-helmet";

const MetaTags = (props) => {
  const base = 'Discursópolis';
  const title = props.title ? `${props.title} - ${base}` : base;

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />

      { props.description && <meta name="description" content={props.description} /> }
      { props.description && <meta property="og:description" content={props.description} /> }
    </Helmet>
  )
}

export default MetaTags

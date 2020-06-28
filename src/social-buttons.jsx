import { h } from 'preact';

import FbIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const SocialButtons = (props) => {
  const twURL = `https://twitter.com/intent/tweet?text=${props.name}&url=${props.url}`;
  const fbURL = `https://www.facebook.com/sharer/sharer.php?t=${props.name}&u=${props.url}`;
  const mailURL = `mailto:?subject=${props.name}&body=${props.name}, ${props.url}`;
  const liURL = `https://www.linkedin.com/sharing/share-offsite/?url=${props.url}`;

  return <span style={{float:'right'}}>
      <IconButton target="_top" href={mailURL}>
        <MailIcon />
      </IconButton>
      <IconButton target="_blank" href={fbURL}>
        <FbIcon />
      </IconButton>
      <IconButton target="_blank" href={twURL}>
        <TwitterIcon />
      </IconButton>
      <IconButton target="_blank" href={liURL}>
        <LinkedInIcon />
      </IconButton>
    </span>;
}

export default SocialButtons

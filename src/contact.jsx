import { Component, h } from 'preact';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MetaTags from './meta-tags';

const Contact = (props) => {
    return <Grid container spacing={3}>
        <MetaTags title={`Contacto`}/>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Contacto
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph={true}>
            Si querés hacer comentarios, sugerencias, proponer discursos o aportar análisis, comunicate por Twitter con <Link
              target="_blank" href="https://twitter.com/paulularia">@paulularia</Link> o por mail a <Link href="mailto:discursopolis@gmail.com">discursopolis@gmail.com</Link>.
          </Typography>
        </Grid>
    </Grid>
}

export default Contact

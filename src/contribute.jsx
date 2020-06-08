import { Component, h } from 'preact';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Contribute = (props) => {
    return <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Subí tu análisis 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph={true}>
            Si sos analista del discurso y querés aportar tu análisis, comunicate por Twitter con <Link
              target="_blank" href="https://twitter.com/paulularia">@paulularia</Link> o por mail a <Link href="mailto:accionendiscurso@gmail.com">accionendiscurso@gmail.com</Link>.
          </Typography>
        </Grid>
    </Grid>
}

export default Contribute

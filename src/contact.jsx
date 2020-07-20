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
            Si querés hacer comentarios, sugerencias o aportar análisis, comunicate por <Link
              target="_blank" href="https://twitter.com/discursopolis">Twitter</Link> o <Link target="_blank" href="https://www.instagram.com/discursopolis/">Instagram</Link> con @discursopolis, por mail a <Link href="mailto:discursopolis@gmail.com">discursopolis@gmail.com</Link> o visitá <Link target="_blank" href="https://www.facebook.com/Discurs%C3%B3polis-111560823960946">nuestra página de Facebook</Link>.
          </Typography>
          <Typography variant="body1" paragraph={true}>
            Si querés proponer un discurso, llená <Link
              target="_blank" href="https://forms.gle/SdrusUq3nq9jES4cA">este formulario</Link>.
          </Typography>
        </Grid>
    </Grid>
}

export default Contact

import { Component, h } from 'preact';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const About = (props) => {
    return <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Acerca de
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {'¿Qué hacemos?'}
              </Typography>
              <Typography variant="body1" paragraph={true}>
                Discursópolis es un sitio dedicado al Análisis del Discurso. Esta rama de la Lingüística permite encontrar en los discursos los sentidos que son opacos, difíciles de hallar a simple vista, incluso para lxs hablantes.
              </Typography>
              <Typography variant="body1" paragraph={true}>
                Discursópolis es la ciudad de los discursos analizados. En otras palabras, reúne análisis de distintos discursos que circulan en nuestra vida cotidiana, en diferentes ámbitos: medios de comunicación, redes sociales, conversaciones privadas, eventos institucionales, et
              </Typography>
              <Typography variant="body1" paragraph={true}>
                Desde el Análisis del Discurso, sabemos que la forma de decir es tan importante como lo dicho... y lo no dicho. Con un abordaje interpretativo e interdisciplinario, deconstruimos discursos para encontrar las desigualdades que se producen y reproducen en las palabras y, con ello, en nuestra sociedad.
              </Typography>
              <Typography variant="body1" paragraph={true}>
                Conocé más sobre el Análisis del Discurso en la charla TEDx  <Link
                target="_blank" href='https://www.youtube.com/watch?v=HsowSxacxxw&t=3s='>
                  ¿Cómo las palabras pueden transformar el mundo? 
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                ¿Quiénes somos?
              </Typography>
              <Typography variant="body1" paragraph={true}>
                {'Discursópolis es creado y coordinado por la lingüista argentina '}<Link
                  target="_blank"
                  href="https://www.linkedin.com/in/paula-salerno-3a8a336a">
                  Paula Salerno
                </Link>.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
}

export default About

import { Component, h } from 'preact';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MetaTags from './meta-tags';

const About = (props) => {
    return <Grid container spacing={3}>
        <MetaTags title={`Acerca de`}/>
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
                Discursópolis es un sitio dedicado al Análisis del Discurso. Esta rama de la Lingüística permite encontrar los sentidos que son opacos, difíciles de hallar a simple vista, incluso para lxs hablantes.
              </Typography>
              <Typography variant="body1" paragraph={true}>
                Los discursos son lugares donde se encuentran el lenguaje, la historia y la ideología. Tuits, posts, noticias, afiches, mails, conversaciones, propagandas, cartas abiertas, y la lista sigue. Los usos del lenguaje expresan relaciones de poder. En Discursópolis, las mostramos.
              </Typography>
              <Typography variant="body1" paragraph={true}>
                Estamos deconstruyendo discursos, estamos construyendo igualdad.
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
              <Typography variant="body1" paragraph={true}>
                Además, Discursópolis está abierta a los aportes de lingüistas y analistas de diferentes instituciones y procedencias.
              </Typography>
              <Typography variant="body1" paragraph={true}>
                Queremos mostrar eso que se dice más allá de lo dicho. Queremos transmitir una forma de interpretar los discursos que des-cubre las ideologías de nuestra vida cotidiana.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
}

export default About

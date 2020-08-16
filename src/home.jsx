import { Component, h } from 'preact';

import AppStore from './stores/app-store';
import TextsStore from './stores/texts-store';
import TagsStore from './stores/tags-store';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import TextList from './text-list';
import Progress from './progress';
import MetaTags from './meta-tags';

class Home extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {};

    this.INITIAL_NO_OF_TEXTS = 8;
    this.ADDMORE_NO_OF_TEXTS = 4;
  }

  componentWillMount(props, state) {
    AppStore.addChangeListener(this.bindedOnChange);
    TextsStore.addChangeListener(this.bindedOnChange);
    TagsStore.addChangeListener(this.bindedOnChange);

    TextsStore.loadData({limit: this.INITIAL_NO_OF_TEXTS});
    TagsStore.loadData();
  }

  componentWillUnmount(props, state) {
    AppStore.removeChangeListener(this.bindedOnChange);
    TextsStore.removeChangeListener(this.bindedOnChange);
    TagsStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState({
      ...TextsStore.getState(),
      ...TagsStore.getState(),
      ...{admin: AppStore.getState().admin}
    });
  }

  loadMore() {
    TextsStore.loadData({limit: this.ADDMORE_NO_OF_TEXTS, startAfter: this.state.lastTs});
  }

  render(props, state) {
    if (!state.texts) return <Progress />

    return <Grid container spacing={4}>
        <MetaTags />
        <Grid item xs={12}>
          <img src="logo_landing.png" className="logo-landing"></img>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="justify" paragraph={true} color="textSecondary">
      Analizar discursos no es solo interpretar lo que estos dicen, sino también lo que<i> no</i> dicen 
      y <i>cómo</i> dicen.
          </Typography>
          <Typography variant="h6" gutterBottom align="justify" paragraph={true} color="textSecondary">
      Entrá al discurso que quieras, cliqueá en las frases subrayadas y encontrá nuevos sentidos.
          </Typography>
          <Typography variant="h6" gutterBottom align="justify" paragraph={true} color="textSecondary">
            Deconstruyendo discursos, construimos igualdad.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextList texts={state.texts} />
        </Grid>
        { state.areRemainingTexts &&
        <Grid item xs={12}>
          <Button onClick={this.loadMore.bind(this)}>
            Ver más
          </Button>
        </Grid> }
        {state.admin &&
        <Grid item xs={12}>
          <Button variant="contained" href='/texts/new'>Add text</Button>
        </Grid>}
        <Grid item xs={12}>
         {state.tagList && state.tagList.map(tag =>
            <Chip component="a"
              label={tag.name}
              color="primary"
              clickable
              href={`/tags/${tag.id}`}
              style={{margin:'5px'}}
            />
         )}
        </Grid>
      </Grid>
  }
}

export default Home

import { h } from 'preact';
import MetaTags from './meta-tags';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const ComingSoon = (props) => {
    return <Grid container spacing={3}>
        <MetaTags title='Coming soon' />
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {'Se viene un gran lugar...'}
          </Typography>
        </Grid>
    </Grid>
};

export default ComingSoon

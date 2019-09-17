import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="xl">
          <Typography variant="h2" component="h1" gutterBottom>
            Hive Chrome Extension
          </Typography>



          {/*<Typography variant="h5" component="h2" gutterBottom>*/}
          {/*  {'Pin a footer to the bottom of the viewport.'}*/}
          {/*  {'The footer will move as the main element of the page grows.'}*/}
          {/*</Typography>*/}
          {/*<Typography variant="body1">Sticky footer placeholder.</Typography>*/}
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="xl">
            <h3>Add HiveNode</h3>
          </Container>
        </footer>
      </div>
  );
}

import books from './imgs/books.png';
import './App.css';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopBar from './TopBar';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  titleFont: {
    fontFamily: 'Teko',
  },
  btn: {
    color: '#424949',
    borderWidth: 2,
    borderColor: '#e3f2fd',
    fontSize: 16,
  },
  btnMain: {
    marginTop: theme.spacing(3),
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#e3f2fd',
    fontSize: 16,
    borderRadius: 25,
    width: 150
  },
  btnSecond: {
    marginTop: theme.spacing(3),
    color: '#03A9F4',
    borderWidth: 3,
    borderColor: '#03A9F4',
    fontSize: 16,
    borderRadius: 25,
    width: 150
  },
  paper: {
    marginTop: theme.spacing(7),
    textAlign: 'center'
  },
  container: {
    maxWidth: '100%'
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#FDFEFE',
    },
    secondary: {
      main: '#2196f3',
    }
  },
});

class App extends Component {
  render() {
    const { classes } = this.props
    return(
      <div>
        <Helmet>
          <title>Publish Token | HOME</title>
        </Helmet>

        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <div className={classes.paper}>
              <Grid container justifyContent="center">
                <Grid item xs={6}>
                  <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 100, marginTop: 180}}>
                    <b>PUBLISH TOKEN</b>
                  </Typography>
                  <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 30}}>
                    <b>A ERC721 Token Trying to Solve Existing Publishing Dilemma</b>
                  </Typography>
                  <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 25}}>
                    Publish All You Love & Support All You Love
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid item xs={3} >
                      <Button size="large" variant="contained" color="secondary" className={classes.btnMain} href='/#/publish'>
                        <b>去发布</b>
                      </Button>
                    </Grid>
                    <Grid item xs={2} >
                      <Button size="large" variant="outlined" color="secondary" className={classes.btnSecond} href='/#/buy'>
                        <b>去购买</b>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5} >
                  <img src={books} style={{ width: '100%', height: 'auto'}}/>;
                </Grid>
              </Grid>
            </div>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
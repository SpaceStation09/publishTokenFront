import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#FDFEFE',
    },
  },
});

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  btn: {
    color: '#424949',
    borderWidth: 2,
    borderColor: '#e3f2fd',
    fontSize: 16,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

class NFTInfo extends Component{
  render() {
    const { classes } = this.props

    return (
      <div>
        <Helmet>
          <title>SparkNFT | Sell</title>
        </Helmet>

        <ThemeProvider theme={theme}>
          <Toolbar style={{ marginTop: 15, marginBottom: 10 }}>
            <Typography component="h1" variant="h3" color="inherit" noWrap style={{ fontFamily: 'Teko', marginLeft: "100px" }}>
              <b>PUBLISH TOKEN</b>
            </Typography>
            <Button size="large" style={{ marginLeft: "55%" }} className={classes.btn} href='/'>
              <b>HOME PAGE</b>
            </Button>
            <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/publish'>
              <b>PUBLISH</b>
            </Button>
            <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/sell'>
              <b>SELL</b>
            </Button>
            <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/buy'>
              <b>BUY</b>
            </Button>
            <Button size="large" href='https://github.com/SpaceStation09/publishTokenFront/tree/master/publish-token' target="_blank">
              <GitHubIcon />
            </Button>
          </Toolbar>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NFTInfo);
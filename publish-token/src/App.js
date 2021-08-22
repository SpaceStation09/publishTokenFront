import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: 150,
    height: 40,
  },
  btn: {
    color: theme.palette.getContrastText(blue[500]),
		borderWidth: 2,
		borderColor: blue[500],
		fontSize: 14,
    width: 200,
    height: 50
  }
}));

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Helmet>
        <title>Publish Token | HOME</title>
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
          <b>PUBLISH TOKEN</b>
        </Typography>
        {/* <p style={{fontSize: "50px", fontFamily: "Georgia"}}><b> Publish Token </b></p> */}
      </header>
      <div className="body">
        <Typography variant="h3" align="center" color="textSecondary" style={{fontFamily: "Georgia", width:'40%'}}>
          <b>A ERC721 Token Trying to Solve Existing Publishing Dilemma</b>
        </Typography>

        <Typography variant="h4" align="center" color="textSecondary" style={{marginTop : "20px", fontFamily: "Georgia", marginBottom: "50px", width: '50%'}}>
          <b>Publish All You Love & Support All You Love</b>
        </Typography>

       
        <Grid container xs={6}>
          <Grid item xs>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/publish'>
                Go to Publish
              </Button>
            </ThemeProvider>
          </Grid>

          <Grid item xs>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/buy'>
                Buy Token
							</Button>
            </ThemeProvider>
          </Grid>

          <Grid item xs>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/sell'>
                Sell Token
							</Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;

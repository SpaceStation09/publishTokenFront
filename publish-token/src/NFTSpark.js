import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub'
import TopBar from "./TopBar";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Paper } from '@material-ui/core';
var $;
$ = require('jquery');

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

class NFTSpark extends Component{

  gateway = 'https://gateway.pinata.cloud/ipfs/';

  state = {
      Name: '',
      Description: '',
      BonusFee: 0,
      Cover: ''
  };

  constructor(props)  {
    super(props);
    
    let url = this.gateway + this.props.match.params.hash;
    $.getJSON(url).then(data => {
      this.setState({Name: data.Name});
      this.setState({Description: data.Description});
      this.setState({BonusFee: data.BonusFee});
      this.setState({Cover: data.Cover});
    });
  }

  render() {
    const { classes } = this.props
    const gateway = this.gateway
    return (
       <div>
        <Helmet>
          <title>Publish Token | NFT</title>
        </Helmet>
        <ThemeProvider theme={theme}>
          <TopBar />
        </ThemeProvider>
      <main>
        <Grid container direction="row" justifyContent="center" alignItems="center"  xs={12}>
        <Grid xs={2}></Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center"  xs={8}>
        
        <Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
          <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 65}}>
              NFT gallery
          </Typography>
        </Grid>
        <Grid  container direction="row" justifyContent="center" alignItems="center">
          <Grid xs={3} >
              <Card className={classes.card} >
                  <CardMedia
                      className={classes.cardMedia}
                      image={gateway + this.state.Cover}
                      title="Image title" 
                  />        
              </Card>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid xs={4} container direction="column" justifyContent="flex-start" alignItems="center">
            <Grid>
            <Typography variant="h3" component="h2" gutterBottom>
            {this.state.Name}
            </Typography>
            </Grid>
            
            <Grid>
              <Typography variant="body1" gutterBottom>
                {this.state.Description}
              </Typography>
            </Grid>
            <br /><br /><br />
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
            <Grid>
                
                  <Typography style={{ fontFamily: 'Teko', fontSize: 25}}  >
                  子叶数量: {this.state.BonusFee}
                  </Typography>
                
              </Grid>
              <Grid xs ={2}></Grid>
              <Grid>
                
                  <Typography style={{ fontFamily: 'Teko', fontSize: 25}}  >
                    BonusFee: {this.state.BonusFee}
                  </Typography>
                
              </Grid>
            </Grid>
          </Grid>
          </Grid>
          <br /><br /><br />
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid>
              <Typography variant="h5" component="h1" gutterBottom>
                  NFT Address: {'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
              </Typography>
            </Grid>
            <Grid xs={2}>
              
            </Grid>
            <Grid>
              <Button size="large" variant="contained"  color="primary" target="_blank" startIcon={<GetAppIcon />} >
                <Typography variant="button" component="h2" gutterBottom >
                  MINT 
                </Typography>
              </Button>
            </Grid>
        </Grid>
        <br /><br />
        
        </Grid>
        <Grid xs={2}></Grid>
        </Grid>
      </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NFTSpark);
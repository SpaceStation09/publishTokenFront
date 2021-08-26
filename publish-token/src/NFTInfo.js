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
    if(this.props.location.state === undefined) {
      window.location.href="#/";
      
      return;
    }
    return (
       <div>
        <Helmet>
          <title>Publish Token | NFT</title>
        </Helmet>
        <ThemeProvider theme={theme}>
          <TopBar />
        </ThemeProvider>
      <main>
      <Grid container direction="column">
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 65}}>
              NFT gallery
          </Typography>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid xs={3} >
              <Card className={classes.card} >
                  <CardMedia
                      className={classes.cardMedia}
                      image="https://pic3.zhimg.com/v2-9ff4eafdba05f4e68e2fd1a1c0da5a5a_r.jpg"
                      title="Image title" 
                  />        
              </Card>
              </Grid>
          <Grid xs={7} container direction="column" justifyContent="flex-start" alignItems="center">
            <Grid>
            <Typography variant="h1" component="h2" gutterBottom>
            
            </Typography>
            </Grid>
            <Grid>{this.props.location.state.des}</Grid>
            <Grid xs={7}>
              <Typography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                wanxutao@moxutaodeMacBook-Pro src % npm audit fix
                npm WARN @babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining@7.14.5 requires a peer of @babel/core@^7.13.0 but none is installed. You must install peer dependencies yourself.
                npm WARN native-fetch@3.0.0 requires a peer of node-fetch@* but none is installed. You must install peer dependencies yourself.
                npm WARN tsutils@3.21.0 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.

              </Typography>
            </Grid>
          </Grid>
          </Grid>
          <br /><br /><br />
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid>
              <Typography variant="h4" component="h2" gutterBottom>
                  NFT Address: {'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
              </Typography>
            </Grid>
            <Grid xs={2}>
              
            </Grid>
            <Grid>
              <Button size="large" variant="contained"  color="primary" target="_blank" startIcon={<GetAppIcon />}>
                <Typography variant="button" component="h2" gutterBottom >
                  Downlodad 
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NFTInfo);
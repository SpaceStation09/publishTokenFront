import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
  icon1: {
    [theme.breakpoints.down('xl')]: {
      fontSize: 19,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 27,
    },
  },
  icon2: {
    [theme.breakpoints.down('xl')]: {
      fontSize: 22,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 32,
    },
  },
  titleGrid: {
    marginTop: 25, 
    marginBottom: 10,
    marginLeft: '5%',
    textAlign: 'center' 
  },
  title: {
    minWidth: 100,
    fontSize: 25,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 35,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 35,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 35,
    },

  },
  btnGrid: {
    marginTop: 25,
    marginBottom: 10,
    minWidth: 370,
    // [theme.breakpoints.between('sm', 'md')]: {
    //   marginLeft: '10%',
    // },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '20%',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '45%',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
      marginLeft: '50%',
    },
  },
  btn: {
    color: '#424949',
    borderColor: '#e3f2fd',
    fontSize: 15,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 15,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 15,
      width: 100
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 15,
      width: 100
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 25,
    },
    // [theme.breakpoints.between('lg', 'xl')]: {
    //   fontSize: 15,
    //   width: '10%'
    // },
    // [theme.breakpoints.up('xl')]: {
    //   fontSize: 20,
    //   width: '10%'
    // },
  },
  btnConnected: {
    color: '#03A9F4',
    borderColor: '#e3f2fd',
    fontSize: 16,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2196f3',
    width: 10,
    height: 10
  },

});

class TopBar extends Component {

  state = {
    isConnected: false,
    user_address: ''
  };

  async componentDidMount() {
    var connect = await window.ethereum.isConnected()
    this.setState({
      isConnected: connect
    });
  }

  getAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0];
      this.setState({ isConnected: true, });
      this.setState({ user_address: account, });
    } catch (error) {
      console.debug(error)
      this.setState({ isConnected: false, });
    }
  }

  render() {
    const { classes } = this.props
    const account_info = () => {
      if (!this.state.isConnected) {
        return (
          <Button style={{ marginLeft: "1%" }} className={classes.btn} onClick={this.getAccount}>
            <AccountBalanceWalletIcon style={{ fontSize: 25 }} />
          </Button>
        );
      } else {
        return (
          <Button color='primary' className={classes.btnConnected} style={{ marginLeft: "1%" }} >
            <AccountBalanceWalletIcon style={{ fontSize: 24 }} />
          </Button>
        );
      }

    }

    return (
      <div>
        <Toolbar>
          <Grid container direction="row" justifyContent="flex-start">
            <Grid item className={classes.titleGrid}>
              <Typography component="h1" color="inherit" noWrap className={classes.title}>
                <b>SparkNFT</b>
              </Typography>
            </Grid>
            <Grid item className={classes.btnGrid}>
              <Button size="large" className={classes.btn} href='/' >
                <b>首页</b>
              </Button>
              <Button size="large" className={classes.btn} href='/#/introPublish'>
                <b>发布</b>
              </Button>


              <Button size="large" className={classes.btn} href='/#/collections'>
                <b>我的NFTs</b>
              </Button>

              <Button size="large" href='https://github.com/SparkNFT' target="_blank">
                <GitHubIcon className={classes.icon1}/>
              </Button>
              {this.state.isConnected ? (
                <Button color='primary' className={classes.btnConnected} >
                  <AccountBalanceWalletIcon className={classes.icon2}/>
                </Button>
              ) : (
                <Button className={classes.btn} onClick={this.getAccount}>
                    <AccountBalanceWalletIcon className={classes.icon2}/>
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TopBar);
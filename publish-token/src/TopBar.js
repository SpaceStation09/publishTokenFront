import React, { Component} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';


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
		borderColor: '#e3f2fd',
		fontSize: 16,
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
  };

  async componentWillMount() {
    var connect = await window.ethereum.isConnected()
    this.setState({
      isConnected: connect
    });
  }

  getAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.setState({
      name: '22',
    });
    this.setState({ isConnected: true, });
    this.setState({ user_address: account, });
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
            <AccountBalanceWalletIcon style={{ fontSize: 25 }} />
          </Button>
        );
      }

    }

    return (
      <div className="App">
        <Toolbar>
          <Grid container direction="row" justifyContent="flex-start">
            <Grid item xs={2} style={{ marginTop: 25, marginBottom: 10 }}>
              <Typography component="h1" variant="h2" color="inherit" noWrap style={{ fontFamily: 'Teko' }}>
                <b>SparkNFT</b>
              </Typography>
            </Grid>
            <Grid item xs={5} style={{ marginTop: 25, marginBottom: 10 }}>

            </Grid>
            <Grid item xs={5} style={{ marginTop: 15, marginBottom: 10 }}>
              <Button size="large" className={classes.btn} href='/'>
                <b>首页</b>
              </Button>
              <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/publish'>
                <b>发布</b>
              </Button>
              <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/sell'>
                <b>售卖</b>
              </Button>
              <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/buy'>
                <b>购买</b>
              </Button>


              <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/collections'>
                <b>我的NFTs</b>
              </Button>

              <Button size="large" href='https://github.com/SpaceStation09/publishTokenFront/tree/master/publish-token' target="_blank">
                <GitHubIcon />
              </Button>
              {account_info()}
            </Grid>
          </Grid>
        </Toolbar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TopBar);
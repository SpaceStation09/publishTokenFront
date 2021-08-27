import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import TopBar from './TopBar';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const metadata_json = 'QmPsymsaqMZsiwLHXepXtEpYMq3xtnBLLbPgTEyybz1idQ'

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
  container: {
    maxWidth: 1500,
    // backgroundColor: '#2196f3'
  },
  paper: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    maxWidth: 1500,
  },
  btnSell: {
    margin: theme.spacing(1),
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196f3',
    color: '#2196f3',
    marginLeft: '10%',
    width: 100
  },
  inputNum: {
    height: 40,
    borderRadius: 5,
    width: 550,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderRadius: 5,
  },
});

class BuySingle extends Component {
  state = {
    name: '',
    bonusFee: 0,
    cover: '',
    coverURL: '',
    description: '',
    price: 0,
    ipfsHashPub: '',
    ipfsHashCover: '',
    ipfsHashMeta: '',
    shareTimes: 0,
    open: false,
    address: '',
    NFTId: '',
    onSale: false,
  };

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    this.setState({
      NFTId: this.props.match.params.NFTId
    })
    var url = "https://ipfs.io/ipfs/" + metadata_json
    let name
    let descrip
    let cover
    let bonusFee
    await axios.get(url)
      .then(function (response) {
        var content = response.data
        name = content.Name
        descrip = content.Description
        cover = content.Cover
        bonusFee = content.BonusFee
      })
    this.setState({
      name: name,
      description: descrip,
      ipfsHashCover: cover,
      bonusFee: bonusFee
    })
    var cover_url = "https://ipfs.io/ipfs/" + this.state.ipfsHashCover
    this.setState({
      coverURL: cover_url
    })
    console.log(this.state.coverURL)
  }

  handleBuy = (e) => {
    //TODO: call smart contract
  }

  handleGetPrice = (value) => {
    this.setState({
      price: value,
    })
  }

  handleGetAddr = (e) => {
    this.setState({
      address: e.target.value,
    })
  }


  render() {
    const { classes } = this.props

    return (
      <div>
        <Helmet>
          <title>SparkNFT | Sell</title>
        </Helmet>

        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <Button
              startIcon={<ArrowBackIosOutlinedIcon style={{ fontSize: 22 }} />}
              href='/'
              style={{ marginTop: 50, marginBottom: 100, fontSize: 22 }}
            >
              回到首页
            </Button>
            <div className={classes.paper}>
              <Grid container justifyContent="space-evenly" spacing={5}>
                <Grid item xs={4} style={{ maxWidth: 600 }}>
                  <Paper style={{ backgroundColor: '#FAFAFA', width: 350, marginLeft: '40%' }}>
                    <img style={{ width: 300, marginTop: 20 }} src={this.state.coverURL}></img>
                  </Paper>
                </Grid>
                <Grid item xs style={{ marginLeft: '5%' }}>
                  <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                    #{this.state.NFTId}
                  </Typography>
                  <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34}}>
                    <b>{this.state.name}</b>
                  </Typography>
                  <Typography align="left" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize: 16 }}>
                    {this.state.description}
                  </Typography>
                  <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '6%', maxWidth: '65%', fontSize: 24 }}>
                    创作者分红比例: {this.state.bonusFee} %
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<MonetizationOnOutlinedIcon style={{ fontSize: 22 }} />}
                    className={classes.btnSell}
                    onClick={this.handleBuy}
                  >
                    购买
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BuySingle);

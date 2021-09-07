import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import TopBar from './TopBar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import contract from './contract';
import web3 from './web3';
import ReactLoading from 'react-loading';


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
  btnDisable: {
    margin: theme.spacing(1),
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#909497',
    color: '#909497',
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
    coverURL: '',
    description: '',
    price: 0,
    ipfsHashMeta: '',
    open: false,
    address: '',
    NFTId: '',
    onSale: false,
    owner: '',
    approvedAddr: '',
    currentAcc: '',
    onLoading: false,
    childrenNum: 0
  };

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.setState({
      currentAcc: account
    })
    this.setState({
      NFTId: this.props.match.params.NFTId
    })
    await contract.methods.tokenURI(this.props.match.params.NFTId).call().then(metadata => {
      let hash = metadata.split('/')
      this.setState({ ipfsHashMeta: hash[hash.length - 1] })
      var url = "https://gateway.pinata.cloud/ipfs/" + this.state.ipfsHashMeta
      var obj = this
      axios.get(url)
        .then(function (response) {
          var content = response.data
          obj.setState({
            name: content.name,
            description: content.description,
            bonusFee: content.attributes[0].value,
            coverURL: content.image
          })
        })
    })

    await contract.methods.getTransferPriceByNFTId(this.props.match.params.NFTId).call().then(price => {
      this.setState({
        price: price/1000000000000000000
      })
    })
    await contract.methods.ownerOf(this.props.match.params.NFTId).call().then(owner => {
      this.setState({
        owner: owner
      })
    })

    await contract.methods.getApproved(this.props.match.params.NFTId).call().then(approved => {
      this.setState({
        approvedAddr: approved.toLowerCase()
      })
    })

    const url = 'http://192.168.0.64:3000/api/v1/tree/children?nft_id='+this.state.NFTId
    const res = await axios.get(url)
    if(res.status==200){
      var children = res.data.children
      var children_num = children.length()
      this.setState({
        childrenNum: children_num
      })
      console.log(children_num)
    }else{
      alert('获取nft子节点情况页面失败')
    }
  }

  handleBuy = async (e) => {
    //TODO: call smart contract to pay fee and get NFT

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    var price_eth = web3.utils.toWei(this.state.price.toString())
    var obj = this
    this.setState({
      onLoading: true
    })
    contract.methods.safeTransferFrom(this.state.owner, account, this.state.NFTId).send({
      from: account,
      value: price_eth
    }).then(function (receipt) {
      obj.setState({
        onLoading: false
      })
      alert("交易已经上链");
    });
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
    const buyButton = () => {
      if (this.state.approvedAddr == this.state.currentAcc) {
        return (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<MonetizationOnOutlinedIcon style={{ fontSize: 22 }} />}
            className={classes.btnSell}
            onClick={this.handleBuy}
          >
            购买
          </Button>
        );
      }else {
        return (
          <Button
            variant="outlined"
            startIcon={<MonetizationOnOutlinedIcon style={{ fontSize: 22 }} />}
            className={classes.btnDisable}
            disabled
          >
            购买
          </Button>
        );
      }
    }

    const showLoading = () => {
      if (this.state.onLoading) {
        return (
          <div>
            <ReactLoading type={'bars'} color={'#2196f3'} height={200} width={200} />
          </div>
        );
      }
    }

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
                  <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize: 24 }}>
                    创作者分红比例: {this.state.bonusFee} %
                  </Typography>
                  <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize:18 }}>
                    售价: {this.state.price} ETH
                  </Typography>
                  <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize: 12 }}>
                    当前拥有者: {this.state.owner}
                  </Typography>
                  {buyButton()}
                </Grid>
              </Grid>
              <div style={{ marginLeft: '40%' }}>
                {showLoading()}
              </div>
            </div>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BuySingle);

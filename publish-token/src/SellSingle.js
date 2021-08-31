import React, { Component } from 'react';
import './App.css';
import {Button, Grid } from '@material-ui/core';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import TopBar from './TopBar';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from "@material-ui/core";
import { Typography, Paper, Container }from '@material-ui/core';
import axios from 'axios';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { Input, InputNumber } from 'antd';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import contract from './contract';


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

class SellSingle extends Component {
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
    toAddress: '',
    NFTId: '',
    onSale: false,
    copied: false
  };

  // https://gateway.pinata.cloud/ipfs/QmPsymsaqMZsiwLHXepXtEpYMq3xtnBLLbPgTEyybz1idQ
  constructor(props){
    super(props);
    window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
      if (chainId !== '0x4') {
        alert("请切换至rinkeby network");
        window.location.href = '/#';
        return;
      }
    })
  }

  async componentWillMount() {
    this.setState({
      NFTId: this.props.match.params.NFTId
    })
    await contract.methods.tokenURI(this.props.match.params.NFTId).call().then(metadata => {
      let hash = metadata.split('/')
      this.setState({ ipfsHashMeta: hash[hash.length - 1] })
      // console.log(this.state.ipfsHashMeta)
      var url = "https://gateway.pinata.cloud/ipfs/" + this.state.ipfsHashMeta
      var obj = this
      axios.get(url)
        .then(function (response) {
          var content = response.data
          obj.setState({
            name: content.Name,
            description: content.Description,
            bonusFee: content.BonusFee,
            ipfsHashCover: content.Cover
          })
          var cover_url = "https://gateway.pinata.cloud/ipfs/" + obj.state.ipfsHashCover
          obj.setState({
            coverURL: cover_url
          })
        })
      

    })
  }

  handleClickOpen = (e) => {
    this.setState({
      open: true,
    })
  }

  handleClose = (e) => {
    this.setState({
      open: false,
    })
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

  sell = (e) => {
    // TODO: call smart contract to approve nft 
    this.setState({
      open: false,
      onSale: true,
    })
  }

  render() {
    const { classes } = this.props
    const sell_info = () => {
      if (this.state.onSale) {
        return (
          <Grid container >
            <Grid item xs>
            <Typography color="inherit" align="center" noWrap style={{ fontFamily: 'Teko', fontSize: 20, marginTop: '5%', marginLeft: 300}}>
              请将下方链接分享给买方，买方会进入此链接来购买这个NFT <br />
              {'http://localhost:3000/#/buySingle/' + this.state.NFTId}
            </Typography>
            </Grid>
            <Grid item xs style={{ marginTop: 70 }}>
              <CopyToClipboard text={'http://localhost:3000/#/buySingle/' + this.state.NFTId}
                onCopy={() => this.setState({ copied: true })}>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <FileCopyOutlinedIcon style={{ fontSize: 18 }} />
                </IconButton>
              </CopyToClipboard>
            </Grid>
          </Grid>
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
              href='/#/publish'
              style={{ marginTop: 50, marginBottom: 100, fontSize: 22 }}
            >
              回到我的NFTs
            </Button>
            <div className={classes.paper}>
              <Grid container justifyContent="space-evenly" spacing= {5}>
                <Grid item xs={4} style={{ maxWidth: 600}}>
                  <Paper style={{ backgroundColor: '#FAFAFA', width: 350, marginLeft: '40%'}}>
                    <img style={{ width: 300, marginTop: 20}} src={this.state.coverURL}></img>  
                  </Paper>
                </Grid>
                <Grid item xs style={{ marginLeft: '5%'}}>
                  <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                    #{this.state.NFTId}
                  </Typography>
                  <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34, marginTop: '2%'}}>
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
                    startIcon={<MonetizationOnOutlinedIcon style={{fontSize: 22}}/>}
                    className={classes.btnSell}
                    onClick = {this.handleClickOpen}
                  >
                    售卖
                  </Button>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">填写售卖信息</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        请在下方区域填写你希望售卖的价格，以及售卖对象的钱包地址。
                      </DialogContentText>
                        <label style={{ fontSize: 14, marginBottom: 10 }}>售卖价格 *</label>
                        <InputNumber
                          defaultValue={0}
                          min={0}
                          onChange={this.handleGetPrice}
                          className={classes.inputNum}
                        />
                      <label style={{ fontSize: 14, marginBottom: 10, marginTop: 10 }}>买方钱包地址 *</label>
                      <Input
                        placeholder="买方钱包地址"
                        allowClear
                        id="pubName"
                        onChange={this.handleGetAddr}
                        className={classes.input}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        取消
                      </Button>
                      <Button variant="contained" onClick={this.sell} color="primary" >
                        卖出
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </div>
            <div style={{marginTop: 50}}>
              {sell_info()}
            </div>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SellSingle);

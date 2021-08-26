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
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Web3 from 'web3';
import NFT from "./ShillNFT";
import BigNumber from 'bignumber.js';
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

class NFTInfo extends Component{

  gateway = 'https://gateway.pinata.cloud/ipfs/';

  state = {
      Name: '',
      Description: '',
      BonusFee: 0,
      Cover: ''
  };

  showS = async () =>{
    let web3 = new Web3('https://mainnet.infura.io/v3/198d54c6a8b1451c98f2a2702e784a61');
    const account = '0x95f2e4096482ebaded815b3aacfa1524ef3e0568';
    let abi = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"address","name":"_payableErc20","type":"address"},{"internalType":"uint256","name":"_mintPrice","type":"uint256"},{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"bytes32","name":"_provenance","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseMetadataURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintStartAtBlockNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payableErc20","outputs":[{"internalType":"contract ERC20Mintable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"provenance","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealStartAtBlockNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseMetadataURI","type":"string"}],"name":"setBaseMetadataURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newContractURI","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintStartAtBlockNum","type":"uint256"}],"name":"setMintStartAtBlockNum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_revealStartAtBlockNum","type":"uint256"}],"name":"setRevealStartAtBlockNum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
    let nft = new web3.eth.Contract(abi, '0x7645eeC8bB51862A5aa855c40971b2877dAe81AF');
    let sendOption = {
      filter: {from: account},
      fromBlock: 0,
    }
    let receiveOption = {
      filter: {to: account},
      fromBlock: 0,
    }
    nft.methods.symbol().call().then(console.log);
    let sendLog = await nft.getPastEvents("Transfer", sendOption);
    let receiveLog = await nft.getPastEvents("Transfer", receiveOption );
    console.log(sendLog);
    console.log(receiveLog);
    let showId = [];
    let balanceMap = new Map();
    sendLog.map( (log) => {
      let id = log.returnValues.tokenId;
      console.log(log.returnValues.tokenId);
      showId.push(id);
      balanceMap.set(id, balanceMap.get(id) + 1);
    });
    receiveLog.map( (log) => {
      let id = log.returnValues.tokenId;
      console.log(log.returnValues.tokenId);
      showId.push(id);
      balanceMap.set(id, balanceMap.get(id) - 1);
    });
    console.log(showId);
    let viewMap = new Map();
    let balance = [];
    showId.map( (id) => {
      if(viewMap.get(id) == false) {
        if(balanceMap.get(id) > 0) {
          balance.push(id);
        }
        viewMap.set(id, false);
      }
      
    });
    alert(balance);
  }

  constructor(props)  {
    super(props);
    if(!window.ethereum) {
      alert("请先安装metamask");
      window.location.href = '/#';
      return;
    }
    let url = this.gateway + this.props.match.params.hash;
    $.getJSON(url).then(data => {
      this.setState({Name: data.Name});
      this.setState({Description: data.Description});
      this.setState({BonusFee: data.BonusFee});
      this.setState({Cover: data.Cover});
    });
    if(!window.ethereum.isConnected()) {
      alert("请先链接metamask");
      window.location.href = '/#';
      return;
    }
    // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
      if(chainId !== '0x4') {
        alert("请切换至rinkeby network");
        window.location.href = '/#';
        return;
      }
    })
    // console.log(chainId);
    
    this.web3 = new Web3(window.ethereum);
    this.web3.eth.getBlockNumber().then(console.log);
  }
  spark = () => {
    let url = window.location.host;
    let share = '复制分享链接：' + url + '/#/NFT/Spark/' + this.props.match.params.hash;
    alert(share);
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
                    分红比: {this.state.BonusFee} %
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
              <Button size="large" variant="contained"  color="primary" target="_blank" className={classes.btnMain} startIcon={<GetAppIcon />} onClick={this.showS} >
                <Typography variant="button" component="h2" gutterBottom >
                  下载 
                </Typography>
              </Button>
            </Grid>
             
            <Grid>
              <Button size="large" variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<WhatshotIcon />} onClick={this.spark} >
                <Typography variant="button" component="h2" gutterBottom >
                  点火
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

export default withStyles(styles, { withTheme: true })(NFTInfo);
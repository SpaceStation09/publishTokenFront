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
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GetAppIcon from '@material-ui/icons/GetApp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Web3 from 'web3';
import NFT from "./ShillNFT";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import BigNumber from 'bignumber.js';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {IconButton, Container} from "@material-ui/core";
import contract from './contract';
// import { Typography, Paper, Container }from '@material-ui/core';
import axios from 'axios';
import web3 from './web3';
const FileSaver = require('file-saver');
var CryptoJS = require("crypto-js");
const sigUtil = require('ethereumjs-util');
const ethUtil = require('ethereumjs-util');

const jsons = {"name":"热风",
  "description":"《热风》收作者1918年至1924年所作杂文四十一篇。1925年11月由北京北新书局初版。作者生前共印行十版次。鲁迅在《新青年》的《随感录》中做些短评，还在这前一年，因为所评论的多是小问题，所以无可道，原因也大都忘却了。但就现在的文字看起来，除几条泛沦之外，有的是对于扶乩，静坐，打拳而发的；有的是对于所谓“保存国粹”而发的；有的是对于那时旧官僚的以经验自豪而发的；有的是对于上海《时报》的讽刺画而发的。记得当时的《新青年》是正在四面受敌之中，鲁迅所对付的不过一小部分。",
  "image":"https://gateway.pinata.cloud/ipfs/QmSnPggQ9K4QV7dJkjLP2GMZVCEsL81kSsouRoAAzEb8K2",
  "attributes":[
    {
      "trait_type":"bonusFee",
      "value":7
    }
  ]
}

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
  backend = '';
  state = {
      Name: '',
      Description: '',
      BonusFee: 0,
      Cover: '',
      contract: null,
      Leaf: 0,
      spark: false,
      dataUrl: null,
      account: null
  };

  downloadIPFS = async () =>{
    // axios.get('https://gateway.pinata.cloud/ipfs/QmVUnbW5CQbR9E4kaCvGNkfn9MKWaxjrB6SFdcEZ2xmviX').then(response => {
    //   console.log(response)

    //     let blob = new Blob([response.data], { type: 'application/pdf' }),
    //     url = window.URL.createObjectURL(blob)

    //      window.open(url) // Mostly the same, I was just experimenting with different approaches, tried link.click, iframe and other solutions
    // })
    const method = 'GET';
    let obj = this;
    const url = 'https://gateway.pinata.cloud/ipfs/QmaefpFuLZNwuRU8Q7pF6A2juQbi3XcPcV5TLGwBmVEUx9';
    axios.request({
        url,
        method,
        //responseType: 'blob', //important
      })
      .then(async (response) => {
        
        let ciphertext = response.data;
        //console.log(ciphertext);
        // var data  = this.decryptCipherTextToBlob(ciphertext, "secret key 123");
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        let account = accounts[0];
        console.log(account);
        let signJson = {
          account: account,
          root_nft_id: this.props.match.params.id
        }
        signJson = JSON.stringify(signJson);
        await this.signData(account,ciphertext);
      });
  }

  

  constructor(props)  {
    super(props);
    if(!window.ethereum) {
      alert("请先安装metamask");
      window.location.href = '/#';
      return;
    }
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
    let web3 = new Web3(window.ethereum);
    let nft = contract;
    this.setState({contract: contract});
    let obj = this;
    nft.methods.ownerOf(this.props.match.params.id).call().then(owner => {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then( accounts => {
        const account = accounts[0];
        obj.setState({account: account});
        if(web3.utils.toChecksumAddress(account) !== owner) {

          alert("这枚nft不属于你");
          window.location.href = '/#';
        }
      })
        
    })
    nft.methods.tokenURI(this.props.match.params.id).call().then(meta => {
      let hash = meta.split('/');
      this.setState({hash: hash[hash.length-1]});
      axios.get(meta).then(res => {
        let data = res.data;
        console.log(data);
        let bouns = 0;
        for(let i = 0; i < data.attributes.length; i++) {
          if(data.attributes[i].trait_type === 'bonusFee') {
            bouns = data.attributes[i].value;
          }
        }
        
        this.setState({Name: data.name});
        this.setState({Description: data.description});
        this.setState({BonusFee: bouns});
        this.setState({Cover: data.image});
        this.setState({dataUrl: data.data});
      });
    });
    let leafUrl = this.backend + "/api/v1/tree/children?" + this.props.match.params.id;
    axios.get(leafUrl).then(data => {
      this.setState({Leaf: data.children.length});
      
    });
    
  }
  signData = async (signer, ciphertext) => {
    //event.preventDefault();

    
      var JSONBody = {
        "account": signer,
        "root_nft_id": this.props.match.params.id
      }
      var json_str = JSON.stringify(JSONBody)
      let sig
      await web3.eth.personal.sign(json_str, signer).then((response) => {
        sig = response
      })
      console.log(sig)
      var payload = {
        "account": signer,
        "root_nft_id": this.props.match.params.id,
        "signature": sig
      }
      console.log(sig)
      var payload_str = JSON.stringify(payload)
      var req_key_url = this.backend + "/api/v1/key/claim"
      const res = await axios.post(req_key_url, payload_str, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res);
      if(res.status == 200) {
        let key = res.key;
        let data = CryptoJS.AES.decrypt(ciphertext, key);
        let plainText = data.toString(CryptoJS.enc.Utf8);
        const wordArray = CryptoJS.enc.Hex.parse(plainText);
        let BaText = this.wordArrayToByteArray(wordArray, wordArray.length);
        var arrayBufferView = new Uint8Array(BaText);
        var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        FileSaver.saveAs(blob,this.state.Name);
      } else {
        var error_msg = res.data.message
        alert("获取密钥失败" + error_msg)
      }
    }

  

  spark = () => {
    
    if(this.state.spark) {
      document.getElementById('isSpark').innerHTML = '点火—分享';
    } else {
      document.getElementById('isSpark').innerHTML = '隐藏';
    }
    this.setState({spark: !this.state.spark});
  }
  sell_info = () => {
    let url = window.location.host;
    let toUrl = url + '/#/NFT/Spark/' + this.props.match.params.id;
    let share = '分享复制链接：' + toUrl;
    // this.state.onSale
    if (this.state.spark) {
      return (
        <Grid container >
          <Grid item xs>
          <Typography color="inherit" align="center" noWrap style={{ fontFamily: 'Teko', fontSize: 20, marginTop: '5%', marginLeft: 200}}>
            请将下方链接分享给买方，买方会进入此链接来铸造这个NFT的子节点 <br />
            {toUrl}
          </Typography>
          </Grid>
          <Grid item xs style={{ marginTop: 30 }}>
            <CopyToClipboard text={toUrl}
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

  render() {
    const { classes } = this.props
    const gateway = this.gateway
    return (

      <div>
        <Helmet>
          <title>SparkNFT | Sell</title>
        </Helmet>

        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
              <Grid>
            <Button
              startIcon={<ArrowBackIosOutlinedIcon style={{ fontSize: 22 }} />}
              href='/#/collections'
              style={{ marginTop: 20, marginBottom: 100, fontSize: 22 }}
            >
              回到我的NFTs
            </Button>
            </Grid>
            <Grid xs={8}></Grid>
            <Grid>
              <Button size="large" variant="outlined" color="secondary"  className={classes.btnSecond} startIcon={<AttachMoneyIcon />}  href={'/#/sellSingle/' +  this.props.match.params.id}  >
                 <Typography variant="button" component="h2" gutterBottom >
                  售卖
                 </Typography>
               </Button>
             </Grid>
             </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
           <Grid xs={8}>
             <div style={{marginTop: 0}}>
                 {this.sell_info()}
             </div>
           </Grid>
         </Grid>
            <div className={classes.paper}>
              <Grid container justifyContent="space-evenly" spacing= {5}>
                <Grid item xs={4} style={{ maxWidth: 600}}>
                <Paper style={{ backgroundColor: '#FAFAFA', width: 350, marginLeft: '40%'}}>
                    <img style={{ width: 300, marginTop: 20}} src={this.state.Cover}></img>  
                  </Paper>
                </Grid>
                <Grid item xs style={{ marginLeft: '5%'}}>
                  <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                    #{this.props.match.params.id}
                  </Typography>
                  <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34, marginTop: '2%'}}>
                    <b>{this.state.Name}</b>
                  </Typography>
                  <Typography align="left" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize: 16 }}>
                    {this.state.Description}
                  </Typography>
                  <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '6%', maxWidth: '65%', fontSize: 24 }}>
                    创作者分红比例: {this.state.BonusFee} %
                  </Typography>
                  
                  
                 
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Grid>
                    <Button size="large" variant="contained"  color="primary" target="_blank" className={classes.btnMain} startIcon={<GetAppIcon />} onClick={this.downloadIPFS} >
                      <Typography variant="button" component="h2" gutterBottom >
                        <font color='white'>
                          下载
                        </font>
                      </Typography>
                    </Button>
                    </Grid>
                    <Grid xs ={1}></Grid>
                    <Grid>
                      <Button size="large"  variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<WhatshotIcon />} onClick={this.spark} >
                        <Typography id="isSpark" variant="button" component="h2" gutterBottom >
                          点火—分享
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
              </Grid>
            </div>
            
            <br /><br />
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NFTInfo);
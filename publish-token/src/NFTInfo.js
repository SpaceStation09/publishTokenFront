import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import TopBar from "./TopBar";
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GetAppIcon from '@material-ui/icons/GetApp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Web3 from 'web3';
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
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ReactLoading from 'react-loading';
const FileSaver = require('file-saver');
var CryptoJS = require("crypto-js");
const sigUtil = require('ethereumjs-util');
const ethUtil = require('ethereumjs-util');

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
  paper: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    maxWidth: 1370,
    // backgroundColor: "green"
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
    width: 120,
    maxWidth: '20rem',
    minWidth: '10rem',
  },
  btnSecond: {
    marginTop: theme.spacing(3),
    color: '#03A9F4',
    borderWidth: 3,
    borderColor: '#03A9F4',
    fontSize: 16,
    borderRadius: 25,
    width: 120,
    maxWidth: '20rem',
    minWidth: '10rem',
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
  content: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      justifyContent:"flex-start",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('sm', 'md')]: {
      justifyContent:"flex-start",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('md', 'lg')]: {
      justifyContent:"flex-start",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      justifyContent:"center",
      alignItems:"flex-start"
    },
    [theme.breakpoints.up('xl')]: {
      justifyContent:"center",
      alignItems:"flex-start"
    },
  },
  content2: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: 10, maxWidth: 500
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: 90, maxWidth: 500
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: 80, maxWidth: 500
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: 50, maxWidth: 500
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: 60, maxWidth: 500
    },
  },
  cbutton: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      justifyContent:"center",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('sm', 'md')]: {
      justifyContent:"center",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('md', 'lg')]: {
      justifyContent:"flex-end",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      justifyContent:"flex-end",
      alignItems:"flex-start"
    },
    [theme.breakpoints.up('xl')]: {
      justifyContent:"flex-end",
      alignItems:"flex-start"
    },
  },
  dbutton: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      justifyContent:"center",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('sm', 'md')]: {
      justifyContent:"center",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('md', 'lg')]: {
      justifyContent:"flex-end",
      alignItems:"flex-start"
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      justifyContent:"flex-end",
      alignItems:"flex-start"
    },
    [theme.breakpoints.up('xl')]: {
      justifyContent:"flex-end",
      alignItems:"flex-start"
    },
  },
  imageStyle: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 280,
      height: 365, 
      marginTop: 20, 
      marginBottom: 50
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 290, 
      height: 385, 
      marginTop: 20, 
      marginBottom: 50
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 300, 
      height: 420, 
      marginTop: 20, 
      marginBottom: 50
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      width: 300, 
      marginTop: 20, 
      marginBottom: 50 
    },
    [theme.breakpoints.up('xl')]: {
      width: 300, 
      marginTop: 20, 
      marginBottom: 50 
    },
  },
  imagePapaer: {

    [theme.breakpoints.between('xs', 'sm')]: {
      backgroundColor: '#EFEBE9', width: 330, height: 420, marginLeft: 25 
    },
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: '#EFEBE9', width: 340, height: 440, marginLeft: 25 
    },
    [theme.breakpoints.between('md', 'lg')]: {
      backgroundColor: '#EFEBE9', width: 350, height: 465, marginLeft: 25 
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      backgroundColor: '#EFEBE9', width: 350, marginLeft: 10 
    },
    [theme.breakpoints.up('xl')]: {
      backgroundColor: '#EFEBE9', width: 350, marginLeft: 10 
    },
  },
  share: {
    fontFamily: 'Teko',
    marginBottom: '10%',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 14,
      // width: '5%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 18,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },

  }
});

class NFTInfo extends Component{

  gateway = 'https://gateway.pinata.cloud/ipfs/';
  backend = 'http://192.168.0.64:3000';
  ipfs_node = "http://18.162.56.46:5001"
  state = {
      Name: '',
      Description: '',
      BonusFee: 0,
      Cover: '',
      contract: null,
      childrenNum: 0,
      spark: false,
      dataUrl: null,
      account: null,
      Profit: '',
      issueId: 0,
      fileType: "",
      isEncrypt: false,
      onLoading: false,
      loadItem: true,
  };

  downloadIPFS = async (event) =>{
    const Method = 'GET';
    let obj = this;
    let url = "";
    let dataHash = this.state.dataUrl
    this.setState({onLoading: true})
    console.log("onload" + this.state.onLoading)
    this.finishDownload();
  }

  finishDownload = () => {
    let obj = this;
    let dataHash = this.state.dataUrl
    if (this.state.isEncrypt) {
      var cipher_config = {
        method: 'get',
        url: dataHash,
        headers: {},
      };
      axios(cipher_config).then(async (response) => {
        let ciphertext = response.data
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let account = accounts[0]
        let signJson = {
          account: account,
          root_nft_id: this.props.match.params.id
        }
        signJson = JSON.stringify(signJson);
        await this.signDataAndDecrypt(account, ciphertext);
        obj.setState({ onLoading: false })
      });
    } else {
      axios({
        url: dataHash, //your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        // text/plain application/pdf
        let suffix = '.' + obj.state.fileType;
        link.setAttribute("download", this.state.Name +  suffix); //or any other extension
        document.body.appendChild(link);
        link.click();
        obj.setState({ onLoading: false })
        console.log('set close')
      }).catch(error => {
        obj.setState({ onLoading: false })
        alert("???????????????" + error);
      });
    }

    // this.setState({ onLoading: false })
  }

  constructor(props)  {
    super(props);
    let obj = this
    if(!window.ethereum) {
      alert("????????????metamask");
      window.location.href = '/#/collections';
      return;
    }
    // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
      if(chainId !== '0x4') {
        alert("????????????rinkeby network");
        window.location.href = '/#/collections';
        return;
      }
    })
    let web3 = new Web3(window.ethereum);
    let nft = contract;
    this.setState({contract: contract});
    nft.methods.ownerOf(this.props.match.params.id).call().then(owner => {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then( accounts => {
        const account = accounts[0];
        obj.setState({account: account});
        if(web3.utils.toChecksumAddress(account) !== owner) {
          alert("??????nft????????????");
          window.location.href = '/#';
        }
      })
        
    })
    nft.methods.getProfitByNFTId(this.props.match.params.id).call().then(res => {
      this.setState({Profit: web3.utils.fromWei(res) + 'ETH'});
    })
    nft.methods.tokenURI(this.props.match.params.id).call().then(meta => {
      let hash = meta.split('/');
      nft.methods.getIssueIdByNFTId(this.props.match.params.id).call().then(issue => {
        nft.methods.getRoyaltyFeeByIssueId(issue).call().then(royalty => {
          var file_hash = hash[hash.length - 1]
          // this.setState({ hash: hash[hash.length - 1] });
          console.debug('meta here: ', file_hash)
          var request_url = "https://gateway.pinata.cloud/ipfs/" + file_hash
          axios({
            method: 'get',
            url: request_url,
            timeout: 1000 * 5,
          }).then(res => {
            let data = res.data;
            let bouns = 0;
            let fileAddr = "";
            let isEncrypt = false;
            let fileType = bouns = data.attributes[2].value
            for (let i = 0; i < data.attributes.length; i++) {
              if (data.attributes[i].trait_type === "Bonuse Percentage") {
                bouns = data.attributes[i].value;
              }
              if (data.attributes[i].trait_type === "File Address") {
                fileAddr = data.attributes[i].value;
              }
              if (data.attributes[i].trait_type === "Encrypted") {
                if(data.attributes[i].value === "FALSE") {
                  isEncrypt = false
                } else {
                  isEncrypt = true
                }
              }
            }
            this.setState({ Name: data.name });
            this.setState({ Description: data.description });
            this.setState({ BonusFee: royalty });
            this.setState({ Cover: data.image });
            this.setState({ dataUrl: fileAddr });
            this.setState({ isEncrypt: isEncrypt });
            this.setState({ fileType: fileType ,loadItem: false,});
          }).catch(error => {
            this.setState({ Name: 'SparkNFT' });
            this.setState({ Description: '????????????????????????nft???????????????' });
            this.setState({ BonusFee: royalty });
            this.setState({ Cover: 'https://via.placeholder.com/100x140.png?text=SparkNFT' });
            this.setState({ dataUrl: 'fileAddr_PlaceHolder' ,loadItem: false,});
          })
        })
      })
      
      
      // axios.get(meta).then(res => {
      //   let data = res.data;
      //   let bouns = 0;
      //   let fileAddr = "";
      //   for(let i = 0; i < data.attributes.length; i++) {
      //     if (data.attributes[i].trait_type === "Bonuse Percentage") {
      //       bouns = data.attributes[i].value;
      //     }
      //     if(data.attributes[i].trait_type === "File Address") {
      //       fileAddr = data.attributes[i].value;
      //     }
      //   }
      //   this.setState({Name: data.name});
      //   this.setState({Description: data.description});
      //   this.setState({BonusFee: bouns});
      //   this.setState({Cover: data.image});
      //   this.setState({dataUrl: fileAddr});
      // });
    });

    const leafUrl = this.backend + '/api/v1/nft/info?nft_id=' + this.props.match.params.id
    axios.get(leafUrl).then(res => {
      var children_num = res.data.children_count
      this.setState({
        childrenNum: children_num
      })
    }).catch(error => {
      if (error.response === undefined) {
        alert('??????????????????????????????????????????')
        return;
      }
      if (error.response.status == 400 && error.response.data.message.includes("children not found")) {
        console.debug("no children")
      } else {
        console.debug(leafUrl)
        alert('??????nft???????????????????????????(' + error + ')')
      }
    })
  }

  claim = async () => {
    this.setState({
      onLoading: true
    })
    try{
      await contract.methods.claimProfit(this.props.match.params.id).send({
        from: this.state.account
      });
    } catch{
      this.setState({
        onLoading: false
      })
    }
    
    this.setState({
      onLoading: false
    })
  }

  signDataAndDecrypt = async (signer, ciphertext) => {
    //event.preventDefault();
      var JSONBody = {
        "account": signer,
        "nft_id": this.props.match.params.id
      }
      var json_str = JSON.stringify(JSONBody)
      let sig
      await web3.eth.personal.sign(json_str, signer).then((response) => {
        sig = response
      })
      console.log(sig)
      var payload = {
        "account": signer,
        "nft_id": this.props.match.params.id,
        "signature": sig
      }
      console.log(sig)
      var payload_str = JSON.stringify(payload)
      console.log(payload_str)
      var req_key_url = this.backend + "/api/v1/key/claim"
      console.log(req_key_url)
      axios.post(req_key_url, payload_str, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200) {
          let key = res.data.key;
          let data = CryptoJS.AES.decrypt(ciphertext, key);
          let plainText = data.toString(CryptoJS.enc.Utf8);
          //console.log(plainText.length)
          const wordArray = CryptoJS.enc.Hex.parse(plainText);
          let BaText = this.wordArrayToByteArray(wordArray, wordArray.length);
          var arrayBufferView = new Uint8Array(BaText);
          var blob = new Blob( [ arrayBufferView ] );
          let suffix = '.' + this.state.fileType;
          FileSaver.saveAs(blob,this.state.Name + suffix);
        } else {
          var error_msg = res.data.message
          alert("??????????????????  " + error_msg)
        }
      }).catch(reason => {
        console.log(reason);
        //var error_msg = reason.data.message
				alert("??????????????????(" + reason + ")")

      })
    }
    wordToByteArray = (word, length) => {
      var ba = [],
        i,
        xFF = 0xFF;
      if (length > 0)
        ba.push(word >>> 24);
      if (length > 1)
        ba.push((word >>> 16) & xFF);
      if (length > 2)
        ba.push((word >>> 8) & xFF);
      if (length > 3)
        ba.push(word & xFF);
    
      return ba;
    }
    
    wordArrayToByteArray = (wordArray, length) => {
      if (wordArray.hasOwnProperty("sigBytes") && wordArray.hasOwnProperty("words")) {
        length = wordArray.sigBytes;
        wordArray = wordArray.words;
      }
    
      var result = [],
        bytes,
        i = 0;
      while (length > 0) {
        bytes = this.wordToByteArray(wordArray[i], Math.min(4, length));
        length -= bytes.length;
        result.push(bytes);
        i++;
      }
      return [].concat.apply([], result);
    }
  
  showLoading = () => {
      if (this.state.onLoading) {
        return (
          <div>
            <ReactLoading type={'bars'} color={'#2196f3'} height={200} width={200} />
          </div>
        );
      }
    }
  spark = () => {
    
    if(this.state.spark) {
      document.getElementById('isSpark').innerHTML = '???????????????';
    } else {
      document.getElementById('isSpark').innerHTML = '??????';
    }
    this.setState({spark: !this.state.spark});
  }
  

  render() {
    const { classes } = this.props
    const gateway = this.gateway
    const sell_info = () => {
      let url = window.location.host;
      let toUrl = url + '/#/NFT/Spark/' + this.props.match.params.id;
      let share = '?????????????????????' + toUrl;
      // this.state.onSale
      if (this.state.spark) {
        return (
          <Grid container >
            <Grid item xs>
              <Typography color="inherit" align="center" noWrap className={classes.share} >
                ????????????????????????????????????<br /> ???????????????????????????????????????NFT <br />
                {toUrl}
                <CopyToClipboard text={toUrl}
                  onCopy={() => this.setState({ copied: true })}>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <FileCopyOutlinedIcon />
                  </IconButton>
                </CopyToClipboard>
              </Typography>
            </Grid>
          </Grid>
        );
      }
    }



    if (this.state.onLoading) {
      return (
        <div>
          <Helmet>
            <title>SparkNFT | Publish</title>
          </Helmet>
          <ThemeProvider theme={theme}>
            <TopBar />
            <div style={{ marginLeft: '35%', marginTop: '10%' }}>
              <ReactLoading type={'bars'} color={'#2196f3'} width={'40%'} />
            </div>
          </ThemeProvider>
        </div>
      );
    } else {
      return (

        <div>
          <Helmet>
            <title>SparkNFT | INFO</title>
          </Helmet>

          <ThemeProvider theme={theme}>
            <TopBar />
            <Container component="main" className={classes.container}>
              <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid>
              <Button
                startIcon={<ArrowBackIosOutlinedIcon style={{ fontSize: '2rem' }} />}
                href='/#/collections'
                style={{ marginTop: 20, marginBottom: 10, fontSize: '2rem' }}
              >
                ?????????????????????
              </Button>
              </Grid>
              <Grid xs={9}></Grid>
              <Grid container  direction="row" className={classes.cbutton}>
              <Grid>
                  <Button style={{ marginTop: 10,marginRight: 30, marginBottom: 20}} size="large" variant="contained" color="primary"  className={classes.btnMain} startIcon={<LocalAtmIcon />} onClick={this.claim} >
                    <Typography id="isSpark" variant="button" component="h3" gutterBottom >
                      <font size="3" color='white'>
                            ?????????
                      </font>
                    </Typography>
                  </Button>
              </Grid>
              {/* <Grid xs ={1}></Grid> */}
              <Grid>
                <Button style={{ marginTop: 10, marginBottom: 20}} size="large" variant="outlined" color="secondary"  className={classes.btnSecond} startIcon={<AttachMoneyIcon />}  href={'/#/sellSingle/' +  this.props.match.params.id}  >
                  <Typography variant="button" component="h2" gutterBottom >
                    
                    <font size="3">
                    ??????
                      </font>
                  </Typography>
                </Button>
              </Grid>
              </Grid>
              </Grid>
              <div className={classes.paper}>
                {/* <Grid container direction="column" justifyContent="center" alignItems="center"> */}
                {this.state.loadItem ? (
                  <Grid container className={classes.content} spacing={5}>
                    <Grid item xs={4}>
                      <Skeleton variant="rect" width={300} height={500} style={{ width: 370, marginLeft: 50, marginBottom: 50 }}/>
                    </Grid>
                    <Grid item xs style={{ marginLeft: '5%' }}>
                      <Skeleton animation="wave" variant="text" width={200} height={30}/>
                      <Skeleton animation="wave" variant="text" width={400} height={70}/>
                      <Skeleton animation="wave" variant="rect" width={500} height={300} style={{ marginBottom: 50 }}/>

                    </Grid>

                  </Grid>
                ) : (<Grid container   spacing= {5} className={classes.content}>
                  {/* <Grid xs={2}></Grid> */}
                  {/* <Grid xs={1}></Grid> */}
                  <Grid    style={{ maxWidth: 200}}>
                        <Paper className={classes.imagePapaer}>
                          <img className={classes.imageStyle} src={this.state.Cover}></img>  
                      </Paper>
      
                    <Grid>
                      <font size="3">
                          ????????????:{this.state.Profit}
                      </font>
                    </Grid>
                  </Grid>
                  {/* <Grid xs={1}></Grid> */}
                  <Grid xs={1}></Grid>
                  <Grid   className={classes.content2} >
                    <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                      #{this.props.match.params.id}
                    </Typography>
                    <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34, marginTop: '2%'}}>
                      <b>{this.state.Name}</b>
                    </Typography>
                    <Typography align="left" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '100%', fontSize: 16 }}>
                      {this.state.Description}
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '6%', maxWidth: '100%', fontSize: 24 }}>
                      ????????????: {this.state.BonusFee} %
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
                      ??????????????????????????????: {this.state.childrenNum}
                    </Typography>
                    <Grid container direction="row" className={classes.cbutton}>
                    <Grid>
                      <Button size="small" variant="contained"  color="primary" target="_blank" className={classes.btnMain} startIcon={<GetAppIcon />} onClick={this.downloadIPFS} >
                        <Typography variant="button" component="h2" gutterBottom >
                          <font size="3" color='white'>
                            ??????
                          </font>
                        </Typography>
                      </Button>
                      </Grid>
                      <Grid xs ={1}></Grid>
                      <Grid>
                        <Button size="small"  variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<WhatshotIcon />} onClick={this.spark} >
                          <Typography id="isSpark" variant="button" component="h2" gutterBottom >
                            
                            <font size="3">
                            ????????????
                          </font>
                          </Typography>
                        </Button>
                      </Grid>
                      
                    </Grid>
                  </Grid>
                  
                  
                </Grid>)}
                <br /><br /><br /><br />
              </div>
              <Grid container direction="row" justifyContent="center" alignItems="flex-start">
            <Grid xs={8}>
              <div style={{marginTop: 0}}>
                  {sell_info()}
                  {this.showLoading()}
              </div>
            </Grid>
          </Grid>
              <br /><br />
            </Container>
          </ThemeProvider>
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(NFTInfo);
import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Alert, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Input, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import TopBar from './TopBar';
import axios from 'axios';
import contract from './contract';
import web3 from './web3';
import ReactLoading from 'react-loading';
import Paper from '@material-ui/core/Paper';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@material-ui/core";

const {
  pinata_api_key,
  pinata_secret_api_key,
} = require('./project.secret');
const FormData = require('form-data');
const bs58 = require('bs58');
var CryptoJS = require("crypto-js");


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
  main: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('sm')]: {
      width: 500
    },
  },
  titleCon: {
    marginTop: 50,
    fontFamily: 'Ubuntu',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 30
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 40
    },
  },
  titlePub: {
    marginTop: "3%",
    fontFamily: 'Ubuntu',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 30
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 40
    },
  },
  paperImg: {

    backgroundColor: '#EFEBE9',
    width: 330,
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: '5%',
      marginTop: 30,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '30%',
      marginTop: 30,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '30%',
      marginTop: 30,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '40%',
      marginTop: 30,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '45%',
      marginTop: 30,
    },
  },
  btnPub: {
    margin: theme.spacing(1),
    borderRadius: 25,
    color: '#FFFFFF',
    backgroundColor: '#2196f3',
    marginBottom: 20,
    marginTop: 40,
    height: 45,
    minWidth: 200,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '50%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 16,
      width: '30%',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      width: '30%',
    },
  },
  btn: {
    color: '#424949',
    borderWidth: 2,
    borderColor: '#e3f2fd',
    fontSize: 16,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: blue[500],
    width: 60,
    height: 60
  },
  form: {
    width: '150%',
    marginTop: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fileBtn: {
    padding: '10px 30px 10px 30px',
    background: '#66C1E4',
    border: 'none',
    color: '#FFF',
    boxShadow: '1px 1px 1px #4C6E91',
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
    borderRadius: 25,
    color: '#FFFFFF',
    backgroundColor: '#2196f3'
  },
  input: {
    height: 40,
    borderRadius: 5,
  },
  inputNum: {
    height: 40,
    borderRadius: 5,
    width: '100%',
    fontSize: 20,
  }
});


class EncryptedPublish extends Component {
  backend = 'http://192.168.0.64:3000'
  state = {
    name: '',
    bonusFee: 0,
    price: 0,
    buffer: null,
    file: null,
    ipfsHashCover: '',
    ipfsMeta: '',
    fileType: '',
    fileIpfs: '',
    description: '',
    shareTimes: 0,
    onLoading: false,
    rootNFTId: '',
    issueId: '',
    allowSubmitPDF: false,
    usedAcc: '',
    sig: '',
    finished: false,
    open: false,
    coverURL: '',
    jumped: false,
  };

  async componentDidMount() {
    if (!window.ethereum) {
      alert("????????????metamask");
      window.location.href = '/#/introPublish';
      return;
    }
    // if (!window.ethereum.isConnected()) {
    //   alert("????????????metamask");
    //   window.location.href = '/#/introPublish';
    //   return;
    // }
    // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
      if (chainId !== '0x4') {
        alert("????????????rinkeby network");
        window.location.href = '/#/introPublish';
        return;
      }
    })


    
  }

  handleGetPubName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleGetBonusFee = (value) => {
    this.setState({
      bonusFee: value,
    })
  }

  handleGetPrice = (value) => {
    this.setState({
      price: value,
    })
  }

  handleGetShareTimes = (value) => {
    this.setState({
      shareTimes: value,
    })
  }

  handleGetDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  handleGetNFTId = (value) => {
    this.setState({
      rootNFTId: String(value),
    })
  }

  handleClose = (e) => {
    this.setState({
      open: false,
    })
  }

  handleClickOpen = (e) => {
    this.setState({
      open: true,
    })
  }

  jump = async (event) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.setState({
      usedAcc: account
    })
    
    const owner = await contract.methods.ownerOf(this.state.rootNFTId).call()
    var issueId = await contract.methods.getIssueIdByNFTId(this.state.rootNFTId).call()
    
    var bonus = await contract.methods.getRoyaltyFeeByIssueId(issueId).call()
    
    if (account == owner.toLowerCase()) {
      this.setState({
        onLoading: false,
        allowSubmitPDF: true,
        jumped: true,
        bonusFee: bonus
      })
    } else {
      alert('???????????????NFT????????????')
    }
  }

  submit = async (event) => {
    /*TODO: call smart contract publish() and wait for publish success event
     * then call backend to get a secret key. Then encrypt the pdf file and upload it to IPFS
     * Finally, form a new metadata json file and send its ipfs hash to backend and publish it
    */
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.setState({
      usedAcc: account
    })
    if (this.state.price === 0 || this.state.bonusFee === 0 || this.state.shareTimes === 0 ) {
      alert("????????????????????????")
    } else {

      this.setState({
        onLoading: true
      })
      let obj = this
      var price_eth = web3.utils.toWei(this.state.price.toString())
      var ipfsToContract = '0x0000000000000000000000000000000000000000000000000000000000000000'
      contract.methods.publish(price_eth, this.state.bonusFee, this.state.shareTimes, ipfsToContract).send({
        from: this.state.usedAcc
      }).then(function (receipt) {
        //55834574849
        console.log(receipt)
        var publish_event = receipt.events.Publish
        var returned_values = publish_event.returnValues
        var root_nft_id = String(returned_values.rootNFTId)
        console.debug(typeof root_nft_id)
        var issue_id = returned_values.issue_id
        obj.setState({
          onLoading: false,
          rootNFTId: root_nft_id,
          issueId: issue_id,
          allowSubmitPDF: true
        })
        alert("????????????????????????");
      });

    }
    
  }

  submitWork = async () => {
    if (this.state.ipfsHashCover === '' || this.state.fileIpfs === '' ) {
      alert("????????????????????????")
    } else {
      
      var img_url = 'https://gateway.pinata.cloud/ipfs/' + this.state.ipfsHashCover
      this.setState({
        coverURL: img_url
      })
      console.debug("coverURL: ", this.state.coverURL)
      var trimmed_des = this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, " ");
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      if (account !== this.state.usedAcc){
        alert('??????????????????????????????????????????')
        return
      }
      var file_url = 'https://gateway.pinata.cloud/ipfs/' + this.state.fileIpfs
      var JSONBody = {
        "name": this.state.name,
        "description": trimmed_des,
        "image": this.state.coverURL,
        "attributes": [
          {
            "display_type": "boost_percentage",
            "trait_type": "Bonuse Percentage",
            "value": this.state.bonusFee
          },
          {
            "trait_type": "File Address",
            "value": file_url
          },
          {
            "value": this.state.fileType
          },
          {
            "trait_type": "Encrypted",
            "value": "TRUE"
          }
        ]
      }
      console.debug(JSONBody)
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
      let obj = this
      this.setState({
        onLoading: true
      })
      axios.post(url, JSONBody, {
        headers: {
          pinata_api_key: pinata_api_key,
          pinata_secret_api_key: pinata_secret_api_key
        },
      })
        .then(function (response) {
          console.debug("metadata: ", response.data.IpfsHash)
          const bytes = bs58.decode(response.data.IpfsHash)
          const bytesToContract = bytes.toString('hex').substring(4,);
          console.log(bytesToContract)
          console.log(response.data.IpfsHash)
          obj.setState({
            ipfsMeta: bytesToContract
          })

          var ipfsToContract = '0x' + bytesToContract

          contract.methods.setURI(obj.state.rootNFTId, ipfsToContract).send({
            from: obj.state.usedAcc
          }).then(receipt => {
            console.debug(receipt.events.SetURI)
            alert("????????????????????????");
            obj.setState({
              allowSubmitPDF: false,
              finished: true,
              onLoading: false
            })
          })
        
        }).catch((error) => {
          alert(`?????????????????????????????? ${ error }`);
        })
    }
  }

  render() {
    const { classes } = this.props
    let obj = this
    const { TextArea } = Input;
    const prop = {
      name: 'file',
      action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      headers: {
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key
      },
      data: this.state.buffer,
      beforeUpload: file => {
        return new Promise((resolve, reject) => {
          try {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = (e) => {
              var b = e.target.result
              let params = new FormData()
              params.append('file', b)
              this.setState({
                buffer: params
              })
            }
            resolve()
          } catch (e) {
            message.error('Read file error')
            reject()
          }
        })
      },
      async onChange(info) {
        const { status } = info.file;
        // text/plain image/jpeg application/pdf
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          obj.setState({
            ipfsHashCover: info.file.response.IpfsHash
          })

        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        message.error(`Only image file supported`);
        console.log('Dropped files', e.dataTransfer.files);
      },
    };

    const propFile = {
      name: 'file',
      action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      headers: {
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key
      },
      beforeUpload: file => {
        return new Promise(async (resolve, reject) => {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const signer = accounts[0];
            var message = {
              account: signer,
              nft_id: obj.state.rootNFTId
            };
            const sig = await web3.eth.personal.sign(JSON.stringify(message), signer)
            console.debug(sig)
            var payload = {
              "nft_id": obj.state.rootNFTId,
              "account": signer,
              "signature": sig
            }
            var payload_str = JSON.stringify(payload)
            console.log(payload_str);
            var req_key_url = this.backend + '/api/v1/key/claim'
            try {
              const res = await axios.post(req_key_url, payload_str, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              var secret_key = res.data.key//res.data.key
              console.debug(secret_key)
              // if (file.type === 'text/plain') {
              const reader = new FileReader()
              reader.readAsArrayBuffer(file)
              reader.onload = (e) => {
                var b = e.target.result
                var wordArray = CryptoJS.lib.WordArray.create(b);
                const str = CryptoJS.enc.Hex.stringify(wordArray);
                var cipher_text = CryptoJS.TripleDES.encrypt(str, secret_key).toString();
                var myblob = new Blob([cipher_text]);
                resolve(myblob)
              }
              
            } catch (error) {
              if (error.response.status == 400) {
                if (error.response.data.message.includes("signature invalid")) {
                  alert("??????????????????????????????????????????????????????")
                } else if (error.response.data.message.includes("param invalid")) {
                  alert("????????????")
                } else if (error.response.data.message.includes("not owned")) {
                  alert("??????????????????nft")
                } else if (error.response.data.message.includes("not found")) {
                  alert("???nft????????????")
                } 
              } else {
                alert('??????????????????????????????')
              }
            }


          } catch (e) {
            console.log(e)
            message.error('Read file error')
            reject()
          }
        })
      },
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
          var file_type = info.file.name.split('\.')
          var file_suffix = file_type[file_type.length - 1]
          obj.setState({
            fileIpfs: info.file.response.IpfsHash,
            fileType: file_suffix
          })
          console.debug("encrypted file hash: ", info.file.response.IpfsHash)
          message.success(`${info.file.name} file uploaded successfully.`);
        }

      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
    };

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
    } else if (this.state.allowSubmitPDF) {
      
      return (
        <div>
          <Helmet>
            <title>SparkNFT | Publish</title>
          </Helmet>
          <Container component="main" maxWidth="xs" className={classes.main}>
           
            <div className={classes.paper}>
              <Typography className={classes.titlePub}>
                <b>??????????????????</b>
              </Typography>
              <form className={classes.form} noValidate>
                {this.state.jumped ? (
                  <div>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>???????????? *</label>
                      <p style={{ fontSize: 14 }}>???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
                      <TextArea
                        rows={4}
                        id="Description"
                        onChange={this.handleGetDescription}
                      />
                    </Grid>
                  </div>
                ) : (
                  <div>

                  </div>
                )}
                <label style={{ fontSize: 18, marginTop: 50 }}>???????????? *</label>
                <p style={{ fontSize: 12 }}>?????????????????????????????????????????? <br />
                  ?????????????????????????????????JPEG/JPG/PNG</p>
                <Dragger {...prop} style={{ width: '100%', minHeight: 100 }} id="Uploader" accept=".png, .jpg, .jpeg" >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">????????????????????????????????????????????????</p>
                  <p className="ant-upload-hint">
                    ???????????????????????????????????????????????????????????????
                  </p>
                </Dragger>

                <label style={{ fontSize: 18, marginTop: 50 }}>???????????? *</label>
                <p style={{ fontSize: 12 }}>?????????????????????????????????????????? </p>
                <Dragger {...propFile} style={{ width: '100%', minHeight: 100 }} id="Uploader2">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">????????????????????????????????????????????????</p>
                  <p className="ant-upload-hint">
                    ???????????????????????????????????????????????????????????????????????????????????????
                  </p>
                </Dragger>
                <div style={{textAlign: 'center'}}>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    className={classes.btnPub}
                    onClick={this.submitWork}
                  >
                    ????????????
                  </Button>
                </div>
              </form>
            </div>
          </Container>
          
        </div>
      );

    } else if (this.state.finished) {
      return (
        <div>
          <Helmet>
            <title>SparkNFT | Publish</title>
          </Helmet>
          <ThemeProvider theme={theme}>
            <TopBar />
            <div style={{ textAlign: 'center' }}>
              <Typography className={classes.titleCon}>
                <b> ???? ?????????????????????</b>
              </Typography>

              <Paper className={classes.paperImg}>
                <img style={{ width: 300, marginTop: 20, marginBottom: 50 }} src={this.state.coverURL}></img>
              </Paper>
              <Typography variant="h4" style={{ marginTop: 20, fontFamily: 'Ubuntu' }}>
                <b>?????????????????????NFT?????? #{this.state.rootNFTId}</b>
              </Typography>
            </div>
          </ThemeProvider>
        </div>
      );
    } else {
      return (
        <div>
          <Helmet>
            <title>SparkNFT | Publish</title>
          </Helmet>

          <ThemeProvider theme={theme}>
            <TopBar />
            <Container component="main" maxWidth="xs" className={classes.main}>
              <div className={classes.paper}>
                <Typography className={classes.titlePub}>
                  <b>??????????????????</b>
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginBottom: 10 }}>???????????? *</label>
                      <Input
                        placeholder="????????????"
                        allowClear
                        id="pubName"
                        onChange={this.handleGetPubName}
                        value={this.state.name}
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>???????????? *</label>
                      <p style={{ fontSize: 14 }}>??????????????????????????????????????????????????????????????????????????????????????????</p>
                      <InputNumber
                        id="bonusFee"
                        defaultValue={0}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={this.handleGetBonusFee}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>???????????? (ether)*</label>
                      <InputNumber
                        id="price"
                        defaultValue={0}
                        min={0}
                        onChange={this.handleGetPrice}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>?????????????????? *</label>
                      <p style={{ fontSize: 14 }}>????????????????????????????????????????????????????????????????????????</p>
                      <InputNumber
                        id="shareTimes"
                        defaultValue={0}
                        min={0}
                        onChange={this.handleGetShareTimes}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>???????????? *</label>
                      <p style={{ fontSize: 14 }}>???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
                      <TextArea
                        rows={4}
                        id="Description"
                        onChange={this.handleGetDescription}
                      />
                    </Grid>
                  </Grid>
                </form>
                <Grid container alignItems="center" spacing={4} style={{ marginTop: 20, marginBottom: 50}}>
                  <Grid item xs style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      style={{ width: 200, height: 50, marginBottom: 20, marginTop: 20 }}
                      onClick={this.submit}
                    >
                      ????????????
                    </Button>
                  </Grid>
                  <Grid item xs style={{textAlign: 'center'}}>
                    <Link onClick={this.handleClickOpen} style={{ fontSize: 10, textDecoration: 'underline'}}>
                      ??????????????????????????????
                    </Link>
                  </Grid>
                </Grid>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">?????? NFT ID</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      ????????????????????????????????????????????? NFT ID
                    </DialogContentText>
                    <label style={{ fontSize: 14, marginBottom: 10 }}>NFT ID *</label>
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      onChange={this.handleGetNFTId}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      ??????
                    </Button>
                    <Button variant="contained" onClick={this.jump} color="primary" >
                      ???????????????
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Container>
          </ThemeProvider>
        </div>
      );
    }


  }
}

export default withStyles(styles, { withTheme: true })(EncryptedPublish);
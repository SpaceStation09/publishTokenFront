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
  icon: {
    marginRight: theme.spacing(2),
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
    width: '170%',
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
    width: 675,
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
  };

  async componentDidMount() {
    if (!window.ethereum) {
      alert("请先安装metamask");
      window.location.href = '/#/introPublish';
      return;
    }
    if (!window.ethereum.isConnected()) {
      alert("请先链接metamask");
      window.location.href = '/#/introPublish';
      return;
    }
    // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
      if (chainId !== '0x4') {
        alert("请切换至rinkeby network");
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
      rootNFTId: value,
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
    await contract.methods.ownerOf(this.state.rootNFTId).call().then(owner => {
      if (account == owner.toLowerCase()){
        this.setState({
          onLoading: false,
          allowSubmitPDF: true
        })
      }else {
        alert('您并不是此NFT的持有者')
      }
    })
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
      alert("你有信息尚未填写")
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
        var root_nft_id = returned_values.rootNFTId
        var issue_id = returned_values.issue_id
        obj.setState({
          onLoading: false,
          rootNFTId: root_nft_id,
          issueId: issue_id,
          allowSubmitPDF: true
        })
        alert("已经成功发布作品");
      });

    }
    
  }

  submitWork = async () => {
    if (this.state.ipfsHashCover === '' || this.state.fileIpfs === '' ) {
      alert("你有文件尚未填写")
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
        alert('账户发生变化，请切换回原账户')
        return
      }
      var file_url = 'https://gateway.pinata.cloud/ipfs/' + this.state.fileIpfs
      // var JSONBody = {
      //   "name": this.state.name,
      //   "description": trimmed_des,
      //   "image": this.state.coverURL,
      //   "attributes": [
      //     {
      //       "display_type": "boost_percentage",
      //       "trait_type": "Bonuse Percentage",
      //       "value": this.state.bonusFee
      //     },
      //     {
      //       "trait_type": "File Address",
      //       "value": file_url
      //     }
      //   ]
      // }
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
            alert("已经成功发布作品");
            obj.setState({
              allowSubmitPDF: false,
              finished: true,
              onLoading: false
            })
          })
        
        }).catch((error) => {
          alert(`似乎遇到了些小问题： ${ error }`);
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

    const propPDF = {
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
                var cipher_text = CryptoJS.AES.encrypt(str, secret_key).toString();
                var myblob = new Blob([cipher_text], {
                  type: 'text/plain'
                });
                resolve(myblob)
              }
              // }else {
              //   const reader = new FileReader()
              //   reader.readAsArrayBuffer(file)
              //   reader.onload = (e) => {
              //     var b = e.target.result
              //     var wordArray = CryptoJS.lib.WordArray.create(b);
              //     const str = CryptoJS.enc.Hex.stringify(wordArray);
              //     var cipher_text = CryptoJS.AES.encrypt(str, secret_key).toString();
              //     var myblob = new Blob([cipher_text], {
              //       type: 'application/pdf'
              //     });
              //     resolve(myblob)
              //   }
              // }
              
            } catch (error) {
              if (error.response.status == 400) {
                if (error.response.data.message.includes("signature invalid")) {
                  alert("您的签名有误，请查看签名账号是否正确")
                } else if (error.response.data.message.includes("param invalid")) {
                  alert("参数错误")
                } else if (error.response.data.message.includes("not owned")) {
                  alert("您并不拥有此nft")
                } else if (error.response.data.message.includes("not found")) {
                  alert("此nft还未生成")
                } 
              } else {
                alert('请求文件加密密钥失败')
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
          obj.setState({
            fileIpfs: info.file.response.IpfsHash,
            fileType: info.file.type
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

          <div style={{ width: '300px', height: '300px', position: 'relative', left: '43%', marginTop: '20%' }}>
            <ReactLoading type={'bars'} color={'#2196f3'} height={300} width={300} />
          </div>
        </div>
      );
    } else if (this.state.allowSubmitPDF) {
      return (
        <div>
          <Helmet>
            <title>SparkNFT | Publish</title>
          </Helmet>

          <div style={{ width: '300px', height: '300px', position: 'relative', left: '30%', marginTop: '10%' }}>
            <Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu' }}>
              <b>上传作品文件</b>
            </Typography>

            <label style={{ fontSize: 18, marginTop: 50 }}>封面图片 *</label>
            <p style={{ fontSize: 12 }}>请在下方区域上传您的封面图片 <br />
              封面文件支持这些格式：JPEG/JPG/PNG</p>
            <Dragger {...prop} style={{ width: 680, minHeight: 200 }} id="Uploader" accept=".png, .jpg, .jpeg" >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
              <p className="ant-upload-hint">
                支持单个文件的上传，支持多种类型文件的上传
              </p>
            </Dragger>

            <label style={{ fontSize: 18, marginTop: 50 }}>作品文件 *</label>
            <p style={{ fontSize: 12 }}>请在下方区域上传您的作品文件 <br />
              作品文件支持这些格式：TXT/PDF</p>
            <Dragger {...propPDF} style={{ width: 680, minHeight: 200 }} id="Uploader2" accept=".txt, .pdf">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
              <p className="ant-upload-hint">
                支持单个文件的上传和多个文件的上传，支持多种类型文件的上传
              </p>
            </Dragger>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 50, width: 200, height: 50, marginBottom: 50, marginLeft: 250 }}
              onClick={this.submitWork}
            >
              发布作品
            </Button>
          </div>
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
              <Typography variant="h2" style={{ marginTop: 50, fontFamily: 'Ubuntu' }}>
                <b> 🎉 恭喜您发布成功</b>
              </Typography>

              <Paper style={{ backgroundColor: '#EFEBE9', width: 350, marginLeft: '40%', marginTop: 100 }}>
                <img style={{ width: 300, marginTop: 20, marginBottom: 50 }} src={this.state.coverURL}></img>
              </Paper>
              <Typography variant="h4" style={{ marginTop: 20, fontFamily: 'Ubuntu' }}>
                <b>您获得的根结点NFT是： #{this.state.rootNFTId}</b>
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
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu' }}>
                  <b>发布作品信息</b>
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <label style={{ fontSize: 18, marginBottom: 10 }}>作品名字 *</label>
                      <Input
                        placeholder="作品名称"
                        allowClear
                        id="pubName"
                        onChange={this.handleGetPubName}
                        value={this.state.name}
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>收益比例 *</label>
                      <p style={{ fontSize: 12 }}>当您的作品被成功分享时，您希望从分享价格中获得多少比例的收益</p>
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
                    <Grid item xs={12}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>售卖价格 (ether)*</label>
                      <InputNumber
                        id="price"
                        defaultValue={0}
                        min={0}
                        onChange={this.handleGetPrice}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>最高分享次数 *</label>
                      <p style={{ fontSize: 12 }}>您希望每一个帮助您传播的用户最多能够分享多少次？</p>
                      <InputNumber
                        id="shareTimes"
                        defaultValue={0}
                        min={0}
                        onChange={this.handleGetShareTimes}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>作品描述 *</label>
                      <p style={{ fontSize: 12 }}>请用简单的话语对您的作品进行描述，精准有效的描述能帮助其他用户更准确得了解您的作品</p>
                      <TextArea
                        rows={4}
                        id="Description"
                        onChange={this.handleGetDescription}
                      />
                    </Grid>
                  </Grid>
                </form>
                <Grid container alignItems="center" spacing={4} style={{ marginTop: 20, marginBottom: 50}}>
                  <Grid item xs>
                    <Button
                      variant="contained"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      style={{ width: 200, height: 50, marginBottom: 20, marginTop: 20 }}
                      onClick={this.submit}
                    >
                      提交信息
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Link onClick={this.handleClickOpen} style={{ fontSize: 10, textDecoration: 'underline'}}>
                      已经上传过基本信息？
                    </Link>
                  </Grid>
                </Grid>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">填写 NFT ID</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      请在下方区域填写您要绑定内容的 NFT ID
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
                      取消
                    </Button>
                    <Button variant="contained" onClick={this.jump} color="primary" >
                      去上传作品
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
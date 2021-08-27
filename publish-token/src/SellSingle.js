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
import { Input, InputNumber } from 'antd';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const metadata_json = 'QmPsymsaqMZsiwLHXepXtEpYMq3xtnBLLbPgTEyybz1idQ'
// const metadata = { 
//   "Name": "热风", 
//   "Description": "《热风》收作者1918年至1924年所作杂文四十一篇。1925年11月由北京北新书局初版。作者生前共印行十版次。鲁迅在《新青年》的《随感录》中做些短评，还在这前一年，因为所评论的多是小问题，所以无可道，原因也大都忘却了。但就现在的文字看起来，除几条泛沦之外，有的是对于扶乩，静坐，打拳而发的；有的是对于所谓“保存国粹”而发的；有的是对于那时旧官僚的以经验自豪而发的；有的是对于上海《时报》的讽刺画而发的。记得当时的《新青年》是正在四面受敌之中，鲁迅所对付的不过一小部分。", 
//   "BonusFee": 7, 
//   "Cover": "QmSnPggQ9K4QV7dJkjLP2GMZVCEsL81kSsouRoAAzEb8K2" 
// }
// 《热风》收作者1918年至1924年所作杂文四十一篇。1925年11月由北京北新书局初版。作者生前共印行十版次。鲁迅在《新青年》的《随感录》中做些短评，还在这前一年，因为所评论的多是小问题，所以无可道，原因也大都忘却了。但就现在的文字看起来，除几条泛沦之外，有的是对于扶乩，静坐，打拳而发的；有的是对于所谓“保存国粹”而发的；有的是对于那时旧官僚的以经验自豪而发的；有的是对于上海《时报》的讽刺画而发的。记得当时的《新青年》是正在四面受敌之中，鲁迅所对付的不过一小部分。


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
    address: '',
    NFTId: '',
    onSale: false,
  };

  constructor(props){
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
    console.log(url)
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
    // TODO: call smart contract to transfer nft
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
          <Typography color="inherit" align="center" noWrap style={{ fontFamily: 'Teko', fontSize: 20, marginTop: '5%' }}>
            请将下方链接分享给买方，买方会进入此链接来购买这个NFT <br />
            {'http://localhost:3000/#/buySingle/'+this.state.NFTId}
          </Typography>
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
                      <Button variant="contained" onClick={this.sell} color="primary">
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

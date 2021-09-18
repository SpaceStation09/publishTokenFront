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
import Skeleton from '@material-ui/lab/Skeleton';


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
  content: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    [theme.breakpoints.between('sm', 'md')]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    [theme.breakpoints.between('md', 'lg')]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      justifyContent: "center",
      alignItems: "flex-start"
    },
    [theme.breakpoints.up('xl')]: {
      justifyContent: "center",
      alignItems: "flex-start"
    },
  },
  img: {
    width: 300,
    marginBottom: 50,
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '30%'
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '40%'
    },
  },
  imgPaper: {
    width: 350,
    marginBottom: 50,
    backgroundColor: '#EFEBE9',
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '30%'
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '40%'
    },
  },
  content2: {
    fontFamily: 'Teko',
    textAlign: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      maxWidth: 500
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
});

class BuySingle extends Component {
  gateway = 'https://gateway.pinata.cloud/ipfs/'
  backend = 'http://192.168.0.64:3000'
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
    childrenNum: 0,
    loadItem: true,
    encrypted: '未知'
  };

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var obj = this
    this.setState({
      currentAcc: account
    })
    this.setState({
      NFTId: this.props.match.params.NFTId
    })
    const issueId = await contract.methods.getIssueIdByNFTId(this.state.NFTId).call()
    const royalty = await contract.methods.getRoyaltyFeeByIssueId(issueId).call()
    await contract.methods.tokenURI(this.props.match.params.NFTId).call().then(metadata => {
      let hash = metadata.split('/')
      this.setState({ ipfsHashMeta: hash[hash.length - 1] })
      var url = this.gateway + this.state.ipfsHashMeta
      axios({
        method: 'get',
        url: url,
        timeout: 1000 * 3,
      }).then(res => {
        let content = res.data;
        let bonus = 0;
        let encrypted = '未知';

        for (let i = 0; i < content.attributes.length; i++) {
          if(i === 0){
            bonus = content.attributes[i].value;
            continue
          }
          if(i === 3){
            if (content.attributes[i].value.toUpperCase() === 'TRUE'){
              encrypted = '是';
            }else{
              encrypted = '否';
            }
            continue
          }
        }
        obj.setState({
          loadItem: false,
          name: content.name,
          description: content.description,
          bonusFee: bonus,
          coverURL: content.image,
          encrypted: encrypted
        })
      }).catch(error => {
        var name_holder = 'SparkNFT#' + this.props.match.params.NFTId
        obj.setState({
          loadItem: false,
          name: name_holder,
          description: '暂时无法获取到该nft的相关描述',
          bonusFee: royalty,
          coverURL: 'https://via.placeholder.com/100x140.png?text=SparkNFT'
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

    const url = this.backend + '/api/v1/nft/info?nft_id=' + this.state.NFTId
    axios.get(url).then(res => {
      var children_num = res.data.children_count
      obj.setState({
        childrenNum: children_num
      })
    })
      .catch(error => {
        console.debug(error.message)
        if (error.response === undefined) {
          alert('服务器未响应,子节点数量获取失败')
          return;
        }
        console.log(error.response);
        if (error.response.status == 400 && error.response.data.message.includes("children not found")) {
          console.debug("no children")
        } else {
          alert('获取nft子节点情况页面失败(' + error + ')')
        }
      })
  }

  handleBuy = async (e) => {

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

    // const showLoading = () => {
    //   if (this.state.onLoading) {
    //     return (
    //       <div>
    //         <ReactLoading type={'bars'} color={'#2196f3'} height={200} width={200} />
    //       </div>
    //     );
    //   }
    // }

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
                {this.state.loadItem ? (
                  <Grid container spacing={5} className={classes.content}>
                    <Grid item xs={4}>
                      <Skeleton variant="rect" width={300} height={500} className={classes.img} />
                    </Grid>
                    <Grid item xs style={{ marginLeft: '5%', maxWidth: 500, minWidth: 350 }}>
                      <Skeleton animation="wave" variant="text" width={'70%'} height={30} />
                      <Skeleton animation="wave" variant="text" width={'100%'} height={70} />
                      <Skeleton animation="wave" variant="rect" width={'100%'} height={300} style={{ marginBottom: 50 }} />
                      {buyButton()}
                    </Grid>
                  </Grid>
                ) : (
                    <Grid container className={classes.content} spacing={5}>
                    <Grid item xs={4} style={{ maxWidth: 600 }}>
                      <Paper className={classes.imgPaper}>
                        <img style={{ width: 300, marginTop: 20, marginBottom: 50 }} src={this.state.coverURL}></img>
                      </Paper>
                    </Grid>
                    <Grid item xs className={classes.content2}>
                      <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                        #{this.state.NFTId}
                      </Typography>
                      <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34 }}>
                        <b>{this.state.name}</b>
                      </Typography>
                      <Typography align="left" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '100%', fontSize: 16 }}>
                        {this.state.description}
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize: 20 }}>
                        创作者分红比例: {this.state.bonusFee} %
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '2%', maxWidth: '100%', fontSize: 18 }}>
                        售价: {this.state.price} ETH
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '1%', maxWidth: '65%', fontSize: 12 }}>
                        当前拥有者: {this.state.owner}
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
                        当前拥有的子节点数量: {this.state.childrenNum}
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
                        NFT作品是否加密: {this.state.encrypted}
                      </Typography>
                      {buyButton()}
                    </Grid>
                  </Grid>
                )}
              </div>
            </Container>
          </ThemeProvider>
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(BuySingle);

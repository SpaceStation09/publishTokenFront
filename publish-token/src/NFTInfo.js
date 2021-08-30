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
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import BigNumber from 'bignumber.js';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
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
      Cover: '',
      contract: null,
      Leaf:0
  };

  showS = async () =>{

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
    let nft = new web3.eth.Contract(NFT.abi, NFT.address);
    this.setState({contract: nft});
    nft.methods.tokenURI(this.props.match.params.id).call().then(meta => {
      let hash = meta.split('/');

      this.setState({hash: hash[hash.length-1]});
      $.getJSON(meta).then(data => {
        this.setState({Name: data.Name});
        this.setState({Description: data.Description});
        this.setState({BonusFee: data.BonusFee});
        this.setState({Cover: data.Cover});
      });
    });
    let leafUrl = "" + "/api/v1/tree/children?" + this.props.match.params.id;
    $.getJSON(leafUrl).then(data => {
      this.setState({Leaf: data.children.length});
      
    });
    
  }


  spark = () => {
    let url = window.location.host;
    let share = '分享复制链接：' + url + '/#/NFT/Spark/' + this.props.match.params.id;
    alert(share);
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
        </ThemeProvider>
      <main>
      
      <Grid container direction="column" justifyContent="center" alignItems="center"  xs={12}>
        <Grid container direction="row" justifyContent="center" alignItems="center"  xs={12}>
          <Grid xs={2}>
            <Button
                color="primary"
                startIcon={<ArrowBackIosOutlinedIcon style={{ fontSize: 22 }} />}
                href='/#/collections'
                style={{ marginTop: 20, marginBottom: 10, fontSize: 20 }}
              >
                回到我的NFTs
            </Button>
          </Grid>
          <Grid xs={5}></Grid>
          <Grid>
              <Button size="large" variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<AttachMoneyIcon />} target="_blank" href={'/#/sellSingle/' +  this.props.match.params.id}  >
                <Typography variant="button" component="h2" gutterBottom >
                  售卖
                </Typography>
              </Button>
            </Grid>
          
        </Grid>
        
        <Grid container direction="row" justifyContent="center" alignItems="center"  xs={12}>
        <Grid xs={2}>
          
        </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center"  xs={8}>

        <Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
          
          <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 40}}>
              我的NFT Gallery
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
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
              <Grid>
              <Typography variant="h3" component="h2" gutterBottom>
                {this.state.Name}
              </Typography>
            </Grid>
            </Grid>
            
            <Grid>
              <Typography variant="body1" gutterBottom>
                {this.state.Description}
              </Typography>
            </Grid>
            <br /><br /><br />
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
            <Grid>
                
                  <Typography style={{ fontFamily: 'Teko', fontSize: 18}}  >
                  子叶数量: {this.state.Leaf}
                  </Typography>
                
              </Grid>
              <Grid xs ={2}></Grid>
              <Grid>
                
                  <Typography style={{ fontFamily: 'Teko', fontSize: 18}}  >
                    分红比: {this.state.BonusFee} %
                  </Typography>
                
              </Grid>
            </Grid>
          </Grid>
          </Grid>
          <br /><br /><br />
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid>
              <Typography style={{  fontSize: 12}} >
                  NFT Address: {NFT.address}
              </Typography>
            </Grid>
            <Grid xs={1}>
              
            </Grid>
            <Grid>
              <Button size="large" variant="contained"  color="primary" target="_blank" className={classes.btnMain} startIcon={<GetAppIcon />} onClick={this.showS} >
                <Typography variant="button" component="h2" gutterBottom >
                  <font color='white'>
                    下载
                  </font>
                </Typography>
              </Button>
            </Grid>
            <Grid xs ={1}></Grid>
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
        </Grid>
      </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NFTInfo);
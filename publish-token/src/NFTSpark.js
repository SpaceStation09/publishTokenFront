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
import { Paper, Container, Link } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import axios from 'axios';
import contract from './contract';
import web3 from './web3';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
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
    marginTop: theme.spacing(1),
    textAlign: 'center',
    maxWidth: 1370,
    // backgroundColor: "green"
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



class NFTSpark extends Component{

  gateway = 'https://gateway.pinata.cloud/ipfs/';
  backend = 'http://192.168.0.64:3000';
  state = {
      Name: '',
      Description: '',
      BonusFee: 0,
      Cover: '',
      contract: null,
      price: '',
      priceString: '',
      Leaf: 0,
      onLoading: false,
      recommendNFT: '',
      encrypted: '未知',
      showRecommend: false,
  };

  shill = async() => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    let nft = contract;
    this.loadLoadingState();
    let obj = this;
    nft.methods.acceptShill(this.props.match.params.id).send({
        from: account,
        value: this.state.price
    }).then(function(receipt){
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        alert("交易已上链");
        obj.setState({onloading: false});
    });

  }
  
  loadLoadingState = () => {
    this.setState({onloading: true},function() {
        console.log(this.state.onLoading)
    });
    
  }

  handleClickLink = (event) => {
    var new_url = '/#/NFT/Spark/' + this.state.recommendNFT
    window.open(new_url)
  }

  

  constructor(props) {
    super(props);
    let nft = contract;
    let url = this.gateway + this.props.match.params.hash;
    let obj = this;
    nft.methods.tokenURI(this.props.match.params.id).call().then(meta => {
      let hash = meta.split('/');

      this.setState({ hash: hash[hash.length - 1] });
      axios.get(meta).then(res => {
        let data = res.data;
        console.log(data);
        let bouns;
        for (let i = 0; i < data.attributes.length; i++) {
          if (data.attributes[i].trait_type === 'bonusFee') {
            bouns = data.attributes[i].value;
          }
        }
        this.setState({ Name: data.name });
        this.setState({ Description: data.description });
        this.setState({ BonusFee: bouns });
        this.setState({ Cover: data.image });
      });
    });
    nft.methods.getShillPriceByNFTId(this.props.match.params.id).call().then(price => {
      this.setState({ price: price });
      let etherPrice = web3.utils.fromWei(price, 'ether');
      etherPrice += ' ETH';
      this.setState({ priceString: etherPrice });
    });
    const leafUrl = this.backend + '/api/v1/nft/info?nft_id=' + this.props.match.params.id
    axios.get(leafUrl).then(res => {
      var children_num = res.data.children_count
      if (res.data.suggest_next_nft === this.props.match.params.id){
        obj.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: false
        })
      } else if (res.data.suggest_next_nft == '0'){
        obj.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: false
        })
      }else {
        obj.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: true
        })
      }
    }).catch(error => {
      if (error.response === undefined) {
        alert('服务器未响应')
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

  render() {
    const { classes } = this.props
    const gateway = this.gateway
    if(this.state.onLoading) {
        return (
            <div>
                <Helmet>
                    <title>SparkNFT | Spark</title>
                </Helmet>

                <div style={{ width: '300px', height: '300px', position: 'relative', left: '43%', marginTop: '20%' }}>
                    <ReactLoading type={'bars'} color={'#2196f3'} height={300} width={300} />
                </div>
            </div>
        );
    }else {
    return (
       <div>
        <Helmet>
          <title>SparkNFT | Spark</title>
        </Helmet>
        <ThemeProvider theme={theme}>
          <TopBar />
        </ThemeProvider>
      <main>
       
        <Container component="main" className={classes.container}>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
              <Grid>
                <Button
                  startIcon={<ArrowBackIosOutlinedIcon style={{ fontSize: 22 }} />}
                  href='/#/collections'
                  style={{ marginTop: 20, marginBottom: 10, fontSize: 22 }}
                >
                  回到我的收藏馆
                </Button>
              </Grid>
              <Grid xs={8}></Grid>  
            </Grid>

            <Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
                <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 65}}>
                    🔥 NFT 🔥
                </Typography>
            </Grid>

            {/* <Grid container direction="row" justifyContent="center" alignItems="flex-start">
            </Grid> */}
            <div className={classes.paper}>
              {/* <Grid container direction="column" justifyContent="center" alignItems="center"> */}
              <Grid container justifyContent="space-evenly" spacing= {5}>
                {/* <Grid xs={2}></Grid> */}
                <Grid item style={{ maxWidth: 100}}>
                <Paper style={{ backgroundColor: '#FAFAFA', width: 350, marginLeft: 10}}>
                    <img style={{ width: 300, marginTop: 20, marginBottom: 50}} src={this.state.Cover}></img>
                </Paper>
                </Grid>
                <Grid item xs  style={{ marginLeft:20, maxWidth: 500}} >
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
                  点火价格: {this.state.priceString}
                  </Typography>
                  <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                    <Grid>
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid xs={2}></Grid>
                        {this.state.showRecommend ? (
                          <Grid>
                            <Button size="large" variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} disabled>
                              <Typography variant="button" component="h2" gutterBottom >
                                <font size="4">🔥   </font>&nbsp;   铸造
                              </Typography>
                            </Button>
                          </Grid>
                          
                        ) : (
                          <Grid>
                              <Button size="large" variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} onClick={this.shill}>
                              <Typography variant="button" component="h2" gutterBottom >
                                <font size="4">🔥   </font>&nbsp;   铸造
                              </Typography>
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                
              </Grid>
              <br /><br /><br /><br />
              {this.state.showRecommend ? (
                <Grid>
                  <Typography variant="h4" gutterBottom >
                    此NFT的子节点已经售完，我们给您推荐了其他还能购买的节点：
                  </Typography>
                  <Link onClick={this.handleClickLink} style={{ fontSize: 20, textDecoration: 'underline' }}>
                    {window.location.host + '/#/NFT/Spark/' + this.state.recommendNFT}
                  </Link>
                </Grid>
              ): (
                <div></div>
              )}
            </div>
            
            <br /><br />
          </Container>
      </main>
      </div>
    );
    }
  }
}

export default withStyles(styles, { withTheme: true })(NFTSpark);
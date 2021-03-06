import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import TopBar from "./TopBar";
import { Paper, Container, Link } from '@material-ui/core';
import axios from 'axios';
import contract from './contract';
import web3 from './web3';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
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
    width: 150,
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
    width: 150,
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
  title: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 48,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 60,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 70,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 75,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 80,
    },
  },
  title2: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 35,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 45,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 55,
    },
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
      backgroundColor: '#EFEBE9', width: 330, height: 420, marginLeft: 10 
    },
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: '#EFEBE9', width: 340, height: 440, marginLeft: 10 
    },
    [theme.breakpoints.between('md', 'lg')]: {
      backgroundColor: '#EFEBE9', width: 350, height: 465, marginLeft: 10
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      backgroundColor: '#EFEBE9', width: 350, marginLeft: 10 
    },
    [theme.breakpoints.up('xl')]: {
      backgroundColor: '#EFEBE9', width: 350, marginLeft: 10 
    },
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
      loadItem: true,
      open: false,
  };

  constructor(props) {
    super(props);
    console.log(this.state.loadItem)
    if (!window.ethereum) {
      alert("????????????metamask");
      //window.location.href = '/#/collections';
      return;
    }
    if (!window.ethereum.isConnected()) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      //window.location.href = '/#/collections';
    }
    // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
      if (chainId !== '0x4') {
        alert("????????????rinkeby network");
        // window.location.href = '/#/collections';
        return;
      }
    })
    
  }

  async componentDidMount() {
    let nft = contract;
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
      if (res.data.suggest_next_nft === this.props.match.params.id) {
        obj.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: false,
        })
      } else if (res.data.suggest_next_nft === '0') {
        obj.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: false
        })
      } else {
        obj.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: true
        })
      }
      obj.setState({
        loadItem: false
      })
    }).catch(error => {
      if (error.response === undefined) {
        alert('??????????????????')
        return;
      }
      console.log(error.response);
      if (error.response.status === 400 && error.response.data.message.includes("children not found")) {
        console.debug("no children")
      } else {
        alert('??????nft???????????????????????????(' + error + ')')
      }
      obj.setState({
        loadItem: false
      })
    })
    console.log(this.state.loadItem)
  }

  shill = async(event) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    let nft = contract;

    this.setState({ onLoading: true });
    const receipt = await nft.methods.acceptShill(this.props.match.params.id).send({
      from: account,
      value: this.state.price
    })
    alert('???????????????')
    this.setState({ 
      onLoading: false,
      onSale: true
    });
  }
  
  loadLoadingState = () => {
    this.setState({onloading: true});
    
  }

  handleClickLink = (event) => {
    var new_url = '/#/NFT/Spark/' + this.state.recommendNFT
    window.open(new_url)
  }

  render() {
    const { classes } = this.props
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
                    startIcon={<ArrowBackIosOutlinedIcon style={{ fontSize: '2rem' }} />}
                    href='/#/collections'
                    style={{ marginTop: 20, marginBottom: 10, fontSize: '2rem' }}
                  >
                    ?????????????????????
                  </Button>
                </Grid>
                <Grid xs={9}></Grid>
              </Grid>

              <Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
                <Typography color="inherit" noWrap className={classes.title}>
                  ???? NFT ????
                </Typography>
              </Grid>

              <div className={classes.paper}>
                {this.state.loadItem ? (
                  <Grid container spacing= {5} className={classes.content}>
                    <Grid item>
                      <Skeleton variant="rect" width={300} height={500} style={{ width: 370,marginLeft: 50, marginBottom: 50 }} />
                    </Grid>
                    <Grid item style={{ marginLeft: '5%' }}>
                      <Skeleton animation="wave" variant="text" width={200} height={30} />
                      <Skeleton animation="wave" variant="text" width={400} height={70} />
                      <Skeleton animation="wave" variant="rect" width={500} height={300} style={{ marginBottom: 50 }} />

                    </Grid>

                  </Grid>
                ) : (
                    <Grid container  spacing= {5} className={classes.content}>
                      {/* <Grid xs={2}></Grid> */}
                      <Grid item style={{ maxWidth: 200 }}>
                        <Paper className={classes.imagePapaer}>
                          <img className={classes.imageStyle} src={this.state.Cover}></img>
                        </Paper>
                      </Grid>
                      {/* <Grid xs={2}></Grid> */}
                      <Grid xs={1}></Grid>
                      <Grid item xs className={classes.content2} >
                        <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                          #{this.props.match.params.id}
                        </Typography>
                        <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34, marginTop: '2%' }}>
                          <b>{this.state.Name}</b>
                        </Typography>
                        <Typography align="left" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '100%', fontSize: 16 }}>
                          {this.state.Description}
                        </Typography>
                        <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '6%', maxWidth: '100%', fontSize: 24 }}>
                          ????????????: {this.state.priceString}
                        </Typography>
                        <Grid container direction="row"  className={classes.cbutton}>
                          <Grid>
                            <Grid container direction="row" justifyContent="center" alignItems="center">
                              <Grid xs={2}></Grid>
                              {this.state.showRecommend ? (
                                <Grid>
                                  <Button size="large" style={{ fontSize: '2rem' }}  variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} disabled>
                                    <Typography variant="button" component="h2" gutterBottom >
                                      <font size="4">????   </font >&nbsp;  <font size="3">??????  </font>  
                                    </Typography>
                                  </Button>
                                </Grid>

                              ) : (
                                <Grid>
                                  <Button size="large" style={{ fontSize: '3rem' }} variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} onClick={this.shill}>
                                    <Typography variant="button" component="h2" gutterBottom >
                                      <font size="4">????   </font>&nbsp;  <font size="3">??????  </font>  
                                    </Typography>
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>
                ) }
                {/* <Grid container direction="column" justifyContent="center" alignItems="center"> */}
                
                <br /><br /><br /><br />
                {this.state.showRecommend ? (
                  <Grid>
                    <Typography variant="h4" gutterBottom >
                      ???NFT??????????????????????????????????????????????????????????????????????????????
                    </Typography>
                    <Link onClick={this.handleClickLink} style={{ fontSize: 20, textDecoration: 'underline' }}>
                      {window.location.host + '/#/NFT/Spark/' + this.state.recommendNFT}
                    </Link>
                  </Grid>
                ) : (
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
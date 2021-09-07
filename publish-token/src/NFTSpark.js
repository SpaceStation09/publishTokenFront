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
import { Paper } from '@material-ui/core';
import NFT from "./ShillNFT";
import BuildIcon from '@material-ui/icons/Build';
import Web3 from 'web3';
import axios from 'axios';
import contract from './contract';
import web3 from './web3';

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



class NFTSpark extends Component{

  gateway = 'https://gateway.pinata.cloud/ipfs/';

  state = {
      Name: '',
      Description: '',
      BonusFee: 0,
      Cover: '',
      contract: null,
      price: '',
      priceString: '',
      Leaf:0
  };

  shill = async() => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    let nft = contract;
    nft.methods.acceptShill(this.props.match.params.id).send({
        from: account,
        value: this.state.price
    }).then(function(receipt){
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        alert("交易已上链");
    });

  }

  constructor(props)  {
    super(props);
    let nft = contract;
    let url = this.gateway + this.props.match.params.hash;
    nft.methods.tokenURI(this.props.match.params.id).call().then(meta => {
        let hash = meta.split('/');
  
        this.setState({hash: hash[hash.length-1]});
        axios.get(meta).then(res => {
          let data = res.data;
          let bouns;
          for(let i = 0; i < data.attributes.length; i++) {
            if(data.attributes[i].trait_type === 'bonusFee') {
              bouns = data.attributes[i].value;
            }
          }
          this.setState({Name: data.name});
          this.setState({Description: data.description});
          this.setState({BonusFee: bouns});
          this.setState({Cover: data.image});
        });
      });
      nft.methods.getShillPriceByNFTId(this.props.match.params.id).call().then(price => {
        this.setState({price: price});
        let etherPrice = web3.utils.fromWei(price, 'ether');
        etherPrice += ' ETH';
        this.setState({priceString: etherPrice});
      });
      let leafUrl = "" + "/api/v1/tree/children?" + this.props.match.params.id;
        axios.get(leafUrl).then(data => {
        this.setState({Leaf: data.children.length});
      
      });
  }

  render() {
    const { classes } = this.props
    const gateway = this.gateway
    return (
       <div>
        <Helmet>
          <title>Publish Token | Sprrk</title>
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
             🔥 NFT 🔥
          </Typography>
        </Grid>
        <Grid  container direction="row" justifyContent="center" alignItems="center">
          <Grid xs={3} >
              <Card className={classes.card} >
                  <CardMedia
                      className={classes.cardMedia}
                      image={this.state.Cover}
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
                
                  <Typography style={{ fontFamily: 'Teko', fontSize: 20}}  >
                  子叶数量: {this.state.Leaf}
                  </Typography>
                
              </Grid>
              <Grid xs ={2}></Grid>
              <Grid>
                
                  <Typography style={{ fontFamily: 'Teko', fontSize: 20}}  >
                    BonusFee: {this.state.BonusFee}
                  </Typography>
                
              </Grid>
            </Grid>
          </Grid>
          </Grid>
          <br /><br /><br />
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid>
            <Typography style={{  fontSize: 14}} >
                  点火价格: {this.state.priceString}
              </Typography>
            </Grid>
            <Grid xs={2}>
              
            </Grid>
            <Grid xs={3}></Grid>
            <Grid>
              <Button size="large" variant="outlined" color="secondary" target="_blank" className={classes.btnSecond}  onClick={this.shill}>
              
                <Typography variant="button" component="h2" color='white' gutterBottom >
                    <font size="4">🔥   </font>&nbsp;   铸造 
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

export default withStyles(styles, { withTheme: true })(NFTSpark);
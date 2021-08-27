
import React, { Component,useState,setState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
//import web3 from './web3';
import Web3 from 'web3';
import { CodeOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';
import TopBar from "./TopBar";
import BigNumber from 'bignumber.js';
import NFT from "./ShillNFT";
import { data } from 'jquery';
var $;
$ = require('jquery');

const theme = createTheme({
    palette: {
      primary: {
        main: '#FDFEFE',
      },
      secondary: {
        main: '#2196f3',
      }
    },
  });
  
const styles = theme => ({
	icon: {
	  marginRight: theme.spacing(2),
	},
    titleFont: {
        fontFamily: 'Teko',
      },
	btn: {
		color: '#424949',
		borderWidth: 8,
		borderColor: '#e3f2fd',
		fontSize: 16,
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(36, 0, 6),
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
		flexGrow: 2,
	},
    paper: {
        marginTop: theme.spacing(7),
        textAlign: 'center'
      },
      container: {
        maxWidth: '100%'
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
});

class Collections extends Component {
    gateway = 'https://gateway.pinata.cloud/ipfs/';
    web3;
    cards = [];
    // constructor(props) {
    //     super(props);
        
    //   }
    state = {
        isLogin: false,
        user_address: null,
        name: '',
        viewable: false
    };
    getAccount = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        this.setState({
            name : '22',
          });
        this.setState({ isLogin: true ,});
         this.setState({ user_address: account ,});
         //setUser(account);
    }

    loadNft = async () => {
        if(!window.ethereum.isConnected()) {
            alert("请先链接metamask");
            return;
        }
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log(chainId);
        if(chainId !== '0x4') {
            alert("请切换至rinkeby网络");
            return;
        }
        document.getElementById('viewButton').innerHTML = '正在加载。。';
        this.web3 = new Web3(window.ethereum);
        this.web3.eth.getBlockNumber().then(console.log);
        let nft = new this.web3.eth.Contract(NFT.abi, NFT.address);
        this.cards = [];

        let ids = await this.getNft(nft);

        if(ids.length == 0) {
          alert("暂无可展示NFTs");
          document.getElementById('viewButton').innerHTML = '查看我的收藏';
          return;
        }
        let data = await this.getMetadata(nft, ids);
        for(let i = 0; i < ids.length; i++) {
            let element = {
                id: ids[i],
                title: data[i].Name,
                description: data[i].description,
                bonusFee: data[i].BonusFee,
                image: data[i].Cover,
            }
            this.cards.push(element);
        }
        document.getElementById('viewButton').innerHTML = '玩得尽兴！';
        
        this.setState({viewable: true ,});
    };


    getMetadata = async (nft, id) => {
      let metaDatas = [];
      for(let i = 0; i < id.length; i++) {
        let meta = await nft.methods.tokenURI(id[i]).call();

        let data = await $.getJSON(meta);
        metaDatas.push(data);
      }
      return metaDatas;
    }

    getNft = async(nft) => {
      var number = new BigNumber(10);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      let sendOption = {
        filter: {from: account},
        fromBlock: "9186438",
      }
      let receiveOption = {
        filter: {to: account},
        fromBlock: "9186438",
      }
      let sendLog = await nft.getPastEvents("Transfer", sendOption);
      let receiveLog = await nft.getPastEvents("Transfer", receiveOption);
      let showId = [];
      let balanceMap = new Map();
      sendLog.map( (log) => {
        let id = log.returnValues.tokenId;
        showId.push(id);
        if(typeof(balanceMap.get(id)) == 'undefined') {
          balanceMap.set(id, -1);
        }else {
          balanceMap.set(id, balanceMap.get(id) - 1);
        }
      });
      receiveLog.map( (log) => {
        let id = log.returnValues.tokenId;
        //console.log(log.returnValues.tokenId);
        showId.push(id);
        if(typeof(balanceMap.get(id)) == 'undefined') {
          balanceMap.set(id, 1);
        } else{
          balanceMap.set(id, balanceMap.get(id) + 1);
        }
      });
      
      let viewMap = new Map();
      let balanceId = [];
      showId.map( (id) => {
        //console.log(typeof(viewMap.get(id)) == 'undefined');
        if(typeof(viewMap.get(id)) == 'undefined' || viewMap.get(id) == false ) {
          if(balanceMap.get(id) > 0) {
            balanceId.push(id);
          }
          viewMap.set(id, false);
        }
        
      });
    console.log(balanceId.length);
      return balanceId;
  };

    
    
   
    

	render(){
        //const [user_address, setUser] = useState();
        const ethereumButton = document.querySelector('.enableEthereumButton');
        const showAccount = document.querySelector('.showAccount');
        //const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11];
        const { classes } = this.props
        const gateway = this.gateway;
        // 

        
        window.ethereum.on('chainChanged', handleChainChanged);

        function handleChainChanged(_chainId) {
        // We recommend reloading the page, unless you must do otherwise
            window.location.reload();
        }
		
        const account_info =  () => {
            if(this.state.user_address !== null) {
                // window.web3.version;
                //this.getAccount();
                return (<Grid item xs={1}>{this.state.user_address}</Grid>);
            } else {
                return (
                    <Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} onClick={this.getAccount}>
							{<p>connect wallet</p>}
					</Button>
                );
            }
            return (<p>connect</p>);
        }

        const setAccount = () => {
            if (typeof window.ethereum == 'undefined') {
                alert('MetaMask is not installed!');
                return;
            }
            if(!window.ethereum.isConnected()) return
            const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11];
            return cards;
            
        }
        
        function showCard(card) {
            console.log(gateway + card.image);
            let res = (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={gateway + card.image}
                            title="Image title" 
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                <b>{card.title}</b>
                            </Typography>
                            <Typography>
                                {card.description}
                                {/* It contains 41 articles he published between 1918-1924.
                                    Sharp, poignant, varying vastly on their topic, length, and style, these articles redefined the genre of "essay" in Chinese literature,
                                    as well as played an important part in the new cultural movement. */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained"  color="primary" target="_blank" href={'/#/NFT/' +  card.id} >

                                <b>查看 </b>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
            
            return res;

        }
		return (
			<div>
				<Helmet>
					<title>Publish Token | Marketplace</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
                    <TopBar />
                    <Container component="main" className={classes.container}>
            <div className={classes.paper}>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 70, marginTop: 70}}>
                    <b>我的收藏馆</b>
                  </Typography>
                  <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 30}}>
                    <b>A ERC721 Token Trying to Solve Existing Publishing Dilemma</b>
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid item xs={3} >
                      <Button size="large" variant="contained" color="secondary" id='viewButton' className={classes.btnMain} onClick={this.loadNft}>
                        <b>查看我的收藏</b>
                      </Button>
                    </Grid>
                    {/* <Grid item xs={3} >
                      <Button size="large" variant="outlined" color="secondary" className={classes.btnSecond} href='/#/buy'>
                        <b>去购买</b>
                      </Button>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Container>
				</ThemeProvider>
				<main>
					{this.state.viewable?<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{
                                   this.cards.map((card) => {
                                        return showCard(card);
                                    })
                            }
						</Grid>
					</Container>:null}
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Collections);
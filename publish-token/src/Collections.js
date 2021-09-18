
import React, { Component} from 'react';

import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import {  Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
//import web3 from './web3';
// import Web3 from 'web3';
import contract from './contract';
import TopBar from "./TopBar";
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';

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
    title: {
      fontFamily: 'Teko',
      marginTop: '25%',
      [theme.breakpoints.between('xs', 'sm')]: {
        fontSize: 35,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 40,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 55,
      },
      [theme.breakpoints.between('lg', 'xl')]: {
        fontSize: 110,
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: 130,
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
        viewable: false,
        cards: [],
        onloading: false,
        SkeletoNumber: 0
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

        if(chainId !== '0x4') {
            alert("请切换至rinkeby网络");
            return;
        }
        document.getElementById('viewButton').innerHTML = '正在加载。。';
        let nft = contract;
        let cards = [];

        let ids = await this.getNft(nft);

        if(ids.length === 0) {
          alert("暂无可展示NFTs");
          document.getElementById('viewButton').innerHTML = '查看我的收藏';
          return;
        } else {

        }
        let data = await this.getMetadata(nft, ids);

        for(let i = 0; i < ids.length; i++) {
            let element = {
                id: ids[i],
                title: data[i].name,
                description: data[i].description,
                bonusFee: data[i].attributes.value,
                image: data[i].image,
            }
            cards.push(element);
        }
        document.getElementById('viewButton').innerHTML = '玩得尽兴！';
        
        this.setState({viewable: true ,});
        this.setState({cards: cards ,});
        this.setState({
          onloading: false,
          SkeletoNumber: 0
        })
    };


    getMetadata = async (nft, id) => {
      let metaDatas = [];
      for(let i = 0; i < id.length; i++) {
        let ipfs_link = await nft.methods.tokenURI(id[i]).call();
        var ipfs_hash_arr = ipfs_link.split('/')
        var ipfs_hash = ipfs_hash_arr[ipfs_hash_arr.length -1]
        var meta = "https://gateway.pinata.cloud/ipfs/" + ipfs_hash
        // console.debug("meta: " + id[i] + " " + meta)
        await axios({
          method: 'get',
          url: meta,
          timeout: 1000 * 3,
        }).then(res => {
          console.log("meta: ", res.data)
          metaDatas.push(res.data)
        }).catch(error => {
          console.log('time out')
          console.debug(meta)
          var name_holder = 'SparkNFT#' + id[i]
          var placeholder = {
            "name": name_holder,
            "description": '暂时无法获取到该nft的相关描述',
            "image": 'https://testnets.opensea.io/static/images/placeholder.png',
            "attributes": [
              {
                "display_type": "boost_percentage",
                "trait_type": "Bonuse Percentage",
                "value": 0
              },
              {
                "trait_type": "File Address",
                "value": 'file_url'
              }
            ]
          }
          metaDatas.push(placeholder);
        })
      }
      return metaDatas;
    }

    getNft = async(nft) => {
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
        if(typeof(viewMap.get(id)) === 'undefined' || viewMap.get(id) === false ) {
          if(balanceMap.get(id) > 0) {
            balanceId.push(id);
          }
          viewMap.set(id, true);
        }
        
      });

      if(balanceId.length > 0) {
        this.setState({
          onloading: true,
          SkeletoNumber: balanceId.length
        })
      }
      return balanceId;
  };

    
  renderDescription = (description) => {
    if(description.length <= 150) {
    
      return (description);
    } else {
        let newDescription = description.substring(0,150) + "..........";
        return (newDescription); 
    }
}
   
    

	render(){
        //const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11];
        const { classes } = this.props
        // 

        let obj = this;
        window.ethereum.on('chainChanged', handleChainChanged);

        function handleChainChanged(_chainId) {
        // We recommend reloading the page, unless you must do otherwise
            window.location.reload();
        }
        
        function showCard(card) {
            let res = (
                <Grid item xs={12} sm={6} md={4}>
                  {
                  card ?(<Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.image}
                        title="Image title" 
                      />
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        <b>{card.title}</b>
                    </Typography>
                    <Typography>
                        {obj.renderDescription(card.description)}
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained"  color="primary" target="_blank" href={'/#/NFT/' +  card.id} >
                            <b>查看 </b>
                        </Button>
                        <Grid xs={3}></Grid>
                        <Typography variant="body2" gutterBottom>
                        <b>NFT id: {card.id} </b>
                        </Typography>
                    </CardActions>
                    </Card>):(
                      <Card className={classes.card}>
                        <Skeleton variant="rect" style={{marginLeft:70,}} width={260} height={288} />
                        <Skeleton width="60%" style={{marginTop:40,}} height={33} />
                        <Skeleton height={33}/>
                        <Skeleton height={33}/>
                        <Skeleton height={33}/>
                      </Card>
                    )
                  }          
                </Grid>
            );
            
            return res;

        }
		return (
			<div>
				<Helmet>
					<title>Publish Token | Collections</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
                    <TopBar />
                    <Container component="main" className={classes.container}>
            <div className={classes.paper}>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <Typography color="inherit" noWrap className={classes.title}>
                    <b>我的收藏馆</b>
                  </Typography>
                  <Typography color="inherit" noWrap className={classes.title2}>
                    <b>A ERC721 Token Trying to Solve Existing Publishing Dilemma</b>
                  </Typography>
                  <Grid container justifyContent="center" spacing={5}>
                    <Grid  >
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
					{<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{
                (this.state.onloading?Array.from(new Array(this.state.SkeletoNumber)):this.state.cards).map((card) => {
                      return showCard(card);
                  })
              }
						</Grid>
					</Container>}
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Collections);
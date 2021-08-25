
import React, { Component,useState,setState } from 'react';
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
});

class Collections extends Component {
    
    // constructor(props) {
    //     super(props);
        
    //   }
    state = {
        isLogin: false,
        user_address: null,
        name: ''
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

	render(){
        //const [user_address, setUser] = useState();
        const ethereumButton = document.querySelector('.enableEthereumButton');
        const showAccount = document.querySelector('.showAccount');
        
        const { classes } = this.props
		const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // 

        
        
		
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

        const setAccount = async() => {
            if (typeof window.ethereum == 'undefined') {
                alert('MetaMask is not installed!');
                return;
            }
            window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        function showCard(card) {
            let res = (
                <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://pic3.zhimg.com/v2-9ff4eafdba05f4e68e2fd1a1c0da5a5a_r.jpg"
                            title="Image title" 
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                <b>Hot Wind</b>
                            </Typography>
                            <Typography>
                                This is the first collection of short essays/commentaries by Lu Xun.
                                {/* It contains 41 articles he published between 1918-1924.
                            Sharp, poignant, varying vastly on their topic, length, and style, these articles redefined the genre of "essay" in Chinese literature,
                            as well as played an important part in the new cultural movement. */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" href='/#/NFT' target="_blank">
                                <b>Details </b>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
            
            return res;
            // cards.map((card) => {
            //     //alert(card);			
            //     return (
            //         <Grid item key={card} xs={12} sm={6} md={4}>
            //             <Card className={classes.card}>
            //                 <CardMedia
            //                     className={classes.cardMedia}
            //                     image="https://pic3.zhimg.com/v2-9ff4eafdba05f4e68e2fd1a1c0da5a5a_r.jpg"
            //                     title="Image title" 
            //                 />
            //                 <CardContent className={classes.cardContent}>
            //                     <Typography gutterBottom variant="h5" component="h2">
            //                         <b>Hot Wind</b>
            //                     </Typography>
            //                     <Typography>
            //                         This is the first collection of short essays/commentaries by Lu Xun.
            //                         {/* It contains 41 articles he published between 1918-1924.
            //                     Sharp, poignant, varying vastly on their topic, length, and style, these articles redefined the genre of "essay" in Chinese literature,
            //                     as well as played an important part in the new cultural movement. */}
            //                     </Typography>
            //                 </CardContent>
            //                 <CardActions>
            //                     <Button size="small" color="primary" href='/#/NFT' target="_blank">
            //                         <b>Details </b>
            //                     </Button>
            //                 </CardActions>
            //             </Card>
            //         </Grid>
               
            //         );
            // }
        // )
        }
		return (
			<div>
				<Helmet>
					<title>Publish Token | Marketplace</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
                    <TopBar />
				</ThemeProvider>
				<main>
					<div className={classes.heroContent}>
						<Container maxWidth="sm">
							<Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
								My Collection
							</Typography>
							<Typography variant="h5" align="center" color="textSecondary" paragraph>
								You can explore the marketplace and buy the NFT you like here. 
								If you are interested in any NFT, please click 'Details' button for detail.
							</Typography>
						</Container>
					</div>

					<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{
                               
                               cards.map((card) => {
                                
                                return showCard(card);
                                
                               })
                            }
						</Grid>
					</Container>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Collections);
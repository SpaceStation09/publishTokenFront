import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { blue} from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import 'antd/dist/antd.css';
import TopBar from './TopBar';

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
	btnSell: {
		marginTop: 50,
		margin: theme.spacing(1),
		fontSize: 20,
		borderRadius: 25,
		color: '#FFFFFF',
		backgroundColor: '#2196f3',
		width: '50%'
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
    width: '170%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
});

class Sell extends Component {
	state = {
    toAddress: '',
		price: 0,
		token_addr: '',
		NFT_id: 0
  };

	handleGetToAddr = (e) => {
		this.setState({
      toAddress : e.target.value,
    })
	}

	handleGetSellPrice = (e) => {
		var price = 0
		if(e.target.value >= 0) price = e.target.value
		this.setState({
      price : price,
    })
	}

	handleGetTokenAddr = (e) => {
		this.setState({
      token_addr : e.target.value,
    })
	}

	handleGetNFTId = (e) => {
		var id = 0
		if(e.target.value >= 0) id = e.target.value
		this.setState({
      NFT_id : id,
    })
	}

	render(){
		const { classes } = this.props
		return (
			<div className="App">
				<Helmet>
					<title>Publish Token | Sell</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
					<TopBar />
					<Container component="main" maxWidth="xs">
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<MonetizationOnOutlinedIcon style={{ fontSize: 30 }}/>
							</Avatar>
							<Typography component="h1" variant="h3">
								Sell Information
							</Typography>
							<form className={classes.form} noValidate>
								<Grid container spacing={2}>
									<Grid item xs={12} >
										<TextField
											variant="outlined"
											required
											fullWidth
											label="To Address"
											autoFocus
											onChange = {this.handleGetToAddr}
											value = {this.state.toAddress}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											type = "number"
											required
											fullWidth
											label="Sell Price"
											onChange = {this.handleGetSellPrice}
											value = {this.state.price}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											label="Payment Token Address"
											onChange = {this.handleGetTokenAddr}
											value = {this.state.token_addr}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											type = "number"
											required
											fullWidth
											label="NFT ID"
											onChange = {this.handleGetNFTId}
											value = {this.state.NFT_id}
										/>
									</Grid>
								</Grid>
							</form>
							<Button 
								variant="contained" 
								color="primary" 
								startIcon={<LocalAtmIcon />}
								className={classes.btnSell}
							>
								<b>Sell</b>
							</Button>
						</div>
					</Container>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Sell);
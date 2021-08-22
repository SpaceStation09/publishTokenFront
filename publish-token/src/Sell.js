import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { blue} from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import 'antd/dist/antd.css';

const theme = createTheme({
	palette: {
		primary: blue,
	},
		typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
});

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  btn: {
    color: theme.palette.getContrastText(blue[500]),
		borderWidth: 2,
		borderColor: '#e3f2fd',
		fontSize: 14,
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
	fileBtn: {
		padding: '10px 30px 10px 30px',
    background: '#66C1E4',
    border: 'none',
    color: '#FFF',
    boxShadow: '1px 1px 1px #4C6E91',
	},
	button: {
    margin: theme.spacing(1),
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
			<React.Fragment>
				<Helmet>
					<title>Publish Token | Publish</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
					<AppBar position="static" style={{height: '80px'}}>
						<Toolbar style={{marginTop: '10px'}}>
							<Typography variant="h2" color="inherit" noWrap style={{marginLeft: "120px"}}>
								<b>Publish Token</b>
							</Typography>
							<Button variant="outlined" size="large" style={{marginLeft: "50%"}} className={classes.btn} href='/'>
								<b>HOME PAGE</b>
							</Button>
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/buy'>
								<b>GO TO BUY</b>
							</Button>
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/publish'>
								GO TO Publish
							</Button>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
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
						<Button variant="contained" size="large" color="Primary" style={{marginTop: "10%", width: 150, height: 40}} >
							<b>Sell</b>
						</Button>
					</div>
				</Container>
			</React.Fragment>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Sell);
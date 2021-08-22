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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
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
    marginTop: theme.spacing(10),
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

const props = {
  name: 'file',
  multiple: true,
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


// function Publish() {
class Publish extends Component {
	state = {
    name: '',
		total_edition_num: 0,
		sharing_percentage: 0,
		inputs: [],
		payments: {
			0: {
				"address": '',
				"baseline": 0,
				"price": 0
			}
		},
  };

	handleGetPubName = (event) => {
		this.setState({
      name : event.target.value,
    })
	}

	handleGetTotalEditionNum = (event) => {
		var edition_num = 0
		if(event.target.value >= 0) edition_num = event.target.value
		this.setState({
      total_edition_num : edition_num,
    })
	}

	handleGetSharingPercent = (event) => {
		var sharing_percentage = event.target.value
		if(event.target.value < 0) sharing_percentage = 0
		if(event.target.value > 100) sharing_percentage = 100
		this.setState({
      sharing_percentage : sharing_percentage,
    })
	}

	handleAdd = (event) => {
		var inputs = this.state.inputs
		inputs.push(this.state.inputs.length + 1)
		this.setState({
      inputs : inputs,
    })
		var pay = {
			"address": '',
			"baseline": 0,
			"price": 0
		}
		var len = Object.keys(this.state.payments).length
		var pays = this.state.payments
		pays[len] = pay
		this.setState({
      payments : pays,
    })
	}

	handleGetAddress = (index, event) => {
		if (this.state.payments[index] == undefined){
			var pay = {}
			pay["address"] = event.target.value
			var pays = {}
			pays[index] = pay
			this.setState({
				payments : pays,
			})
		}else {
			var pay = this.state.payments[index]
			pay["address"] = event.target.value
			var pays = this.state.payments
			pays[index] = pay
			this.setState({
				payments : pays,
			})
		}
	}

	handleGetBaseline = (index, event) => {
		if (this.state.payments[index] == undefined){
			var pay = {}
			pay["baseline"] = event.target.value
			var pays = {}
			pays[index] = pay
			this.setState({
				payments : pays,
			})
		}else {
			var pay = this.state.payments[index]
			pay["baseline"] = event.target.value
			var pays = this.state.payments
			pays[index] = pay
			this.setState({
				payments : pays,
			})
		}
	}

	handleGetSellPrice = (index, event) => {
		if (this.state.payments[index] == undefined){
			var pay = {}
			pay["price"] = event.target.value
			var pays = {}
			pays[index] = pay
			this.setState({
				payments : pays,
			})
		}else {
			var pay = this.state.payments[index]
			pay["price"] = event.target.value
			var pays = this.state.payments
			pays[index] = pay
			this.setState({
				payments : pays,
			})
		}
		console.log(this.state.payments[index]["address"])
	}

	submit = (event) => {
		event.preventDefault();
		let formData = new FormData(event.target)
		fetch('http://127.0.0.1:3001/file/upload', {
			method: 'POST',
			body: formData
		}).then(response => console.log(response))
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
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/sell'>
								GO TO SELL
							</Button>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<InfoOutlinedIcon style={{ fontSize: 30 }}/>
						</Avatar>
						<Typography component="h1" variant="h3">
							Publication Information
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} >
									<TextField
										variant="outlined"
										required
										fullWidth
										id="firstName"
										label="Publication Name"
										autoFocus
										onChange = {this.handleGetPubName}
										value = {this.state.name}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										type = "number"
										required
										fullWidth
										label="Total Edition Amount"
										onChange = {this.handleGetTotalEditionNum}
										helperText="Please note that the total edition amount should be larger than 0"
										value = {this.state.total_edition_num}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										type = "number"
										required
										fullWidth
										label="Sharing Percentage"
										onChange = {this.handleGetSharingPercent}
										value = {this.state.total_edition_num}
										helperText="Please note that the sharing percentage should be between 0 - 100"
									/>
								</Grid>
								<React.Fragment>
									<Grid item xs={6}>
										<TextField
											variant="outlined"
											type = "text"
											required
											fullWidth
											label="Payment Token Address"
											onChange = {this.handleGetAddress.bind(this, 0)}
											value = {this.state.payments[0]["address"]}
										/>
									</Grid>
									<Grid item xs={2}>
										<TextField
											variant="outlined"
											type = "number"
											required
											fullWidth
											label="Baseline"
											onChange = {this.handleGetBaseline.bind(this, 0)}
											value = {this.state.payments[0]["baseline"]}
										/>
									</Grid>
									<Grid item xs={2}>
										<TextField
											variant="outlined"
											type = "number"
											required
											fullWidth
											label="Sell Price"
											onChange = {this.handleGetSellPrice.bind(this, 0)}
											value = {this.state.payments[0]["price"]}
										/>
									</Grid>
									<Grid container justifyContent="flex-end" xs={2}>
										<Button variant="contained" color="primary" size="large" onClick={this.handleAdd}> + </Button>
									</Grid>
									<div>
										{
											this.state.inputs.map((item, index) => {
												return(
													<Grid container spacing={2} key={index} style={{marginLeft: "1px"}}>
													{/* <div key={index}> */}
														<Grid item>
															<TextField
																variant="outlined"
																type = "text"
																required
																fullWidth
																label="Payment Token Address"
																style={{width: "330px"}}
																onChange = {this.handleGetAddress.bind(this, index+1)}
																value = {this.state.payments[index+1]["address"]}
															/>
														</Grid>
														<Grid item >
															<TextField
																variant="outlined"
																type = "number"
																required
																fullWidth
																label="Baseline"
																style={{width: "95px"}}
																onChange = {this.handleGetBaseline.bind(this, index+1)}
																value = {this.state.payments[index+1]["baseline"]}
															/>
														</Grid>
														<Grid item>
															<TextField
																variant="outlined"
																type = "number"
																required
																fullWidth
																label="Sell Price"
																style={{width: "95px"}}
																onChange = {this.handleGetSellPrice.bind(this, index+1)}
																value = {this.state.payments[index+1]["price"]}
															/>
														</Grid>
													</Grid>
												)
											})
										}
									</div>
								</React.Fragment>
							</Grid>
						</form>
						<Dragger style = {{marginTop: 50, width: 650, minHeight: 150}}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
							<p className="ant-upload-hint">
								Support for a single or bulk upload. Strictly prohibit from uploading company data or other
								band files
							</p>
						</Dragger>
						{/* <Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/'>
							Publish
						</Button> */}
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							startIcon={<CloudUploadIcon />}
							style = {{marginTop: 50, width: 150, height: 40, marginBottom: 50}}
						>
							Publish
						</Button>

					</div>
				</Container>
			</React.Fragment>
			
		);
	}
}

export default withStyles(styles, { withTheme: true })(Publish);
import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { blue} from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
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
    marginTop: theme.spacing(7),
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
		fontSize: 20,
		borderRadius: 25,
		color: '#FFFFFF',
		backgroundColor: '#2196f3'
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
			<div>
				<Helmet>
					<title>Publish Token | Publish</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
					<TopBar />
					<Container component="main" maxWidth="xs">
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<InfoOutlinedIcon style={{ fontSize: 30 }}/>
							</Avatar>
							<Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu'}}>
								<b>Publication Information</b>
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
							<Button
								variant="contained"
								className={classes.button}
								startIcon={<CloudUploadIcon />}
								style = {{marginTop: 50, width: 200, height: 50, marginBottom: 50}}
							>
								Publish
							</Button>

						</div>
					</Container>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Publish);
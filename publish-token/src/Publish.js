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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Input, InputNumber } from 'antd';
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
	input: {
		height: 40,
		borderRadius: 5,
	},
	inputNum: {
		height: 40,
		borderRadius: 5,
		width: 675,
		fontSize: 20,
	}
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
		bonusFee: 0,
		price: 0
  };

	handleGetPubName = (event) => {
		this.setState({
      name : event.target.value,
    })
	}

	handleGetBonusFee = (value) => {
		this.setState({
			bonusFee : value,
    })
	}

	handleGetPrice = (value) => {
		this.setState({
			price: value,
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
							<Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu'}}>
								<b>发布作品信息</b>
							</Typography>
							<form className={classes.form} noValidate>
								<Grid container spacing={2}>
									<Grid item xs={12} >
										<label for="pubName" style= {{fontSize: 16, marginBottom: 10, marginLeft: 5}}>作品名字 *</label>
										<Input 
											placeholder="Publication Name" 
											allowClear 
											id="pubName"
											onChange={this.handleGetPubName}
											value={this.state.name}
											className={classes.input}
										/>
									</Grid>
									<Grid item xs={12}>
										<label for="bonusFee" style={{ fontSize: 16, marginBottom: 10, marginLeft: 5 }}>抽成比例 *</label>
										<InputNumber
											id="bonusFee"
											defaultValue={0}
											min={0}
											max={100}
											formatter={value => `${value}%`}
											parser={value => value.replace('%', '')}
											onChange={this.handleGetBonusFee}
											className={classes.inputNum}
										/>
									</Grid>
									<Grid item xs={12}>
										<label for="price" style={{ fontSize: 16, marginBottom: 10, marginLeft: 5 }}>售卖价格 *</label>
										<InputNumber
											id="price"
											defaultValue={0}
											min={0}
											onChange={this.handleGetPrice}
											className={classes.inputNum}
										/>
									</Grid>
								</Grid>
							</form>
							<Dragger style = {{marginTop: 50, width: 680, minHeight: 200}}>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
								<p className="ant-upload-hint">
									支持单个文件的上传和多个文件的上传，支持多种类型文件的上传
								</p>
							</Dragger>
							
							<Button
								variant="contained"
								className={classes.button}
								startIcon={<CloudUploadIcon />}
								style = {{marginTop: 50, width: 200, height: 50, marginBottom: 50}}
							>
								发布作品
							</Button>

						</div>
					</Container>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Publish);
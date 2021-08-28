import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { blue} from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Input, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import TopBar from './TopBar';
import axios from 'axios';
import contract from './contract';
import web3 from './web3';

const {
	pinata_api_key,
	pinata_secret_api_key,
} = require('./project.secret');
const FormData = require('form-data');


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



// function Publish() {
class Publish extends Component {
	state = {
    name: '',
		bonusFee: 0,
		price: 0,
		buffer: null,
		fileList: [],
		ipfsHashPub: '',
		ipfsHashCover: '',
		ipfsHashMeta: '',
		description: '',
		shareTimes: 0,
  };

	async componentDidMount() {
	}

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

	handleGetShareTimes = (value) => {
		this.setState({
			shareTimes: value,
		})
	}

	handleGetDescription = (e) => {
		this.setState({
			description: e.target.value,
		})
	}

	submit = async (event) => {
		/*TODO: call smart contract publish() and wait for publish success event
		 * then call backend to get a secret key. Then encrypt the pdf file and upload it to IPFS
		 * Finally, form a new metadata json file and send its ipfs hash to backend and publish it
		*/
	}


	render(){
		const { classes } = this.props
		let obj = this
		const { TextArea } = Input;
		const prop = {
			name: 'file',
			multiple: true,
			action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
			headers: {
				pinata_api_key: pinata_api_key,
				pinata_secret_api_key: pinata_secret_api_key
			},
			data: this.state.buffer,
			beforeUpload: file => {
				return new Promise((resolve, reject) => {
					try{
						const reader = new FileReader()
						reader.readAsArrayBuffer(file)
						reader.onload = (e) => {
							var b = e.target.result
							let params = new FormData()
							params.append('file', b)
							this.setState({
								buffer: params
							})
						}
						resolve()
					} catch (e){
						message.error('Read file error')
						reject()
					}
				})
			},
			onChange(info) {
				const imgType = ['png', 'jpg', 'jpeg', 'svg']
				const { status } = info.file;
				// if (status !== 'uploading') {
					
				// }
				if (status === 'done') {
					var fileName = info.file.name
					var index = fileName.lastIndexOf('.')
					var ext = fileName.substr(index + 1)
					var isImg = (imgType.indexOf(ext.toLowerCase()) != -1)
					if(isImg){
						obj.setState({
							ipfsHashCover: info.file.response.IpfsHash
						})
					}
					if(obj.state.ipfsHashCover !== ''){
						var JSONBody = {
							"Name": obj.state.name,
							"Description": obj.state.description,
							"BonusFee": obj.state.bonusFee,
							"Cover": obj.state.ipfsHashCover,
						}
						const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
						axios
							.post(url, JSONBody, {
								headers: {
									pinata_api_key: pinata_api_key,
									pinata_secret_api_key: pinata_secret_api_key
								},
							})
							.then(function (response) {
								obj.setState({
									ipfsHashMeta: response.data.IpfsHash
								})
							})
					}
					// TODO: call backend to publish on IPFS.
					
					message.success(`${info.file.name} file uploaded successfully.`);
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
			onDrop(e) {
				console.log('Dropped files', e.dataTransfer.files);
			},
		};

		return (
			<div>
				<Helmet>
					<title>SparkNFT | Sell</title>
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
										<label for="pubName" style= {{fontSize: 18, marginBottom: 10}}>作品名字 *</label>
										<Input 
											placeholder="作品名称" 
											allowClear 
											id="pubName"
											onChange={this.handleGetPubName}
											value={this.state.name}
											className={classes.input}
										/>
									</Grid>
									<Grid item xs={12}>
										<label for="bonusFee" style={{ fontSize: 18,  marginTop: 20 }}>收益比例 *</label>
										<p style={{ fontSize: 12}}>当您的作品被成功分享时，您希望从分享价格中获得多少比例的收益</p>
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
										<label for="price" style={{ fontSize: 18, marginTop: 20 }}>售卖价格 *</label>
										<InputNumber
											id="price"
											defaultValue={0}
											min={0}
											onChange={this.handleGetPrice}
											className={classes.inputNum}
										/>
									</Grid>
									<Grid item xs={12}>
										<label for="shareTimes" style={{ fontSize: 18, marginTop: 20 }}>最高分享次数 *</label>
										<p style={{ fontSize: 12 }}>您希望每一个帮助您传播的用户最多能够分享多少次？</p>
										<InputNumber
											id="shareTimes"
											defaultValue={0}
											min={0}
											onChange={this.handleGetShareTimes}
											className={classes.inputNum}
										/>
									</Grid>
									<Grid item xs={12}>
										<label for="Description" style={{ fontSize: 18, marginTop: 20 }}>作品描述 *</label>
										<p style={{ fontSize: 12 }}>请用简单的话语对您的作品进行描述，精准有效的描述能帮助其他用户更准确得了解您的作品</p>
										<TextArea 
											rows={4} 
											id="Description"
											onChange={this.handleGetDescription}
										/>
									</Grid>
								</Grid>
								<label style={{ fontSize: 18, marginTop: 50 }}>作品文件及其封面 *</label>
								<p style={{ fontSize: 12 }}>请在下方区域上传您的作品文件以及封面文件 <br />
									封面文件支持这些格式：PNG, JPG, SVG； 作品文件支持这些格式：TXT， PDF</p>
								<Dragger {...prop} style = {{width: 680, minHeight: 200}} id= "Uploader">
									<p className="ant-upload-drag-icon">
										<InboxOutlined />
									</p>
									<p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
									<p className="ant-upload-hint">
										支持单个文件的上传和多个文件的上传，支持多种类型文件的上传
									</p>
								</Dragger>
							</form>
							<Button
								variant="contained"
								className={classes.button}
								startIcon={<CloudUploadIcon />}
								style = {{marginTop: 50, width: 200, height: 50, marginBottom: 50}}
								onClick={this.submit}
							>
								发布作品
							</Button>
							<Button size="large" style={{ marginLeft: "1%" }} className={classes.btn} href='/#/sellSingle/0xf1372aa438bd72497e48747f627452b31aad456e2dc0093ae01badc94a10f28d'>
								<b>售卖</b>
							</Button>
						</div>
					</Container>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Publish);
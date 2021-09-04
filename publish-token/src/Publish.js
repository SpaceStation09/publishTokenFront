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
import ReactLoading from 'react-loading';


const {
	pinata_api_key,
	pinata_secret_api_key,
} = require('./project.secret');
const FormData = require('form-data');
const bs58 = require('bs58');
const IPFS = require('ipfs-core')
const CID = require('cids')


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
// 64EC88CA00B268E5BA1A35678A1B5316D212F4F366B2477232534A8AECA37F3C


// function Publish() {
class Publish extends Component {
	state = {
    name: '',
		bonusFee: 0,
		price: 0,
		buffer: null,
		fileList: [],
		ipfsHashCover: '',
		ipfsMeta: '',
		ipns: '',
		description: '',
		shareTimes: 0,
		onLoading: false,
  };

	async componentDidMount() {
		var url = "http://127.0.0.1:5001/api/v0/key/gen?arg=myKey"
		let obj = this
		// axios.post(url)
		// 	.then(function (response) {
		// 		console.log(response.data)
		// 	})
		// var JSONBody = {
		// 	"name": "placeholder",
		// }
		// let ipfs_placeholder
		// await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', JSONBody, {
		// 		headers: {
		// 			pinata_api_key: pinata_api_key,
		// 			pinata_secret_api_key: pinata_secret_api_key
		// 		},
		// 	})
		// 	.then(function (response) {
		// 		ipfs_placeholder = response.data.IpfsHash
		// 	})
		// console.log("placeholder: " + ipfs_placeholder)
		var ipfs_placeholder = 'QmRTBQ45crscU7pehhDXivdLn4EwFWQYahVn7GspBn2mrg'
		this.setState({
			onLoading: true
		})
		var url_publish = 'http://127.0.0.1:5001/api/v0/name/publish?arg=' + ipfs_placeholder + '&key=myKey'
		console.log('url_publish: ' + url_publish)
		axios.post(url_publish)
			.then(function (response) {
				console.log(response.data.Value)
				obj.setState({
					ipns: response.data.Value,
					onLoading: true
				})
			})
		
		
		// var url_rm = 'http://127.0.0.1:5001/api/v0/key/rm'
		// var param_rm = {
		// 	arg: 'myKey'
		// }
		// axios.post(url_rm, param_rm)
		// 	.then(function (response) {
		// 		console.log(response.data)
		// 	})
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
		// if (this.state.price === 0 || this.state.bonusFee === 0 || this.state.shareTimes === 0 || this.state.ipfsMeta === ''){
		// 	alert("你有信息尚未填写")
		// }else {
		// 	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		// 	const account = accounts[0];

		// 	var price_eth = web3.utils.toWei(this.state.price.toString())
		// 	console.log("price_eth: " + price_eth)
		// 	console.log("bonusFee: " + this.state.bonusFee)
		// 	console.log("shareTimes: " + this.state.shareTimes)
		// 	console.log("ipfsMeta: " + this.state.ipfsMeta)
		// 	this.setState({
		// 		onLoading: true
		// 	})
		// 	var obj = this
		// 	var ipfsToContract = '0x' + this.state.ipfsMeta
		// 	contract.methods.publish(price_eth, this.state.bonusFee, this.state.shareTimes, ipfsToContract).send({
		// 		from: account
		// 	}).then(function (receipt) {
		// 		obj.setState({
		// 			onLoading: false
		// 		})
		// 		alert("已经成功发布作品");
		// 	});
		// }
		// const key = await ipfs.key.gen('my-key', {
		// 	type: 'rsa',
		// 	size: 2048
		// })

		// const pem = await ipfs.key.export('myKey', 'password')
		// const lists = await ipfs.key.list()
		// console.log(lists)
	}


	render(){
		const { classes } = this.props
		let obj = this
		const { TextArea } = Input;
		const showLoading = () => {
			//this.state.onLoading
			if (this.state.onLoading) {
				return (
					<div>
						<ReactLoading type={'bars'} color={'#2196f3'} height={100} width={100} />
					</div>
				);
			}
		}
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
					var img_url = 'https://gateway.pinata.cloud/ipfs/' + obj.state.ipfsHashCover
					var trimmed_des = obj.state.description.replace(/(\r\n\t|\n|\r\t)/gm, " ");
					if(obj.state.ipfsHashCover !== ''){
						var JSONBody = {
							"name": obj.state.name,
							"description": trimmed_des,
							"image": img_url,
							"attributes": [
								{
									"trait_type": "bonusFee",
									"value": obj.state.bonusFee
								},
								{
									"trait_type": "file",
									"value": obj.state.ipns
								}
							]
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
								const bytes = bs58.decode(response.data.IpfsHash)
								const bytesToContract = bytes.toString('hex').substring(4,);
								console.log(bytesToContract)
								console.log(response.data.IpfsHash)
								obj.setState({
									ipfsMeta: bytesToContract
								})
								message.success(`${info.file.name} file uploaded successfully.`);
							})
					}
					// TODO: call backend to publish on IPFS.
					
					
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
							{showLoading()}
							<Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu'}}>
								<b>发布作品信息</b>
							</Typography>
							<form className={classes.form} noValidate>
								<Grid container spacing={2}>
									<Grid item xs={12} >
										<label style= {{fontSize: 18, marginBottom: 10}}>作品名字 *</label>
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
										<label style={{ fontSize: 18,  marginTop: 20 }}>收益比例 *</label>
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
										<label style={{ fontSize: 18, marginTop: 20 }}>售卖价格 *</label>
										<InputNumber
											id="price"
											defaultValue={0}
											min={0}
											onChange={this.handleGetPrice}
											className={classes.inputNum}
										/>
									</Grid>
									<Grid item xs={12}>
										<label style={{ fontSize: 18, marginTop: 20 }}>最高分享次数 *</label>
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
										<label style={{ fontSize: 18, marginTop: 20 }}>作品描述 *</label>
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
						</div>
					</Container>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Publish);
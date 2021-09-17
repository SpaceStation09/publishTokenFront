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
import Paper from '@material-ui/core/Paper';


// const IPFS = require('ipfs-core')
// const Websockets = require('libp2p-websockets')
const {
	pinata_api_key,
	pinata_secret_api_key,
} = require('./project.secret');
const FormData = require('form-data');
const bs58 = require('bs58');
var CryptoJS = require("crypto-js");


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
  main: {
		[theme.breakpoints.between('xs', 'sm')]: {
			width: '60%'
		},
		[theme.breakpoints.up('sm')]: {
			width: 500
		},
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
    width: '150%', 
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
		width: '100%',
		fontSize: 20,
	}
});


class Publish extends Component {
	state = {
    name: '',
		bonusFee: 0,
		price: 0,
		buffer: null,
		ipfsHashCover: '',
		ipfsMeta: '',
		fileIpfs: '',
		description: '',
		shareTimes: 0,
		onLoading: false,
		rootNFTId: '',
		usedAcc: '',
		sig: '',
		fileType: '',
		finished: false,
		coverURL: ''
  };

	async componentDidMount() {
		if (!window.ethereum) {
			alert("请先安装metamask");
			window.location.href = '/#/introPublish';
			return;
		}
		if (!window.ethereum.isConnected()) {
			alert("请先链接metamask");
			window.location.href = '/#/introPublish';
			return;
		}
		// const chainId = await window.ethereum.request({ method: 'eth_chainId' });
		window.ethereum.request({ method: 'eth_chainId' }).then(chainId => {
			if (chainId !== '0x4') {
				alert("请切换至rinkeby network");
				window.location.href = '/#/introPublish';
				return;
			}
		})
	}
	//21474836481
	//4294967297
	//8589934593

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
		
		if (this.state.price === 0 || this.state.bonusFee === 0 || this.state.shareTimes === 0 || this.state.ipfsHashCover === '' || this.state.fileIpfs === '') {
			alert("你有信息尚未填写")
		} else {
			
			this.setState({
				onLoading: true
			})
			var img_url = 'https://gateway.pinata.cloud/ipfs/' + this.state.ipfsHashCover
			this.setState({
				coverURL: img_url
			})
			console.debug("coverURL: ", this.state.coverURL)
			var trimmed_des = this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, " ");
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			this.setState({
				usedAcc: account
			})
			var file_url = 'https://gateway.pinata.cloud/ipfs/' + this.state.fileIpfs
			var JSONBody = {
				"name": this.state.name,
				"description": trimmed_des,
				"image": this.state.coverURL,
				"attributes": [
					{
						"display_type": "boost_percentage",
						"trait_type": "Bonuse Percentage",
						"value": this.state.bonusFee
					},
					{
						"trait_type": "File Address",
						"value": file_url
					},
					{
						"value": this.state.fileType
					},
					{
						"trait_type": "Encrypted",
						"value": "FALSE"
					}
				]
			}

			const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
			let obj = this
			axios.post(url, JSONBody, {
				headers: {
					pinata_api_key: pinata_api_key,
					pinata_secret_api_key: pinata_secret_api_key
				},
			})
				.then(function (response) {
					console.debug("metadata: ", response.data.IpfsHash)
					const bytes = bs58.decode(response.data.IpfsHash)
					const bytesToContract = bytes.toString('hex').substring(4,);
					console.log(bytesToContract)
					console.log(response.data.IpfsHash)
					obj.setState({
						ipfsMeta: bytesToContract
					})

					var price_eth = web3.utils.toWei(obj.state.price.toString())
					var ipfsToContract = '0x' + bytesToContract
					contract.methods.publish(price_eth, obj.state.bonusFee, obj.state.shareTimes, ipfsToContract).send({
						from: obj.state.usedAcc
					}).then(function (receipt) {
						//55834574849
						console.log(receipt)
						var publish_event = receipt.events.Publish
						var returned_values = publish_event.returnValues
						var root_nft_id = returned_values.rootNFTId
						var issue_id = returned_values.issue_id
						obj.setState({
							onLoading: false,
							rootNFTId: root_nft_id,
							issueId: issue_id
						})
						alert("已经成功发布作品");
					});

					obj.setState({
						finished: true
					})
				}).catch((error) => {
					console.debug(error)
					alert("上传pinata失败，请试着删除文件后重试")
				})

		}
		
	}

	render(){
		const { classes } = this.props
		let obj = this
		const { TextArea } = Input;
		const prop = {
			name: 'file',
			action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
			headers: {
				pinata_api_key: pinata_api_key,
				pinata_secret_api_key: pinata_secret_api_key
			},
			data: this.state.buffer,
			beforeUpload: file => {
				return new Promise((resolve, reject) => {
					try {
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
					} catch (e) {
						message.error('Read file error')
						reject()
					}
				})
			},
			async onChange(info) {
				const { status } = info.file;
				// text/plain image/jpeg application/pdf
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`);
					obj.setState({
						ipfsHashCover: info.file.response.IpfsHash
					})

				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
			onDrop(e) {
				message.error(`Only image file supported`);
				console.log('Dropped files', e.dataTransfer.files);
			},
		};

		const propFile = {
			name: 'file',
			action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
			headers: {
				pinata_api_key: pinata_api_key,
				pinata_secret_api_key: pinata_secret_api_key
			},
			data: this.state.buffer,
			beforeUpload: file => {
				return new Promise((resolve, reject) => {
					try {
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
					} catch (e) {
						message.error('Read file error')
						reject()
					}
				})
			},
			async onChange(info) {
				const { status } = info.file;
				// console.debug(typeof info.file.type)
				// text/plain image/jpeg application/pdf
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`);
					var file_type = info.file.name.split('\.')
					var file_suffix = file_type[file_type.length - 1]
					console.debug(file_suffix)
					console.debug("file ipfs hash: ", info.file.response.IpfsHash)
					obj.setState({
						fileIpfs: info.file.response.IpfsHash,
						fileType: file_suffix
					})


				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
			onDrop(e) {
				message.error(`Only image file supported`);
				console.log('Dropped files', e.dataTransfer.files);
			},
		};


		if(this.state.onLoading){
			return(
				<div>
					<Helmet>
						<title>SparkNFT | Publish</title>
					</Helmet>
					<ThemeProvider theme={theme}>
						<TopBar />
						<div style={{ width: '300px', height: '300px', position: 'relative', left: '43%', marginTop: '20%' }}>
							<ReactLoading type={'bars'} color={'#2196f3'} height={300} width={300} />
						</div>
					</ThemeProvider>
				</div>
			);
		} else if (this.state.finished){
			return (
				<div>
					<Helmet>
						<title>SparkNFT | Publish</title>
					</Helmet>
					<ThemeProvider theme={theme}>
						<TopBar />
						<div style={{ textAlign: 'center'}}>
							<Typography variant="h2" style={{ marginTop: 50, fontFamily: 'Ubuntu' }}>
								<b> 🎉 恭喜您发布成功</b>
							</Typography>
							
							<Paper style={{ backgroundColor: '#EFEBE9', width: 350, marginLeft: '40%', marginTop: 100 }}>
								<img style={{ width: 300, marginTop: 20, marginBottom: 50 }} src={this.state.coverURL}></img>
							</Paper>
							<Typography variant="h4" style={{ marginTop: 20, fontFamily: 'Ubuntu' }}>
								<b>您获得的根结点NFT是： #{this.state.rootNFTId}</b>
							</Typography>
						</div>
					</ThemeProvider>
				</div>
			);
		}else{
			return (
				<div>
					<Helmet>
						<title>SparkNFT | Publish</title>
					</Helmet>

					<ThemeProvider theme={theme}>
						<TopBar />
						<Container component="main" maxWidth="xs" className={classes.main}>
							<div className={classes.paper}>
								{/* {showLoading()} */}
								<Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu' }}>
									<b>发布作品信息</b>
								</Typography>
								<form className={classes.form} noValidate>
									<Grid container spacing={2}>
										<Grid item style={{ width: "100%" }}>
											<label style={{ fontSize: 18, marginBottom: 10 }}>作品名字 *</label>
											<Input
												placeholder="作品名称"
												allowClear
												id="pubName"
												onChange={this.handleGetPubName}
												value={this.state.name}
												className={classes.input}
											/>
										</Grid>
										<Grid item style={{width: "100%" }}>
											<label style={{ fontSize: 18, marginTop: 20 }}>收益比例 *</label>
											<p style={{ fontSize: 12 }}>当您的作品被成功分享时，您希望从分享价格中获得多少比例的收益</p>
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
										<Grid item style={{width: "100%" }}>
											<label style={{ fontSize: 18, marginTop: 20 }}>售卖价格 (ether)*</label>
											<InputNumber
												id="price"
												defaultValue={0}
												min={0}
												onChange={this.handleGetPrice}
												className={classes.inputNum}
											/>
										</Grid>
										<Grid item style={{ width: "100%" }}>
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
										<Grid item style={{ width: "100%" }} >
											<label style={{ fontSize: 18, marginTop: 20 }}>作品描述 *</label>
											<p style={{ fontSize: 12 }}>请用简单的话语对您的作品进行描述，精准有效的描述能帮助其他用户更准确得了解您的作品</p>
											<TextArea
												rows={6}
												id="Description"
												onChange={this.handleGetDescription}
											/>
										</Grid>
									</Grid>
									<label style={{ fontSize: 18, marginTop: 50 }}>封面图片 *</label>
									<p style={{ fontSize: 12 }}>请在下方区域上传您的封面图片 <br />
										封面文件支持这些格式：JPEG/JPG/PNG</p>
									<Dragger {...prop} style={{ width: '100%', minHeight: 200 }} id="Uploader" accept=".png, .jpg, .jpeg" >
										<p className="ant-upload-drag-icon">
											<InboxOutlined />
										</p>
										<p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
										<p className="ant-upload-hint">
											支持单个文件的上传，支持多种类型文件的上传
										</p>
									</Dragger>

									<label style={{ fontSize: 18, marginTop: 50 }}>作品文件 *</label>
									<p style={{ fontSize: 12 }}>请在下方区域上传您的作品文件 </p>
									<Dragger {...propFile} style={{ width: '100%', minHeight: 200 }} id="Uploader2" >
										<p className="ant-upload-drag-icon">
											<InboxOutlined />
										</p>
										<p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
										<p className="ant-upload-hint">
											仅支持单个文件的上传，支持多种类型文件的上传
										</p>
									</Dragger>
								</form>
								<Button
									variant="contained"
									className={classes.button}
									startIcon={<CloudUploadIcon />}
									style={{ marginTop: 50, width: 200, height: 50, marginBottom: 50 }}
									onClick={this.submit}
								>
									提交信息
								</Button>
							</div>
						</Container>
					</ThemeProvider>
				</div>
			);
		}

		
	}
}

export default withStyles(styles, { withTheme: true })(Publish);
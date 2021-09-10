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


const IPFS = require('ipfs-core')
const Websockets = require('libp2p-websockets')
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
    width: '170%', 
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


class Publish extends Component {
	state = {
    name: '',
		bonusFee: 0,
		price: 0,
		buffer: null,
		file: null,
		ipfsHashCover: '',
		ipfsMeta: '',
		ipns: '',
		fileIpfs: '',
		description: '',
		shareTimes: 0,
		onLoading: false,
		rootNFTId: '',
		issueId: '',
		allowSubmitPDF: false,
		usedAcc: '',
		sig: '',
		node: null
  };

	async componentDidMount() {
		// if (this.state.node == null){
		// 	var ipfs = await IPFS.create({
		// 		config: {
		// 			Addresses: {
		// 				Swarm: [
		// 					// These are public webrtc-star servers
		// 					'/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
		// 					'/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
		// 					'/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWC3kaejMzfgkx1MCAsZDCmasyXzv69hdoV6WbB2RUnQ3S'
		// 				]
		// 			},
		// 			// This removes the default IPFS peers to dial to. You can specify any known addresses you wish, or leave blank.
		// 			Bootstrap: []
		// 		}
		// 	})
		// 	this.setState({
		// 		node: ipfs
		// 	})
		// 	const validIp4 = '/dns4/ipfs.r2d2.to/tcp/443/wss/p2p/12D3KooWC3kaejMzfgkx1MCAsZDCmasyXzv69hdoV6WbB2RUnQ3S'
		// 	const res = await ipfs.swarm.connect(validIp4)
		// 	// const peerInfos = await ipfs.swarm.peers()
		// 	// console.debug(peerInfos)
		// 	console.debug(res.Peers)
		// }else {
		// 	var ipfs = this.state.node
		// 	const peerInfos = await ipfs.swarm.addrs()
		// 	console.debug(peerInfos)
		// }

		// const res = await ipfs.bootstrap.list()
		// console.log(res.Peers)
		// const file = {
		// 	path: '/tmp/myfile.txt',
		// 	content: 'ABC'
		// }
		// const result = await ipfs.add('content')
		// console.info(result)

		// const pub = await ipfs.name.publish(result.cid)
		// console.log('pub name: ', pub.name)
		// console.debug(peerInfos)
		// console.debug(addr)
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
		if (this.state.price === 0 || this.state.bonusFee === 0 || this.state.shareTimes === 0 || this.state.ipfsMeta === ''){
			alert("你有信息尚未填写")
		}else {
		
			var price_eth = web3.utils.toWei(this.state.price.toString())
			this.setState({
				onLoading: true
			})
			var obj = this
			var ipfsToContract = '0x' + this.state.ipfsMeta
			contract.methods.publish(price_eth, this.state.bonusFee, this.state.shareTimes, ipfsToContract).send({
				from: this.state.usedAcc
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
		}

		this.setState({
			allowSubmitPDF: true
		})	
	}

	submitWork = async () => {
		const stats = await ipfs.repo.stat()
		console.log(stats)
		const addr = new Multiaddr("/ip4/18.162.56.46/tcp/4001/p2p/12D3KooWC3kaejMzfgkx1MCAsZDCmasyXzv69hdoV6WbB2RUnQ3S")
		// await ipfs.swarm.connect(json)
		const peerInfos = await ipfs.swarm.peers()
		console.log(typeof peerInfos[0].peer)
		console.debug(addr)
		const publish_url = 'http://18.162.56.46:5001/api/v0/name/publish?arg=' + this.state.fileIpfs + '&key=' + this.state.usedAcc
		this.setState({
			onLoading: true
		})
		alert("作品文件发布所需的时间较长，请耐心等待，此过程大约需要3分钟")
		let obj = this
		const res = await axios.post(publish_url)
		console.debug(res.data)
		this.setState({
			onLoading: false
		})
		alert("作品文件发布成功")
		const rm_key_url = 'http://18.162.56.46:5001/api/v0/key/rm?arg=' + this.state.usedAcc
		axios.post(rm_key_url)
			.then((response) => {
				console.debug("removed key")
				obj.setState({
					allowSubmitPDF: false
				})
			})
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
				// if (status !== 'uploading') {
					
				// }
				if (status === 'done') {
					obj.setState({
						ipfsHashCover: info.file.response.IpfsHash
					})
					var img_url = 'https://gateway.pinata.cloud/ipfs/' + obj.state.ipfsHashCover
					var trimmed_des = obj.state.description.replace(/(\r\n\t|\n|\r\t)/gm, " ");
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					const account = accounts[0];
					obj.setState({
						usedAcc: account
					})

					var url_gen_key = "http://18.162.56.46:5001/api/v0/key/gen?arg=" + account
					if(obj.state.ipfsHashCover !== ''){
						axios.post(url_gen_key)
							.then(function (response) {
								console.log("gen key: ", response.data)
								var JSONBody = {
									"name": obj.state.name,
									"description": trimmed_des,
									"image": img_url,
									"attributes": [
										{
											"trait_type": "bonusPercentage",
											"value": obj.state.bonusFee
										},
										{
											"trait_type": "fileAddress",
											"value": response.data.Id
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
							})
						
					}
					
					
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
			onDrop(e) {
				message.error(`Only image file supported`);
				console.log('Dropped files', e.dataTransfer.files);
			},
		};

		const propPDF = {
			name: 'file',
			multiple: true,
			action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
			headers: {
				pinata_api_key: pinata_api_key,
				pinata_secret_api_key: pinata_secret_api_key
			},
			beforeUpload: file => {
				return new Promise(async (resolve, reject) => {
					try {
						const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
						const signer = accounts[0];
						var message = {
							account: signer,
							nft_id: obj.state.rootNFTId
						};
						console.debug(JSON.stringify(message))
						const sig = await web3.eth.personal.sign(JSON.stringify(message), signer)
						console.debug(sig)
						var payload = {
							"nft_id": obj.state.rootNFTId,
							"account": signer,
							"signature": sig
						}
						var payload_str = JSON.stringify(payload)
						var req_key_url = 'http://192.168.0.64:3000/api/v1/key/claim'
						try{
							const res = await axios.post(req_key_url, payload_str, {
								headers: {
									'Content-Type': 'application/json'
								}
							})
							var secret_key = res.data.key
							console.debug(secret_key)
							const reader = new FileReader()
							reader.readAsArrayBuffer(file)
							reader.onload = (e) => {
								var b = e.target.result
								var wordArray = CryptoJS.lib.WordArray.create(b);
								const str = CryptoJS.enc.Hex.stringify(wordArray);
								var cipher_text = CryptoJS.AES.encrypt(str, secret_key).toString();
								var myblob = new Blob([cipher_text], {
									type: 'text/plain'
								});
								resolve(myblob)
							}
						} catch (error) {
							if (error.response.status == 400) {
								if (error.response.data.message.includes("signature invalid")){
									alert("您的签名有误，请查看签名账号是否正确")
								} else if (error.response.data.message.includes("param invalid")){
									alert("参数错误")
								} else if (error.response.data.message.includes("not owned")){
									alert("您并不拥有此nft")
								} else if (error.response.data.message.includes("not found")) {
									alert("此nft还未生成")
								}
							} else {
								alert('请求文件加密密钥失败')
							}
						}
						
						
					} catch (e) {
						console.log(e)
						message.error('Read file error')
						reject()
					}
				})
			},
			onChange(info) {
				const { status } = info.file;
				if (status === 'done') {
					obj.setState({
						fileIpfs: info.file.response.IpfsHash
					})
					console.debug("encrypted file hash: ", info.file.response.IpfsHash)
					message.success(`${info.file.name} file uploaded successfully.`);
				}
				
			},
			onDrop(e) {
				console.log('Dropped files', e.dataTransfer.files);
			},
		};

		if(this.state.onLoading){
			return(
				<div>
					<Helmet>
						<title>SparkNFT | Publish</title>
					</Helmet>

					<div style={{ width: '300px', height: '300px', position: 'relative', left: '43%', marginTop: '20%' }}>
						<ReactLoading type={'bars'} color={'#2196f3'} height={300} width={300} />
					</div>
				</div>
			);
		} else if (this.state.allowSubmitPDF){
			return(
				<div>
					<Helmet>
						<title>SparkNFT | Publish</title>
					</Helmet>

					<div style={{ width: '300px', height: '300px', position: 'relative', left: '30%', marginTop: '10%'}}>
						<Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu' }}>
							<b>上传作品文件</b>
						</Typography>
						<label style={{ fontSize: 18, marginTop: 50 }}>作品文件 *</label>
						<p style={{ fontSize: 12 }}>请在下方区域上传您的作品文件 <br />
							作品文件支持这些格式：TXT， PDF</p>
						<Dragger {...propPDF} style={{ width: 680, minHeight: 200 }} id="Uploader2">
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
							style={{ marginTop: 50, width: 200, height: 50, marginBottom: 50, marginLeft: 250 }}
							onClick={this.submitWork}
						>
							发布作品
						</Button>
					</div>
				</div>
			);

		} else{
			return (
				<div>
					<Helmet>
						<title>SparkNFT | Publish</title>
					</Helmet>

					<ThemeProvider theme={theme}>
						<TopBar />
						<Container component="main" maxWidth="xs">
							<div className={classes.paper}>
								{/* {showLoading()} */}
								<Typography component="h1" variant="h2" style={{ marginTop: "3%", fontFamily: 'Ubuntu' }}>
									<b>发布作品信息</b>
								</Typography>
								<form className={classes.form} noValidate>
									<Grid container spacing={2}>
										<Grid item xs={12} >
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
										<Grid item xs={12}>
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
										<Grid item xs={12}>
											<label style={{ fontSize: 18, marginTop: 20 }}>售卖价格 (ether)*</label>
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
									<label style={{ fontSize: 18, marginTop: 50 }}>封面图片 *</label>
									<p style={{ fontSize: 12 }}>请在下方区域上传您的封面图片 <br />
										封面文件支持这些格式：image/*</p>
									<Dragger {...prop} style={{ width: 680, minHeight: 200 }} id="Uploader" accept="image/*" >
										<p className="ant-upload-drag-icon">
											<InboxOutlined />
										</p>
										<p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
										<p className="ant-upload-hint">
											支持单个文件的上传，支持多种类型文件的上传
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
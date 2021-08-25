import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import TopBar from './TopBar';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

const metadata_json = 'QmPsymsaqMZsiwLHXepXtEpYMq3xtnBLLbPgTEyybz1idQ'
// const metadata = { 
//   "Name": "热风", 
//   "Description": "《热风》收作者1918年至1924年所作杂文四十一篇。1925年11月由北京北新书局初版。作者生前共印行十版次。鲁迅在《新青年》的《随感录》中做些短评，还在这前一年，因为所评论的多是小问题，所以无可道，原因也大都忘却了。但就现在的文字看起来，除几条泛沦之外，有的是对于扶乩，静坐，打拳而发的；有的是对于所谓“保存国粹”而发的；有的是对于那时旧官僚的以经验自豪而发的；有的是对于上海《时报》的讽刺画而发的。记得当时的《新青年》是正在四面受敌之中，鲁迅所对付的不过一小部分。", 
//   "BonusFee": 7, 
//   "Cover": "QmSnPggQ9K4QV7dJkjLP2GMZVCEsL81kSsouRoAAzEb8K2" 
// }
// 《热风》收作者1918年至1924年所作杂文四十一篇。1925年11月由北京北新书局初版。作者生前共印行十版次。鲁迅在《新青年》的《随感录》中做些短评，还在这前一年，因为所评论的多是小问题，所以无可道，原因也大都忘却了。但就现在的文字看起来，除几条泛沦之外，有的是对于扶乩，静坐，打拳而发的；有的是对于所谓“保存国粹”而发的；有的是对于那时旧官僚的以经验自豪而发的；有的是对于上海《时报》的讽刺画而发的。记得当时的《新青年》是正在四面受敌之中，鲁迅所对付的不过一小部分。


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
  container: {
    maxWidth: '100%'
  },
  paper: {
    marginTop: theme.spacing(7),
    textAlign: 'center'
  },
  btnSell: {
    margin: theme.spacing(1),
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196f3',
    color: '#2196f3',
    marginLeft: '10%',
    width: 150
  },
});

class SellSingle extends Component {
  state = {
    name: '',
    bonusFee: 0,
    price: 0,
    cover: '',
    ipfsHashPub: '',
    ipfsHashCover: '',
    ipfsHashMeta: '',
    description: '',
    shareTimes: 0,
    coverURL: ''
  };

  async componentWillMount() {
    var object = this;
    var url = "https://ipfs.io/ipfs/" + metadata_json
    let name
    let descrip
    let cover
    let bonusFee
    await axios.get(url)
      .then(function (response) {
        var content = response.data
        name = content.Name
        descrip = content.Description
        cover = content.Cover
        bonusFee = content.BonusFee
      })
    this.setState({
      name: name,
      description: descrip,
      ipfsHashCover: cover,
      bonusFee: bonusFee
    })
    var cover_url = "https://ipfs.io/ipfs/" + this.state.ipfsHashCover
    this.setState({
      coverURL: cover_url
    })
    console.log(this.state.coverURL)
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Helmet>
          <title>Publish Token | Sell</title>
        </Helmet>

        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <div className={classes.paper}>
              <Grid container justifyContent="flex-start" spacing= {3}>
                <Grid item xs={4} style={{ maxWidth: 600}}>
                  <Paper style={{ backgroundColor: '#FAFAFA', width: 350, marginLeft: '40%'}}>
                    <img style={{ width: 300, marginTop: 20}} src={this.state.coverURL}></img>  
                  </Paper>
                </Grid>
                <Grid item xs style={{ marginLeft: '5%'}}>
                  <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34, marginTop: '2%'}}>
                    <b>{this.state.name}</b>
                  </Typography>
                  <Typography align="left" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize: 16 }}>
                    {this.state.description}
                  </Typography>
                  <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '6%', maxWidth: '65%', fontSize: 24 }}>
                    创作者分红比例: {this.state.bonusFee} %
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<MonetizationOnOutlinedIcon style={{fontSize: 30}}/>}
                    className={classes.btnSell}
                  >
                    售卖
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SellSingle);

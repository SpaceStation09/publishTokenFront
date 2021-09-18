import books from './imgs/books.png';
import './App.css';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopBar from './TopBar';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  titleFont: {
    fontFamily: 'Teko',
  },
  btn: {
    color: '#424949',
    borderWidth: 2,
    borderColor: '#e3f2fd',
    fontSize: 16,
  },
  // btnMain: {
  //   marginTop: theme.spacing(3),
  //   color: '#FFFFFF',
  //   borderWidth: 2,
  //   borderColor: '#e3f2fd',
  //   fontSize: 20,
  //   borderRadius: 15,
  //   width: 200
  // },
  // btnSecond: {
  //   marginTop: theme.spacing(3),
  //   color: '#03A9F4',
  //   borderWidth: 3,
  //   borderColor: '#03A9F4',
  //   fontSize: 20,
  //   borderRadius: 15,
  //   width: 200
  // },
  btnMain: {
    // marginTop: theme.spacing(3),
    color: '#FFFFFF',
    borderColor: '#e3f2fd',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 100,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 5,
      width: 95
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 16,
      width: 150
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 16,
      width: 150
    },
  },
  btnSecond: {
    // marginTop: theme.spacing(3),
    color: '#03A9F4',
    borderColor: '#03A9F4',
    borderWidth: 2,
    borderRadius: 25,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 5,
      width: 95,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 16,
      width: 150
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 16,
      width: 150
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    maxWidth: 900
  },
  container: {
    maxWidth: 1000
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#FDFEFE',
    },
    secondary: {
      main: '#2196f3',
    }
  },
});

class IntroPublish extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Helmet>
          <title>SparkNFT | Publish</title>
        </Helmet>

        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <div className={classes.paper}>
              <Typography color="inherit" noWrap style={{ fontFamily: 'Teko', fontSize: 40, textAlign: 'center' }} >
                <b>发布须知</b>
              </Typography>
              <Typography variant="h4" paragraph style={{ fontFamily: 'Teko', marginTop: 70}}>
                在去发布您的作品之前，您需要了解以下信息，它们将有助于您了解完整的发布流程：
              </Typography>
              <Typography color="textSecondary" paragraph style={{ fontFamily: 'Teko', marginTop: 20, fontSize: 20, lineHeight: 1.5 }}>
                <b>1.</b> 您的作品将被存储在IPFS（InterPlanetary File System）中，而存储地址将被记录在以太坊上，与您的NFT绑定在一起
              </Typography>
              <Typography color="textSecondary" paragraph style={{ fontFamily: 'Teko', marginTop: 20, fontSize: 20, lineHeight: 1.5 }}>
                <b>2.</b> 您可以选择是将您的作品开源得保存在IPFS上，或者加密保存在IPFS上。针对加密的作品，只有持有您发行的NFT的读者才能访问。 <br />
              </Typography>
              <Typography color="textSecondary" paragraph style={{ fontFamily: 'Teko', marginTop: 20, fontSize: 20, lineHeight: 1.5 }}>
                <b>3.</b> 如果您选择加密保存在IPFS上，您需要在将作品基本信息上传到链上后，再设置作品的地址。这个过程我们会引导您完成，请勿担心。 <br />
              </Typography>
              <Typography color="textSecondary" paragraph style={{ fontFamily: 'Teko', marginTop: 20, fontSize: 20, lineHeight: 1.5 }}>
                <b>4.</b> 当您将作品发布在我们平台时，我们默认您会支持二次创作，处于您宣传网络中的读者有权将他们持有的NFT对应的地址替换为他们自己的二次创作作品。 <br />
              </Typography>
              <Grid container justifyContent="center" style={{ fontFamily: 'Teko', marginTop: 70 }}>
                <Grid item xs={4} >
                  <Button size="large" variant="contained" color="secondary" className={classes.btnMain} href='/#/encryptedPublish'>
                    <b>加密发布</b>
                  </Button>
                </Grid>
                <Grid item xs={3} >
                  <Button size="large" variant="outlined" color="secondary" className={classes.btnSecond} href='/#/publish'>
                    <b>开源发布</b>
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

export default withStyles(styles, { withTheme: true })(IntroPublish);
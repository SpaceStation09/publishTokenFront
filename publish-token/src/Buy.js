import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

class Buy extends Component {
	render(){
		const { classes } = this.props

		return (
			<div>
				<Helmet>
					<title>Publish Token | BUY</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
					<AppBar position="static">
						<Toolbar>
							<Typography variant="h3" color="inherit" noWrap style={{marginLeft: "150px"}}>
								Publish Token
							</Typography>
							<Button variant="outlined" size="large" style={{marginLeft: "50%"}} className={classes.btn} href='/'>
								<b>HOME PAGE</b>
							</Button>
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/publish'>
								<b>GO TO PUBLISH</b>
							</Button>
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/sell'>
								GO TO SELL
							</Button>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Buy);
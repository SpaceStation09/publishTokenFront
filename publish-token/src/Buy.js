import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  btn: {
    color: theme.palette.getContrastText(blue[500]),
		borderWidth: 2,
		borderColor: '#e3f2fd',
		fontSize: 14,
  }
}));

function Buy() {
		const classes = useStyles();
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
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/'>
								GO TO SELL
							</Button>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
        <React.Fragment>
					<Typography variant="h6" gutterBottom>
						Shipping address
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="firstName"
								name="firstName"
								label="First name"
								fullWidth
								autoComplete="given-name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="lastName"
								name="lastName"
								label="Last name"
								fullWidth
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="address1"
								name="address1"
								label="Address line 1"
								fullWidth
								autoComplete="shipping address-line1"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address2"
								name="address2"
								label="Address line 2"
								fullWidth
								autoComplete="shipping address-line2"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="city"
								name="city"
								label="City"
								fullWidth
								autoComplete="shipping address-level2"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField id="state" name="state" label="State/Province/Region" fullWidth />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="zip"
								name="zip"
								label="Zip / Postal code"
								fullWidth
								autoComplete="shipping postal-code"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="country"
								name="country"
								label="Country"
								fullWidth
								autoComplete="shipping country"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
								label="Use this address for payment details"
							/>
						</Grid>
					</Grid>
				</React.Fragment>

			</div>
		);
}

export default Buy;
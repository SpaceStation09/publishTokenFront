import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { createTheme, makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { blue} from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import BasicInfo from './BasicInfo';
import UploadPDF from './UploadPDF';
import Review from './Review';

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
  },
	layout: {
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: '28%',
      marginRight: '30%',
    },
  },
  paper: {
		background: "#bbdefb",
		width: 800,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
		boxShadow: '2px 4px 5px grey',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
		background: "#bbdefb",
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Basic Info', 'Review Basic Info','Upload PDF file'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfo />;
		case 1:
			return <Review />;
    case 2:
      return <UploadPDF />;
    default:
      throw new Error('Unknown step');
  }
}

function Publish() {
		const classes = useStyles();
		const [activeStep, setActiveStep] = React.useState(0);

		const handleNext = () => {
			setActiveStep(activeStep + 1);
		};
	
		const handleBack = () => {
			setActiveStep(activeStep - 1);
		};

		return (
			<React.Fragment>
				<Helmet>
					<title>Publish Token | Publish</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
					<AppBar position="static" style={{height: '80px'}}>
						<Toolbar style={{marginTop: '10px'}}>
							<Typography variant="h3" color="inherit" noWrap style={{marginLeft: "150px"}}>
								Publish Token
							</Typography>
							<Button variant="outlined" size="large" style={{marginLeft: "50%"}} className={classes.btn} href='/'>
								<b>HOME PAGE</b>
							</Button>
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/#/buy'>
								<b>GO TO BUY</b>
							</Button>
							<Button variant="outlined" size="large" style={{marginLeft: "3%"}} className={classes.btn} href='/'>
								GO TO SELL
							</Button>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h4" align="center">
							<b>Publish</b>
						</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map((label) => (
								<Step key={label} >
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<React.Fragment>
							{activeStep === steps.length ? (
								<React.Fragment>
									<Typography variant="h3" gutterBottom >
										Thank you for your publish.
									</Typography>
								</React.Fragment>
							) : (
								<React.Fragment>
									{getStepContent(activeStep)}
									<div className={classes.buttons}>
										{activeStep !== 0 && (
											<Button onClick={handleBack} className={classes.button}>
												Back
											</Button>
										)}
										<Button
											variant="contained"
											color="primary"
											onClick={handleNext}
											className={classes.button}
										>
											{activeStep === steps.length - 1 ? 'Publish' : 'Next'}
										</Button>
									</div>
								</React.Fragment>
							)}
						</React.Fragment>
					</Paper>
				</main>

			</React.Fragment>
			
		);
}

export default Publish;

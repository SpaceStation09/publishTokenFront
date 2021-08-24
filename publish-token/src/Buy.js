import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import TopBar from './TopBar';
import Typography from '@material-ui/core/Typography';

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
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		// paddingTop: '56.25%', // 16:9
		paddingTop: '100%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
});

class Buy extends Component {
	render(){
		const { classes } = this.props
		const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		return (
			<div>
				<Helmet>
					<title>Publish Token | Marketplace</title>
				</Helmet>
			
				<ThemeProvider theme={theme}>
					<TopBar />
					<main>
						<div className={classes.heroContent}>
							<Container maxWidth="sm">
								<Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
									NFT Marketplace
								</Typography>
								<Typography variant="h5" align="center" color="textSecondary" paragraph>
									You can explore the marketplace and buy the NFT you like here. 
									If you are interested in any NFT, please click 'Details' button for detail.
								</Typography>
							</Container>
						</div>

						<Container className={classes.cardGrid} maxWidth="md">
							<Grid container spacing={4}>
								{cards.map((card) => {
									return(
										<Grid item key={card} xs={12} sm={6} md={4}>
											<Card className={classes.card}>
												<CardMedia
													className={classes.cardMedia}
													image="https://pic3.zhimg.com/v2-9ff4eafdba05f4e68e2fd1a1c0da5a5a_r.jpg"
													title="Image title"
												/>
												<CardContent className={classes.cardContent}>
													<Typography gutterBottom variant="h5" component="h2">
														<b>Hot Wind</b>
													</Typography>
													<Typography>
														This is the first collection of short essays/commentaries by Lu Xun.
													</Typography>
												</CardContent>
												<CardActions>
													<Button size="small" color="primary" href='/#/NFT' target="_blank">
														<b>Details </b>
													</Button>
												</CardActions>
											</Card>
										</Grid>
									)}
								)}
							</Grid>
						</Container>
					</main>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Buy);
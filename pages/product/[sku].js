import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { GET_PRODUCT_BY_SKU,SUBSCRIBE }  from '@/schema';
import {useQuery,useMutation} from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    cardCustom:{
      width:"90%",
      display: 'flex',
      height:500,
      margin:"5%"
    },
    cover: {
      width: 800,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      textAlign: "left",
    },
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

export default function Read() {
  const classes = useStyles();
  // default initialn data
  const router = useRouter();
  const {sku} = router.query;
  const [open, setOpen] = useState(false);
  // subscribe initial data
  const [email, setEmail] = useState([]);
  const [ subscribe ] = useMutation(SUBSCRIBE);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  }

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_SKU, {
      variables: {
          sku: sku
      }
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const subscribeHandling = async () => {
    const responseData = await subscribe(
        {
            variables: {
                email: email
            }
        }
    )
    handleClose();
    console.log(responseData.data.subscribe.status);
    // "Failed" / "Success"
    if(responseData.data.subscribe.status.response == "Success"){
      setOpenSnackbar(true);
    }
    var subscribeStatus = responseData.data.subscribe.status.response;
    setOpenSnackbar(true);
    setMessage(responseData.data.subscribe.status.message);
    setStatus(subscribeStatus === "Success" ? "success":"error");
    setEmail('');
  };
  return (
      <center>
        {
          data.products.items.map(item => (
            <Card className={classes.cardCustom} key={item.id}>
                <CardMedia
                    className={classes.cover}
                    image={item.image.url}
                    title={item.name}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5" dangerouslySetInnerHTML={{ __html: item.name }} />
                        <Typography variant="subtitle1" color="textSecondary" dangerouslySetInnerHTML={{ __html: item.description.html }} />
                        <div>{ item.price_range.minimum_price.regular_price.currency}. { item.price_range.minimum_price.regular_price.value } -  { item.price_range.maximum_price.regular_price.currency}. { item.price_range.maximum_price.regular_price.value }</div>

                        <br/><br/>
                        
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Subscribe to get the latest product info
                        </Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              To subscribe to this product, please enter your email address here. We will send updates
                              occasionally.
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Email Address"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              fullWidth
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button 
                              onClick={subscribeHandling} color="primary">
                              Subscribe
                            </Button>
                          </DialogActions>
                        </Dialog>
                    </CardContent>
                </div>
            </Card>
          ))
      }
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={status}>
          {message}
        </Alert>
      </Snackbar>
      </center>
  )
}

import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    cardCustom:{
      width:"90%",
      display: 'flex',
      margin:"5%"
    },
    content: {
      flex: '1 0 auto',
      textAlign: "left",
    },
  }));

export function LoadingProductList() {
    return (
        <Grid container spacing={3}>
            {
            Array.from(new Array(16)).map((index) =>(
                <Grid item xs={4} key={index}>
                <div>
                    <Skeleton variant="rect" width="100%" height={300} />
                    <Skeleton variant="text" height={40}/>
                    <Skeleton variant="text" height={40} width="40%"/>
                </div>
                </Grid>
            ))
            }
        </Grid>
    );
}

export function LoadingProductDetail() {
    const classes = useStyles();
    return (
        <div>
        <Card className={classes.cardCustom}>
            <CardActionArea>
                <CardContent className={classes.content}>
                <Grid container spacing={4}>
                    <Grid  
                    xs={12}
                    sm={6}
                    lg={6}>
                        <Skeleton variant="rect" width="100%" height={500} />
                    </Grid>
                    <Grid  
                        xs={12}
                        sm={6}
                        lg={6} style={{'padding':20}}>
                            <Skeleton variant="text" height={40} width="40%"/>
                            <Skeleton variant="text" height={40} width="40%"/>
                            <br/>
                            <Skeleton variant="text" height={40} width="100%"/>
                            <Skeleton variant="text" height={40} width="100%"/>
                            <Skeleton variant="text" height={40} width="100%"/>
                            <Skeleton variant="text" height={40} width="100%"/>
                            <br/><br/>
                            <Skeleton variant="rect" width="100%" height={60} />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
        </div>
    );
}

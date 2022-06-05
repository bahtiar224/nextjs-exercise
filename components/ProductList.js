import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import {GET_PRODUCT_BY_CATEGORY} from '@/schema';
import { useState} from 'react';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  cardCustom:{
    width:"100%"
  },
}));

export function ProductList(props) {
  const classes = useStyles();

  const ids = props.id;
  const [productList, setProductList] = useState([]);
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
      variables: {
         categoryId: ids,
      }
  })

  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log(data);

    return  (
      <Grid container spacing={3}>
        {
          data.category.products.items.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Link
                href={{ pathname:`/product/${item.sku}`}}
              >
                <a>
                  <Card className={classes.cardCustom}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="300"
                        image={item.image.url}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {item.stock_status}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    );
  }

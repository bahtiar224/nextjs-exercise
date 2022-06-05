import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {GET_CATEGORIES} from '@/schema';
import {useQuery } from '@apollo/client';
import { useState } from 'react';
import { ProductList } from '@components/ProductList';
import Link from 'next/link';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  linkMenu: {
    marginRight: 30
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Set category active
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return null;
  if (error) return `Error! ${error}`;
  
  if(!loading){
    if(categoryId == ""){
      if(data.categories.items.length > 0){
        setCategoryName(data.categories.items[0].name);
        setCategoryId(data.categories.items[0].id);
      }
    }
  }

  const setCategorySelected = (id,title) => {
    setCategoryName(title);
    setCategoryId(id);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          {
            data.categories.items.map((item, index) => (
            <ListItem button divider key={index} 
            selected={item.id === categoryId}
            onClick={() => setCategorySelected(item.id,item.name)}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="p" noWrap>
            <Link href="#">
              <a className={classes.linkMenu}>
              About Page
              </a>
            </Link>
            <Link href="#">
              <a className={classes.linkMenu}>
              Fetching Page
              </a>
            </Link>
            <Link className={classes.linkMenu} href="#">
              <a className={classes.linkMenu}>
              News Page
              </a>
            </Link>
            <Link className={classes.linkMenu} href="#">
              <a className={classes.linkMenu}>
              Example Api Page
              </a>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography  variant="h6" component="h6">
          {categoryName}
        </Typography>
        <br/>
        {/* Kontent */}
          <ProductList id={categoryId}/>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;

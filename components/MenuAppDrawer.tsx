import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import NextLink from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250
    },
    fullList: {
      width: 'auto'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
);

function MenuAppDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side: string, open: boolean) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = (side: string) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[{ title: 'Home', link: '/' }].map((text, index) => (
          <NextLink href={text.link} key={index}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItem>
          </NextLink>
        ))}
      </List>
      <Divider />
      <List>
        {[{ title: 'Books', link: '/books' }].map((text, index) => (
          <NextLink href={text.link} key={index}>
            <ListItem button key={text.title}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItem>
          </NextLink>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {fullList('left')}
      </Drawer>
    </div>
  );
}

export default MenuAppDrawer;

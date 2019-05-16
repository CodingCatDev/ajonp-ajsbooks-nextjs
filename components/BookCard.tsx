import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import NextLink from 'next/link';
import React from 'react';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 400,
    margin: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column'
  },
  cardMedia: {
    height: 0,
    paddingTop: '65%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    cursor: 'pointer'
  },
  cardDescription: {
    width: 368,
    height: 190,
    overflow: 'auto'
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

const BookCard = ({ book }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <NextLink href="/">
        <CardMedia
          className={classes.cardMedia}
          image="/static/images/cards/book.png"
          title={book.title}
        />
      </NextLink>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {book.title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <NextLink href="/">
          <Button size="small">Open Book</Button>
        </NextLink>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>{' '}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardContent}>
          <Typography paragraph className={classes.cardDescription}>
            {book.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BookCard;

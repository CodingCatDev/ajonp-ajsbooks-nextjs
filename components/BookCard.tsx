import { CardActionArea } from '@material-ui/core';
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

import Book from '../models/Book';

const useStyles = makeStyles(theme => ({
  card: {
    width: 400,
    margin: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    width: '375px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& h1': {
      fontSize: '1.4rem',
      textTransform: 'uppercase'
    }
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
    overflow: 'auto',
    whiteSpace: 'normal'
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

const BookCard = (prop: any) => {
  const book: Book = prop.book; //Allow for multiple prop values but this one specific to our type
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <NextLink as={`/book/${book.id}`} href={`/book?title=${book.title}`}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            image={book.cover || '/static/images/cards/book.png'}
            title={book.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography component="h1">{book.title}</Typography>
            <Typography component="p">
              Author:
              {` ${book.authorDisplayName}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions className={classes.cardActions}>
        Summary:
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

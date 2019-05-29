import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NextLink from 'next/link';
import React from 'react';

import Book from '../models/BookModel';
import Chapter from '../models/ChapterModel';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    maxWidth: 400,
    margin: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

const BookDetail = (prop: { book: Book }) => {
  const classes = useStyles();
  let listItems: any[] = [];
  if (prop.book && prop.book.chapters) {
    prop.book.chapters.map((chapter: Chapter) => {
      listItems.push(
        <NextLink
          href={`/book?id=${prop.book.id}&chapterId=${chapter.id}`}
          key={chapter.id}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt={chapter.title} src={chapter.photo} />
            </ListItemAvatar>
            <ListItemText primary={`${chapter.number}. ${chapter.title}`} />
          </ListItem>
        </NextLink>
      );
    });
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h1">
          {prop.book.title}
        </Typography>
        <List className={classes.list} component="nav">
          {listItems.map(item => {
            return item;
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default BookDetail;

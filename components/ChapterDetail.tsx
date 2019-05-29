import { Button, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NextLink from 'next/link';
import React from 'react';

import BookModel from '../models/BookModel';
import Chapter from '../models/ChapterModel';
import PageModel from '../models/PageModel';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    maxWidth: 400,
    margin: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    margin: 2
  }
}));

const ChapterDetail = (prop: { book: BookModel; chapter: Chapter }) => {
  const classes = useStyles();
  let listItems: any[] = [];
  if (prop.chapter && prop.chapter.pages) {
    prop.chapter.pages.map((page: PageModel) => {
      listItems.push(
        <NextLink
          href={`/book?id=${prop.book.id}&chapterId=${prop.chapter.id}&pageId=${
            page.id
          }`}
          key={page.id}
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            {page.number}
          </Button>
        </NextLink>
      );
    });
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h1">
          {prop.chapter.title} Pages:
        </Typography>
        {listItems.map(item => {
          return item;
        })}
      </CardContent>
    </Card>
  );
};

export default ChapterDetail;

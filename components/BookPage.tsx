import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import PageModel from '../models/PageModel';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  }
}));

const BookPage = (prop: { page: PageModel }) => {
  const classes = useStyles();
  let page;
  if (prop.page && prop.page.text) {
    page = <Typography component="p">{prop.page.text}</Typography>;
  } else {
    page = <Typography component="p">Please select a Chapter</Typography>;
  }
  return (
    <div>
      <Paper className={classes.root}>{page}</Paper>
    </div>
  );
};

export default BookPage;

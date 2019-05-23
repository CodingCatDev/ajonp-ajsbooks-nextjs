import { withRouter } from 'next/router';

const Book = withRouter(props => (
  <div>
    <p>{`Your id: ${props.router.query.id}` || 'No ID found'}</p>
    <p>{`Your path: ${props.router.asPath}` || 'No As Path found'}</p>
  </div>
));
export default Book;

import Book from './BookModel';

export default class AuthorModel {
  books?: Book[];
  displayName?: string;
  email?: string;
  id?: string;
  name?: string;
  profileImage?: string;
  social?: Map<string, string>;
  summary?: string;
  uid?: string;
  website?: string;

  public constructor(init?: Partial<AuthorModel>) {
    Object.assign(this, init);
  }
}

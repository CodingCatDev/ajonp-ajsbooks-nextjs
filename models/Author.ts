import Book from './Book';

export default class Author {
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

  public constructor(init?: Partial<Author>) {
    Object.assign(this, init);
  }
}

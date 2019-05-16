export default class Page {
  draft?: boolean;
  id?: string;
  number?: number;
  numOfWords?: number;
  version?: number;

  public constructor(init?: Partial<Page>) {
    Object.assign(this, init);
  }
}

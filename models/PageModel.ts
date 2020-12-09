export default class PageModel {
  draft?: boolean;
  id?: string;
  number?: number;
  numOfWords?: number;
  text?: string;
  version?: number;

  public constructor(init?: Partial<PageModel>) {
    Object.assign(this, init);
  }
}

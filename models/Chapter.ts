export default class Chapter {
  id?: string;
  sort?: number;
  title?: string;
  numOfSections?: number;
  public constructor(init?: Partial<Chapter>) {
    Object.assign(this, init);
  }
}

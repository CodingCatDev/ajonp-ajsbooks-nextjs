export default class Section {
  description?: string;
  id?: string;
  sort?: number;
  title?: string;
  numOfPages?: number;
  public constructor(init?: Partial<Section>) {
    Object.assign(this, init);
  }
}

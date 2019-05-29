import PageModel from './PageModel';

export default class ChapterModel {
  id?: string;
  number?: number;
  pages?: PageModel[];
  photo?: string;
  title?: string;
  public constructor(init?: Partial<ChapterModel>) {
    Object.assign(this, init);
  }
}

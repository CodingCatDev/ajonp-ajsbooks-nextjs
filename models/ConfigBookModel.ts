export default class ConfigBookModel {
  ageCategory?: Map<string, string>;
  fiction?: Array<string>;
  nonFiction?: Array<string>;
  options?: Map<string, string>;

  public constructor(init?: Partial<ConfigBookModel>) {
    Object.assign(this, init);
  }
}

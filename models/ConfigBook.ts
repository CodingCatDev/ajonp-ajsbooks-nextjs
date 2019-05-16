export default class ConfigBook {
  ageCategory?: Map<string, string>;
  fiction?: Array<string>;
  nonFiction?: Array<string>;
  options?: Map<string, string>;

  public constructor(init?: Partial<ConfigBook>) {
    Object.assign(this, init);
  }
}

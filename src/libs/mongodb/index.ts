export class MongooseCustom {
  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public async findOneAndSoftDelete(id: string): Promise<any> {
    try {
      const result = await this.model.findOneAndUpdate({ _id: id }, { is_deleted: true });
      return result;
    } catch (error) {
      return error;
    }
  }

  public async findOneAndRestore(id: string): Promise<any> {
    try {
      const result = await this.model.findOneAndUpdate({ _id: id }, { is_deleted: false });
      return result;
    } catch (error) {
      return error;
    }
  }

  public async findOneAndDisable(id: string): Promise<any> {
    try {
      const result = await this.model.findOneAndUpdate({ _id: id }, { is_enabled: false });
      return result;
    } catch (error) {
      return error;
    }
  }

  public async findOneAndEnable(id: string): Promise<any> {
    try {
      const result = await this.model.findOneAndUpdate({ _id: id }, { is_enabled: true });
      return result;
    } catch (error) {
      return error;
    }
  }
}

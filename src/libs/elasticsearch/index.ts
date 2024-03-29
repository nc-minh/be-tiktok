/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateIndicesTypes, DeleteDataTypes } from './types';

export class MongodbSubmitToElasticSearch {
  public client: any;
  public model: any;

  constructor(client: any, model: any) {
    this.client = client;
    this.model = model;
  }

  // index
  public async createIndices(data: CreateIndicesTypes): Promise<any> {
    const result = await this.client.indices.create(data);
    return result;
  }

  public async deleteIndices(data: CreateIndicesTypes): Promise<any> {
    const result = await this.client.indices.delete(data);
    return result;
  }

  // data
  public async save(data: any): Promise<any> {
    let dataIfError;
    try {
      const newData = new this.model(data);

      const result = await newData.save();
      dataIfError = result;

      if (!result) throw new Error();

      const { _id, ...newResult } = result.toObject();
      const r = await this.client.index({
        index: this.model.modelName.toLowerCase(),
        type: '_doc',
        id: result._id,
        body: {
          ...newResult,
        },
      });

      return r;
    } catch (error) {
      await this.model.deleteOne({ _id: dataIfError._id });

      return error;
    }
  }

  public async forceDelete(data: DeleteDataTypes): Promise<any> {
    try {
      const result = await this.model.deleteOne({ _id: data.id });

      if (!result) throw new Error();

      const r = await this.client.delete({
        index: this.model.modelName.toLowerCase(),
        id: data.id,
      });
      return r;
    } catch (error) {
      return error;
    }
  }
}

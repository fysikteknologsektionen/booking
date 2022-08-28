import connectdb from "lib/connectdb";
import { LeanDocument, Model } from "mongoose";

export default class Repository<T> {
  Model: Model<T, {}, {}, {}, any>;

  private constructor(model: Model<T, {}, {}, {}, any>) {
    this.Model = model;
  }

  /**
   * List documents.
   * @returns Array of lean documents.
   */
  public list() {
    return this.Model.find().lean().exec();
  }

  /**
   * Get a specific document.
   * @param id Document id.
   * @returns Specified document.
   */
  public get(id: string) {
    return this.Model.findById(id).orFail().lean().exec();
  }

  /**
   * Create a new document.
   * @param data Document data.
   * @returns New document.
   */
  public async create(data: Partial<T>) {
    const doc = new this.Model(data);
    await doc.save();
    return doc.toObject<LeanDocument<T>>();
  }

  /**
   * Update an existing document.
   * @param id Document id.
   * @param data New document data.
   * @returns Updated document.
   */
  public async update(id: string, data: Partial<T>) {
    const doc = await this.Model.findById(id).orFail().exec();
    doc.set(data);
    await doc.save();
    return doc.toObject<LeanDocument<T>>();
  }

  /**
   * Deletes a specific document.
   * @param id Document id.
   */
  public async delete(id: string) {
    await this.Model.findByIdAndRemove(id).orFail().exec();
  }

  /**
   * Make a new Repository instance.
   * @param model Model type.
   * @returns New Repository instance.
   */
  public static async makeRepository<U>(model: Model<U, {}, {}, {}, any>) {
    await connectdb();
    return new Repository(model);
  }
}

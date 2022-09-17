import connectdb from "lib/connectdb";
import { LeanDocument, Model } from "mongoose";

export default class Repository<T> {
  private Model: Model<T, {}, {}, {}, any>;

  private constructor(model: Model<T, {}, {}, {}, any>) {
    this.Model = model;
  }

  /**
   * List documents.
   * @returns Array of lean documents.
   */
  public list({ projection }: { projection?: (keyof T)[] } = {}) {
    let query = this.Model.find();
    if (projection) {
      query = query.select(projection);
    }
    return query.lean().exec();
  }

  /**
   * Get a specific document.
   * @param id Document id.
   * @returns Specified document.
   */
  public get(id: string, { projection }: { projection?: (keyof T)[] } = {}) {
    let query = this.Model.findById(id).orFail();
    if (projection) {
      query = query.select(projection);
    }
    return query.lean().exec();
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
  public async update(
    id: string,
    data: Partial<T>,
    { projection }: { projection?: (keyof T)[] } = {}
  ) {
    let query = this.Model.findById(id).orFail();
    if (projection) {
      query = query.select(projection);
    }
    const doc = await query.exec();
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

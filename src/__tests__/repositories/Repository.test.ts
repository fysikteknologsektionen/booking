import UserModel from "models/UserModel";
import { Error } from "mongoose";
import Repository from "repositories/Repository";
import users from "../__fixtures__/users";
import { dbDown, dbDropCollections, dbUp } from "../__utils__/db";

beforeAll(async () => {
  await dbUp();
});

afterAll(async () => {
  await dbDown();
});

beforeEach(async () => {
  await dbDropCollections();
  await UserModel.create(users);
});

// We use the User model in this suite, but any model could be used in
// practice since we're only testing the repo class itself and no model logic

describe("list", () => {
  test("returns all existing docs", async () => {
    const repo = await Repository.makeRepository(UserModel);
    const docs = await repo.list();
    expect(docs).toHaveLength(users.length);
  });

  test("returns empty array if no docs exist", async () => {
    const repo = await Repository.makeRepository(UserModel);
    await dbDropCollections();
    const docs = await repo.list();
    expect(docs).toHaveLength(0);
  });
});

describe("get", () => {
  test("returns correct doc", async () => {
    const repo = await Repository.makeRepository(UserModel);
    const id = "2b378f7a740f5ad24a85f83b";
    const doc = await repo.get(id);
    expect(doc._id.toString()).toBe(id);
  });

  test("throws if doc doesn't exist", async () => {
    const repo = await Repository.makeRepository(UserModel);
    // Id for non existant user
    const id = "2b378f7a740f5ad24a85f83c";
    await expect(repo.get(id)).rejects.toThrow(Error.DocumentNotFoundError);
  });
});

describe("create", () => {
  test("successfully creates new doc", async () => {
    const repo = await Repository.makeRepository(UserModel);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...data } = users[0];
    const doc = await repo.create(data);

    // Now test if doc exists
    await expect(repo.get(doc._id.toString())).resolves.toBeDefined();
  });

  test("throws if doc already exists", async () => {
    const repo = await Repository.makeRepository(UserModel);
    // We match instanceof MongoServerError since it's a peer depedency of mongoose,
    // so instead we match we exact expected error message
    await expect(repo.create(users[0])).rejects.toThrowError(
      `E11000 duplicate key error collection: test.users index: _id_ dup key: { _id: ObjectId('${users[0]._id.toString()}') }`
    );
  });
});

describe("update", () => {
  test("successfully updates existing doc", async () => {
    const repo = await Repository.makeRepository(UserModel);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id } = users[0];
    const data = {
      name: "Foo bar",
    };
    const doc = await repo.update(_id.toString(), data);

    // Verify returned document
    expect(doc).toEqual(expect.objectContaining(data));

    // And verify that doc is updated in db
    await expect(repo.get(_id.toString())).resolves.toEqual(
      expect.objectContaining(data)
    );
  });

  test("throws if doc doesn't exist", async () => {
    const repo = await Repository.makeRepository(UserModel);
    // Id for non existant user
    const id = "2b378f7a740f5ad24a85f83c";
    const data = {
      name: "Foo bar",
    };
    await expect(repo.update(id, data)).rejects.toThrow(
      Error.DocumentNotFoundError
    );
  });
});

describe("delete", () => {
  test("successfully deletes existing document", async () => {
    const repo = await Repository.makeRepository(UserModel);
    // First verify that document exists
    const id = "2b378f7a740f5ad24a85f83b";
    await expect(repo.get(id)).resolves.toBeDefined();
    // Now delete
    await expect(repo.delete(id)).resolves.not.toThrowError();
    // Verify that document is deleted
    await expect(repo.get(id)).rejects.toThrow(Error.DocumentNotFoundError);
  });

  test("throws if doc doesn't exist", async () => {
    const repo = await Repository.makeRepository(UserModel);
    // Id for non existant user
    const id = "2b378f7a740f5ad24a85f83c";
    await expect(repo.delete(id)).rejects.toThrow(Error.DocumentNotFoundError);
  });
});

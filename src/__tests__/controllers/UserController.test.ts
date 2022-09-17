import UserController from "controllers/UserController";

import ApiError from "lib/ApiError";
import { Role } from "models/UserModel";
import {
  adminSession,
  managerSession,
  userSession,
} from "../__fixtures__/sessions";

jest.mock("repositories/Repository");

describe("getUsers", () => {
  test.each([
    ["USER", userSession],
    ["MANAGER", managerSession],
  ])("throws if called by %s session", async (_, session) => {
    const controller = await UserController.makeController(session);
    expect(() => controller.getUsers()).toThrow(ApiError);
  });

  test("works if called by ADMIN session", async () => {
    const controller = await UserController.makeController(adminSession);
    expect(() => controller.getUsers()).not.toThrow(ApiError);
    await expect(controller.getUsers()).resolves.toBeDefined();
  });
});

describe("updateUser", () => {
  test.each([
    ["USER", userSession],
    ["MANAGER", managerSession],
  ])("throws if called by %s session", async (_, session) => {
    const controller = await UserController.makeController(session);
    expect(() => controller.updateUser("id", { role: Role.USER })).toThrow(
      ApiError
    );
  });

  test("works if called by ADMIN session", async () => {
    const controller = await UserController.makeController(adminSession);
    expect(() => controller.updateUser("id", { role: Role.USER })).not.toThrow(
      ApiError
    );
    await expect(controller.getUsers()).resolves.toBeDefined();
  });
});

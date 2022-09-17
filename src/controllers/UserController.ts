import UserModel, { Role, User } from "models/UserModel";
import { Session } from "next-auth";
import Repository from "repositories/Repository";
import AbstractController from "./AbstractController";

export default class UserController extends AbstractController<User> {
  public getUsers() {
    this.requireRole(Role.ADMIN);
    return this.repository.list();
  }

  public updateUser(id: string, { role }: Partial<User>) {
    this.requireRole(Role.ADMIN);
    return this.repository.update(id, { role });
  }

  public static async makeController(session: Session | null) {
    const repository = await Repository.makeRepository(UserModel);
    return new UserController(session, repository);
  }
}

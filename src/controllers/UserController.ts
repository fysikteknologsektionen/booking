import requireRole from "lib/requireRole";
import UserModel, { Role, User } from "models/UserModel";
import { Session } from "next-auth";
import Repository from "repositories/Repository";
import AbstractController from "./AbstractController";

export default class UserController extends AbstractController<User> {
  public getUsers() {
    requireRole(this.session, Role.ADMIN);
    return this.Repository.list();
  }

  public updateUser(id: string, { role }: Partial<User>) {
    requireRole(this.session, Role.ADMIN);
    return this.Repository.update(id, { role });
  }

  public static async makeController(session: Session | null) {
    const repository = await Repository.makeRepository(UserModel);
    return new UserController(session, repository);
  }
}

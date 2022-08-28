import requireRole from "lib/middleware/requireRole";
import UserModel, { Role, User } from "models/UserModel";
import { Session } from "next-auth";
import Repository from "repositories/Repository";

export default class UserController {
  session: Session | null;

  Repository: Repository<User>;

  private constructor(session: Session | null, repository: Repository<User>) {
    this.session = session;
    this.Repository = repository;
  }

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

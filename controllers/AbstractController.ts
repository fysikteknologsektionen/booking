import { Session } from "next-auth";
import Repository from "repositories/Repository";

export default abstract class AbstractController<T> {
  session: Session | null;

  Repository: Repository<T>;

  protected constructor(session: Session | null, repository: Repository<T>) {
    this.session = session;
    this.Repository = repository;
  }
}

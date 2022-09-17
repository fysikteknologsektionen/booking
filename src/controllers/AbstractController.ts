import ApiError from "lib/ApiError";
import logger from "lib/logger";
import { Role } from "models/UserModel";
import { Session } from "next-auth";
import Repository from "repositories/Repository";

export default abstract class AbstractController<
  T extends Record<string, any>
> {
  private _session: Session | null;

  private _repository: Repository<T>;

  public get repository() {
    return this._repository;
  }

  private _projection?: (keyof T)[];

  public get projection() {
    return this._projection;
  }

  private combineProjections(
    baseProjection: (keyof T)[],
    roleProjections?: { [key in Role]?: (keyof T)[] }
  ) {
    const role: Role | null = this._session?.user.role;
    const additionalFields =
      role !== null && roleProjections && role in roleProjections
        ? (roleProjections[role] as (keyof T)[])
        : [];
    return baseProjection.concat(additionalFields);
  }

  protected constructor(
    session: Session | null,
    repository: Repository<T>,
    baseProjection?: (keyof T)[],
    roleProjections?: { [key in Role]?: (keyof T)[] }
  ) {
    this._session = session;
    this._repository = repository;
    if (baseProjection) {
      this._projection = this.combineProjections(
        baseProjection,
        roleProjections
      );
    }
  }

  /**
   * Require that a user is authenticated and has minimum role.
   * @param role Minimum role the user has to have.
   * @throws `ApiError` if user is unauthenticated or lacks role.
   */
  protected requireRole(role: Role) {
    if (!this._session) {
      const error = new ApiError(401, "Not authorized");
      logger.info(error.message, { ...error });
      throw error;
    }
    if (this._session.user.role < role) {
      const error = new ApiError(403, "Not permitted");
      logger.info(error.message, {
        ...error,
        user: this._session.user,
      });
      throw error;
    }
  }

  /**
   * Require that a user (id) is included in a specific document field.
   * @param id Id for document to look in.
   * @param field The document field to look in.
   * @throws `Error` if the field does not exist on the document.
   * @throws `ApiError` if the user is not included in field.
   */
  protected async requireUserIn(id: string, field: keyof T) {
    const doc = await this.repository.get(id);
    if (!(field in doc)) {
      throw new Error(`${String(field)} does not exist on document.`);
    }
    // @ts-expect-error
    const value = doc[field];
    if (!(Array.isArray(value) ? value.includes(id) : value === id)) {
      const error = new ApiError(403, "Not permitted");
      logger.info(error.message, {
        ...error,
        user: this._session?.user,
      });
      throw error;
    }
  }
}

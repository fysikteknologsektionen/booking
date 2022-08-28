import ApiError from "lib/ApiError";
import logger from "lib/logger";
import { Role } from "models/UserModel";
import { Session } from "next-auth";

/**
 * Require that a user is authenticated and has minimum role.
 * @throws `HTTPError` if user is unauthenticated or lacks role.
 */
export default function requireRole(session: Session | null, role: Role) {
  if (!session) {
    const error = new ApiError(401, "Not authorized");
    logger.info(error.message, { ...error });
    throw error;
  }
  if (session.user.role < role) {
    const error = new ApiError(403, "Not permitted");
    logger.info(error.message, {
      ...error,
      user: session.user,
    });
    throw error;
  }
}

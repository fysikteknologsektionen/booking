import { NextApiRequest, NextApiResponse } from "next";
import { Error } from "mongoose";
import ApiError from "./ApiError";
import logger from "./logger";

/**
 * Wrap API handler to catch errors etc.
 * @param fn API handler function.
 * @returns Wrapped API handler.
 */
export default function apiHandler(
  fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await fn(req, res);
    } catch (error: any) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      if (error instanceof Error.DocumentNotFoundError) {
        res.status(404).json({ message: "Resource not found" });
        return;
      }
      logger.error(error.message, { ...error });
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

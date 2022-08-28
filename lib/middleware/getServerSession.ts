import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import authOptions from "../authOptions";

/**
 * Return active user session.
 * @param req Request object.
 * @param res Response object.
 * @returns Session object or `null` if no session can be retrieved.
 */
export default function getServerSession<T>(
  req: NextApiRequest,
  res: NextApiResponse<T>
) {
  // Wrap this since it's experimental.
  return unstable_getServerSession(req, res, authOptions);
}

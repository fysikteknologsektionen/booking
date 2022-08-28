import { NextApiRequest } from "next";

/**
 * Parse a query object into a string-string record.
 * @param query The query object to parse.
 * @returns Parsed query object.
 */
export default function parseQuery(query: NextApiRequest["query"]) {
  return Object.fromEntries(
    Object.entries(query).map(([key, val]) => [
      key,
      Array.isArray(val) ? val[0] : val,
    ])
  );
}

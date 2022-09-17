import parseQuery from "lib/parseQuery";
import apiHandler from "lib/apiHandler";
import UserController from "controllers/UserController";
import getServerSession from "lib/getServerSession";

export default apiHandler(async (req, res) => {
  const session = await getServerSession(req, res);
  // id will always be defined on this route
  const { id } = parseQuery(req.query) as { id: string };
  const controller = await UserController.makeController(session);

  switch (req.method) {
    case "PATCH":
      res.json(controller.updateUser(id, req.body));
      break;
    default:
      res
        .status(405)
        .setHeader("Allow", ["PATCH"])
        .json({ message: "Method not allowed" });
      break;
  }
});

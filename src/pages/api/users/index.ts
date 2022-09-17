import UserController from "controllers/UserController";
import apiHandler from "lib/apiHandler";
import getServerSession from "lib/getServerSession";

export default apiHandler(async (req, res) => {
  const session = await getServerSession(req, res);
  const controller = await UserController.makeController(session);

  switch (req.method) {
    case "GET":
      res.json(await controller.getUsers());
      break;
    default:
      res
        .status(405)
        .setHeader("Allow", ["GET"])
        .json({ message: "Method not allowed" });
      break;
  }
});

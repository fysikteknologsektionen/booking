import VenueController from "controllers/VenueController";
import apiHandler from "lib/apiHandler";
import getServerSession from "lib/getServerSession";

export default apiHandler(async (req, res) => {
  const session = await getServerSession(req, res);
  const controller = await VenueController.makeController(session);

  switch (req.method) {
    case "GET":
      res.json(await controller.getVenues());
      break;
    case "POST":
      res.json(await controller.createVenue(req.body));
      break;
    default:
      res
        .status(405)
        .setHeader("Allow", ["GET", "POST"])
        .json({ message: "Method not allowed" });
      break;
  }
});

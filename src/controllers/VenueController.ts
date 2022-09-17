import { Role } from "models/UserModel";
import VenueModel, { Venue } from "models/VenueModel";
import { Session } from "next-auth";
import Repository from "repositories/Repository";
import AbstractController from "./AbstractController";

export default class VenueController extends AbstractController<Venue> {
  public getVenues() {
    return this.repository.list({ projection: this.projection });
  }

  public getVenue(id: string) {
    return this.repository.get(id, { projection: this.projection });
  }

  public createVenue({
    name,
    description,
    timeslots,
    managers,
  }: Partial<Venue>) {
    this.requireRole(Role.ADMIN);
    return this.repository.create({
      name,
      description,
      timeslots,
      managers,
    });
  }

  public deleteVenue(id: string) {
    this.requireRole(Role.ADMIN);
    this.repository.delete(id);
  }

  public async updateVenue(
    id: string,
    { name, description, timeslots, managers }: Partial<Venue>
  ) {
    this.requireRole(Role.MANAGER);
    await this.requireUserIn(id, "managers");
    this.repository.update(
      id,
      {
        name,
        description,
        timeslots,
        managers,
      },
      { projection: this.projection }
    );
  }

  public static async makeController(session: Session | null) {
    const repository = await Repository.makeRepository(VenueModel);
    return new VenueController(
      session,
      repository,
      ["name", "description", "timeslots"],
      { [Role.ADMIN]: ["managers"] }
    );
  }
}

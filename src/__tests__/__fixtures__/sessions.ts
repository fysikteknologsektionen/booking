import { add } from "date-fns";
import { Session } from "next-auth";
import users from "./users";

const user = users[0];
const userSession: Session = {
  user: {
    id: user._id.toString(),
    name: user.name,
    image: user.image,
    role: user.role,
  },
  expires: add(new Date(), { days: 10 }).toISOString(),
};

const manager = users[2];
const managerSession: Session = {
  user: {
    id: manager._id.toString(),
    name: manager.name,
    image: manager.image,
    role: manager.role,
  },
  expires: add(new Date(), { days: 10 }).toISOString(),
};

const admin = users[3];
const adminSession: Session = {
  user: {
    id: admin._id.toString(),
    name: admin.name,
    image: admin.image,
    role: admin.role,
  },
  expires: add(new Date(), { days: 10 }).toISOString(),
};

export { userSession, managerSession, adminSession };

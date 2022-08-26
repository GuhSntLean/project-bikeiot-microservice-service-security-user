import { dataSource } from "../config/database";
import { User } from "../models/User";

const userRepository = dataSource.getRepository(User);

export { userRepository };

import { dataSource } from "../config/database";
import { RefreshToken } from "../models/RefreshToken";

const refreshTokenRepository = dataSource.getRepository(RefreshToken);

export { refreshTokenRepository };

import dayjs from "dayjs";
import { InterceRefreshToken } from "../interfaces/InterfaceRefreshToken";
import { refreshTokenRepository } from "../repository/RefreshTokenRepository";
import { userRepository } from "../repository/UserRepository";

class RefreshTokenProvider {
  async execute(idUser: string) {
    const user = await userRepository.findOneBy({ id: idUser });
    if (!user) {
      return new Error("Error generate refreshtoken");
    }

    try {
      const value = dayjs().add(15, "days").unix();
      const refreshTokenRemove = await refreshTokenRepository.findOne({
        where: { userId: { id: idUser }},
      });
      
      if(refreshTokenRemove){
        await refreshTokenRepository.remove(refreshTokenRemove);
      }

      const refreshToken = refreshTokenRepository.create({
        expireIn: value,
        userId: user,
      });

      await refreshTokenRepository.save(refreshToken);

      const refreshTokenReturn: InterceRefreshToken = {
        id: refreshToken.id,
        expireIn: refreshToken.expireIn,
      };

      return refreshTokenReturn;
    } catch (error) {
      return new Error("Error generate refreshtoken");
    }
  }
}

export { RefreshTokenProvider };

import { refreshTokenRepository } from "../repository/RefreshTokenRepository";

class RefreshTokenUseCase {
  async generateRefreshToken(userId: string) {
    const existRefreshToken = refreshTokenRepository.find({where: { user: {id: userId} }});
    
    if(existRefreshToken){
      refreshTokenRepository.delete({user:{id: userId}});
    }
  }

  async verifyToken() {}
}

export { RefreshTokenUseCase };

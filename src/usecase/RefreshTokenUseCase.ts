import { TokenProvider } from "../provider/TokenProvider";
import { refreshTokenRepository } from "../repository/RefreshTokenRepository";

class RefreshTokenUseCase {
  async generateRefreshToken(userId: string) {
    const existRefreshToken = refreshTokenRepository.find({
      where: { user: { id: userId } },
    });

    if (existRefreshToken) {
      refreshTokenRepository.delete({ user: { id: userId } });
    }
  }

  async verifyToken(refreshTokenId: string) {
    const existRefreshToken = await refreshTokenRepository.findOneBy({
      id: refreshTokenId,
    });

    if (!existRefreshToken) {
      return new Error("Not authorized");
    }

    const tokenProvider = new TokenProvider();
    const token = tokenProvider.execute(existRefreshToken.user.id);

    return token;
  }
}

export { RefreshTokenUseCase };

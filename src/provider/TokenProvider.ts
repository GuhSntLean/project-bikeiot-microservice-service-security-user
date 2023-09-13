import { sign } from "jsonwebtoken";

class TokenProvider {
  execute(userId: string) {
    if(!userId) {
      return new Error('User not found');
    }

    const token = sign({}, "79123427-290f-4c63-aca3-120ea5364159", {
      subject: userId,
      expiresIn: "1h",
    });

    return token;
  }
}

export { TokenProvider };

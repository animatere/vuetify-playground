import { UserData } from "@/interfaces/interfaces";
import { SignJWT } from "jose";

export async function useCreateToken(user: UserData) {
  try {
    const payload = {
      id: user.id,
      username: user.username,
    };
    const secret = new TextEncoder().encode("my_secret_key");
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
  } catch (err) {
    console.error("Fehler beim Generieren des Tokens:", err);
    return null;
  }
}

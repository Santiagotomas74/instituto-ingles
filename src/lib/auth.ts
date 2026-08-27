import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado.");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export type AuthPayload = {
  userId: string;
  role: "admin" | "teacher" | "student";
};

export async function createAuthToken(payload: AuthPayload) {
  return await new SignJWT({
    userId: payload.userId,
    role: payload.role,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAuthToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.userId !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }

    if (
      payload.role !== "admin" &&
      payload.role !== "teacher" &&
      payload.role !== "student"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      role: payload.role as AuthPayload["role"],
    };
  } catch {
    return null;
  }
}

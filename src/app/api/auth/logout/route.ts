import { cookies } from "next/headers";

export async function POST() {
  const cookieStore: any = await cookies();

  // Clear access token
  cookieStore.set("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(0), // delete immediately
  });

  // Clear refresh token
  cookieStore.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(0), // delete immediately
  });

  return new Response(
    JSON.stringify({ success: true, message: "Logged out successfully" }),
    { status: 200 }
  );
}

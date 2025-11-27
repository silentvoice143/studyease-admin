import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json();

  const cookieStore: any = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 15 * 60, // 15 min
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

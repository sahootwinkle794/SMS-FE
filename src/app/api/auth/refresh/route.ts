import { postRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    console.log("Incoming Refresh Token:", refreshToken);

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );
    }

    // CALL BACKEND SERVICE
    const apiRes = await postRequest(
      API_PATH.AUTH_REFRESH,
      { refreshToken }
    );

    console.log("Backend refresh response:", apiRes);

    // Correct structure
    // const newAccess = apiRes?.data?.accessToken;
    // const newRefresh = apiRes?.data?.refreshToken;

    // if (!newAccess || !newRefresh) {
    //   return NextResponse.json(
    //     { message: "Invalid backend response" },
    //     { status: 500 }
    //   );
    // }

    // Create a NextResponse to send cookies
    const response = NextResponse.json({ ok: true });

    // UPDATE COOKIES
    // response.cookies.set("accessToken", newAccess, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 60 * 15,
    //   path: "/",  // IMPORTANT: do NOT use "/sms"
    // });

    // response.cookies.set("refreshToken", newRefresh, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 24 * 7,
    //   path: "/",
    // });

    return response;

  } catch (error) {
    console.error("Refresh API error:", error);

    return NextResponse.json(
      { message: "Refresh request failed", error },
      { status: 500 }
    );
  }
}

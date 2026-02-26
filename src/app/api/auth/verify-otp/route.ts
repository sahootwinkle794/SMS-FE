import { verifyAccessToken } from "@/lib/jwt";
import { postRequest } from "@/service";
import {
  ApiResponse,
  VerifyOtpPayload,
  ApiError,
} from "@/types/api/auth/verify-otp/verifyOtp";
import { API_PATH } from "@/utils/apiPath";
import { STATUS_CODE, STATUS_MESSAGE } from "@/utils/constants";
import { NextResponse } from "next/server";

console.log("API URL:", process.env.API_URL);

function isApiError(error: unknown): error is ApiError {
  if (typeof error !== "object" || error === null) {
    return false;
  }
  return (
    "status" in error &&
    typeof (error as ApiError).status === "number" &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}

// ... (imports and interfaces from previous steps) ...

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendRes = await postRequest<
      typeof body,
      ApiResponse<VerifyOtpPayload>
    >(API_PATH.VERIFY_OTP, body);
    const { status, data } = backendRes;

    if (status === STATUS_CODE.SUCCESS || status === STATUS_CODE.CREATED) {
      // ... (Success logic remains the same, using 'data' properties) ...
      if (!data.accessToken) {
        throw new Error(STATUS_MESSAGE.MISSING_BACKEND_RESPONSE);
      }
      const decodeToken = await verifyAccessToken(data.accessToken);
      const { sub: id, mobile: userId, role, roleUnqId } = decodeToken;
      const response = NextResponse.json({
        data: {
          id,
          userId,
          role,
          roleUnqId,
        },
      });
      response.cookies.set("accessToken", data.accessToken, {
        /* ... */
      });
      response.cookies.set("refreshToken", data.refreshToken, {
        /* ... */
      });
      return response;
    }
  } catch (err) {
    // The existing catch block will now safely pick up the thrown ApiError instance
    if (isApiError(err)) {
      if (err.status === 401) {
        return NextResponse.json(
          { message: err.message || STATUS_MESSAGE.INVALID_OTP },
          { status: STATUS_CODE.UNAUTHORIZED },
        );
      }
      return NextResponse.json(
        { message: err.message },
        { status: err.status },
      );
    }

    return NextResponse.json(
      { message: STATUS_MESSAGE.UNKNOWN_ERROR },
      { status: STATUS_CODE.INTERNAL_ERROR },
    );
  }
}

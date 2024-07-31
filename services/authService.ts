"use client";
import http from "./httpService";

export function getOtp(data: any) {
  return http.post("/auth/send-otp", data);
}

export function checkOtp(data: any) {
  return http.post("/auth/check-otp", data);
}

export function verifyUser() {
  return http.get("/auth/verify-user");
}

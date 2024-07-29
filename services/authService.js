"use client";
import http from "./httpService";

export function getOtp(data) {
  return http.post("/auth/send-otp", data);
}

export function checkOtp(data) {
  return http.post("/auth/check-otp", data);
}

"use client";
import { useEffect } from "react";
export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  }, []);
  return null;
}

"use client";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const email = localStorage.getItem("loggedInUser");
    if (!email) window.location.href = "/login";
    setUser(JSON.parse(localStorage.getItem(email)));
  }, []);
  if (!user) return null;
  return (
    <>
      <ProfileCard user={user} />
      <p>Subscription: {user.subscription}</p>
      <a href="/subscribe">Manage Subscription</a>
    </>
  );
}

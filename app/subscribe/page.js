"use client";
export default function Subscribe() {
  const subscribe = (plan) => {
    const email = localStorage.getItem("loggedInUser");
    const user = JSON.parse(localStorage.getItem(email));
    user.subscription = plan;
    localStorage.setItem(email, JSON.stringify(user));
    window.location.href = "/dashboard";
  };
  return (
    <>
      <h2>Choose Plan</h2>
      <button onClick={() => subscribe("Basic")}>Basic</button>
      <button onClick={() => subscribe("Pro")}>Pro</button>
    </>
  );
}

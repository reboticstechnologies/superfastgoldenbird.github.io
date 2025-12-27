"use client";
import { login } from "@/utils/auth";
export default function Login() {
  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

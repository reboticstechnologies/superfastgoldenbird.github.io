"use client";
import { register } from "@/utils/auth";
export default function Register() {
  return (
    <form onSubmit={register}>
      <h2>Create Account</h2>
      <input name="name" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

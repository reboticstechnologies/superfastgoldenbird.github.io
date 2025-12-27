export function register(e) {
  e.preventDefault();
  const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
    subscription: "None",
  };
  localStorage.setItem(user.email, JSON.stringify(user));
  window.location.href = "/login";
}
export function login(e) {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem(e.target.email.value));
  if (user && user.password === e.target.password.value) {
    localStorage.setItem("loggedInUser", user.email);
    window.location.href = "/dashboard";
  } else {
    alert("Invalid credentials");
  }
}

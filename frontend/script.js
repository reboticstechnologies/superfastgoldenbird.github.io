
const API = "http://localhost:5000";
let token = "";

async function register() {
  await fetch(API + "/api/register", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: rEmail.value, password: rPass.value
    })
  });
  alert("Registered");
}

async function login() {
  const r = await fetch(API + "/api/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: lEmail.value, password: lPass.value
    })
  });
  const d = await r.json();
  token = d.token;
  out.innerText = JSON.stringify(d, null, 2);
}

async function profile() {
  const r = await fetch(API + "/api/profile", {
    headers: { "Authorization": token }
  });
  out.innerText = JSON.stringify(await r.json(), null, 2);
}

async function subscribe(plan) {
  const r = await fetch(API + "/api/subscribe", {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ plan })
  });
  out.innerText = JSON.stringify(await r.json(), null, 2);
}

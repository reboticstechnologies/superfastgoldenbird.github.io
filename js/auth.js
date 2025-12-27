function registerUser() {
  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
    subscription: "None"
  };
  localStorage.setItem(user.email, JSON.stringify(user));
  alert("Registration successful");
  window.location.href = "login.html";
}

function loginUser() {
  const user = JSON.parse(localStorage.getItem(loginEmail.value));
  if (user && user.password === loginPassword.value) {
    localStorage.setItem("loggedInUser", user.email);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

function loadDashboard() {
  const email = localStorage.getItem("loggedInUser");
  if (!email) window.location.href = "login.html";

  const user = JSON.parse(localStorage.getItem(email));
  userName.innerText = user.name;
  userEmail.innerText = user.email;
  subscriptionStatus.innerText = user.subscription;

  const services = {
    Basic: ["Email Support", "Consultation"],
    Pro: ["AI Solutions", "Automation", "Priority Support"]
  };

  servicesList.innerHTML = "";
  (services[user.subscription] || []).forEach(s =>
    servicesList.innerHTML += `<li>${s}</li>`
  );
}

function subscribe(plan) {
  const email = localStorage.getItem("loggedInUser");
  const user = JSON.parse(localStorage.getItem(email));
  user.subscription = plan;
  localStorage.setItem(email, JSON.stringify(user));
  alert("Subscribed to " + plan);
  window.location.href = "dashboard.html";
}


const API = "http://localhost:5000";

async function upload() {
  const f = document.getElementById("file").files[0];
  if (!f) return;

  const fd = new FormData();
  fd.append("file", f);

  const r = await fetch(API + "/upload", { method: "POST", body: fd });
  document.getElementById("status").innerText = (await r.json()).message;
  load();
}

async function load() {
  const r = await fetch(API + "/files");
  const files = await r.json();
  document.getElementById("list").innerHTML =
    files.map(f => `<li><a href="${API}/uploads/${f}" target="_blank">${f}</a></li>`).join("");
}

load();

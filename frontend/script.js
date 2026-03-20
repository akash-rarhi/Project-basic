const API = "http://localhost:5000";

async function addUser() {
  const name = document.getElementById("nameInput").value;

  await fetch(`${API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  getUsers();
}

async function getUsers() {
  const res = await fetch(`${API}/users`);
  const data = await res.json();

  const list = document.getElementById("userList");
  list.innerHTML = "";

  data.forEach(user => {
    const li = document.createElement("li");
    li.innerText = user.name;
    list.appendChild(li);
  });
}

getUsers();
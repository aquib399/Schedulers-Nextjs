async function send(username, password) {
  const res = await fetch("http://localhost:8080/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  return data;
}

send("abc123", "intmain()").then(console.log);

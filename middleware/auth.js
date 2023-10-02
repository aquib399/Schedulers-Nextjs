import cookie from "js-cookie";
export const server = "https://backend-1-e4683154.deta.app"; //production
// export const server = "http://localhost:8080"; // developement

export function setCookie(username, password) {
  cookie.set("username", username, { expires: 30 });
  cookie.set("password", password, { expires: 30 });
}
export function getCookie() {
  const username = cookie.get("username");
  const password = cookie.get("password");
  return { username, password };
}
export function clearCookie() {
  cookie.remove("username");
  cookie.remove("password");
}
export async function verifyCookie() {
  try {
    const { username, password } = getCookie();
    if (!(username && password)) return false;
    const res = await fetch(server + "/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.status == 200) return { username, password };
    throw "Cookie not valid";
  } catch (err) {
    // clearCookie();
    console.error(err);
    return false;
  }
}

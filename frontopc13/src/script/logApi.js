const urlApiLog = "http://localhost:3001/api/v1/user/login";
export async function getUserApi(log, mdp) {
  try {
    const response = await fetch(urlApiLog, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: log, password: mdp }), // body data type must match "Content-Type" header
    });
    const result = await response.json();

    return result

  } catch {
  }
}

const urlApiUserInfo = "http://localhost:3001/api/v1/user/profile"

export async function infoUser(token){
  try{
    const response = await fetch(urlApiUserInfo, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }})
    const result = await response.json()

    return result

  } catch {
  }}

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

    return result;
  } catch(error) {
    console.log(error)
    throw error;
  }
}

const urlApiUserInfo = "http://localhost:3001/api/v1/user/profile";
export async function infoUser(token) {
  try {
    const response = await fetch(urlApiUserInfo, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error){
    console.log(error)
    throw error;
  }
}

const urlApiUpdateUserInfo = "http://localhost:3001/api/v1/user/profile";
export async function updateInfoUser(token, newFirstName, newLastName) {
  var raw = JSON.stringify({
    firstName: newFirstName,
    lastName: newLastName,
  });
  console.log(raw);
  try {
    const response = await fetch(urlApiUpdateUserInfo, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow", // body data type must match "Content-Type" header
    });
    const result = await response.json();

    return result;
  } catch {}
}

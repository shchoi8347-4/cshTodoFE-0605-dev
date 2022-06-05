import { API_BASE_URL } from "../app-config";
const ACESS_TOKEN = "ACESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem(ACESS_TOKEN);
  if(accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
  .then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      console.log("response.json().data", json.data);
      return json;
    })
  )
  .catch((error) => {
    console.log(error.status);
    if( error.status === 403 ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  } );
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      //console.log("response: ", response);
      //alert("로그인 토큰: " + response.token);
      if(response.token) {
        localStorage.setItem(ACESS_TOKEN, response.token);
        window.location.href = "/";
      }
    }

    );
}

export function signout() {
  localStorage.setItem(ACESS_TOKEN, null);
  window.location.href = "/login";
}    

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}    

// export default call;

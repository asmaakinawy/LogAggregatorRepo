const loginForm = document.getElementById("loginForm");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
// write the url
const url = "http://127.0.0.1:8000/auth/token/";
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  // console.log(inputEmail.value);
  // console.log(inputPassword.value);
  if (inputEmail.value && inputPassword.value) {
    let userInfo = {
      username: inputEmail.value,
      password: inputPassword.value
    };
    login(userInfo);
  } else {
    alert("Wrong Email or Password");
  }
});

function login(body) {
  // console.log(body);
  body["grant_type"] = "password";
  body["client_id"] = "JGoLJRfKd4aTjPrz39RQ93MYXsjN18P8PxCPSPOp";
  body["client_secret"] = "jY1WvGlUvjjnCUudD03eBqWVDKu1W7zsiQT7ikRBhGdIKxomcwDDPuQ4ErImesx55axZ5aA5jMIwJ0ErFwJv98S21smj1IJe42SD4rLnZWFXMjCQxqUgcTeQfO2AML0j";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.access_token)
      localStorage.setItem("access_token", JSON.stringify(data.access_token));
      // window.location = "/api/v1/log_list/";
    })
    .catch(err => {
      console.log('error');
      console.log(err);
    });
}
const app = new Vue({
  el: "#app",
  data: {
    page: "main",
    modal: "",
    loginData: {
      email: "",
      password: "",
    },
    authData: {
      patronymic: "",
      last_name: "",
      first_name: "",
    },
  },
  methods: {
    goAuth() {
      this.modal = "auth";
    },
    goLogin() {
      this.modal = "login";
    },
    exitModal(e) {
      if (e.srcElement.classList.contains("modal-window")) this.modal = "";
    },
    async auth(e) {
      e.preventDefault();
      const body = {
        patronymic: this.authData.patronymic,
        last_name: this.authData.last_name,
        first_name: this.authData.first_name,
        email: this.loginData.email,
        password: this.loginData.password,
      };
      console.log(await goToAddress("user/auth", body, "POST"));
    },
  },
});

const START_URL = "http://localhost:3000/";
async function goToAddress(url, body, method = "GET") {
  let query = START_URL + url + "?";
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const element = body[key];
      query += key + "=" + element.replaceAll(" ", "%") + "&";
    }
  }
  const response = await fetch(query, {
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  if (response.ok) {
    console.log("Hello");
  }
  return await response.json();
}

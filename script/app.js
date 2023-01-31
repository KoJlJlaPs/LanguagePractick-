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
    user:{
      email:"",
      displayName:"",
      token:""
    }
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
    async login(e){
      e.preventDefault();
      const body = {
        email: this.loginData.email,
        password: this.loginData.password,
      };
      const response = await goToAddress("user/login", body, "POST");
      const result = await response.json();
      if(result.message == "Good"){
        this.user.email = result.data.email;
        this.user.displayName = result.data.name;
        this.user.token = await response.cookie("Authorization");
        console.log(this.user.token);
        this.modal = "";
      }else
        this.user.token = "";
      console.log(result);
    },
    logout(){}
  },
});

const START_URL = "http://localhost:3000/";
async function goToAddress(url, body, method = "GET",token = null) {
  let query = START_URL + url + "?";
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const element = body[key];
      query += key + "=" + element.replaceAll(" ", "%") + "&";
    }
  }
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
  };
  return await fetch(query, {
    method,
    headers,
  });
}

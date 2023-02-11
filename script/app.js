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
        this.user.token = await response.cookie?.Authorization;
        this.modal = "";
      }else
        this.user.token = "";
    },
    logout(){
      this.user.token = "";
    }
  },
  created:async function(){
    const response = await goToAddress('user/check-cookie',null,"GET",document.cookie.session);
    const result = await response.json();
    if(result.cookie)
    this.user.token = result.cookie;
  }
});


async function goToAddress(url, body, method = "GET",token = null) {
  let query = "http://localhost:3000/" + url;
  if(body)
    query+="?";
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const element = body[key];
      query += key + "=" + element.replaceAll(" ", "%") + "&";
    }
  }
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
  };
  if(token)
    headers['auth'] = token
  return await fetch(query, {
    method,
    headers,
  });
}

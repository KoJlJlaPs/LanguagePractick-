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
      second_name: "",
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
    async auth(e){
      e.preventDefault();
      const result = await goToAddress('user/auth',{
        second_name:this.authData.second_name,
        last_name:this.authData.last_name,
        first_name:this.authData.first_name,
        email:this.loginData.email,
        password: this.loginData.password
      },'POST');
      console.log(result);
    }
  },
});
async function goToAddress(url, body, method = 'GET') {
  const response = await fetch("http://localhost:3000/" + url, {
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body,
  });
  return await response.json();
}

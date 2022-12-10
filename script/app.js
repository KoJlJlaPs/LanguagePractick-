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
        async auth(e){
            e.preventDefault();
            const body = {
                patronymic:this.authData.patronymic,
                last_name:this.authData.last_name,
                first_name:this.authData.first_name,
                email:this.loginData.email,
                password: this.loginData.password
            };
            console.log(body);
            const result = await goToAddress('user/test',body,'POST');
            console.log(result);
        }
    },
    });
async function goToAddress(url, body, method = 'GET') {
    let body = "";
    for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
            const element = body[key];
            
        }
    }
    const response = await fetch("http://localhost:3000/" + url, {
        method,
        headers: {
        "Content-Type": "application/json;charset=utf-8",
        },
        body,
    });
    return await response.json();
}

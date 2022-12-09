const app = new Vue({
    el:"#app",
    data:{
        page:"main",
        modal:"",
    },
    methods:{
        goAuth(){
            this.modal = "auth";
        },
        goLogin(){
            this.modal = "login";
        },
        exitModal(e){
            if(e.srcElement.classList.contains('modal-window'))
            this.modal = "";
        }
    }
})


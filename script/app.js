const app = new Vue({
    el:"#app",
    data:{
        page:"main",
        modal:""
    },
    methods:{
        goAuth(){
            this.modal = "auth";
        }
    }
})
Vue.component("login",{

    data: function(){
        return{
            user:{
                username:"",
                password:"",
            }
        }
    },
    mounted(){

    },
    template:`
    	<div  class="center">
        	
            <div >
            <h1 style="padding-left: 40%;">Login form</h1>
                <form id="loginForm" method ="POST"  @submit.prevent = "login">
                    <div class="pp">
                        <label class="lbl" for="username"><b>Username</b></label>
                        <input type="text" v-model="user.username" placeholder = "Username" required autofocus/>
                    </div>
                    <p class="pp">
                        <label class="lbl" for="password"><b>Password</b></label>
                        <input type="password" v-model="user.password" placeholder = "Password" required/>
                    </p>                
                    <p class="btn2">
                        <button class="emptyLabel" type = "submit" >Login</button>
                        <button type= "button" v-on:click="cancel">Cancel</button>
                    </p>  
                    </form>              
            </div>
        </div>
    `,
    methods:{
        login(){
            axios
            .post('/login',this.user)
            .then(response => {
                localStorage.setItem('role',response.data.role)
                localStorage.setItem('id',response.data.id)
                localStorage.setItem('username',response.data.username)
                console.log(response.data)
                this.$router.push('/')
                window.location.reload()
            })
            .catch((error) => {
                console.log("Error");
                alert("Invalid username or password");
              });
        },

        cancel(){
            this.$router.push("/")
            window.location.reload()
        }
    }

});
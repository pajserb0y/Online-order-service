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
    	<div>
        	<h1>Login form</h1>
            <div class="container">
                <form id="loginForm" method ="POST" @submit.prevent = "login">
                    <div>
                        <label for="username"><b>Username</b></label>
                        <input type="text" v-model="user.username" placeholder = "Username" required/>
                    </div>
                    <div>
                        <label for="password"><b>Password</b></label>
                        <input type="password" v-model="user.password" placeholder = "Password" required/>
                    </div>
                    <p></p>
                    <div>
                        <button type = "submit">Login</button>
                        <button type= "button" v-on:click="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    methods:{
        login(){
            axios
            .post('/login',this.user)
            .then(response=>{
                localStorage.setItem('role',response.data.role)
                localStorage.setItem('id',response.data.entityID)
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
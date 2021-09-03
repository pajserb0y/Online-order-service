Vue.component("registration", {
	data: function () {
		    return {
                user: {
                    username:"",
                    password:"",
                    firstName:"",
                    lastName:"",                    
                    gender:"",
                    dateOfBirth:"",
                    role:""
                }
		    }
	},
    template:`
    	<div class="center">
            <div class="registrationPageStyle">
            <h1>Registration form</h1>
                <form id="registrationForm" method ="POST" @submit.prevent = "register">
                    <div>
                        <label for="firstName"><b>First Name</b></label>
                        <input type="text" v-model="user.firstName" placeholder = "First Name" required/>
                    </div>
                    <div>
                        <label for="lastName"><b>Last Name</b></label>
                        <input type="text" v-model="user.lastName" placeholder = "Last Name" required/>
                    </div>
                    <div>
                        <label for="username"><b>Username</b></label>
                        <input type="text" v-model="user.username" placeholder = "Username" required/>
                    </div>
                    <div>
                        <label for="password"><b>Password</b></label>
                        <input type="password" v-model="user.password" placeholder = "Password" required/>
                    </div>
                    <div>
                        <label for="gender"><b>Gender</b></label>
                        <select name="gender" v-model="user.gender" id="gender" required>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div>
                        <label for="date"><b>Date of birth</b></label>
                        <input type="date" v-model="user.dateOfBirth" required/>
                    </div>
                    <p></p>
                    <div>
                        <button type = "submit"> Register</button>
                        <button type= "button" v-on:click="cancel">Cancel</button>
                    </div>
                    <div>
                        <button type = "button" v-on:click="registerAdmin"> Register admin</button>
                    </div>
                </form>
            </div>
        </div>
    `,
	methods : {
		register(){
        	console.log(this.user)
            axios
            .post('/registerCustomer',this.user)
            .then(response=>{
                this.$router.push('/')
                window.location.reload()
            })
            .catch((error) => {
                console.log("Error");
                alert("User with the same username already exists");
              });
        },

        cancel(){
            this.$router.push("/")
            window.location.reload()
        },

        registerAdmin(){
        	console.log(this.user)
            axios
            .post('/addAdmin',this.user)
            .then(response=>{
                this.$router.push('/')
                window.location.reload()
            })
            .catch((error) => {
                console.log("Error");
                alert("User with the same username already exists");
              });
        }
	}
});
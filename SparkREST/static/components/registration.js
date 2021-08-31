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
                    role:"Customer"
                }
		    }
	},
    template:`
    	<div>
        	<h1>Please fill registration form</h1>
            <div class="registrationPageStyle">
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
                </form>
            </div>
        </div>
    `,
	methods : {
		register(){
        	console.log(this.user)
            axios
            .post('/registerUser',this.user)
            .then(response=>{
                this.$router.push('/')
                window.location.reload()
            })
            .catch((error) => {
                console.log("Error");
                alert("A user exists with the same username");
              });
        },

        cancel(){
            this.$router.push("/")
            window.location.reload()
        }
	}
});
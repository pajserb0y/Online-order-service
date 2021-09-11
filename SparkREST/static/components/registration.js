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
    	<div class="center" >
            <div>
            <h1 style="padding-left: 35%;">Registration form</h1>
                <form id="registrationForm" method ="POST" @submit.prevent = "register">
                    <div class="pp">
                        <label class="lbl" for="firstName"><b>First Name</b></label>
                        <input type="text" v-model="user.firstName" placeholder = "First Name" required autofocus/>
                        </div>
                    <div class="pp">
                        <label class="lbl" for="lastName"><b>Last Name</b></label>
                        <input type="text" v-model="user.lastName" placeholder = "Last Name" required/>
                        </div>
                    <div class="pp">
                        <label class="lbl" for="username"><b>Username</b></label>
                        <input type="text" v-model="user.username" placeholder = "Username" required/>
                        </div>
                    <div class="pp">
                        <label class="lbl" for="password"><b>Password</b></label>
                        <input type="password" v-model="user.password" placeholder = "Password" required/>
                        </div>
                    <div class="pp">
                        <label class="lbl" for="gender"><b>Gender</b></label>
                        <select name="gender" v-model="user.gender" id="gender" required>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                        </div>
                    <div class="pp">
                        <label class="lbl" for="date"><b>Date of birth</b></label>
                        <input type="date" v-model="user.dateOfBirth" required/>
                        </div>
                
                    <p class="btn2">
                        <button class="emptyLabel" type = "submit"> Register</button>
                        <button type= "button" v-on:click="cancel">Cancel</button>
                        </p>
                    
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
Vue.component("registrate-employee",{

    data: function(){
        return{
            user:{
                firstName:"",
                lastName:"",
                username:"",
                password:"",
                gender:"",
                dateOfBirth:"",
                role:"",
            }
        }
    },
    template:`
    	<div>
        	<h1>Employee registration form</h1>
            <div class="container">
                <form id="registrationForm" method ="POST" @submit.prevent = "registrate">
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
                    <label for="role"><b>Role</b></label>
                    <select name="role" v-model="user.role" id="role" required>
                        <option value="MANAGER">Manager</option>
                        <option value="COURIER">Courier</option>
                    </select>
                </div>
                    <div>
                        <label for="date"><b>Date of birth</b></label>
                        <input type="date" v-model="user.dateOfBirth" required/>
                    </div>
                    <p></p>
                    <div>
                        <button type = "submit"> Registrate</button>
                        <button type= "button" v-on:click="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    methods:{
        registrate(){
        	console.log(this.user)
            axios
            .post('/registrateEmployee',this.user)
            .then(response=>{
                alert("New employee has been successfuly registered!");
                window.location.reload()
                
            })
            .catch((error) => {
                console.log("Error");
                alert("A user exists with the same username");
              });
        },

        cancel(){
            window.location.reload()
        },
    }
});
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
    mounted(){
        /* document.body.style.backgroundImage = "url('images/background.jpg')" */
    },
    template:`
    	<div>
        	<h1>Employee registration form</h1>
            <div>
                <form id="registrationForm" method ="POST" @submit.prevent = "registrate">
                    <div class="pp">
                        <label class="text-right lbl" for="firstName"><b>First Name</b></label>
                        <input type="text" v-model="user.firstName" placeholder = "First Name" required autofocus/>
                    </div>
                    <p class="pp">
                        <label class="lbl" for="lastName"><b>Last Name</b></label>
                        <input type="text" v-model="user.lastName" placeholder = "Last Name" required/>
                    </p>
                    <p class="pp">
                        <label class="lbl" for="username"><b>Username</b></label>
                        <input type="text" v-model="user.username" placeholder = "Username" required/>
                        </p>
                    <p class="pp">
                        <label class="lbl" for="password"><b>Password</b></label>
                        <input type="password" v-model="user.password" placeholder = "Password" required/>
                        </p>
                    <p class="pp">
                        <label class="lbl" for="gender"><b>Gender</b></label>
                        <select name="gender" v-model="user.gender" id="gender" required>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                        </p>
                        <p class="pp">
                    <label class="lbl" for="role"><b>Role</b></label>
                    <select name="role" v-model="user.role" id="role" required>
                        <option value="MANAGER">Manager</option>
                        <option value="COURIER">Courier</option>
                    </select>
                    </p>
                <p class="pp">
                        <label class="lbl" for="date"><b>Date of birth</b></label>
                        <input type="date" v-model="user.dateOfBirth" required/>
                        </p>
                        
                    <div class="pp">
                        <label class="lbl2"> <button  type = "submit"> Registrate</button> </label>
                        <label class="lbl2"><button  type= "button" v-on:click="cancel">Clear</button></label>
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
            this.user.firstName="";
            this.user.lastName="";
            this.user.username="";
            this.user.password="";
            this.user.dateOfBirth="";
            this.user.role="";
            this.user.gender="";
        },
    }
});
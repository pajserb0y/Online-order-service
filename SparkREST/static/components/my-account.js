Vue.component("my-account", {
    
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
                id:""
            },
            sendParams:{
                id:"",
                role:"",
            }
        }
    },
    mounted(){
        this.sendParams.id = localStorage.getItem('id')
        this.sendParams.role = localStorage.getItem('role')
        axios
            .post('/getUser',this.sendParams)
            .then(response => {
                this.user = response.data
            })
    },
    template:`
    	<div>
        	<h1>{{user.username}}'s account</h1>
            <div>
                <form id="registrationForm" method ="POST" @submit.prevent = "edit">
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
                        <input type="text" v-model="user.password" placeholder = "Password" required/>
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
                        <button type = "submit"> Change</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    methods:{
        edit(){
            axios
            .post('/editUser',this.user)
            .then(response => {
                this.user = response.data
                localStorage.setItem("username", response.data.username)
                alert("Your data has been saved");
                window.location.reload()
            })
            .catch((error) => {
                console.log("Error");
                alert("A user exists with the same username");
              });
        }
    }

});
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
        /* document.body.style.backgroundImage = "url('images/background.jpg')" */
        this.sendParams.id = localStorage.getItem('id')
        this.sendParams.role = localStorage.getItem('role')
        axios
            .post('/getUser',this.sendParams)
            .then(response => {
                this.user = response.data
            })
    },
    template:`
    	<div >
        	<h1 style="padding-left: 18%;">{{user.username}}'s account</h1>
            <div>
                <form id="registrationForm" method ="POST" @submit.prevent = "edit">
                    <div class="pp">
                        <label label class="lbl" for="firstName"><b>First Name</b></label>
                        <input type="text" v-model="user.firstName" placeholder = "First Name" required autofocus/>
                    </div>
                    <div class="pp">
                        <label label class="lbl" for="lastName"><b>Last Name</b></label>
                        <input type="text" v-model="user.lastName" placeholder = "Last Name" required/>
                    </div>
                    <div class="pp">
                        <label label class="lbl" for="username"><b>Username</b></label>
                        <input type="text" v-model="user.username" placeholder = "Username" required/>
                    </div>
                    <div class="pp">
                        <label label class="lbl" for="password"><b>Password</b></label>
                        <input type="text" v-model="user.password" placeholder = "Password" required/>
                    </div>
                    <div class="pp">
                        <label label class="lbl" for="gender"><b>Gender</b></label>
                        <select name="gender" v-model="user.gender" id="gender" required>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div class="pp">
                        <label label class="lbl" for="date"><b>Date of birth</b></label>
                        <input type="date" v-model="user.dateOfBirth" required/>
                    </div>
                    <p></p>
                    <div class="btn2">
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
Vue.component("add-restaurant", {
	
	data: function(){
		return{
			restaurant:{
				name:"",
				manager:"",
				type:"",
				location:{
                    geoLongitute:0,
                    geoLatitude:0,
                    adress:{
                        street:"",
                        town:"",
                        postalCode:"",
                        country:""
                    }
				logoPath:""
			},
			availableManagers:"",
			selectedManager:{
                firstName:"",
                lastName:"",
                username:"",
                password:"",
                gender:"",
                dateOfBirth:"",
                role:"MENAGER"
            },
            file:""
		}
	},
	maunted(){
		this.sendParams.availableManagers
		axios
			.get('/availableManagers')
			.then(response => {
				this.availableManagers = response.data
			})
	},
	template:`
		<div> 
        	<h1>New restaurant registration form</h1>
            <div class="container">
                <form id="registrationFormRest" enctype="multipart/form-data"  method ="POST" @submit.prevent = "upload">
                    <div>
                        <label for="file"><b>Restaurant picture</b></label>
                        <input accept="image/png" type="file" name="file" id="file" ref="file" v-on:change="fileUploadChange()" required/>
                        <button type = "submit"> Upload </button>
                    </div>
                </form>
            </div>
            <div class="container">
                <form id="registrationFormRest"  method ="POST" @submit.prevent = "registerRestaurant">
                    <div>
                        <label for="name"><b>Name</b></label>
                        <input type="text" v-model="restaurant.name" placeholder = "Name" required/>
                    </div>

                    <div>
                        <label for="type"><b>Type</b></label>
                        <select name="type" v-model="restaurant.type" id="type" required>
                            <option value="ITALIAN">Italian</option>
                            <option value="CHINESE">Chinese</option>
                            <option value="GRILL">Grill</option>
                            <option value="MEXICAN">Mexican</option>
                        </select>
                    </div>
                    <div>
                    <label for="country"><b>Country</b></label>
                    <input type="text" v-model="restaurant.location.adress.country" placeholder = "Country" required/>
                    </div>
                    <div>
                    <label for="town"><b>Town</b></label>
                    <input type="text" v-model="restaurant.location.adress.town" placeholder = "Town" required/>
                    </div>
                    <div>
                    <label for="street"><b>Street</b></label>
                    <input type="text" v-model="restaurant.location.adress.street" placeholder = "Street" required/>
                    </div>
                    <div>
                    <label for="postalCode"><b>Postal Code</b></label>
                    <input type="text" v-model="restaurant.location.adress.postalCode" placeholder = "Postal Code" required/>
                    </div>
                    <div>
                    <label for="menager"><b>Menager</b></label>
                    <input type="text" v-model="restaurant.manager" placeholder = "Menager" disabled/>
                    </div>
                    <p></p>
                    <div>
                        <button type = "submit"> Register </button>
                    </div>

                </form>
            </div>
            <div v-if="availableManagers">
        	<h1>Pick a menager for the restaurant</h1>
            <table style="width:99.999%">
                <thead>
                    <th style="width:30%">Name</th>
                    <th style="width:30%">Username</th>
                    <th style="width:30%">Role</th>
                </thead>
                <tbody>
                <tr v-for="m in availableManagers" @click="addMenager(m)" style="height:40px">
                   <td style="width:30%">{{m.firstName}} {{m.lastName}}</td>
                   <td style="width:30%">{{m.username}}</td>
                   <td style="width:30%">{{m.role}}</td>
                </tr>
               </tbody>
            </table>
            </div>
            <div v-if="!menagers">
        	<h1>Register a manager for the restaurant</h1>
            <div class="container">
                <form id="registrationForm" method ="POST" @submit.prevent = "registerMenager">
                    <div>
                        <label for="firstName"><b>First Name</b></label>
                        <input type="text" v-model="selectedManager.firstName" placeholder = "First Name" required/>
                    </div>
                    <div>
                        <label for="lastName"><b>Last Name</b></label>
                        <input type="text" v-model="selectedManager.lastName" placeholder = "Last Name" required/>
                    </div>
                    <div>
                        <label for="username"><b>Username</b></label>
                        <input type="text" v-model="selectedManager.username" placeholder = "Username" required/>
                    </div>
                    <div>
                        <label for="password"><b>Password</b></label>
                        <input type="password" v-model="selectedManager.password" placeholder = "Password" required/>
                    </div>
                    <div>
                        <label for="gender"><b>Gender</b></label>
                        <select name="gender" v-model="selectedManager.gender" id="gender" required>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div>
                        <label for="date"><b>Date of birth</b></label>
                        <input type="date" v-model="selectedManager.dateOfBirth" required/>
                    </div>
                    <p></p>
                    <div>
                        <button type = "submit"> Register</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
	`,
	methods:{
        registerRestaurant(){
            if(this.restaurant.manager){
                this.restaurant.location.geoLatitude = this.location[0];
                this.restaurant.location.geoLongitute = this.location[1];
                axios
                .post('/addRestaurant',this.restaurant)
                .then(response=>{
                    this.restaurant.name = ""
                    this.restaurant.type = "",
                    this.restaurant.status = "",
                    this.restaurant.location.geoLongitute = 0
                    this.restaurant.location.geoLatitude = 0
                    this.restaurant.location.adress.street = ""
                    this.restaurant.location.adress.town = ""
                    this.restaurant.location.adress.postalCode = ""
                    this.restaurant.location.adress.country = ""
                    this.restaurant.logoPath = ""
                    this.restaurant.username = ""
                    axios
                    .get('/availableMenagers')
                    .then(response=>{
                        this.availableManagers = response.data
                    })
                })
            }
            else{
                alert("A restaurant must have a manager");
            }
        },
        registerMen(){
            axios
            .post('/registerEmployee',this.selectedManager)
            .then(response=>{
                alert("Successfully registered a new menager");
                axios
                .get('/availableMenagers')
                .then(response=>{
                    this.availableManagers = response.data
                })
                
            })
            .catch((error) => {
                console.log("Error");
                alert("A user exists with the same username");
              });
        },
        addMenager(selectedManager){
            this.restaurant.manager = selectedManager.username
        },

        fileUploadChange(){
            this.file = this.$refs.file.files[0];
        },
        upload(){
            let formData = new FormData();
            formData.append("file", this.file);
            axios
              .post("/uploadRestaurantPicture", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(response=>{
              })
              .catch((error) => {
              });
        },

    }
})
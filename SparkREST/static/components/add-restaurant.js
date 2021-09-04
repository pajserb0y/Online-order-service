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
                },
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
                role:"MANAGER"
            },
            file:""
		    
        }
	},
	mounted(){
		/* this.sendParams.availableManagers */
		axios
			.get('/availableManagers')
			.then(response => {
				this.availableManagers = response.data
			})
	},
	template:`
		<div > 
        	<h1>New restaurant registration form</h1>
            <div class="container">
                <form style="width: 630px;" id="registrationFormRest" enctype="multipart/form-data"  method ="POST" @submit.prevent = "upload">
                    <div class="pp" >
                    <div class="lbl3">
                        <label for="file"><b>Restaurant picture:</b></label>
                        <input style="cursor: pointer" class="inputImageUpload" accept="image/png" type="file" name="file" id="file" ref="file" v-on:change="fileUploadChange()" required/>
                    </div>
                        <button type = "submit"> Upload </button>
                    </div>
                </form>
            </div>
            <div class="container">
                <form id="registrationFormRest"  method ="POST" @submit.prevent = "registerRestaurant">
                    <div  class="pp">
                        <label class="lbl" for="name"><b>Name</b></label>
                        <input type="text" v-model="restaurant.name" placeholder = "Name" required/>
                    </div>
                    <div class="pp">
                        <label class="lbl" for="type"><b>Type</b></label>
                        <select name="type" v-model="restaurant.type" id="type" required>
                            <option value="ITALIAN">Italian</option>
                            <option value="CHINESE">Chinese</option>
                            <option value="GRILL">Grill</option>
                            <option value="GREEK">Greek</option>
                            <option value="MEXICAN">Mexican</option>
                        </select>
                    </div>
                    <div class="pp">
                    <label class="lbl" for="country"><b>Country</b></label>
                    <input type="text" v-model="restaurant.location.adress.country" placeholder = "Country" required/>
                    </div>
                    <div class="pp">
                    <label class="lbl" for="town"><b>Town</b></label>
                    <input type="text" v-model="restaurant.location.adress.town" placeholder = "Town" required/>
                    </div>
                    <div class="pp">
                    <label class="lbl" for="street"><b>Street</b></label>
                    <input type="text" v-model="restaurant.location.adress.street" placeholder = "Street" required/>
                    </div>
                    <div class="pp">
                    <label class="lbl" for="postalCode"><b>Postal Code</b></label>
                    <input type="text" v-model="restaurant.location.adress.postalCode" placeholder = "Postal Code" required/>
                    </div>
                    <div class="pp">
                    <label class="lbl" for="manager"><b>Manager</b></label>
                    <input type="text" v-model="selectedManager.username" placeholder = "Manager" disabled/>
                    </div>
                    <p></p>
                    <div class="btn2">
                        <button type = "submit"> Register </button>
                    </div>
                </form>
            </div>
            <div v-if="availableManagers">
        	<h1>Pick a manager for the restaurant</h1>
            <table border="1"  style="width:650px">
                <thead>
                    <th style="width:30%">Name</th>
                    <th style="width:30%">Username</th>
                </thead>
                <tbody>
                <tr v-for="m in availableManagers" @click="addManager(m)" style="height:40px">
                   <td style="width:30%">{{m.firstName}} {{m.lastName}}</td>
                   <td style="width:30%">{{m.username}}</td>
                </tr>
               </tbody>
            </table>
            </div>
            <div v-if="!availableManagers">
        	<h1>Register a manager for the restaurant</h1>
            <div class="container">
                <form id="registrationForm" method ="POST" @submit.prevent = "registerManager">
                    <div class="pp">
                        <label class="lbl" for="firstName"><b>First Name</b></label>
                        <input type="text" v-model="selectedManager.firstName" placeholder = "First Name" required/>
                    </div>
                    <div class="pp">
                        <label class="lbl" for="lastName"><b>Last Name</b></label>
                        <input type="text" v-model="selectedManager.lastName" placeholder = "Last Name" required/>
                    </div>
                    <div class="pp">
                        <label class="lbl" for="username"><b>Username</b></label>
                        <input type="text" v-model="selectedManager.username" placeholder = "Username" required/>
                    </div>
                    <div class="pp">
                        <label class="lbl" for="password"><b>Password</b></label>
                        <input type="password" v-model="selectedManager.password" placeholder = "Password" required/>
                    </div>
                    <div class="pp">
                        <label class="lbl" for="gender"><b>Gender</b></label>
                        <select name="gender" v-model="selectedManager.gender" id="gender" required>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div class="pp">
                        <label class="lbl" for="date"><b>Date of birth</b></label>
                        <input type="date" v-model="selectedManager.dateOfBirth" required/>
                    </div>
                    <p></p>
                    <div class="btn2">
                        <button type = "submit"> Register</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
	`,
	methods:{
        registerRestaurant(){
            if(this.restaurant.manager != ""){
                //this.restaurant.location.geoLatitude = this.location[0];
               // this.restaurant.location.geoLongitute = this.location[1];
            	console.log("caocaocaocao");
                axios
                .post('/addRestaurant',this.restaurant)
                .then(response=>{
                    this.restaurant.name = ""
                    this.restaurant.manager = "",
                    this.restaurant.type = "",
                    this.restaurant.location.geoLongitute = 0
                    this.restaurant.location.geoLatitude = 0
                    this.restaurant.location.adress.street = ""
                    this.restaurant.location.adress.town = ""
                    this.restaurant.location.adress.postalCode = ""
                    this.restaurant.location.adress.country = ""
                    this.restaurant.logoPath = ""
					this.selectedManager.username = ""
                    axios
                    .get('/availableManagers')
                    .then(response=>{
                        this.availableManagers = response.data
                        window.location.reload()
                    })
                })
            }
            else{
                alert("A restaurant must have a manager");
            }
        },
        registerManager(){
            axios
            .post('/registrateEmployee',this.selectedManager)
            .then(response=>{
            	
               	this.selectedManager.firstName = ""	
                this.selectedManager.lastName = ""
                this.selectedManager.username = ""
                this.selectedManager.password = ""	
                this.selectedManager.gender = ""	
                this.selectedManager.dateOfBirth = ""
            	
                alert("Successfully registered a new menager");
                axios
                .get('/availableManagers')
                .then(response=>{
                    this.availableManagers = response.data
                })

            })
            .catch((error) => {
                console.log("Error");
                alert("A user exists with the same username");
              });
        },
        addManager(manager){
        	this.selectedManager = manager;
            this.restaurant.manager = manager.id;
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
              .then(response => toast("Image uploaded") )
              .catch((error) => {
              });
        }

    }
});
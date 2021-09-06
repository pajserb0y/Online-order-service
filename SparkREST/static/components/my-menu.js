Vue.component("my-menu",{

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
				logoPath:"",
                status:"",
                rating:"",
                menu:""
            },
            menuItems:"",
            menuItem:"",
            sendParams:{
            	username:"",
            	id:""
            }
        }
    },
    mounted(){
        this.sendParams.username = localStorage.getItem('username')
        this.sendParams.id = localStorage.getItem('id')
        axios
            .post('/getCurrentRestaurant',this.sendParams)
            .then(response => {  
                this.restaurant = response.data;    
                axios
                    .post('/getMenuItems', this.restaurant)
                    .then(response => {  
                        this.menuItems = response.data;
            })
        }) 
                
    },
    template:`
    	<div>
        <h1>Menu</h1>
        <div>
            <table style="width:99.999%">
                <thead>
                    <th style="width:20%">Picture</th>
                    <th style="width:15%">Name</th>
                    <th style="width:40%">Description</th>
                    <th style="width:5%">Price</th>
                </thead>
                <tbody>
                    <tr v-for="i in menuItems" @click="view(i)">
                        <td style="width:20%"> <img :src="i.picturePath" width="75" height="75" ></td>
                        <td style="width:15%">{{i.name}}</td>
                        <td style="width:40%">{{i.description}}</td>
                        <td style="width:5%">{{i.price}}</td>
                    </tr>                                                                  
                </tbody>
            </table>            
        </div>
        <div class="container" v-if="menuItem">
            <form id="registrationForm" method ="POST" @submit.prevent = "changeItem">
                <div>
                    <label for="name"><b>Name*</b></label>
                    <input type="text" v-model="menuItem.name" placeholder = "Name" required/>
                </div>
                <div>
                    <label for="description"><b>Description</b></label>
                    <input type="text" v-model="menuItem.description" placeholder = "Description"/>
                </div>
                <div>
                    <label for="type"><b>Type*</b></label>
                    <select name="type" v-model="menuItem.type" id="type" required>
                        <option value="FOOD">Food</option>
                        <option value="DRINK">Drink</option>
                    </select>
                </div>
                <div>
                    <label for="quantity"><b>Quantity</b></label>
                    <input type="number" v-model="menuItem.quantity" placeholder = "Quantity"/>
                </div>
                <div>
                    <label for="type"><b>Quantity Type</b></label>
                    <select name="quantityType" v-model="menuItem.quantityType" id="quantityType">
                        <option value="GRAMS">Grams</option>
                        <option value="MILLILITERS">Milliliters</option>
                    </select>
                </div>
                <div>
                    <label for="price"><b>Price*</b></label>
                    <input type="number" v-model="menuItem.price" placeholder = "Price" required/>
                </div>
                <p></p>
                <div>
                    <button type = "submit"> Change</button>
                    <button type= "button" v-on:click="deleteMenuItem">Delete</button>
                </div>
            </form>
        </div>
        </div>
    	`,
    	   methods:{
    		   deleteMenuItem(){
   	            axios
   	            .post('/deleteMenuItem', this.menuItem)
   	            .then(response=>{
   	            	axios
                    .post('/getMenuItems', this.restaurant)
                    .then(response => {  
                        this.menuItems = response.data
                    })
   	                .catch((error) => {
   	                  });
   	            })
   	            .catch((error) => {
   	                console.log(error)
   	              });
   	        },
   	     view(item){
   	            this.menuItem = JSON.parse(JSON.stringify(item))
   	        },

   	        changeItem(){
   	            axios
   	            .post('/changeMenuItem',this.menuItem)
   	            .then(response=>{
   	                this.menuItem = ""
   	                axios
   	                .post('/getMenuItems',this.restaurant)
   	                .then(response=>{
   	                    this.menuItems = response.data
   	                })
   	            })
   	            .catch((error) => {
   	                console.log("Error");
   	                alert("A menu item with the same name already exists in your restaurant");
   	              });
   	        }
    }
})
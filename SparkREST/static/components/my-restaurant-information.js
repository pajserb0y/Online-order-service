Vue.component("my-restaurant-information",{

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
            locationDTO:"",
            menuItems:"",
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
                this.locationDTO = response.data.location.adress.street + ", " + response.data.location.adress.postalCode + " " + response.data.location.adress.town + ", " + response.data.location.adress.country
                axios
                    .post('/getMenuItems', this.restaurant)
                    .then(response => {  
                        this.menuItems = response.data;
            })
        }) 
                
    },
    template:`
    	<div>
            <h1 style="padding-left: 15%;">{{restaurant.name}} restaurant</h1>
                <div> 
                    <div  class="pp">
                        <label class="lbl" for="logo"><b>Logo</b></label>
                        <img :src="restaurant.logoPath" width="100" height="100"/>
                    </div>				
                    <div  class="pp">
                        <label class="lbl" for="name"><b>Name</b></label>
                        <input type="text" v-model="restaurant.name" />
                    </div>
                    <div class="pp">
                        <label class="lbl" for="type"><b>Type</b></label>
                        <input type="text" v-model="restaurant.type" />
                    </div>
                    <div class="pp">
                        <label class="lbl" for="status"><b>Type</b></label>
                        <input type="text" v-model="restaurant.status" />
                    </div>
                    <div class="pp">
                        <label class="lbl" for="location"><b>Location</b></label>
                        <textarea border=2 type="text" v-model="locationDTO" />
                    </div>
                    <div class="pp">
                        <label class="lbl" for="status"><b>Rating</b></label>
                        <input type="text"  v-if="restaurant.rating" v-model="restaurant.rating" />
                        <input type="text"  v-if="!restaurant.rating"  value="No rating yet" />
                    </div>
                    <p></p>
                </div>
           </div> 
    	`,
    /*
    template:`
    	<div>
        <h1>Information</h1>
        </br>
        </br>
        </br>
        <div>
            <table style="width:99.999%">
                <thead>
                    <th style="width:50%"></th>
                    <th style="width:50%"></th>
                </thead>
                <tbody>
                <tr class="inforow">
                    <td style="width:50%; text-align:center"><b>Logo</b></td>
                    <td style="width:50%"><img :src="restaurant.logoPath" width="100" height="100" ></td>
                </tr>                        
                <tr class="inforow">
                    <td style="width:50%; text-align:center"><b> Name</b></td>
                    <td style="width:50%">{{restaurant.name}} </td>
                </tr>
                <tr class="inforow">
                    <td style="width:50%; text-align:center"><b>Type</b></td>
                    <td style="width:50%">{{restaurant.type}}  </td>
                </tr>
                <tr class="inforow">
                    <td style="width:50%; text-align:center"><b>Status</b></td>
                    <td style="width:50%">{{restaurant.status}}  </td>
                </tr>
                <tr class="inforow">
                    <td style="width:50%; text-align:center"><b>Rating</b></td>
                    <td style="width:50%" v-if="!restaurant.rating" >No rating yet</td>
                    <td style="width:50%" v-if="restaurantDTO.rating" >{{restaurantDTO.rating}}</td>
                </tr> 
                <tr class="inforow">
                    <td style="width:50%; text-align:center"><b>Location</b></td>
                    <td style="width:50%">{{restaurantDTO.location.adress.street}}, {{restaurantDTO.location.adress.town}}, {{restaurantDTO.location.adress.country}}</td>
                </tr>                                            
                </tbody>
            </table>
        </div>
        </div>
    	`,*/
    	   methods:{

    }
})
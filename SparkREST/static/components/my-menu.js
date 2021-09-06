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
    	<h1>Menu</h1>
                <div>
                    <table border="1">
                        <thead>
                            <th style="width:20%">Picture</th>
                            <th style="width:15%">Name</th>
                            <th style="width:40%">Description</th>
                            <th style="width:5%">Price</th>
                            <th style="width:5%"></th>

                        </thead>
                        <tbody>
                            <tr class="nopointerrow" v-for="i in menuItems">
                                <td style="width:20%"> <img :src="i.picturePath" width="75" height="75" ></td>
                                <td style="width:15%">{{i.name}}</td>
                                <td style="width:40%">{{i.description}}</td>
                                <td style="width:5%">{{i.price}}</td>
                                <td style="width:5%"><button type= "button" v-on:click="deleteMenuItem(i)">Delete</button> </td>
                            </tr>                                                                  
                        </tbody>
                    </table>            
                </div>
    	`,
    	   methods:{
    		   deleteMenuItem(menuItem){
   	            axios
   	            .post('/deleteMenuItem', menuItem)
   	            .then(response=>{
   	            	axios
                    .post('/getMenuItems', this.restaurant)
                    .then(response => {  
                        this.menuItems = response.data;
   	                .catch((error) => {
   	                  });
   	            })
   	            .catch((error) => {
   	                console.log(error)
   	              });
   	        }
    }
})
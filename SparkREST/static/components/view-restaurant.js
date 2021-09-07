Vue.component("view-restaurant",{

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
            role:"",
            locationDTO:"",
            menuItems:"",
            cartItem:{
                customerId:"",
                menuItems:""
            }
        }
    },
    mounted(){
        this.role = localStorage.getItem("role");
        axios
            .get('/getRestaurant')
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

                <h1>Menu</h1>
                <div>
                    <table border="1">
                        <thead>
                            <th style="width:0%">Picture</th>
                            <th style="width:15%">Name</th>
                            <th style="width:40%">Description</th>
                            <th style="width:5%">Price</th>
                            <th v-if="role === 'CUSTOMER'" style="width:5%"></th>
                        </thead>
                        <tbody>
                            <tr class="nopointerrow" v-for="i in menuItems">
                                <td style="width:0%"> <img :src="i.picturePath" width="75" height="75" ></td>
                                <td style="width:15%">{{i.name}}</td>
                                <td style="width:40%">{{i.description}}</td>
                                <td style="width:5%">{{i.price}}</td>
                                <td v-if="role === 'CUSTOMER' && restaurant.status === 'OPEN' " style="width:5%"><input min="0" style="width:99%" type="number" v-model="i.count" /><button type= "button" v-on:click="addToCart(i)">Add To Cart</button> </td>
                                <td v-if="role === 'CUSTOMER' && restaurant.status === 'CLOSED' " style="width:5%"></td>
                            </tr>                                                                  
                        </tbody>
                    </table>            
                </div>
                
                <h1 v-if="commentable">Leave a comment</h1>
                <div v-if="commentable">
                    <input style="width:85%" type="text" v-model="comment.text" placeholder = "Comment"/>
                    <input :class="{invalid:comment.rating < 1 || comment.rating > 5}" min="1" max="5" style="width:5%" type="number" v-model="comment.rating" placeholder = "Rating"/>
                    <button type= "button" v-on:click="makeComment()">Make Comment</button>
                </div>
                <h1 v-if="!myRes">Comments</h1>
                <div v-if="!myRes">
                    <table style="width:99.999%">
                        <thead>
                            <th style="width:33%">Username</th>
                            <th style="width:60%">Comment</th>
                            <th style="width:5%">Rating</th>
                            <th v-if="role === 'ADMIN'" style="width:5%"></th>
                        </thead>
                        <tbody>
                            <tr class="nopointerrow" v-for="c in restaurant.comments">
                                <td style="width:33%"> {{c.username}}</td>
                                <td style="width:60%">{{c.text}}</td>
                                <td style="width:5%">{{c.rating}}</td>
                                <td v-if="role === 'ADMIN'" style="width:5%"><button type= "button" v-on:click="deleteComment(c)">Delete</button> </td>
                            </tr>                                                                  
                        </tbody>
                    </table>            
                </div>
                <div v-if="myRes">
                    <myComments></myComments>
                </div>
        </div>
    `,
    methods:{
        makeComment(){
            axios
            .post('/makeComment', this.comment)
            .then(response=>{
                axios
                .post('/viewRestaurant', this.reqparams)
                .then(response=>{
                    this.restaurantDTO = response.data
                    if(this.role === 'MANAGER'){
                        axios
                        .post('/getMyRestaurant',this.user)
                        .then(response=>{
                            this.myResId = response.data
                            this.myRes = this.myResId == this.restaurantDTO.entityID
                        })
                    }
                    if(this.role === 'CUSTOMER'){
                        this.commentReq.username = localStorage.getItem("username")
                        this.commentReq.entityID = this.restaurantDTO.entityID
                        axios
                        .post('/canIComment',this.commentReq)
                        .then(response=>{
                            this.commentable = response.data
                            this.comment.customer = localStorage.getItem("id")
                            this.comment.username = localStorage.getItem("username")
                            this.comment.restaurant = this.restaurantDTO.entityID
                        })
                    }
                })
                .catch((error) => {
                  });
            })
            .catch((error) => {
                console.log("Error");
                alert("Rating from 1 to 5");
              });
        },
        deleteComment(comment){

            axios
            .post('/deleteComment', comment)
            .then(response=>{
                axios
                .post('/viewRestaurant', this.reqparams)
                .then(response=>{
                    this.restaurantDTO = response.data
                })
                .catch((error) => {
                  });
            })
            .catch((error) => {
                console.log(error)
              });
        },

        addToCart(menuItem){
            if(menuItem.count >0){
                this.cartItem.customerId = localStorage.getItem("id")
                this.cartItem.menuItems = [menuItem]    //napravim array od jednog menuItem-a
                console.log(this.cartItem)
                axios
                .post('/addToCart', this.cartItem)
                .then(response=>{
                    menuItem.count = 0;
                    toast("Added to cart");
                })
                .catch((error) => {
                    menuItem.count = 0;
                  });
            }

        }
    }
});
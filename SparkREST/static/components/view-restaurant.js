Vue.component("view-restaurant",{

    data: function(){
        return{
            restaurant:{
            	id:"",
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
            },
            commentable:false,
            manager:false,
            managerId:"",
            comment:{
            	customer:"",
            	username:"",
                text:"",
                restaurant:"",
                rating:""
            },
            comments:"",
            commentReq:{       //objekat za slanje restorana
                id:""
            },
            canIComment:{
                customerId:"",
                restaurantId:""
            }
        }
    },
    mounted(){
        this.role = localStorage.getItem("role");
        axios
            .get('/getRestaurant')
            .then(response => {  
                this.restaurant = response.data;
                this.managerId = localStorage.getItem("id") //pretpostavka da je trenutni korisnik menadzer
                this.manager = this.managerId == this.restaurant.manager
                this.locationDTO = response.data.location.adress.street + ", " + response.data.location.adress.postalCode + " " + response.data.location.adress.town + ", " + response.data.location.adress.country
                axios
                    .post('/getMenuItems', this.restaurant)
                    .then(response => {  
                        this.menuItems = response.data;
                    })
                //this.commentReq.customerId = localStorage.getItem("id")
                this.commentReq.id = this.restaurant.id
                axios
                    .post('/getComments',this.commentReq)
                    .then(response => {  
                    this.comments = response.data;   
                    this.canIComment.restaurantId = this.restaurant.id 
                    this.canIComment.customerId = localStorage.getItem("id")

                    axios
                    .post('/canIComment',this.canIComment)
                    .then(response=>{
                        this.commentable = response.data
                        this.comment.customer = localStorage.getItem("id")
                        this.comment.username = localStorage.getItem("username")
                        this.comment.restaurant = this.restaurant.id
                    })
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
                        <label class="lbl" for="status"><b>Status</b></label>
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
                            <th v-if="role === 'CUSTOMER'" style="width:5%">Count</th>
                            <th v-if="role === 'CUSTOMER'" style="width:5%"></th>
                        </thead>
                        <tbody>
                            <tr class="nopointerrow" v-for="i in menuItems">
                                <td style="width:0%"> <img :src="i.picturePath" width="75" height="75" ></td>
                                <td style="width:15%">{{i.name}}</td>
                                <td style="width:40%">{{i.description}}</td>
                                <td style="text-align:center">{{i.price}}</td>
                                <td v-if="role === 'CUSTOMER' && restaurant.status === 'OPEN' " style="width:5%"><input min="0" style="width:99%" type="number" v-model="i.count" /> </td>
                                <td v-if="role === 'CUSTOMER' && restaurant.status === 'CLOSED' " style="width:5%"></td>
                                <td v-if="role === 'CUSTOMER' && restaurant.status === 'OPEN' " style="width:5%"> <button type= "button" v-on:click="addToCart(i)">Add To Cart</button> </td>
                            </tr>                                                                  
                        </tbody>
                    </table>            
                </div>
                
                <h1 v-if="commentable">Leave a comment</h1>
                <div v-if="commentable">
                <form id="commentForm" class="forma1" method ="POST" @submit.prevent = "makeComment">
                    <div class="pp">
                        <input class="lbl4" required  type="text" v-model="comment.text" placeholder = "Comment"/>
                        <input style="width:90px" required :class="{invalid:comment.rating < 1 || comment.rating > 5}" min="1" max="5"  type="number" v-model="comment.rating" placeholder = "Rating"/>
                        </div>
                        <button type= "submit" >Make a comment</button>
                </form>
                </div>
                

                <h1 v-if="!manager">Comments</h1>
                <div v-if="!manager">
                    <table border="1">
                        <thead>
                            <th style="width:33%">Username</th>
                            <th style="width:60%">Comment</th>
                            <th style="width:5%">Rating</th>
                            <th v-if="role === 'MANAGER' || role === 'ADMIN'" style="width:5%">Status</th>
                            <th v-if="role === 'ADMIN' " style="width:5%"></th>
                        </thead>
                        <tbody>
                            <tr class="nopointerrow" v-for="c in comments">
                                <td v-if="((role !== 'MANAGER' || role !== 'ADMIN') && c.approved === 'APPROVED') || role === 'MANAGER' || role === 'ADMIN'" style="width:33%"> {{c.username}}</td>
                                <td v-if="((role !== 'MANAGER' || role !== 'ADMIN') && c.approved === 'APPROVED') || role === 'MANAGER' || role === 'ADMIN'" style="width:60%">{{c.text}}</td>
                                <td v-if="((role !== 'MANAGER' || role !== 'ADMIN') && c.approved === 'APPROVED') || role === 'MANAGER' || role === 'ADMIN'" style="width:5%">{{c.rating}}</td>
                                <td v-if="role === 'MANAGER' || role === 'ADMIN'" style="width:5%">{{c.approved}} </td>
                                <td v-if="role === 'ADMIN' && c.approved === 'APPROVED'" style="width:5%"><button type= "button" v-on:click="deleteComment(c)">Delete</button> </td>
                            </tr>                                                                  
                        </tbody>
                    </table>            
                </div>
                <div v-if="manager">
                    <restaurant-comments></restaurant-comments>
                </div>
        </div>
    `,
    methods:{
        makeComment(){
            axios
            .post('/makeComment', this.comment)
            .then(response=>{
                axios
                .get('/getRestaurant')
                .then(response=>{
                    this.restaurant = response.data
                    /* if(this.role === 'MANAGER'){
                        axios
                        .post('/getCurrentRestaurant',this.commentReq.customerId)
                        .then(response=>{
                            this.managerId = response.data.manager
                            this.manager = this.managerId == this.restaurant.manager
                        })
                    } */
                    if(this.role === 'CUSTOMER'){
                        /* this.commentReq.customerId = localStorage.getItem("id")
                        this.commentReq.restaurantId = this.restaurant.id */
                        axios
                        .post('/canIComment',this.canIComment)
                        .then(response=>{
                            this.commentable = response.data
                            this.comment.customer = localStorage.getItem("id")
                            this.comment.username = localStorage.getItem("username")
                            this.comment.restaurant = this.restaurant.id
                            this.comment.text = ""
                            this.comment.rating = ""
                            alert("Comment recieved. Wait for approval")
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
                .post('/getComments', this.commentReq)
                .then(response=>{
                    this.comments = response.data
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
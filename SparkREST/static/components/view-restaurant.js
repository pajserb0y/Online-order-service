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
                rating:""
            },
            locationDTO:""
        }
    },
    mounted(){
        axios
            .get('/getRestaurant')
            .then(response => {  
                this.restaurant = response.data;
                this.locationDTO = response.data.location.adress.street + ", " + response.data.location.adress.postalCode + " " + response.data.location.adress.town + ", " + response.data.location.adress.country
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
                    <table style="width:99.999%">
                        <thead>
                            <th style="width:20%">Picture</th>
                            <th style="width:15%">Name</th>
                            <th style="width:40%">Description</th>
                            <th style="width:5%">Price</th>
                            <th v-if="role === 'ADMIN'" style="width:5%"></th>
                            <th v-if="role === 'CUSTOMER'" style="width:5%"></th>
                        </thead>
                        <tbody>
                            <tr class="nopointerrow" v-for="i in restaurant.menuItems">
                                <td style="width:20%"> <img :src="i.picturePath" width="75" height="75" ></td>
                                <td style="width:15%">{{i.name}}</td>
                                <td style="width:40%">{{i.description}}</td>
                                <td style="width:5%">{{i.price}}</td>
                                <td v-if="role === 'ADMIN'" style="width:5%"><button type= "button" v-on:click="deleteMenuItem(i)">Delete</button> </td>
                                <td v-if="role === 'CUSTOMER' && restaurant.status === 'OPEN' " style="width:5%"><input min="0" style="width:99%" type="number" v-model="i.count" placeholder = "Count"/><button type= "button" v-on:click="addToCart(i)">Add To Cart</button> </td>
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
        login(){
            axios
            .post('/login',this.user)
            .then(response => {
                console.log(response.data)
                this.$router.push('/')
                window.location.reload()
            })
            .catch((error) => {
                console.log("Error");
                alert("Invalid username or password");
              });
        },

        cancel(){
            this.$router.push("/")
            window.location.reload()
        }
    }
});
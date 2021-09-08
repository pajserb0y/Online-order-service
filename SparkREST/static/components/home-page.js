Vue.component("home-page", {

    data: function(){
        return{
            id:"",
            role:"",
            username:"",
            window:"RESTAURANTS",
            myRestaurantClicked:false
        }
    },
    mounted(){
        this.role = localStorage.getItem('role')
        this.id = localStorage.getItem('id')
        this.username = localStorage.getItem('username')
        if (this.myRestaurantClicked)
            this.window = "INFO"
    },
    template:`
        <div class="grid-container">
        <div class="grid-item menuPosition">
            <div v-if="role === 'CUSTOMER'" >
                <div>
                    <button class="menuButtons" type= "button" v-on:click="restaurants">Restaurants</button>
                </div>
                <div>
                   <button class="menuButtons" type= "button" v-on:click="orders">My orders</button>
                    </div>
                <div>
                    <button class="menuButtons" type= "button" v-on:click="cart">Shopping cart</button>
                    </div>
                    <div class="topRight">
                        <button type= "button" v-on:click="myAccount">{{username}}'s account</button>
                    </div>
                    <div class="bottomLeft">
                        <button type= "button" v-on:click="logout">Logout</button>
                    </div>
            </div>
            <div v-if="role === 'ADMIN'">
            <div>
                <button class="menuButtons" type= "button" v-on:click="restaurants">Restaurants</button>
                </div>
                <div>
                <button class="menuButtons" type= "button" v-on:click="registrateEmployee">Registrate employee</button>
                </div>
                <div>
                <button class="menuButtons" type= "button" v-on:click="showUsers">All users</button>
                </div>
                <div>
                <button class="menuButtons" type= "button" v-on:click="addRestaurant">Add restaurant</button>
                </div>
                <div class="topRight">
                    <button type= "button" v-on:click="myAccount">{{username}}'s account</button>
                    </div>
                <div class="bottomLeft">
                    <button type= "button" v-on:click="logout">Logout</button>
                    </div>
            </div>
            <div v-if="role === 'MANAGER'">
            <div>
                <button class="menuButtons" type= "button" v-on:click="restaurants">Restaurants</button>
                </div>
                <div>
                <button class="menuButtons" type= "button" v-on:click="myRestaurant">My restaurant</button>
                </div>
                <div class="topRight">
                    <button type= "button" v-on:click="myAccount">{{username}}'s account</button>
                    </div>
                <div class="bottomLeft">
                    <button type= "button" v-on:click="logout">Logout</button>
                    </div>      
                <div id="subMenu" v-if="myRestaurantClicked">   
                    <div>
                    <button class="headerButtons" type= "button" v-on:click="info">Information</button>
                    </div> <div>
                    <button class="headerButtons"  type= "button" v-on:click="menu">Menu</button>
                    </div> <div>
                    <button class="headerButtons"  type= "button" v-on:click="menuitem">Add Menu Item</button>
                    </div> <div>
                    <button class="headerButtons"  type= "button" v-on:click="comments">Comments</button>
                    </div> <div>
                    <button class="headerButtons" type= "button" v-on:click="orders">Orders</button>
                    </div> <div>
                    <button class="headerButtons"  type= "button" v-on:click="customers">Customers</button>
                    </div> <div>
                    <button class="headerButtons" type= "button" v-on:click="requests">Transport Requests</button>
                    </div> 
                </div>                       
            </div>
            <div v-if="role === 'COURIER'">
            <div>
                <button class="menuButtons" type= "button" v-on:click="restaurants">Restaurants</button>
                </div>
                <div>
                <button class="menuButtons" type= "button" v-on:click="orders">My orders</button>
                </div>
                <div class="topRight">
                    <button type= "button" v-on:click="myAccount">{{username}}'s account</button>
                    </div>
                <div class="bottomLeft">
                    <button type= "button" v-on:click="logout">Logout</button>
                    </div>
            </div>
            <div v-if="(!role)" >
                <button class="menuButtons" type= "button" v-on:click="restaurants">Restaurants</button>
                <div class="topRight">
            	<button type= "button" v-on:click="login">Login</button>
                </div>
                <div class="signUp">
                        <a v-on:click="register">Sign up</a>
                    </div>             
            </div>
        </div>

        <div class="grid-item">
            <div v-if="window === 'RESTAURANTS'">
                <all-restaurants></all-restaurants>
            </div>
            <div v-if="window === 'USERS'">
                <all-users></all-users>
            </div>
            <div v-if="window === 'EMPLOYEEREGISTRATION'" class="setPositionOfForms">
                <registrate-employee></registrate-employee>
            </div>
            <div v-if="window === 'MYACCOUNT'" class="setPositionOfForms">
                <my-account></my-account>
            </div>
            <div v-if="window === 'ADDRESTAURANT'">
                <add-restaurant></add-restaurant>
            </div>
            <div v-if="window === 'MYRESTAURANT'">
                <my-restaurant></my-restaurant>
            </div>
            <div v-if="window === 'ORDERS'">
                <orders></orders>
            </div>
            <div v-if="window === 'CART'">
                <my-cart></my-cart>
            </div>



            <div v-if="window === 'INFO'">
                    <my-restaurant-information></my-restaurant-information>
                </div>
                <div v-if="window === 'MENU'">
                    <my-menu></my-menu>
                </div>
                <div v-if="window === 'ADDMENUITEMS'">
                    <add-menuItems></add-menuItems>
                </div>
                <div v-if="window === 'COMMENTS'">
                    <myComments></myComments>
                </div>
                <div v-if="window === 'CUSTOMERS'">
                    <myCustomers></myCustomers>
                </div>
                <div v-if="window === 'REQUESTS'">
                    <courier-requests></courier-requests>
                </div> 
        </div>
        </div>
    `,
    methods:{
        register(){
            this.$router.push("/registration")
        },
        login(){
            this.$router.push("/login")
        },
        restaurants(){
            this.window = "RESTAURANTS"
            this.myRestaurantClicked = false
            window.location.reload()
        },
        registrateEmployee(){
            this.window = "EMPLOYEEREGISTRATION"
        },
        showUsers(){
            this.window = "USERS"
        },
        myAccount(){
            this.window = "MYACCOUNT"
            this.myRestaurantClicked = false
        },
        addRestaurant(){
            this.window = "ADDRESTAURANT"
        },
       /*  viewRestaurant(){
            this.window = "VIEWRESTAURANT";
        } */
        myRestaurant(){
            this.window = "MYRESTAURANT"
            this.myRestaurantClicked = true
        },
        
        orders(){
            this.window = "ORDERS"
        },
        cart(){
            this.window = "CART"
        },
        logout(){
            this.window = "RESTAURANTS"
            localStorage.removeItem("id")
            localStorage.removeItem("role")
            localStorage.removeItem("username")
            this.id = ""
            this.role = ""
            this.username = ""
            this.myRestaurantClicked = false
            window.location.reload()
            //this.$router.push("/allUsers")
        },



        info(){
            this.window = "INFO"
        },
        menu(){
            this.window = "MENU"    
        },
        menuitem(){
            this.window = "ADDMENUITEMS"
        },
        comments(){
            this.window = "COMMENTS"
        },
        customers(){
            this.window = "CUSTOMERS"
        },
        requests(){
            this.window = "REQUESTS"
        },
    }
});
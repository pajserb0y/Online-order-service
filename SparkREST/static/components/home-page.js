Vue.component("home-page", {

    data: function(){
        return{
            id:"",
            role:"",
            username:"",
            window:"RESTAURANTS"
        }
    },
    mounted(){
        this.role = localStorage.getItem('role')
        this.id = localStorage.getItem('id')
        this.username = localStorage.getItem('username')
    },
    template:`
        <div>
            <div v-if="role === 'CUSTOMER'">
                <button type= "button" v-on:click="restaurants">Restaurants</button>
                <button type= "button" v-on:click="orders">My Orders</button>
                <button type= "button" v-on:click="cart">Shopping Cart</button>
                <inline style="float: right">
                    <span>{{username}}</span>
                    <button type= "button" v-on:click="myAccount">My Account</button>
                    <button type= "button" v-on:click="logout">Logout</button>
                </inline>
            </div>
            <div v-if="role === 'ADMIN'">
                <button type= "button" v-on:click="restaurants">Restaurants</button>
                <button type= "button" v-on:click="registrateEmployee">Registrate employee</button>
                <button type= "button" v-on:click="showUsers">Users</button>
                <button type= "button" v-on:click="addRestaurant">Add Restaurant</button>
                <inline style="float: right">
                    <span>{{username}}</span>
                    <button type= "button" v-on:click="myAccount">My Account</button>
                    <button type= "button" v-on:click="logout">Logout</button>
                </inline>
            </div>
            <div v-if="role === 'MANAGER'">
                <button type= "button" v-on:click="restaurants">Restaurants</button>
                <button type= "button" v-on:click="myRestaurant">My Restaurant</button>
                <inline style="float: right">
                    <span>{{username}}</span>
                    <button type= "button" v-on:click="myAccount">My Account</button>
                    <button type= "button" v-on:click="logout">Logout</button>
                </inline>
            </div>
            <div v-if="role === 'COURIER'">
                <button type= "button" v-on:click="restaurants">Restaurants</button>
                <button type= "button" v-on:click="orders">My Orders</button>
                <inline style="float: right">
                    <span>{{username}}</span>
                    <button type= "button" v-on:click="myAccount">My Account</button>
                    <button type= "button" v-on:click="logout">Logout</button>
                </inline>
            </div>
            <div v-if="(!role)" >
                <button type= "button" v-on:click="restaurants">Restaurants</button>
                <inline style="float: right">
            	    <button type= "button" v-on:click="login">Login</button>
                    <div>
                        <a v-on:click="register">Register</a>
                    </div>
                </inline>   
               
            </div>
            <div v-if="window === 'RESTAURANTS'">
                <allRestaurants></allRestaurants>
            </div>
            <div v-if="window === 'USERS'">
                <all-users></all-users>
            </div>
            <div v-if="window === 'EMPLOYEEREGISTRATION'">
                <registrate-employee></registrate-employee>
            </div>
            <div v-if="window === 'MYACCOUNT'">
                <my-account></my-account>
            </div>
            <div v-if="window === 'ADDRESTAURANT'">
                <addRestaurant></addRestaurant>
            </div>
            <div v-if="window === 'MYRESTAURANT'">
                <myRestaurant></myRestaurant>
            </div>
            <div v-if="window === 'ORDERS'">
                <orders></orders>
            </div>
            <div v-if="window === 'CART'">
                <cart></cart>
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
        },
        addRestaurant(){
            this.window = "ADDRESTAURANT"
        },
        myRestaurant(){
            this.window = "MYRESTAURANT"
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
            window.location.reload()
            //this.$router.push("/allUsers")
        }


    }
});
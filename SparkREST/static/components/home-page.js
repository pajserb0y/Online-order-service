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
                <myRestaurant></myRestaurant>
            </div>
            <div v-if="window === 'ORDERS'">
                <orders></orders>
            </div>
            <div v-if="window === 'CART'">
                <cart></cart>
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
       /*  viewRestaurant(){
            this.window = "VIEWRESTAURANT";
        } */
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
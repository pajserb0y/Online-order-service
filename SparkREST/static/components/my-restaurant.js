Vue.component("my-restaurant",{

    data: function(){
        return{
            window:"",
        }
    },
    mounted(){
        this.window = "INFO"
    },
    template:`
        <div >
            <div >
                    
            </div>
            <div>
                <div v-if="window === 'INFO'">
                    <myRestaurantInfo></myRestaurantInfo>
                </div>
                <div v-if="window === 'MENU'">
                    <myMenu></myMenu>
                </div>
                <div v-if="window === 'ADDMENUITEMS'">
                    <add-menuItems></add-menuItems>
                </div>
                <div v-if="window === 'COMMENTS'">
                    <myComments></myComments>
                </div>
                <div v-if="window === 'ORDERS'">
                    <orders></orders>
                </div>
                <div v-if="window === 'CUSTOMERS'">
                    <myCustomers></myCustomers>
                </div>
                <div v-if="window === 'REQUESTS'">
                    <myRequests></myRequests>
                </div> 
            </div>        
        </div>

    `,
    methods:{
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
        orders(){
            this.window = "ORDERS"
        },
        customers(){
            this.window = "CUSTOMERS"
        },
        requests(){
            this.window = "REQUESTS"
        },
    }

})
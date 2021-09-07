Vue.component("my-cart",{

    data: function(){
        return{
            user:{
                id:""
            },
            cart:"",
            forRemoval:{
                customerId:"",
                menuItem:""
            }
        }
    },
    mounted(){
        this.user.id = localStorage.getItem("id")
        axios
        .post('/getCart',this.user)
        .then(response=>{
            this.cart = response.data
        })
        .catch((error) => {
          });
    },
    template:`
    	<div>
        	<h1>Shopping cart</h1>
            <div>
                <table style="width:99.999%">
                    <thead>
                        <th style="width:20%">Picture</th>
                        <th style="width:15%">Name</th>
                        <th style="width:5%">Price</th>
                        <th style="width:5%">Count</th>
                        <th style="width:5%"></th>
                    </thead>
                    <tbody>
                        <tr class="nopointerrow" v-for="i in cart.menuItems">
                            <td style="width:20%"> <img :src="i.picturePath" width="75" height="75" ></td>
                            <td style="width:15%">{{i.name}}</td>
                            <td style="width:5%">{{i.price}}</td>
                            <td style="width:5%"><input min="1" v-on:change="change" style="width:99%" type="number" v-model="i.count" placeholder = "Count"/> </td>
                            <td style="width:5%"><button border="1" class="buttonDelete" type= "button" v-on:click="remove(i)">X</button> </td>
                        </tr>                                                                  
                    </tbody>
                </table>
            </div>
            <div class="total">
            <inline style="float: right" v-if="cart">
                <i>Total (Calculated with your discount):</i> {{cart.price}}
                <button type= "button" v-on:click="checkout">Checkout</button>
            </inline>
            </div>
        </div>
    `,
    methods:{
        change(){
            axios
            .post('/changeCart', this.cart)
            .then(response=>{
                axios
                .post('/getCart',this.user)
                .then(response=>{
                    this.cart = response.data
                })
                .catch((error) => {
                  });
            })
            .catch((error) => {

              });
        },

        remove(menuItem){
            this.cart.menuItems.splice(this.cart.menuItems.indexOf(menuItem), 1)
            this.change()
        },

        checkout(){
            axios
            .post('/checkout',this.cart)
            .then(response=>{
                alert("Added to your orders");
                axios
                .post('/getCart',this.user)
                .then(response=>{
                    this.cart = response.data
                })
                .catch((error) => {
                  });
            })
            .catch((error) => {

              });
        },

    }

})
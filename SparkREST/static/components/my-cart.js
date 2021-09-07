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
    	<div style="width:700px">
        	<h1>Shopping cart</h1>
            <div>
                <table  border="1" >
                    <thead>
                        <th style="width:0%">Picture</th>
                        <th style="width:15%">Name</th>
                        <th style="width:5%">Price</th>
                        <th style="width:1%">Count</th>
                        <th style="width:0%"></th>
                    </thead>
                    <tbody>
                        <tr class="nopointerrow" v-for="i in cart.menuItems">
                            <td style="width:0%"> <img :src="i.picturePath" width="75" height="75" ></td>
                            <td style="width:15%">{{i.name}}</td>
                            <td style="text-align:center">{{i.price}}</td>
                            <td style="width:1%"><input min="1" v-on:change="change" style="width:99%" type="number" v-model="i.count" placeholder = "Count"/> </td>
                            <td style="width:0%"><button border="1" class="buttonDelete" type= "button" v-on:click="remove(i)">X</button> </td>
                        </tr>                                                                  
                    </tbody>
                </table>
            </div>
            <div class="total">
            <inline style="float: right" v-if="cart">
                <i>Total price (calculated with your discount):</i> <b>{{cart.price}}</b>
                <button style="margin-top:15px" type= "button" v-on:click="checkout">Checkout</button>
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
                });
            });
        },

    }

})
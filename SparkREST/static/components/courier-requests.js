Vue.component("courier-requests",{

    data: function(){
        return{
            sendParams:{
                id: "",
            },
            orders:"",
            selectedReq:{
                id:"",
                courierId:""
            }
        }
    },
    mounted(){
        this.sendParams.id = localStorage.getItem('id')
        axios
        .post('/getOrdersForRestaurant',this.sendParams)
        .then(response=>{
            this.orders = response.data
        })
    },
    template:`
    	<div>
        <h1>Transport Requests</h1>
        <div>
            <table border="1" >
                <thead>
                    <th style="width:30%">Requested by</th>
                    <th style="width:15%">Order ID</th>
                    <th style="width:30%">Date ordered</th>
                    <th style="width:15%">Price</th>
                    <th style="width:5%"></th>
                    <th style="width:5%"></th>
                </thead>
                <tbody v-for="o in orders">
                    <tr class="nopointerrow" v-for="c in o.requests">
                        <td style="width:30%"> {{c.firstName}} {{c.lastName}} ({{c.username}})</td>
                        <td style="width:15%">{{o.id}}</td>
                        <td style="width:30%">{{o.timeOfOrder}}</td>
                        <td  style="text-align:center">{{o.price}}</td>
                        <td style="width:5%"><button type= "button" v-on:click="approve(o,c)">Approve</button> </td>
                        <td style="width:5%"><button type= "button" v-on:click="deny(o,c)">Deny</button> </td>
                    </tr>                                                                  
                </tbody>
            </table>            
        </div>
        </div>

    `,
    methods:{
        approve(order,courier){
            this.selectedReq.id = order.id
            this.selectedReq.courierId = courier.id
            axios
            .post('/approveTransport',this.selectedReq)
            .then(response=>{
                axios
                .post('/getOrdersForRestaurant',this.sendParams)
                .then(response=>{
                    this.orders = response.data
                })
            })
            .catch((error) => {
              });

        },
        deny(order,courier){
            this.selectedReq.id = order.id
            this.selectedReq.courierId = courier.id
            axios
            .post('/denyTransport',this.selectedReq)
            .then(response=>{
                axios
                .post('/getOrdersForRestaurant',this.sendParams)
                .then(response=>{
                    this.orders = response.data
                })
            })
            .catch((error) => {
              });

        }
    }

})
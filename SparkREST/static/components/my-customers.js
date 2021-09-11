Vue.component("my-customers",{

    data: function(){
        return{
            sendParam:{
                id: "",
            },
            customers:""
        }
    },
    mounted(){
        this.sendParam.id = localStorage.getItem('id')
        axios
        .post('/getMyCustomers',this.sendParam)
        .then(response=>{
            this.customers = response.data
        })
    },
    template:`
    	<div>
        <h1>Customers</h1>
        <div>
            <table border="1">
                <thead>
                    <tr background-color="transparent">
                        <th background-color: transparent v-on:click="sortTable(0)" style="width:30%">First Name</th>
                        <th background-color: transparent v-on:click="sortTable(1)" style="width:30%">Last Name</th>
                        <th background-color: transparent v-on:click="sortTable(2)" style="width:30%">Username</th>
                        <th background-color: transparent v-on:click="sortTable(5)" style="width:30%">Points</th>
                        <th background-color: transparent v-on:click="sortTable(6)" style="width:30%">Type</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="nopointerrow" v-for="u in customers" style="height:40px">
                    <td style="width:30%">{{u.firstName}}</td>
                    <td style="width:30%">{{u.lastName}}</td>
                    <td style="width:30%">{{u.username}}</td>
                    <td style="width:30%" >{{u.points}}</td>
                    <td style="width:30%" >{{u.customerType}}</td>
                </tr>
               </tbody>
            </table>            
        </div>
        </div>

    `,
    methods:{
    }
})
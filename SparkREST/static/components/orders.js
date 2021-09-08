Vue.component("orders",{

    data: function(){
        return{
            user:{
                id:"",
                role:"",
                username:""
            },
            orders:"",
            sendParam:{
                id:"",
            	courierId:""
            },
            reqParam:{
                id:"",
                customerId:""
            },
            parameters:{
                role:"",
                restaurantName:"",
                priceFrom:"",
                priceTo:"",
                dateFrom:"",
                dateTo:"",
                restaurantType:"",
                orderStatus:"",
                sort:"",
                username:""
            },
            name:""
        }
    },
    mounted(){
        this.user.id = localStorage.getItem('id')
        this.user.role = localStorage.getItem('role')
        this.user.username = localStorage.getItem('username')
        axios
        .post('/getOrders',this.user)
        .then(response=>{
            this.orders = response.data
        });
    },
    template:`
    <div>
    <h1 class="leftMargin">Orders</h1>
        <div class="leftMargin">                
            <input id="searchRestaurantName" v-on:keyup="searchTable(0)" v-if="user.role === 'CUSTOMER' || user.role === 'COURIER'" type="text" v-model="parameters.restaurantName" placeholder="Restaurant Name"/>
            <input id="searchPriceFrom" class="searchInputSmaller" v-on:keyup="searchTable(0)" type="number" v-model="parameters.priceFrom" placeholder="Price From"/>
            <input id="searchPriceTo" class="searchInputSmaller" v-on:keyup="searchTable(0)" type="number" v-model="parameters.priceTo" placeholder="Price To"/>
            <label for="dateFrom"><b>Date from</b></label>
            <input id="searchDateFrom" class="searchInputSmaller"  v-on:change="searchTable(0)" type="date" name="dateFrom" v-model="parameters.dateFrom"/>
            <label for="dateTo"><b>Date to</b></label>
            <input id="searchDateTo" class="searchInputSmaller"  v-on:change="searchTable(0)" type="date" name="dateTo" v-model="parameters.dateTo"/>

            <br v-if="user.role === 'CUSTOMER' || user.role === 'COURIER'">
            <label for="status"><b>Order status</b></label>
            <select v-on:change="searchTable(parameters.orderStatus)" name="status" v-model="parameters.orderStatus" id="status">
                <option id="searchProcessing" value="PROCESSING">Processing</option>
                <option id="searchInPreparation" value="INPREPARATION">In preparation</option>
                <option id="searchWaiting" value="WAITING">Waiting for transport</option>
                <option id="searchTransport" value="TRANSPORT">In transport</option>
                <option id="searchDelivered" value="DELIVERED">Delivered</option>
                <option id="searchCanceled" value="CANCELED">Canceled</option>
                <option id="searchNoneStatus" value="noneStatus">--none--</option>
            </select>
            <label v-if="user.role === 'CUSTOMER' || user.role === 'COURIER'" for="type"><b>Restaurant type</b></label>
            <select v-on:change="searchTable(parameters.restaurantType)" v-if="user.role === 'CUSTOMER' || user.role === 'COURIER'" name="type" v-model="parameters.restaurantType" id="type">
                <option id="searchItalian" value="ITALIAN">Italian</option>
                <option id="searchChinese" value="CHINESE">Chinese</option>
                <option id="searchGrill" value="GRILL">Grill</option>
                <option id="searchGreek" value="GREEK">Greek</option>
                <option id="searchMexican" value="MEXICAN">Mexican</option>
                <option id="searchNoneType" value="noneType">--none--</option>
            </select>
        </div>

    <table id="myTable" border="1">
    <div class="leftMargin"
        <thead>
        <tr background-color="transparent">
            <th style="width:20%">Date</th>
            <th  style="width:20%">Restaurant</th>     
            <th  style="width:10%">Type</th> 
            <th style="width:10%">Price</th>
            <th style="width:20%">Status</th>
            <th style="width:1%" ></th>
            </tr>
        </thead>
        <tbody>
            <tr class="nopointerrow" v-for="o in orders" style="height:40px">
                <td style="width:20%">{{o.timeOfOrder}}</td>
                <td  style="width:20%" >{{o.restaurantName}}</td>  
                <td  style="width:10%" >{{o.restaurantType}}</td>                    
                <td style="text-align:center">{{o.price}}</td>
                <td v-if="o.orderStatus === 'INPREPARATION'" style="width:20%">IN PREPARATION</td>
                <td v-if="o.orderStatus === 'WAITING'" style="width:20%">WAITING FOR TRANSPORT</td>
                <td v-if="o.orderStatus === 'TRANSPORT'" style="width:20%">IN TRANSPORT</td>
                <td v-if="o.orderStatus !== 'TRANSPORT' && o.orderStatus !== 'WAITING' && o.orderStatus !== 'INPREPARATION'" style="width:20%">{{o.orderStatus}}</td>
                <td v-if="o.orderStatus === 'PROCESSING' && user.role === 'CUSTOMER'" style="width:10%"><button type= "button" v-on:click="cancel(o)">Cancel</button> </td>
                <td v-if="o.orderStatus === 'PROCESSING' && user.role === 'MANAGER'" style="width:0%"><button type= "button" v-on:click="inPrep(o)">In Preparation</button> </td>
                <td v-if="o.orderStatus === 'INPREPARATION' && user.role === 'MANAGER'" style="width:0%"><button type= "button" v-on:click="finish(o)">Finish </button> </td>
                <td v-if="o.orderStatus === 'TRANSPORT' && user.role === 'COURIER'" style="width:0%"><button type= "button" v-on:click="deliver(o)">Order Delivered</button> </td>
                <td v-if="o.orderStatus === 'WAITING' && user.role === 'COURIER'" style="width:10%"><button type= "button" v-on:click="request(o)">Request Order</button> </td>
            </tr>
        </tbody>
        </div>
    </table>
    </div>
</table>
`,
    methods:{
         getOrders(){
            axios
            .post('/getOrders',this.user)
            .then(response=>{
                this.orders = response.data
                this.sendParam.username = ""
                this.sendParam.orderId = ""
                this.sendParam.courierId = ""
        });
        }, 
        cancel(order){
            this.reqParam.customerId = localStorage.getItem("id")
            this.reqParam.id = order.id
            axios
            .post('/cancelOrder', this.reqParam)
            .then(response=>{
                this.getOrders()
            })
            .catch((error) => {
              });
        },
        inPrep(order){
            axios
            .post('/prepareOrder', order)
            .then(response=>{
                this.getOrders()   
            })
            .catch((error) => {
              });
        },
        
        finish(order){
            axios
            .post('/finishOrder', order)
            .then(response=>{
                this.getOrders() 
            })
            .catch((error) => {
              });
        },

        request(order){
            this.sendParam.courierId = localStorage.getItem("id")
            this.sendParam.id = order.id
            axios
            .post('/requestOrder', this.sendParam)
            .then(response=>{
                this.getOrders() 
            })
            .catch((error) => {
              });
        },

        deliver(order){
            axios
            .post('/deliverOrder', order)
            .then(response=>{
                this.getOrders() 
            })
            .catch((error) => {
              });
        },

        searchTable(n) {
            var input, filter, table, tr, td, i, txtValue;

            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            if (n == "noneType")
                this.parameters.restaurantType = "";
            else if (n == "noneStatus")
                this.parameters.orderStatus = "";
                
            let map = new Map();               
            map.set(3, this.parameters.priceFrom.concat(",").concat(this.parameters.priceTo));
            map.set(1, this.parameters.restaurantName);
            map.set(2, this.parameters.restaurantType);
            map.set(0, this.parameters.dateFrom.concat(",").concat(this.parameters.dateTo));
            if(this.parameters.orderStatus == "INPREPARATION"){
                map.set(4, "IN PREPARATION");
            }
            else if(this.parameters.orderStatus == "TRANSPORT"){
                map.set(4, "TRANSPORTATION");
            }
            else{
                   map.set(4, this.parameters.orderStatus);
            }


            var hideList = [];

            for ([col, parameter] of map) {
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[col];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if(map.get(4) == "TRANSPORTATION" && txtValue == "IN TRANSPORT")                            
                            txtValue = txtValue.concat("ATION");
                        else
                            txtValue = td.textContent || td.innerText;
                        if(col == 3){
                            if(this.parameters.priceFrom == "")
                            {
                                if(this.parameters.priceTo != "")
                                {
                                    var to = (map.get(3)).split(",")[1]
                                    if(parseInt(txtValue) > parseInt(to))
                                        hideList.push(i);
                                }
                            }
                            else{
                                var from = (map.get(3)).split(",")[0]
                                if(this.parameters.priceTo == "")
                                {
                                    if(parseInt(txtValue) < parseInt(from))
                                        hideList.push(i);
                                }
                                else{
                                    var to = (map.get(3)).split(",")[1]
                                    if(parseInt(txtValue) < parseInt(from) || parseInt(txtValue) > parseInt(to))
                                        hideList.push(i);
                                }
                            }
                        }
                        else if(col == 0){
                            txtValue = txtValue.split("/")[1].concat("/").concat(txtValue.split("/")[0]).concat("/").concat(txtValue.split("/")[2])
                            var value = new Date(txtValue)
                            if(this.parameters.dateFrom == "")
                            {
                                if(this.parameters.dateTo != "")
                                {
                                    var to = new Date((map.get(0)).split(",")[1])
                                    if(value > to)
                                        hideList.push(i);
                                }
                            }
                            else{
                                var from = new Date((map.get(0)).split(",")[0])
                                if(this.parameters.dateTo == "")
                                {
                                    if(value < from)
                                        hideList.push(i);
                                }
                                else{
                                    var to = new Date((map.get(0)).split(",")[1])
                                    if(value < from || value > to)
                                        hideList.push(i);
                                }
                            }
                        }
                        else if (!(txtValue.toUpperCase().indexOf(parameter.toUpperCase()) > -1)) 
                            hideList.push(i);
                    }       
                }
            }
            for (i = 0; i < tr.length; i++)
            {
                if (hideList.includes(i))
                    tr[i].style.display = "none";
                else 
                    tr[i].style.display = "";
            }
            hideList.length = 0;  //clear the map
          },

        sortTable(n) {
            var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            table = document.getElementById("myTable");
            switching = true;
            //Set the sorting direction to ascending:
            dir = "asc"; 
            /*Make a loop that will continue until
            no switching has been done:*/
            while (switching) {
                //start by saying: no switching is done:
                switching = false;
                rows = table.rows;
                /*Loop through all table rows (except the
                first, which contains table headers):*/
                for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                    }
                }
                }
                if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;      
                } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
                }
            }
        }
    }

})
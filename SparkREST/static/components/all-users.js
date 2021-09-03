Vue.component("all-users",{

    data: function(){
        return{
            users:"",
            parameters:{
                firstName:"",
                lastName:"",
                username:"",
                points:"",
                role:"",
                type:""
            },
            table:""
        }
    },
    mounted(){
        /* document.body.style.backgroundImage = "url('images/background.jpg')" */
        axios
        .get('/getAllUsers')
        .then(response=>{
            this.users = response.data
           // this.table = document.getElementById("myTable");
        })
    },
    template:`
    	<div>
        	<h1 class="leftMargin">Users</h1>
            <div class="leftMargin">
                <input type="text" v-on:keyup="searchTable(0)" v-model="parameters.firstName" placeholder="First Name" id="searchFirstName"/>
                <input type="text" v-on:keyup="searchTable(1)" v-model="parameters.lastName" placeholder="Last Name" id="searchLastName"/>
                <input type="text" v-on:keyup="searchTable(2)" v-model="parameters.username" placeholder="Username" id="searchUsername"/>
                <label for="role"><b>Role</b></label>
                <select v-on:change="searchTable(parameters.role)" name="role" v-model="parameters.role" id="role">
                    <option id="searchCustomer" value="CUSTOMER">Customer</option>
                    <option id="searchManager" value="MANAGER">Manager</option>
                    <option id="searchCourier" value="COURIER">Courier</option>
                    <option id="searchAdmin" value="ADMIN">Admin</option>
                    <option id="searchNoneRole" value="noneRole">--none--</option>
                </select>
                <label for="type"><b>Type</b></label>
                <select v-on:change="searchTable(parameters.type)" name="type" v-model="parameters.type" id="type" >
                    <option id="searchBronze" value="BRONZE">Bronze</option>
                    <option id="searchSilver" value="SILVER">Silver</option>
                    <option id="searchGold" value="GOLD">Gold</option>
                    <option id="searchNoneType" value="noneType">--none--</option>
                </select>
            </div>

            <table  border="1" id="myTable">
                <thead>
                    <tr background-color="transparent">
                        <th background-color: transparent v-on:click="sortTable(0)" style="width:30%">First Name</th>
                        <th background-color: transparent v-on:click="sortTable(1)" style="width:30%">Last Name</th>
                        <th background-color: transparent v-on:click="sortTable(2)" style="width:30%">Username</th>
                        <th background-color: transparent v-on:click="sortTable(3)" style="width:30%">Role</th>
                        <th background-color: transparent v-on:click="sortTable(4)" style="width:30%">Points</th>
                        <th background-color: transparent v-on:click="sortTable(5)" style="width:30%">Type</th>
                        <th background-color: transparent v-on:click="sortTable(6)" style="width:5%"></th>
                    </tr>
                </thead>
                <tbody>
                <tr class="nopointerrow" v-for="u in users" style="height:40px">
                    <td style="width:30%">{{u.firstName}}</td>
                    <td style="width:30%">{{u.lastName}}</td>
                    <td style="width:30%">{{u.username}}</td>
                    <td style="width:30%">{{u.role}}</td>
                    <td style="width:30%" v-if="u.role == 'CUSTOMER'">{{u.points}}</td>
                    <td style="width:30%" v-if="u.role != 'CUSTOMER'"></td>
                    <td style="width:30%" v-if="u.role == 'CUSTOMER'">{{u.customerType}}</td>
                    <td style="width:30%" v-if="u.role != 'CUSTOMER'"></td>
                    <td style="width:5%"><button border="1" class="buttonDelete" v-if="u.role !== 'ADMIN'" type= "button" v-on:click="deleteUser(u)">X</button> </td>
                </tr>
               </tbody>
            </table>
        </div>
    `,
    methods:{


        deleteUser(user){
            axios
            .post('/deleteUser', user)
            .then(response=> {
                alert("User deleted")
                axios
                    .get('/getAllUsers')
                    .then(response=>{
                        this.users = response.data
                    })});
        },

        searchTable(n) {
            var input, filter, table, tr, td, i, txtValue;

            if (n == 0)
                input = document.getElementById("searchFirstName");
            else if (n == 1)
                input = document.getElementById("searchLastName");
            else if (n == 2)
                input = document.getElementById("searchUsername");
            else if (n == "CUSTOMER"){
                input = document.getElementById("searchCustomer");
                n=3;
            }
            else if (n == "MANAGER"){
                input = document.getElementById("searchManager");
                n=3;
            }
            else if (n == "COURIER"){
                input = document.getElementById("searchCourier");
                n=3;
            }
            else if (n == "ADMIN"){
                input = document.getElementById("searchAdmin");
                n=3;
            }

            else if (n == "BRONZE"){
                input = document.getElementById("searchBronze");
                n=5;
            }
            else if (n == "SILVER"){
                input = document.getElementById("searchSilver");
                n=5;
            }
            else if (n == "GOLD"){
                input = document.getElementById("searchGold");
                n=5;
            }

            try{
                filter = input.value.toUpperCase();
            }catch(err){
                if (n == "noneType"){
                    filter = "";
                    n=5;
                }
                else if (n == "noneRole"){
                    filter = "";
                    n=3;
                }
            }          
            
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[n];
              if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }
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
});
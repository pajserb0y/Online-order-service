Vue.component("allRestaurants",{

    data: function(){
        return{
            restaurants:"",
            parameters:{
                name:"",
                location:"",
                rating:"",
                type:"",
                open:"",
                sort:"",
            },
            role:"",
            user:{
                role:"",
                id:"",
            }

        }
    },
    mounted(){
        /* document.body.style.backgroundImage = "url('images/background.jpg')" */
        this.user.id = localStorage.getItem("id")
        this.user.role = localStorage.getItem("role");
        this.role = localStorage.getItem("role");
        axios
        .get('/allRestaurants')
        .then(response=>{
            this.restaurants = response.data
        })

    },
    template:`
        <div>
            <div>
                <h1 class="leftMargin">Restaurants</h1> 
                <div class="leftMargin">
                    <input type="text" v-on:keyup="searchTable(123)" v-model="parameters.name" placeholder="Name" id="searchName"/>
                    <input type="text" v-on:keyup="searchTable(124)" v-model="parameters.location" placeholder="Location" id="searchLocation"/>
                    <label for="type"><b>Type</b></label>
                    <select v-on:change="searchTable(parameters.type)" name="type" v-model="parameters.type" id="type">
                        <option id="searchItalian" value="ITALIAN">Italian</option>
                        <option id="searchChinese" value="CHINESE">Chinese</option>
                        <option id="searchGrill" value="GRILL">Grill</option>
                        <option id="searchGreek" value="GREEK">Greek</option>
                        <option id="searchMexican" value="MEXICAN">Mexican</option>
                        <option id="searchNoneType" value="noneType">--none--</option>
                    </select>
                    <label for="rating"><b>Rating</b></label>
                    <select v-on:change="searchTable(parameters.rating)" name="rating" v-model="parameters.rating" id="rating">
                        <option id="search1" value="1">1</option>
                        <option id="search2" value="2">2</option>
                        <option id="search3" value="3">3</option>
                        <option id="search4" value="4">4</option>
                        <option id="search5" value="5">5</option>
                        <option id="searchNoneRating" value="noneRating">--none--</option>
                    </select>                    
                    <label for="open"><b>Open</b></label>
                    <select v-on:change="searchTable(parameters.open)" name="open" v-model="parameters.open" id="open">
                        <option id="searchOpen" value="OPEN">Yes</option>
                        <option id="searchClosed" value="CLOSED">No</option>
                        <option id="searchAll" value="all">All</option>
                    </select>
                </div>

                <table border="1" id="myTable">
                    <thead>
                        <tr>
                            <th style="width:5%">Logo</th>
                            <th v-on:click="sortTable(0)" style="width:15%">Name</th>
                            <th v-on:click="sortTable(1)" style="width:5%">Type</th>
                            <th v-on:click="sortTable(2)" style="width:15%">Location</th>
                            <th v-on:click="sortTable(3)" style="width:15%">Rating(1 to 5)</th>
                            <th v-on:click="sortTable(4)" style="width:5%">Open</th>
                            <th v-on:click="sortTable(5)" v-if="role === 'ADMIN'" style="width:5%"></th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="r in restaurants" @click="view(r)">
                        <td style="width:15%" ><img :src="r.logoPath" width="100" height="100" ></td>
                        <td style="width:15%" >{{r.name}}</td>
                        <td style="width:10%">{{r.type}}</td>
                        <td style="width:15%">{{r.location.adress.street}}, {{r.location.adress.town}}, {{r.location.adress.country}}</td>
                        <td v-if="!r.rating" style="width:10%">No rating yet</td>
                        <td v-if="r.rating" style="width:10%">{{r.rating}}</td>
                        <td style="width:10%">{{r.status}}</td>
                        <td v-if="role === 'ADMIN'" style="width:5%"><button border="1" class="buttonDelete" type= "button" v-on:click="deleteRestaurant(r)">X</button> </td>
                    </tr>
                   </tbody>
                </table>
            </div>
        </div>
    `,
    methods:{
        deleteRestaurant(restaurant){            
            axios
            .post('/deleteRestaurant', restaurant)
            .then(response=>{
                alert("Restaurant has been successfuly deleted")
                window.location.reload()
            });
        },
        
        searchTable(n) {
            var input, filter, table, tr, td, i, txtValue;

            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            if (n == "noneType")
                this.parameters.type = "";
            else if (n == "noneRating")
                this.parameters.rating = "";
            else if (n == "all")
                this.parameters.open = "";
                
            let map = new Map();
            map.set(1, this.parameters.name);
            map.set(3, this.parameters.location);
            map.set(2, this.parameters.type);
            map.set(4, this.parameters.rating);
            map.set(5, this.parameters.open);            


            var hideList = [];

            for ([col, parameter] of map) {
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[col];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (!(txtValue.toUpperCase().indexOf(parameter.toUpperCase()) > -1)) 
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

});
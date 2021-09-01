Vue.component("all-users",{

    data: function(){
        return{
            users:"",
        }
    },
    mounted(){
        axios
        .get('/getAllUsers')
        .then(response=>{
            this.users = response.data
        })
    },
    template:`
    	<div>
        	<h1>Users</h1>
            <table style="width:99.999%" border="1">
                <thead>
                    <th style="width:30%">Name</th>
                    <th style="width:30%">Username</th>
                    <th style="width:30%">Role</th>
                    <th style="width:5%"></th>
                </thead>
                <tbody>
                <tr class="nopointerrow" v-for="u in users" style="height:40px">
                   <td style="width:30%">{{u.firstName}} {{u.lastName}}</td>
                   <td style="width:30%">{{u.username}}</td>
                   <td style="width:30%">{{u.role}}</td>
                   <td style="width:5%"><button v-if="u.role !== 'ADMIN'" type= "button" v-on:click="deleteUser(u)">X</button> </td>
                </tr>
               </tbody>
            </table>
        </div>
    `,
    methods:{

        deleteUser(user){
            axios
            .post('/deleteUser', user)
            .then(response=>{
                axios
                .post('/searchUsers', this.searchParmas)
                .then(response=>{
                    this.users = response.data
                })
                .catch((error) => {
                  });
            })
            .catch((error) => {
              });

        }
    }
});
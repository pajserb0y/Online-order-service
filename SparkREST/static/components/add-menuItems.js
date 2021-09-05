Vue.component("add-menuItem",{

    data: function(){
        return{
            sendParams:{
                username: "",
            },
            menuitem:{
                name:"",
                type:"",
                price:"",
                description:"",
                quantity:"",
                quantityType:"",//GRAMS
                restorantId:""
            },
            file:""

        }
    },
    mounted(){
        this.sendParams.username = localStorage.getItem('username')
        axios
        .post("/getCurrentRestaurant",localStorage.getItem('id'))
        .then(response=>{
        	this.menuitem.restorantId = response.data
        })  
    },
    template:`
    <div>
    <h1>Add menu item</h1>
    <div class="container">
        <form id="registrationFormRest" enctype="multipart/form-data"  method ="POST" @submit.prevent = "upload">
            <div>
                <label for="file"><b>Restaurant picture</b></label>
                <input accept="image/png" type="file" name="file" id="file" ref="file" v-on:change="fileUploadChange()" required/>
                <button type = "submit"> Upload </button>
            </div>
        </form>
    </div>
    <div class="container">
        <form id="registrationForm" method ="POST" @submit.prevent = "addItem">
            <div>
                <label for="name"><b>Name*</b></label>
                <input type="text" v-model="menuitem.name" placeholder = "Name" required/>
            </div>
            <div>
                <label for="description"><b>Description</b></label>
                <input type="text" v-model="menuitem.description" placeholder = "Description"/>
            </div>
            <div>
                <label for="type"><b>Type*</b></label>
                <select name="type" v-model="menuitem.type" id="type" required>
                    <option value="FOOD">Food</option>
                    <option value="DRINK">Drink</option>
                </select>
            </div>
            <div>
                <label for="quantity"><b>Quantity</b></label>
                <input type="number" v-model="menuitem.quantity" placeholder = "Quantity"/>
            </div>
            <div>
                <label for="type"><b>Quantity Type</b></label>
                <select name="quantityType" v-model="menuitem.quantityType" id="quantityType">
                    <option value="GRAMS">Grams</option>
                    <option value="MILLILITERS">Milliliters</option>
                </select>
            </div>
            <div>
                <label for="price"><b>Price*</b></label>
                <input type="number" v-model="menuitem.price" placeholder = "Price" required/>
            </div>
            <p></p>
            <div>
                <button type = "submit"> Add</button>
            </div>
        </form>
    </div>
</div>

    `,
    methods:{
        addItem(){
            //this.menuitem.quantity = 0
            axios
            .post('/addItem',this.menuitem)
            .then(response=>{
                alert("Successfully added to your restaurant");
                this.menuitem.name = ""
                this.menuitem.type = ""
                this.menuitem.price = ""
                this.menuitem.description = ""
                this.menuitem.quantity = ""
                this.menuitem.quantityType = "GRAMS"
                this.menuitem.restorantId = ""
            })
            .catch((error) => {
                console.log("Error");
                alert("A menu item with the same name already exists in your restaurant");
              });
        },
        fileUploadChange(){
            this.file = this.$refs.file.files[0];
        },
        upload(){
            let formData = new FormData();
            formData.append("file", this.file);
            axios
              .post("/uploadMenuPicture", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(response=>{
              })
              .catch((error) => {
              });
        },

    }

})
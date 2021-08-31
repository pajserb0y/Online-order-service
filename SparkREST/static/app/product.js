Vue.component("edit-product", {
	data: function () {
		    return {
		      title: "Dodaj proizvod",
		      value: "Dodaj",
		      id : -1,
		      product: {id: '', name:null, price:null}
		    }
	},
	template: ` 
<div>
	{{title}}
	<form>
		<label>Ime</label>
		<input type = "text" v-model = "product.name" name = "name">
		<label>Cena</label>
		<input type = "number" v-model = "product.price" name = "price">
		<input type = "submit" v-on:click = "editProduct" v-bind:value = "this.value">
	</form>
</div>		  
`
	, 
	methods : {
		editProduct : function () {
			event.preventDefault();
			axios.post('rest/products/add', this.product).
			then(response => (router.push(`/`)));
		}
	}
});
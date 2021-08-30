package services;

import java.util.Collection;

import model.Product;
import model.Products;

public class ProductService {
	
	private Products products = new Products();
	
	public Collection<Product> getProducts() {
		return this.products.getProductList();
	}
	
	public void addProduct(Product product) {
		this.products.addProduct(product);
	}

}

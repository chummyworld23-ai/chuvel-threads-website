import { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from "sonner";

// Import all required services
import { productService, storageService } from '../lib/supabaseService'; 

import { ImageWithFallback } from './figma/ImageWithFallback'; 
import { ProductCard } from './ProductCard'; 

// 1. Product Data Structure (Based on your Supabase table)
export interface Product {
  id: string; // Changed to 'string' because Supabase IDs are UUIDs (strings)
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  description: string;
  image: string; // The URL
  inStock: boolean;
  featured: boolean;
}

export function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // New state for save button
  const [imageFile, setImageFile] = useState<File | null>(null); // To hold the actual file
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    image: '', // This will hold the public URL
    inStock: true,
    featured: false
  });

  // Utility to reset form
  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      image: '',
      inStock: true,
      featured: false
    });
    setEditingProduct(null);
    setShowProductForm(false);
    setImageFile(null); // Reset the file as well
  };

  // --- READ: Load Products ---
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
        // Use the correct function name: getAllProducts
        const data: any[] = await productService.getAllProducts(); 
        
        const loadedProducts: Product[] = data.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.original_price || 0, // Using your Supabase column name
            category: p.category,
            description: p.description,
            image: p.image_url || '', // Using your Supabase column name
            inStock: p.in_stock,
            featured: p.featured,
        }));
        setProducts(loadedProducts);
    } catch (error: any) {
        console.error("Error loading products:", error);
        toast.error('Failed to load products: ' + error.message);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(); // Load products when the component mounts
  }, [loadProducts]); // Added loadProducts as dependency

  // --- IMAGE UPLOAD Handler ---
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a temporary URL for instant preview in the form
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  // --- CREATE/UPDATE: Save Product ---
  const handleSaveProduct = async () => {
    if (!formData.name || !formData.price || !formData.category) {
        toast.error("Please fill in all required fields (Name, Price, Category).");
        return;
    }
    if (!formData.image && !editingProduct) {
        toast.error("Please upload a product image.");
        return;
    }

    setIsSaving(true);
    let imageUrl = formData.image;
    
    try {
        // 1. UPLOAD IMAGE if a new file was selected (or if it's a new product)
        if (imageFile) {
            const fileExtension = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExtension}`;
            const path = `product_images/${fileName}`;

            // Use your actual storage service
            imageUrl = await storageService.uploadImage(imageFile, path); 
        }

        // 2. Prepare the data object for Supabase
        const productPayload = {
            name: formData.name,
            price: Number(formData.price),
            original_price: Number(formData.originalPrice) || 0,
            category: formData.category,
            description: formData.description,
            image_url: imageUrl, // Use the uploaded URL
            in_stock: formData.inStock,
            featured: formData.featured,
        };
        
        // 3. Save to Database
        if (editingProduct) {
            // Update existing product
            await productService.updateProduct(editingProduct.id, productPayload);
            toast.success('Product updated successfully!');
        } else {
            // Add new product
            await productService.createProduct(productPayload);
            toast.success('Product added successfully!');
        }
        
        // 4. Cleanup
        await loadProducts(); // Reload all products
        resetForm();
    } catch (error: any) {
        console.error("Error saving product:", error);
        toast.error('Failed to save product: ' + error.message);
    } finally {
        setIsSaving(false);
    }
  };

  // --- DELETE: Delete Product ---
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product? This action is permanent.')) return;

    try {
        // 1. Find the product to get the image URL/path (Optional but clean)
        const productToDelete = products.find(p => p.id === id);
        
        // 2. Delete the product from the DB
        await productService.deleteProduct(id);

        // 3. If image exists and is a Supabase path, delete it from storage
        if (productToDelete?.image) {
            try {
                // Infer the path from the URL. This is often complex, so we'll skip for now
                // or assume the image URL contains the path. A simpler way is to
                // store the path in a separate column in the DB, but we'll use the URL.
                // For a safe start, we'll only delete the DB entry.
                // await storageService.deleteImage(productToDelete.image); 
            } catch (storageError) {
                 console.warn("Could not delete storage file, but product deleted from DB:", storageError);
            }
        }

        toast.success('Product deleted successfully!');
        setProducts(products.filter(p => p.id !== id));
    } catch (error: any) {
        console.error("Error deleting product:", error);
        toast.error('Failed to delete product: ' + error.message);
    }
  };

  // --- EDIT: Pre-populate Form ---
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      inStock: product.inStock,
      featured: product.featured
    });
    // Do NOT set imageFile here; we only set it if a new file is uploaded
    setShowProductForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl">Products Management</h3>
        <Button 
          onClick={() => {
            resetForm(); 
            setShowProductForm(true);
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {showProductForm && (
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-background border-primary/20"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-background border-primary/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="senators">Senators</SelectItem>
                    <SelectItem value="agbada">Agbada</SelectItem>
                    <SelectItem value="shirts">Shirts</SelectItem>
                    <SelectItem value="streetwear">Streetwear</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="bg-background border-primary/20"
                />
              </div>

              <div>
                <Label htmlFor="originalPrice">Original Price (₦)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  className="bg-background border-primary/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-background border-primary/20"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image">Product Image {editingProduct && !imageFile && '(Current image saved)'}</Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange} // Use the new handler
                  className="bg-background border-primary/20"
                />
                {formData.image && (
                  <ImageWithFallback
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                />
                <span className="text-sm">In Stock</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                />
                <span className="text-sm">Featured</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSaveProduct} 
                disabled={isSaving} // Disable during saving
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSaving ? 'Saving...' : (
                    <>
                        <Save className="h-4 w-4 mr-2" />
                        {editingProduct ? 'Update' : 'Save'} Product
                    </>
                )}
              </Button>
              <Button variant="outline" onClick={resetForm} disabled={isSaving}>
                <X className='h-4 w-4 mr-2'/>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center p-8 text-lg text-primary">Loading Products...</div>
      )}

      {/* Products List */}
      {!isLoading && products.length === 0 && (
          <div className="text-center p-8 text-lg text-foreground/80">No products found. Add a new product to get started!</div>
      )}
      
      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onEdit={handleEditProduct} 
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
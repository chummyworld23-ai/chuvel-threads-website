// --- ProductCard.tsx ---
import { Edit, Trash2 } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
// Import the interface defined in ProductsManagement.tsx
import { Product } from './ProductsManagement' 

// Props interface defines the inputs and functions this card needs
interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card key={product.id} className="border-primary/20">
      <div className="relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-secondary">Featured</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h4 className="text-lg mb-2">{product.name}</h4>
        <p className="text-sm text-foreground/60 mb-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg text-primary">₦{product.price.toLocaleString()}</span>
          <span className="text-sm text-foreground/60 line-through">₦{product.originalPrice.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(product)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(product.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
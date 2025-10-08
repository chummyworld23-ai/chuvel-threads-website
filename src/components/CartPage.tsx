import { useState } from 'react'
import { Minus, Plus, Trash2, ArrowRight, Lock } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { PaymentModal } from './PaymentModal'

interface CartPageProps {
  cartItems: any[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onNavigate: (page: string) => void
}

export function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate }: CartPageProps) {
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50000 ? 0 : 2500
  const promoDiscount = appliedPromo === 'WELCOME10' ? subtotal * 0.1 : 0
  const total = subtotal + shipping - promoDiscount

  const applyPromoCode = () => {
    if (promoCode === 'WELCOME10') {
      setAppliedPromo(promoCode)
    }
    setPromoCode('')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-dashed border-primary/30 rounded-lg"></div>
            </div>
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <p className="text-foreground/60 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button 
              onClick={() => onNavigate('shop')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-0 bg-card">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-foreground/60">Size: {item.selectedSize}</span>
                            <span className="text-sm text-foreground/60">Color: {item.selectedColor}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg text-primary">₦{(item.price * item.quantity).toLocaleString()}</p>
                          {item.originalPrice && (
                            <p className="text-sm text-foreground/60 line-through">
                              ₦{(item.originalPrice * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card className="border-0 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">Promo Code</h3>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm">{appliedPromo} applied</span>
                    <Badge variant="secondary">-10%</Badge>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-0 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        `₦${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Promo Discount</span>
                      <span>-₦{promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                    <p className="text-sm text-foreground/70">
                      Add ₦{(50000 - subtotal).toLocaleString()} more for free shipping
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Checkout */}
            <Card className="border-0 bg-card">
              <CardContent className="p-6">
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-4"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-foreground/60 mb-2">Secure checkout powered by</p>
                  <div className="flex justify-center gap-2 text-xs text-foreground/50">
                    <span>Paystack</span>
                    <span>•</span>
                    <span>Flutterwave</span>
                    <span>•</span>
                    <span>Bank Transfer</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Button
              variant="outline"
              onClick={() => onNavigate('shop')}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </div>

        {/* Delivery Info */}
        <Card className="border-0 bg-card mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg mb-4">Delivery Information</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="mb-2 text-primary">Free Delivery</h4>
                <p className="text-foreground/70">On orders above ₦50,000</p>
              </div>
              <div>
                <h4 className="mb-2 text-primary">Fast Delivery</h4>
                <p className="text-foreground/70">2-5 business days within Nigeria</p>
              </div>
              <div>
                <h4 className="mb-2 text-primary">Easy Returns</h4>
                <p className="text-foreground/70">14-day return policy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          orderData={{
            items: cartItems,
            total,
            subtotal,
            shipping,
            discount: promoDiscount
          }}
        />
      </div>
    </div>
  )
}
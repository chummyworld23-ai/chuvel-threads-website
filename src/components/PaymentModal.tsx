import { useState } from 'react'
import { X, CreditCard, Smartphone, Lock, ArrowRight, Check } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { toast } from "sonner"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  orderData: {
    items: any[]
    total: number
    subtotal: number
    shipping: number
    discount?: number
  }
}

export function PaymentModal({ isOpen, onClose, orderData }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | ''>('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [transferDetails, setTransferDetails] = useState({
    accountNumber: '',
    bankCode: '',
    phone: ''
  })

  if (!isOpen) return null

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      toast.success('Payment successful! Order confirmed.')
      
      // Close modal after success
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 3000)
    }, 3000)
  }

  const cardProviders = [
    {
      id: 'googlepay',
      name: 'Google Pay',
      description: 'Quick & Secure',
      icon: '💳',
      testCard: '4084 0840 8408 4081'
    },
    {
      id: 'flutterwave-card',
      name: 'Flutterwave',
      description: 'Cards & Bank Accounts',
      icon: '🦋',
      testCard: '5531 8866 5214 2950'
    }
  ]

  const transferProviders = [
    {
      id: 'monnify',
      name: 'Monnify',
      description: 'Bank Transfer',
      icon: '🏦',
      accountNumber: '7890123456'
    },
    {
      id: 'flutterwave-transfer',
      name: 'Flutterwave',
      description: 'USSD & Transfer',
      icon: '📱',
      ussdCode: '*737*50*Amount*Account#'
    }
  ]

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-card border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl mb-2 text-green-500">Payment Successful!</h3>
            <p className="text-foreground/70 mb-4">Your order has been confirmed and will be processed shortly.</p>
            <div className="bg-card/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground/60">Order Total</p>
              <p className="text-lg text-primary">₦{orderData.total.toLocaleString()}</p>
            </div>
            <p className="text-xs text-foreground/60">Redirecting in 3 seconds...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-card border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl mb-2">Processing Payment</h3>
            <p className="text-foreground/70 mb-4">Please wait while we process your payment...</p>
            <div className="bg-card/50 rounded-lg p-4">
              <p className="text-sm text-foreground/60">Processing via {selectedProvider}</p>
              <p className="text-lg text-primary">₦{orderData.total.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card border-primary/20 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Complete Your Payment
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-primary/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-card/50 rounded-lg p-4">
            <h3 className="text-lg mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{orderData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{orderData.shipping === 0 ? 'Free' : `₦${orderData.shipping.toLocaleString()}`}</span>
              </div>
              {orderData.discount && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-₦{orderData.discount.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span className="text-primary">₦{orderData.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h3 className="text-lg">Choose Payment Method</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="h-6 w-6" />
                <span>Card Payment</span>
              </Button>
              
              <Button
                variant={paymentMethod === 'transfer' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setPaymentMethod('transfer')}
              >
                <Smartphone className="h-6 w-6" />
                <span>Bank Transfer</span>
              </Button>
            </div>
          </div>

          {/* Card Payment */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <h4 className="text-lg">Select Card Provider</h4>
              
              <div className="space-y-3">
                {cardProviders.map((provider) => (
                  <Card 
                    key={provider.id} 
                    className={`cursor-pointer transition-all ${
                      selectedProvider === provider.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-card/80'
                    }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{provider.icon}</span>
                          <div>
                            <h5 className="text-sm">{provider.name}</h5>
                            <p className="text-xs text-foreground/60">{provider.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Test: {provider.testCard}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedProvider && (
                <div className="space-y-4 p-4 bg-card/30 rounded-lg">
                  <h5 className="text-sm">Enter Card Details</h5>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        className="bg-background border-primary/20"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        className="bg-background border-primary/20"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        className="bg-background border-primary/20"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        className="bg-background border-primary/20"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bank Transfer */}
          {paymentMethod === 'transfer' && (
            <div className="space-y-4">
              <h4 className="text-lg">Select Transfer Method</h4>
              
              <div className="space-y-3">
                {transferProviders.map((provider) => (
                  <Card 
                    key={provider.id} 
                    className={`cursor-pointer transition-all ${
                      selectedProvider === provider.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-card/80'
                    }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{provider.icon}</span>
                          <div>
                            <h5 className="text-sm">{provider.name}</h5>
                            <p className="text-xs text-foreground/60">{provider.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {provider.accountNumber ? `Acc: ${provider.accountNumber}` : provider.ussdCode}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedProvider && (
                <div className="space-y-4 p-4 bg-card/30 rounded-lg">
                  <h5 className="text-sm">Transfer Instructions</h5>
                  
                  {selectedProvider === 'monnify' && (
                    <div className="space-y-3">
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm mb-2">Account Details:</p>
                        <p className="text-xs text-foreground/70">Account Number: 7890123456</p>
                        <p className="text-xs text-foreground/70">Bank: Wema Bank</p>
                        <p className="text-xs text-foreground/70">Account Name: Chuvel Threads</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+234 xxx xxx xxxx"
                          value={transferDetails.phone}
                          onChange={(e) => setTransferDetails({...transferDetails, phone: e.target.value})}
                          className="bg-background border-primary/20"
                        />
                      </div>
                    </div>
                  )}

                  {selectedProvider === 'flutterwave-transfer' && (
                    <div className="space-y-3">
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm mb-2">USSD Code:</p>
                        <p className="text-xs text-foreground/70">Dial: *737*50*{orderData.total}*ACCOUNT#</p>
                        <p className="text-xs text-foreground/70 mt-2">Or use bank transfer to the account provided</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="accountNumber">Your Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="Your account number"
                          value={transferDetails.accountNumber}
                          onChange={(e) => setTransferDetails({...transferDetails, accountNumber: e.target.value})}
                          className="bg-background border-primary/20"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Pay Button */}
          {selectedProvider && (
            <Button 
              onClick={handlePayment}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
              disabled={isProcessing}
            >
              <Lock className="h-4 w-4 mr-2" />
              Pay ₦{orderData.total.toLocaleString()}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}

          {/* Security Notice */}
          <div className="text-center text-xs text-foreground/60 space-y-1">
            <p>🔒 Your payment information is encrypted and secure</p>
            <p>Test Mode: Use provided test credentials for demo purposes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
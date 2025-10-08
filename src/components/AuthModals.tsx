import { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff, CreditCard, Smartphone } from 'lucide-react'
import { authService } from '../lib/supabaseService'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Checkbox } from './ui/checkbox'
import { toast } from "sonner"

interface AuthModalsProps {
  isLoginOpen: boolean
  isSignupOpen: boolean
  onCloseLogin: () => void
  onCloseSignup: () => void
  onSwitchToSignup: () => void
  onSwitchToLogin: () => void
  onLoginSuccess: (user: any) => void
}

export function AuthModals({ 
  isLoginOpen, 
  isSignupOpen, 
  onCloseLogin, 
  onCloseSignup, 
  onSwitchToSignup, 
  onSwitchToLogin,
  onLoginSuccess
}: AuthModalsProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    phone: '',
    agreeToTerms: false
  })
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await authService.signIn(loginForm.email, loginForm.password)
      // supabase returns a data object; assume success if no error thrown
      toast.success('Login successful! Welcome back.')
      onLoginSuccess(result.user ?? null)
    } catch (error) {
      toast.error((error as any)?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    try {
  await authService.signInWithGoogle()
  toast.success('Login initiated. Complete the sign-in in the provider window.')
    } catch (error) {
      toast.error((error as any)?.message || 'Google login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupForm.agreeToTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }
    
    setIsLoading(true)

    try {
      const result = await authService.signUp(
        signupForm.email,
        signupForm.password,
        `${signupForm.firstName} ${signupForm.lastName}`,
        ''
      )
      toast.success('Account created successfully!')
      onLoginSuccess(result.user ?? null)
    } catch (error) {
      toast.error((error as any)?.message || 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayment = (method: string) => {
    setSelectedPaymentMethod(method)
    // Mock payment processing
    setTimeout(() => {
      toast.success('Payment successful! Account created.')
      setShowPaymentModal(false)
      onCloseSignup()
    }, 2000)
  }

  if (showPaymentModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-card border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-between">
              Complete Your Signup
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPaymentModal(false)}
                className="hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
            <p className="text-sm text-foreground/70">
              Choose your preferred payment method to activate your premium account
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Google Pay */}
              <Button
                variant="outline"
                className="w-full h-14 border-primary/20 hover:bg-primary/10"
                onClick={() => handlePayment('googlepay')}
                disabled={selectedPaymentMethod !== ''}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center text-white text-xs">
                    G
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Google Pay</div>
                    <div className="text-xs text-foreground/60">Quick & Secure</div>
                  </div>
                </div>
              </Button>

              {/* Paystack */}
              <Button
                variant="outline"
                className="w-full h-14 border-primary/20 hover:bg-primary/10"
                onClick={() => handlePayment('paystack')}
                disabled={selectedPaymentMethod !== ''}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                    P
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Paystack</div>
                    <div className="text-xs text-foreground/60">Card Payment</div>
                  </div>
                </div>
              </Button>

              {/* Flutterwave */}
              <Button
                variant="outline"
                className="w-full h-14 border-primary/20 hover:bg-primary/10"
                onClick={() => handlePayment('flutterwave')}
                disabled={selectedPaymentMethod !== ''}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs">
                    F
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Flutterwave</div>
                    <div className="text-xs text-foreground/60">Multiple Options</div>
                  </div>
                </div>
              </Button>

              {/* Bank Transfer */}
              <Button
                variant="outline"
                className="w-full h-14 border-primary/20 hover:bg-primary/10"
                onClick={() => handlePayment('bank')}
                disabled={selectedPaymentMethod !== ''}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-white text-xs">
                    B
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Bank Transfer</div>
                    <div className="text-xs text-foreground/60">Direct Payment</div>
                  </div>
                </div>
              </Button>
            </div>

            {selectedPaymentMethod && (
              <div className="text-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sm text-foreground/70 mt-2">Processing payment...</p>
              </div>
            )}

            <div className="text-center">
              <p className="text-xs text-foreground/60">
                Test Mode: Use test card 4084084084084081
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-card border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-between">
                Welcome Back
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCloseLogin}
                  className="hover:bg-primary/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <p className="text-sm text-foreground/70">
                Sign in to your account to continue shopping
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-background border-primary/20"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-background border-primary/20"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Separator />

                {/* Google Login */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-primary/20 hover:bg-primary/10"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <div className="w-5 h-5 mr-2 bg-gradient-to-r from-blue-500 to-red-500 rounded flex items-center justify-center text-white text-xs">
                    G
                  </div>
                  Continue with Google
                </Button>

                <div className="text-center">
                  <p className="text-sm text-foreground/70">
                    Don't have an account?{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary"
                      onClick={onSwitchToSignup}
                    >
                      Sign up
                    </Button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-card border-primary/20 max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-between">
                Create Account
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCloseSignup}
                  className="hover:bg-primary/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <p className="text-sm text-foreground/70">
                Join Chuvel Threads and start your fashion journey
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                      <Input
                        id="firstName"
                        placeholder="First name"
                        className="pl-10 bg-background border-primary/20"
                        value={signupForm.firstName}
                        onChange={(e) => setSignupForm({...signupForm, firstName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="bg-background border-primary/20"
                      value={signupForm.lastName}
                      onChange={(e) => setSignupForm({...signupForm, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-background border-primary/20"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 xxx xxx xxxx"
                      className="pl-10 bg-background border-primary/20"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className="pl-10 pr-10 bg-background border-primary/20"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={signupForm.agreeToTerms}
                    onCheckedChange={(checked) => setSignupForm({...signupForm, agreeToTerms: !!checked})}
                  />
                  <Label htmlFor="terms" className="text-sm text-foreground/70">
                    I agree to the{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Terms & Conditions
                    </Button>
                    {' '}and{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <Separator />

                {/* Google Signup */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-primary/20 hover:bg-primary/10"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <div className="w-5 h-5 mr-2 bg-gradient-to-r from-blue-500 to-red-500 rounded flex items-center justify-center text-white text-xs">
                    G
                  </div>
                  Sign up with Google
                </Button>

                <div className="text-center">
                  <p className="text-sm text-foreground/70">
                    Already have an account?{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary"
                      onClick={onSwitchToLogin}
                    >
                      Sign in
                    </Button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
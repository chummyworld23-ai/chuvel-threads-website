import { useState, useEffect } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff, CreditCard, Smartphone, Calendar, ChevronDown } from 'lucide-react'
import { authService } from '../lib/supabaseService'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Checkbox } from './ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
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

// Country codes for phone input
const countryCodes = [
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
]

// Generate years (100 years back from current year)
const generateYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear; i >= currentYear - 100; i--) {
    years.push(i)
  }
  return years
}

const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

// Generate days (1-31)
const generateDays = () => {
  const days = []
  for (let i = 1; i <= 31; i++) {
    days.push(i.toString().padStart(2, '0'))
  }
  return days
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
    countryCode: '+234',
    phone: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    agreeToTerms: false
  })
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showProfileCompletion, setShowProfileCompletion] = useState(false)
  const [profileCompletionData, setProfileCompletionData] = useState<any>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await authService.signIn(loginForm.email, loginForm.password)
      toast.success('Login successful! Welcome back.')
      onLoginSuccess(result.user)
      onCloseLogin()
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    try {
      await authService.signInWithGoogle()
      toast.success('Redirecting to Google...')
      // Google auth will redirect, so we don't need to handle the result here
    } catch (error: any) {
      toast.error(error.message || 'Google login failed. Please try again.')
      setIsLoading(false)
    }
  }

  // Check if user signed in with Google and needs to complete profile
  useEffect(() => {
    const checkGoogleSignup = async () => {
      try {
        const user = await authService.getCurrentUser()
        if (user && user.app_metadata?.provider === 'google') {
          const profile = await authService.getUserProfile(user.id)
          // Check if phone and date_of_birth are missing
          if (!profile.phone || !profile.date_of_birth) {
            setProfileCompletionData(user)
            setShowProfileCompletion(true)
            onCloseLogin()
            onCloseSignup()
          }
        }
      } catch (error) {
        // User not logged in or error fetching profile
      }
    }
    
    if (isLoginOpen || isSignupOpen) {
      checkGoogleSignup()
    }
  }, [isLoginOpen, isSignupOpen])

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!signupForm.dobDay || !signupForm.dobMonth || !signupForm.dobYear) {
      toast.error('Please select your date of birth')
      return
    }

    if (!signupForm.phone) {
      toast.error('Please enter your phone number')
      return
    }

    setIsLoading(true)

    try {
      const dateOfBirth = `${signupForm.dobYear}-${signupForm.dobMonth}-${signupForm.dobDay}`
      const fullPhone = `${signupForm.countryCode} ${signupForm.phone}`
      
      await authService.updateUserProfile(profileCompletionData.id, {
        phone: fullPhone,
        date_of_birth: dateOfBirth
      })

      toast.success('Profile completed successfully!')
      setShowProfileCompletion(false)
      const updatedUser = await authService.getCurrentUser()
      onLoginSuccess(updatedUser)
    } catch (error: any) {
      toast.error(error.message || 'Failed to complete profile')
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

    if (!signupForm.dobDay || !signupForm.dobMonth || !signupForm.dobYear) {
      toast.error('Please select your date of birth')
      return
    }

    if (!signupForm.phone) {
      toast.error('Please enter your phone number')
      return
    }
    
    setIsLoading(true)

    try {
      const fullName = `${signupForm.firstName} ${signupForm.lastName}`
      const dateOfBirth = `${signupForm.dobYear}-${signupForm.dobMonth}-${signupForm.dobDay}`
      const fullPhone = `${signupForm.countryCode} ${signupForm.phone}`
      
      const result = await authService.signUp(
        signupForm.email, 
        signupForm.password, 
        fullName,
        dateOfBirth,
        fullPhone
      )
      toast.success('Account created successfully! Please check your email to verify your account.')
      onCloseSignup()
    } catch (error: any) {
      toast.error(error.message || 'Signup failed. Please try again.')
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
                  <div className="flex gap-2">
                    <Select value={signupForm.countryCode} onValueChange={(value) => setSignupForm({...signupForm, countryCode: value})}>
                      <SelectTrigger className="w-[140px] bg-background border-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="801 234 5678"
                        className="pl-10 bg-background border-primary/20"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({...signupForm, phone: e.target.value.replace(/[^0-9]/g, '')})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Select value={signupForm.dobMonth} onValueChange={(value) => setSignupForm({...signupForm, dobMonth: value})}>
                        <SelectTrigger className="bg-background border-primary/20">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={signupForm.dobDay} onValueChange={(value) => setSignupForm({...signupForm, dobDay: value})}>
                        <SelectTrigger className="bg-background border-primary/20">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {generateDays().map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={signupForm.dobYear} onValueChange={(value) => setSignupForm({...signupForm, dobYear: value})}>
                        <SelectTrigger className="bg-background border-primary/20">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {generateYears().map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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

      {/* Profile Completion Modal for Google OAuth users */}
      {showProfileCompletion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-card border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-between">
                Complete Your Profile
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowProfileCompletion(false)}
                  className="hover:bg-primary/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <p className="text-sm text-foreground/70">
                Please provide additional information to complete your account setup
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompleteProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Select value={signupForm.countryCode} onValueChange={(value) => setSignupForm({...signupForm, countryCode: value})}>
                      <SelectTrigger className="w-[140px] bg-background border-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                      <Input
                        id="profile-phone"
                        type="tel"
                        placeholder="801 234 5678"
                        className="pl-10 bg-background border-primary/20"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({...signupForm, phone: e.target.value.replace(/[^0-9]/g, '')})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Select value={signupForm.dobMonth} onValueChange={(value) => setSignupForm({...signupForm, dobMonth: value})}>
                        <SelectTrigger className="bg-background border-primary/20">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={signupForm.dobDay} onValueChange={(value) => setSignupForm({...signupForm, dobDay: value})}>
                        <SelectTrigger className="bg-background border-primary/20">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {generateDays().map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={signupForm.dobYear} onValueChange={(value) => setSignupForm({...signupForm, dobYear: value})}>
                        <SelectTrigger className="bg-background border-primary/20">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {generateYears().map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Completing Profile...' : 'Complete Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
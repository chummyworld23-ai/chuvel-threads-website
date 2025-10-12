import { ArrowRight, Star, Instagram, MessageCircle, Twitter, Facebook, Twitch, MessageSquare, } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import heroImage from '../assets/chuvel-hero.jpg';


interface HomePageProps {
  onNavigate: (page: string) => void
  onAddToCart: (product: any) => void
  currentUser: any
}

export function HomePage({ onNavigate, onAddToCart, currentUser }: HomePageProps) {
  const categories = [
    {
      id: 'senators',
      name: 'Senators',
      description: 'Premium traditional wear',
      image: 'https://images.unsplash.com/photo-1579710754366-bb9665344096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHNlbmF0b3IlMjBzaGlydCUyMGFnYmFkYSUyMGZhc2hpb258ZW58MXx8fHwxNzU5NjA0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'agbada',
      name: 'Agbada',
      description: 'Luxury flowing robes',
      image: 'https://images.unsplash.com/photo-1688143029272-f675696d4cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzU5NjA0Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'streetwear',
      name: 'Streetwear',
      description: 'Modern urban fashion',
      image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHJlZXR3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTk1NjQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: 'Royal Senator Classic',
      price: '₦45,000',
      originalPrice: '₦55,000',
      image: 'https://images.unsplash.com/photo-1579710754366-bb9665344096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHNlbmF0b3IlMjBzaGlydCUyMGFnYmFkYSUyMGZhc2hpb258ZW58MXx8fHwxNzU5NjA0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      reviews: 124,
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Premium Agbada Deluxe',
      price: '₦85,000',
      originalPrice: '₦95,000',
      image: 'https://images.unsplash.com/photo-1688143029272-f675696d4cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzU5NjA0Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      reviews: 89,
      badge: 'New'
    },
    {
      id: 3,
      name: 'Urban Street Collection',
      price: '₦25,000',
      originalPrice: '₦30,000',
      image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHJlZXR3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTk1NjQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      reviews: 156,
      badge: 'Trending'
    }
  ]

  const testimonials = [
    {
      name: 'Chizuru J. Azuka (Aba)',
      role: 'Fashion Enthusiast',
      content: 'The quality of Chuvel Threads is unmatched. My senator fits perfectly and looks absolutely premium.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Okoli C. Praise (Euugu)',
      role: 'Style Blogger',
      content: 'I have been eyeing Chuvel for months on Instagram, and finally decided to treat myself one of the image vintage shirt for a gathering. And Hallelujah, the hype is real!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b436?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Chioma F. Anyagwa (Port Harcourt)',
      role: 'Style Blogger',
      content: 'I spent about 45 minutes on the Chuvel Threads website last night trying to buy a few pieces, and honestly, it was a mixed bag',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b436?w=100&h=100&fit=crop&crop=face'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with glassy effects and animations */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/30"
          animate={{ 
            background: [
              'linear-gradient(135deg, #0a0a0a 0%, rgba(10,10,10,0.95) 50%, rgba(123,43,32,0.3) 100%)',
              'linear-gradient(135deg, #0a0a0a 0%, rgba(10,10,10,0.95) 50%, rgba(123,43,32,0.4) 100%)',
              'linear-gradient(135deg, #0a0a0a 0%, rgba(10,10,10,0.95) 50%, rgba(123,43,32,0.3) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(245,224,181,0.15),transparent_50%)]"
          animate={{ 
            background: [
              'radial-gradient(circle_at_30%_40%,rgba(245,224,181,0.15),transparent_50%)',
              'radial-gradient(circle_at_40%_50%,rgba(245,224,181,0.2),transparent_50%)',
              'radial-gradient(circle_at_30%_40%,rgba(245,224,181,0.15),transparent_50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        
        {/* Floating animated elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/20 rounded-full blur-sm"
          animate={{ 
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-secondary/30 rounded-full blur-sm"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/6 w-3 h-3 bg-primary/15 rounded-full blur-sm"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Glassy card container */}
              <motion.div 
                className="backdrop-blur-xl bg-card/30 border border-primary/20 rounded-2xl p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="text-sm uppercase tracking-wide text-primary/80">Chuvel Threads</span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent"
                      initial={{ backgroundPosition: '0% 50%' }}
                      animate={{ backgroundPosition: '100% 50%' }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      STYLES
                    </motion.span>
                    <br />
                    <motion.span 
                      className="text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      UNIVERSAL
                    </motion.span>
                    <br />
                    <motion.span 
                      className="bg-gradient-to-r from-secondary via-primary to-primary bg-clip-text text-transparent"
                      initial={{ backgroundPosition: '0% 50%' }}
                      animate={{ backgroundPosition: '100% 50%' }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                    >
                      STYLES
                    </motion.span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg text-foreground/70 leading-relaxed max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    Experience the perfect fusion of Nigerian heritage and contemporary design. From luxury Agbadas to modern streetwear.
                  </motion.p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => onNavigate('senators')}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 group shadow-lg"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => onNavigate('about')}
                      className="border-primary/30 bg-background/20 backdrop-blur-sm hover:bg-primary/10"
                    >
                      Our Story
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Stats with glassy effect */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Happy Customers', value: '500+' },
                  { label: 'Premium Products', value: '200+' },
                  { label: 'Years Experience', value: '2+' }
                ].map((stat, index) => (
                  <div key={index} className="backdrop-blur-lg bg-card/20 border border-primary/10 rounded-xl p-4 text-center">
                    <div className="text-lg text-primary">{stat.value}</div>
                    <div className="text-xs text-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <div className="relative md:block hidden">
              <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl p-4 shadow-2xl">
              <ImageWithFallback
              src={heroImage}  
              alt="A model wearing a Chuvel Threads traditional blue and black robe"
              className="w-full h-[600px] object-cover rounded-xl"
              />
              </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-primary/10 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 border border-secondary/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg rotate-12 animate-pulse"></div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-br from-background via-background/95 to-secondary/10 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,224,181,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header with glassy effect */}
          <div className="text-center mb-16">
            <div className="backdrop-blur-xl bg-card/20 border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm uppercase tracking-wide text-primary/80">Collections</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl mb-6">
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  EXPLORE
                </span>
                <br />
                <span className="text-foreground">OUR</span>
                <br />
                <span className="bg-gradient-to-r from-secondary via-primary to-primary bg-clip-text text-transparent">
                  COLLECTIONS
                </span>
              </h2>
              
              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                From traditional Nigerian wear to modern streetwear, discover pieces that define your unique style
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={category.id} className="relative group">
                {/* Glassy card container */}
                <div className="backdrop-blur-xl bg-card/30 border border-primary/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
                     onClick={() => onNavigate(category.id)}>
                  
                  <div className="relative h-64 overflow-hidden rounded-xl mb-6">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Floating accent */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${
                      index === 0 ? 'from-primary/20 to-secondary/20' :
                      index === 1 ? 'from-secondary/20 to-primary/20' :
                      'from-primary/30 to-secondary/30'
                    } rounded-full blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl text-primary group-hover:text-secondary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-primary/80 group-hover:text-primary transition-colors">
                      <span className="text-sm">Explore Collection</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Background decoration */}
                <div className={`absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr ${
                  index === 0 ? 'from-secondary/10 to-primary/10' :
                  index === 1 ? 'from-primary/10 to-secondary/10' :
                  'from-secondary/15 to-primary/15'
                } rounded-full blur-2xl`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/6 w-12 h-12 border border-primary/10 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-secondary/20 rounded-full animate-bounce"></div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-background via-background/95 to-primary/10 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(123,43,32,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header with glassy effect */}
          <div className="text-center mb-16">
            <div className="backdrop-blur-xl bg-card/20 border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm uppercase tracking-wide text-secondary/80">Premium Selection</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl mb-6">
                <span className="bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent">
                  FEATURED
                </span>
                <br />
                <span className="text-foreground">MEETS</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-secondary bg-clip-text text-transparent">
                  EXCELLENCE
                </span>
              </h2>
              
              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Handpicked selections showcasing our finest craftsmanship and design innovation
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="relative group">
                {/* Glassy card container */}
                <div className="backdrop-blur-xl bg-card/30 border border-primary/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                  
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Badge */}
                    <Badge className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm text-white border-0">
                      {product.badge}
                    </Badge>

                    {/* Floating accent */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${
                      index === 0 ? 'from-secondary/20 to-primary/20' :
                      index === 1 ? 'from-primary/20 to-secondary/20' :
                      'from-secondary/30 to-primary/30'
                    } rounded-full blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-foreground/60">({product.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg text-primary">{product.price}</span>
                        <span className="text-sm text-foreground/60 line-through">{product.originalPrice}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onAddToCart(product)
                        }}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 group/btn"
                      >
                        Add to Cart
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-primary/30 hover:bg-primary/10"
                        onClick={() => onNavigate('product', product.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Background decoration */}
                <div className={`absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-tr ${
                  index === 0 ? 'from-primary/10 to-secondary/10' :
                  index === 1 ? 'from-secondary/10 to-primary/10' :
                  'from-primary/15 to-secondary/15'
                } rounded-full blur-2xl`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/3 right-1/6 w-10 h-10 border border-secondary/10 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-6 h-6 border border-primary/20 rounded-full animate-bounce"></div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">What Our Customers Say</h2>
            <p className="text-foreground/70">Trusted by fashion enthusiasts across Nigeria</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm">{testimonial.name}</p>
                      <p className="text-xs text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-secondary/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Stay Updated</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Be the first to know about new collections, exclusive offers, and fashion tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-card border border-primary/20 focus:outline-none focus:border-primary"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Social Links */}
<section className="py-12 border-t border-primary/20">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">

        {/* Instagram Link (Already Correct) */}
        <a 
          href="https://www.instagram.com/chuvel_threads?utm_source=ig_web_button_share_sheet&igsh=ZzhjdHphN2x1eHdu" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </Button>
        </a>

        {/* Twitter Link ⬅️ **REPLACE PLACEHOLDER URL** */}
        <a 
          href="https://x.com/CHUVEL_THREADS_HANDLE" // Example: "https://x.com/ChuvelThreads"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </Button>
        </a>

        {/* Facebook Link (Already Correct) */}
        <a 
          href="https://www.facebook.com/profile.php?id=61581968367375" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Facebook className="h-5 w-5" />
          </Button>
        </a>
        <a 
          href="https://www.tiktok.com/@CHUVEL_THREADS_HANDLE" // Your actual TikTok URL here
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Twitch className="h-5 w-5" />
          </Button>
        </a>
      </div>
      <p className="text-sm text-foreground/60">
        © 2024 Chuvel Threads. All rights reserved.
      </p>
    </div>
  </div>
</section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          onClick={() => window.open('https://wa.me/2347032603312?text=Hello, I\'m interested in your products!', '_blank')}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
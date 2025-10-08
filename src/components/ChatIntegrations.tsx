import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from './ui/button'

export function ChatIntegrations() {
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  // Initialize Tawk.to (if needed)
  useEffect(() => {
    // This would be where you'd add Tawk.to script
    // For demo purposes, we'll just show a placeholder
    
    // Uncomment and replace with your actual Tawk.to widget ID
    /*
    const tawkScript = document.createElement('script')
    tawkScript.src = 'https://embed.tawk.to/YOUR_TAWK_WIDGET_ID/default'
    tawkScript.async = true
    tawkScript.charset = 'UTF-8'
    tawkScript.setAttribute('crossorigin', '*')
    document.head.appendChild(tawkScript)

    return () => {
      document.head.removeChild(tawkScript)
    }
    */
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in your Nigerian traditional wear collections.")
    const whatsappUrl = `https://wa.me/2349012345678?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulsing animation rings */}
          <div className="absolute inset-0 w-14 h-14 bg-green-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-14 h-14 bg-green-500/10 rounded-full animate-pulse"></div>
          
          <Button
            onClick={handleWhatsAppClick}
            className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Tawk.to Live Chat */}
      {/* The Tawk.to widget will automatically appear when script is loaded */}
      
      {/* Demo Chat Popup (for demo purposes) */}
      {showWhatsApp && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-card border border-primary/20 rounded-lg shadow-xl">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg text-green-500">WhatsApp Support</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowWhatsApp(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-foreground/70 mb-4">
              Get instant support for your orders, sizing questions, or custom requests!
            </p>
            
            <div className="space-y-2">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Start WhatsApp Chat
              </Button>
              <div className="text-xs text-foreground/60 text-center">
                Available: Mon-Sat 9AM-7PM WAT
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
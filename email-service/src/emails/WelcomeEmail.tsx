import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Sparkles } from 'lucide-react';
import '../styles/globals.css';
import '../styles/index.css';

export function WelcomeEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: 'Welcome to Chuvel Threads - Your Style Journey Begins',
    heading: 'Welcome to Our Fashion Family',
    subheading: 'Discover Premium Styles That Define You',
    message: 'Thank you for joining us. We\'re excited to have you on this journey of timeless fashion and exceptional quality.',
    discountCode: 'WELCOME10',
    discountAmount: '10% OFF',
    ctaText: 'Start Shopping',
    bestseller1: 'Premium Kaftan Wear',
    bestseller2: 'Designer Collection',
    bestseller3: 'Signature Styles'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700">
        <h2 className="text-[#D4AF37] mb-4">Edit Welcome Email</h2>
        <div className="space-y-4">
          <div>
            <label className="text-zinc-400 text-sm">Brand Name</label>
            <Input
              value={emailData.brandName}
              onChange={(e) => handleChange('brandName', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Email Subject</label>
            <Input
              value={emailData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Main Heading</label>
            <Input
              value={emailData.heading}
              onChange={(e) => handleChange('heading', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Subheading</label>
            <Input
              value={emailData.subheading}
              onChange={(e) => handleChange('subheading', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Welcome Message</label>
            <Textarea
              value={emailData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 text-sm">Discount Code</label>
              <Input
                value={emailData.discountCode}
                onChange={(e) => handleChange('discountCode', e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-sm">Discount Amount</label>
              <Input
                value={emailData.discountAmount}
                onChange={(e) => handleChange('discountAmount', e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-zinc-400 text-sm">CTA Button Text</label>
            <Input
              value={emailData.ctaText}
              onChange={(e) => handleChange('ctaText', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
        </div>
      </Card>

      {/* Email Preview */}
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-[#1a1a1a] text-white px-8 py-6 text-center">
          <h1 className="text-[#D4AF37] tracking-wider">{emailData.brandName}</h1>
        </div>

        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white px-8 py-12 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-[#D4AF37] mb-2">{emailData.heading}</h2>
          <p className="text-zinc-300 mb-6">{emailData.subheading}</p>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">{emailData.message}</p>
          
          <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37] rounded-lg p-6 max-w-sm mx-auto mb-8">
            <p className="text-zinc-300 mb-2">Your Exclusive Welcome Offer</p>
            <div className="text-[#D4AF37] mb-2">{emailData.discountAmount}</div>
            <div className="bg-[#1a1a1a] px-4 py-2 rounded inline-block">
              <code className="text-[#D4AF37]">{emailData.discountCode}</code>
            </div>
          </div>

          <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-8">
            {emailData.ctaText}
          </Button>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-12">
          <h3 className="text-[#D4AF37] text-center mb-8">Discover Our Bestsellers</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-zinc-800 aspect-square rounded-lg mb-3 flex items-center justify-center">
                <div className="w-24 h-24 bg-zinc-700 rounded"></div>
              </div>
              <p className="text-zinc-300 text-sm">{emailData.bestseller1}</p>
            </div>
            <div className="text-center">
              <div className="bg-zinc-800 aspect-square rounded-lg mb-3 flex items-center justify-center">
                <div className="w-24 h-24 bg-zinc-700 rounded"></div>
              </div>
              <p className="text-zinc-300 text-sm">{emailData.bestseller2}</p>
            </div>
            <div className="text-center">
              <div className="bg-zinc-800 aspect-square rounded-lg mb-3 flex items-center justify-center">
                <div className="w-24 h-24 bg-zinc-700 rounded"></div>
              </div>
              <p className="text-zinc-300 text-sm">{emailData.bestseller3}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
          <p className="text-zinc-600 text-xs">You're receiving this because you signed up for our newsletter.</p>
        </div>
      </div>
    </div>
  );
}
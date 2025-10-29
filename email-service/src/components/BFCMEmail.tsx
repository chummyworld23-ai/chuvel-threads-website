import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tag, Gift } from 'lucide-react';

export function BFCMEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: '🖤 BLACK FRIDAY: Up to 60% OFF Sitewide',
    heading: 'BLACK FRIDAY',
    subheading: 'The Sale You\'ve Been Waiting For',
    tier1: 'Spend $100 - Get 15% OFF',
    tier2: 'Spend $200 - Get 25% OFF',
    tier3: 'Spend $300 - Get 35% OFF',
    message: 'Our biggest sale of the year is here! Shop now and save more when you spend more.',
    ctaText: 'Shop Black Friday',
    saleEnd: 'Sale ends Monday, November 27th at midnight'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700">
        <h2 className="text-[#D4AF37] mb-4">Edit BFCM Email</h2>
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
            <label className="text-zinc-400 text-sm">Message</label>
            <Textarea
              value={emailData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
              rows={2}
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Tier 1 Offer</label>
            <Input
              value={emailData.tier1}
              onChange={(e) => handleChange('tier1', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Tier 2 Offer</label>
            <Input
              value={emailData.tier2}
              onChange={(e) => handleChange('tier2', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Tier 3 Offer</label>
            <Input
              value={emailData.tier3}
              onChange={(e) => handleChange('tier3', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
        </div>
      </Card>

      {/* Email Preview */}
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-black text-white px-8 py-6 text-center border-b-4 border-[#D4AF37]">
          <h1 className="text-[#D4AF37] tracking-wider">{emailData.brandName}</h1>
        </div>

        <div className="bg-black text-white px-8 py-16 text-center">
          <div className="inline-block bg-[#D4AF37] text-black px-6 py-2 tracking-widest mb-6 text-sm">
            BLACK FRIDAY WEEKEND
          </div>
          
          <h2 className="text-white text-5xl mb-3">{emailData.heading}</h2>
          <p className="text-[#D4AF37] text-xl mb-8">{emailData.subheading}</p>
          <p className="text-zinc-400 max-w-md mx-auto">{emailData.message}</p>
        </div>

        <div className="bg-gradient-to-b from-black to-zinc-900 px-8 py-10">
          <h3 className="text-[#D4AF37] text-center mb-6">Spend More, Save More</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-zinc-800 border-l-4 border-[#D4AF37] p-4 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-white">{emailData.tier1}</span>
                </div>
                <span className="text-[#D4AF37]">★</span>
              </div>
            </div>
            
            <div className="bg-zinc-800 border-l-4 border-[#D4AF37] p-4 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-white">{emailData.tier2}</span>
                </div>
                <span className="text-[#D4AF37]">★★</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 border-l-4 border-[#D4AF37] p-4 rounded shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-white">{emailData.tier3}</span>
                </div>
                <span className="text-[#D4AF37]">★★★</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2 ml-8">+ Free Gift with Purchase</p>
            </div>
          </div>

          <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-12 py-6 w-full text-lg mb-4">
            {emailData.ctaText}
          </Button>
          
          <p className="text-zinc-500 text-sm text-center">{emailData.saleEnd}</p>
        </div>

        <div className="bg-zinc-900 px-8 py-8">
          <h3 className="text-[#D4AF37] text-center mb-6">Featured Deals</h3>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative">
                <div className="aspect-square bg-zinc-800 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  <div className="w-20 h-20 bg-zinc-700 rounded"></div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                    -{25 + item * 5}%
                  </div>
                </div>
                <p className="text-white text-xs text-center">Item {item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#D4AF37] px-8 py-4 text-center">
          <p className="text-black">🚚 Free Shipping on Orders Over $100</p>
        </div>

        <div className="bg-black px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
          <p className="text-zinc-600 text-xs">Discounts automatically applied at checkout</p>
        </div>
      </div>
    </div>
  );
}
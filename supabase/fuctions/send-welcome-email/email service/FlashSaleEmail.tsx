import { useState } from 'react';
import { Input } from '../../../../email-service/src/components/ui/input';
import { Textarea } from '../../../../email-service/src/components/ui/textarea';
import { Button } from '../../../../email-service/src/components/ui/button';
import { Card } from '../../../../email-service/src/components/ui/card';
import { Clock, Zap } from 'lucide-react';

export function FlashSaleEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: '⚡ FLASH SALE: 24 Hours Only!',
    heading: '24-HOUR FLASH SALE',
    discount: '40% OFF',
    urgency: 'Ends Tonight at Midnight',
    message: 'Don\'t miss out! Our biggest flash sale of the season. Limited time. Limited quantities.',
    ctaText: 'Shop Now',
    conditions: 'Use code: FLASH40 at checkout'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700">
        <h2 className="text-[#D4AF37] mb-4">Edit Flash Sale Email</h2>
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
            <label className="text-zinc-400 text-sm">Discount Amount</label>
            <Input
              value={emailData.discount}
              onChange={(e) => handleChange('discount', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Urgency Message</label>
            <Input
              value={emailData.urgency}
              onChange={(e) => handleChange('urgency', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Sale Message</label>
            <Textarea
              value={emailData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Sale Conditions</label>
            <Input
              value={emailData.conditions}
              onChange={(e) => handleChange('conditions', e.target.value)}
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

        <div className="bg-gradient-to-br from-red-900 via-[#1a1a1a] to-[#1a1a1a] text-white px-8 py-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-[#D4AF37] to-red-500"></div>
          
          <div className="inline-block bg-red-600 text-white px-4 py-1 text-xs tracking-widest mb-4 rounded animate-pulse">
            FLASH SALE
          </div>
          
          <div className="flex justify-center mb-4">
            <Zap className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37]" />
          </div>
          
          <h2 className="text-white mb-3">{emailData.heading}</h2>
          
          <div className="bg-[#D4AF37] text-black inline-block px-12 py-6 rounded-lg mb-6">
            <div className="text-5xl mb-1">{emailData.discount}</div>
            <p className="text-sm">EVERYTHING</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{emailData.urgency}</p>
          </div>
          
          <p className="text-zinc-300 max-w-md mx-auto">{emailData.message}</p>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-4 text-center border-y border-[#D4AF37]/30">
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {['12', '08', '45', '23'].map((num, i) => (
              <div key={i} className="bg-zinc-900 rounded p-3 border border-[#D4AF37]/20">
                <div className="text-[#D4AF37] text-2xl">{num}</div>
                <div className="text-zinc-500 text-xs mt-1">
                  {['HRS', 'MIN', 'SEC', 'MS'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-10">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative group">
                <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                  <div className="w-24 h-24 bg-zinc-700 rounded"></div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                    {emailData.discount}
                  </div>
                </div>
                <p className="text-zinc-400 text-sm line-through">$199.00</p>
                <p className="text-[#D4AF37]">$119.40</p>
              </div>
            ))}
          </div>

          <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-12 py-6 w-full text-lg mb-4">
            {emailData.ctaText}
          </Button>
          
          <p className="text-zinc-500 text-sm text-center">{emailData.conditions}</p>
        </div>

        <div className="bg-red-600 px-8 py-3 text-center">
          <p className="text-white text-sm">⚡ Limited Stock - While Supplies Last</p>
        </div>

        <div className="bg-[#0a0a0a] px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
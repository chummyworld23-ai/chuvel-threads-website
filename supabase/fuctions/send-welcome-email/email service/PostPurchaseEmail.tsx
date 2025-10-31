import { useState } from 'react';
import { Input } from '../../../../email-service/src/components/ui/input';
import { Textarea } from '../../../../email-service/src/components/ui/textarea';
import { Button } from '../../../../email-service/src/components/ui/button';
import { Card } from '../../../../email-service/src/components/ui/card';
import { Star, Camera } from 'lucide-react';

export function PostPurchaseEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: 'How Are You Loving Your New Purchase?',
    heading: 'We\'d Love Your Feedback',
    customerName: 'Valued Customer',
    message: 'Thank you for your recent purchase! We hope you\'re loving your new items. Your feedback helps us serve you better.',
    productName: 'Premium Kaftan Collection',
    ctaText: 'Leave a Review',
    hashtag: '#Chuvel ThreadsStyle',
    crossSell1: 'Matching Accessories',
    crossSell2: 'Complementary Styles'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700">
        <h2 className="text-[#D4AF37] mb-4">Edit Post-Purchase Email</h2>
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
            <label className="text-zinc-400 text-sm">Customer Name</label>
            <Input
              value={emailData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
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
            <label className="text-zinc-400 text-sm">Message</label>
            <Textarea
              value={emailData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Product Name</label>
            <Input
              value={emailData.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Social Hashtag</label>
            <Input
              value={emailData.hashtag}
              onChange={(e) => handleChange('hashtag', e.target.value)}
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
          <h2 className="text-[#D4AF37] mb-2">{emailData.heading}</h2>
          <p className="text-zinc-400 mb-8">Hi {emailData.customerName},</p>
          <p className="text-zinc-300 max-w-md mx-auto mb-8">{emailData.message}</p>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-8">
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 bg-zinc-800 rounded flex-shrink-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-zinc-700 rounded"></div>
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">{emailData.productName}</h3>
                <p className="text-zinc-500 text-xs">Delivered 7 days ago</p>
              </div>
            </div>
            
            <div className="text-center py-4">
              <p className="text-zinc-400 text-sm mb-3">How would you rate this product?</p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-8 w-full">
                {emailData.ctaText}
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-lg p-6 border border-[#D4AF37]/30 text-center mb-6">
            <Camera className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="text-white mb-2">Share Your Style</h3>
            <p className="text-zinc-400 text-sm mb-3">Post your photos with {emailData.hashtag} for a chance to be featured!</p>
            <p className="text-[#D4AF37] text-sm">Get 15% off your next order</p>
          </div>

          <div>
            <h3 className="text-[#D4AF37] text-center mb-4">You Might Also Like</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 rounded-lg p-4 text-center border border-zinc-800">
                <div className="aspect-square bg-zinc-800 rounded mb-3 flex items-center justify-center">
                  <div className="w-20 h-20 bg-zinc-700 rounded"></div>
                </div>
                <p className="text-white text-sm">{emailData.crossSell1}</p>
                <p className="text-[#D4AF37] text-sm">$79.00</p>
              </div>
              <div className="bg-zinc-900 rounded-lg p-4 text-center border border-zinc-800">
                <div className="aspect-square bg-zinc-800 rounded mb-3 flex items-center justify-center">
                  <div className="w-20 h-20 bg-zinc-700 rounded"></div>
                </div>
                <p className="text-white text-sm">{emailData.crossSell2}</p>
                <p className="text-[#D4AF37] text-sm">$99.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
          <p className="text-zinc-600 text-xs">Thank you for being a valued customer.</p>
        </div>
      </div>
    </div>
  );
}
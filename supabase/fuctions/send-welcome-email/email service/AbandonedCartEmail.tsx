import { useState } from 'react';
import { Input } from '../../../../email-service/src/components/ui/input';
import { Textarea } from '../../../../email-service/src/components/ui/textarea';
import { Button } from '../../../../email-service/src/components/ui/button';
import { Card } from '../../../../email-service/src/components/ui/card';
import { ShoppingBag } from 'lucide-react';

export function AbandonedCartEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: 'You Left Something Behind...',
    heading: 'Still Thinking About It?',
    message: 'We saved your items! Complete your purchase now and enjoy free shipping on this order.',
    productName: 'Premium Kaftan Collection',
    productPrice: '$129.00',
    incentive: 'FREE SHIPPING',
    ctaText: 'Complete Your Order',
    urgency: 'Limited stock available'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700">
        <h2 className="text-[#D4AF37] mb-4">Edit Abandoned Cart Email</h2>
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
            <label className="text-zinc-400 text-sm">Product Price</label>
            <Input
              value={emailData.productPrice}
              onChange={(e) => handleChange('productPrice', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Incentive Offer</label>
            <Input
              value={emailData.incentive}
              onChange={(e) => handleChange('incentive', e.target.value)}
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
        </div>
      </Card>

      {/* Email Preview */}
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-[#1a1a1a] text-white px-8 py-6 text-center">
          <h1 className="text-[#D4AF37] tracking-wider">{emailData.brandName}</h1>
        </div>

        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white px-8 py-12 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-[#D4AF37] mb-4">{emailData.heading}</h2>
          <p className="text-zinc-300 max-w-md mx-auto mb-8">{emailData.message}</p>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-8">
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-zinc-700 rounded"></div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white mb-1">{emailData.productName}</h3>
                  <p className="text-[#D4AF37]">{emailData.productPrice}</p>
                </div>
                <p className="text-zinc-400 text-sm">Size: M | Color: Black</p>
              </div>
            </div>
          </div>

          {emailData.incentive && (
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37] rounded-lg p-4 mt-6 text-center">
              <p className="text-[#D4AF37]">🎁 Special Offer: {emailData.incentive}</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-8 w-full mb-4">
              {emailData.ctaText}
            </Button>
            <p className="text-zinc-500 text-sm">{emailData.urgency}</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
          <p className="text-zinc-600 text-xs">Need help? Contact our support team anytime.</p>
        </div>
      </div>
    </div>
  );
}
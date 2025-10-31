import { useState } from 'react';
import { Input } from '../../../../email-service/src/components/ui/input';
import { Textarea } from '../../../../email-service/src/components/ui/textarea';
import { Button } from '../../../../email-service/src/components/ui/button';
import { Card } from '../../../../email-service/src/components/ui/card';
import { Gift, PartyPopper } from 'lucide-react';

export function BirthdayEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: '🎉 Happy Birthday! Here\'s Your Special Gift',
    heading: 'Happy Birthday!',
    customerName: 'Sarah',
    message: 'Wishing you a day filled with joy and style! As our gift to you, enjoy this exclusive birthday offer.',
    discountCode: 'BDAY15',
    discountAmount: '$15 OFF',
    expiryDate: 'Valid for 7 days',
    ctaText: 'Claim Your Gift'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700">
        <h2 className="text-[#D4AF37] mb-4">Edit Birthday Email</h2>
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
            <label className="text-zinc-400 text-sm">Birthday Message</label>
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
            <label className="text-zinc-400 text-sm">Expiry Information</label>
            <Input
              value={emailData.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
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

        <div className="bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white px-8 py-16 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4">
            <PartyPopper className="w-8 h-8 text-[#D4AF37]/30" />
          </div>
          <div className="absolute top-4 right-4">
            <PartyPopper className="w-8 h-8 text-[#D4AF37]/30" />
          </div>
          <div className="absolute bottom-4 left-8">
            <Gift className="w-6 h-6 text-[#D4AF37]/20" />
          </div>
          <div className="absolute bottom-4 right-8">
            <Gift className="w-6 h-6 text-[#D4AF37]/20" />
          </div>

          <div className="flex justify-center mb-6">
            <Gift className="w-16 h-16 text-[#D4AF37]" />
          </div>
          <h2 className="text-[#D4AF37] mb-3">{emailData.heading}</h2>
          <p className="text-zinc-300 text-xl mb-6">Dear {emailData.customerName},</p>
          <p className="text-zinc-300 max-w-md mx-auto mb-8">{emailData.message}</p>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-10">
          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border-2 border-[#D4AF37] rounded-xl p-8 text-center mb-8">
            <p className="text-zinc-400 mb-3">Your Birthday Gift</p>
            <div className="text-[#D4AF37] text-3xl mb-4">{emailData.discountAmount}</div>
            <div className="bg-[#1a1a1a] px-6 py-3 rounded-lg inline-block mb-4 border border-[#D4AF37]/50">
              <code className="text-[#D4AF37] text-lg">{emailData.discountCode}</code>
            </div>
            <p className="text-zinc-500 text-sm">{emailData.expiryDate}</p>
          </div>

          <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-8 w-full text-lg py-6">
            {emailData.ctaText}
          </Button>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">🎂 Make your birthday extra special with something you love!</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
          <p className="text-zinc-600 text-xs">Celebrating special moments with you.</p>
        </div>
      </div>
    </div>
  );
}
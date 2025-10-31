import { useState } from 'react';
import { Input } from '../../../../email-service/src/components/ui/input';
import { Textarea } from '../../../../email-service/src/components/ui/textarea';
import { Button } from '../../../../email-service/src/components/ui/button';
import { Card } from '../../../../email-service/src/components/ui/card';
import { Palette } from 'lucide-react';

export function StyleGuideEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: 'Style Guide: 5 Ways to Wear Your New Kaftan',
    heading: 'Style It Your Way',
    subheading: 'Complete Lookbook: Spring 2025',
    intro: 'Get inspired with our latest styling guide. Discover how to create versatile looks with our signature pieces.',
    look1Title: 'Casual Elegance',
    look1Desc: 'Pair with white sneakers and a crossbody bag for effortless day style.',
    look2Title: 'Evening Glam',
    look2Desc: 'Add statement jewelry and heels for a sophisticated evening look.',
    look3Title: 'Beach Ready',
    look3Desc: 'Perfect over swimwear with sandals and a sun hat.',
    ctaText: 'Shop The Look'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700 h-fit">
        <h2 className="text-[#D4AF37] mb-4">Edit Style Guide Email</h2>
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
            <label className="text-zinc-400 text-sm">Introduction</label>
            <Textarea
              value={emailData.intro}
              onChange={(e) => handleChange('intro', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
              rows={2}
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Look 1 Title</label>
            <Input
              value={emailData.look1Title}
              onChange={(e) => handleChange('look1Title', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Look 1 Description</label>
            <Textarea
              value={emailData.look1Desc}
              onChange={(e) => handleChange('look1Desc', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
              rows={2}
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
            <Palette className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-[#D4AF37] mb-2">{emailData.heading}</h2>
          <p className="text-zinc-300 text-lg mb-4">{emailData.subheading}</p>
          <p className="text-zinc-400 max-w-md mx-auto">{emailData.intro}</p>
        </div>

        {/* Look 1 */}
        <div className="bg-[#1a1a1a] px-8 py-8">
          <div className="aspect-[4/5] bg-zinc-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
            <div className="w-40 h-48 bg-zinc-700 rounded"></div>
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white mb-1">{emailData.look1Title}</h3>
              <p className="text-zinc-400 text-sm">{emailData.look1Desc}</p>
            </div>
            <span className="text-[#D4AF37] text-sm">01</span>
          </div>
          <div className="flex gap-2">
            {['Kaftan', 'Bag', 'Shoes'].map((item, i) => (
              <div key={i} className="flex-1 bg-zinc-900 rounded p-2 border border-zinc-800">
                <div className="aspect-square bg-zinc-800 rounded mb-2 flex items-center justify-center">
                  <div className="w-12 h-12 bg-zinc-700 rounded"></div>
                </div>
                <p className="text-zinc-400 text-xs text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-zinc-800"></div>

        {/* Look 2 */}
        <div className="bg-[#1a1a1a] px-8 py-8">
          <div className="aspect-[4/5] bg-zinc-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
            <div className="w-40 h-48 bg-zinc-700 rounded"></div>
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white mb-1">{emailData.look2Title}</h3>
              <p className="text-zinc-400 text-sm">{emailData.look2Desc}</p>
            </div>
            <span className="text-[#D4AF37] text-sm">02</span>
          </div>
          <div className="flex gap-2">
            {['Kaftan', 'Jewelry', 'Heels'].map((item, i) => (
              <div key={i} className="flex-1 bg-zinc-900 rounded p-2 border border-zinc-800">
                <div className="aspect-square bg-zinc-800 rounded mb-2 flex items-center justify-center">
                  <div className="w-12 h-12 bg-zinc-700 rounded"></div>
                </div>
                <p className="text-zinc-400 text-xs text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-zinc-800"></div>

        {/* Look 3 */}
        <div className="bg-[#1a1a1a] px-8 py-8">
          <div className="aspect-[4/5] bg-zinc-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
            <div className="w-40 h-48 bg-zinc-700 rounded"></div>
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white mb-1">{emailData.look3Title}</h3>
              <p className="text-zinc-400 text-sm">{emailData.look3Desc}</p>
            </div>
            <span className="text-[#D4AF37] text-sm">03</span>
          </div>
          <div className="flex gap-2">
            {['Kaftan', 'Hat', 'Sandals'].map((item, i) => (
              <div key={i} className="flex-1 bg-zinc-900 rounded p-2 border border-zinc-800">
                <div className="aspect-square bg-zinc-800 rounded mb-2 flex items-center justify-center">
                  <div className="w-12 h-12 bg-zinc-700 rounded"></div>
                </div>
                <p className="text-zinc-400 text-xs text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-8">
          <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-12 py-6 w-full text-lg">
            {emailData.ctaText}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 px-8 py-4 text-center border-y border-zinc-700">
          <p className="text-zinc-400 text-sm">💡 Styling Tip: Mix and match to create your unique look</p>
        </div>

        <div className="bg-[#0a0a0a] px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
          <p className="text-zinc-600 text-xs">Follow us for more style inspiration</p>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Input } from '../../../../email-service/src/components/ui/input';
import { Textarea } from '../../../../email-service/src/components/ui/textarea';
import { Button } from '../../../../email-service/src/components/ui/button';
import { Card } from '../../../../email-service/src/components/ui/card';
import { Sparkles } from 'lucide-react';

export function NewCollectionEmail() {
  const [emailData, setEmailData] = useState({
    brandName: 'Chuvel Threads',
    subject: 'NEW ARRIVAL: Spring Capsule Collection',
    badge: 'NEW COLLECTION',
    heading: 'Spring Capsule 2025',
    subheading: 'Timeless Elegance Meets Modern Design',
    description: 'Discover our latest collection featuring hand-crafted pieces that blend traditional artistry with contemporary style. Each piece tells a story of craftsmanship and elegance.',
    ctaText: 'Explore Collection',
    collectionItem1: 'Premium Kaftan',
    collectionItem2: 'Designer Dress',
    collectionItem3: 'Signature Collection'
  });

  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <Card className="p-6 bg-zinc-800 border-zinc-700">
        <h2 className="text-[#D4AF37] mb-4">Edit New Collection Email</h2>
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
            <label className="text-zinc-400 text-sm">Badge Text</label>
            <Input
              value={emailData.badge}
              onChange={(e) => handleChange('badge', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Collection Name</label>
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
            <label className="text-zinc-400 text-sm">Collection Description</label>
            <Textarea
              value={emailData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Email Preview */}
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-[#1a1a1a] text-white px-8 py-6 text-center">
          <h1 className="text-[#D4AF37] tracking-wider">{emailData.brandName}</h1>
        </div>

        <div className="relative">
          <div className="aspect-[16/10] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="text-center z-10 px-8">
              <div className="inline-block bg-[#D4AF37] text-black px-4 py-1 text-xs tracking-wider mb-4 rounded">
                {emailData.badge}
              </div>
              <h2 className="text-white text-4xl mb-3">{emailData.heading}</h2>
              <p className="text-[#D4AF37] text-lg">{emailData.subheading}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] px-8 py-10">
          <p className="text-zinc-300 text-center max-w-lg mx-auto mb-8">{emailData.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] bg-zinc-800 rounded-lg mb-2 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-zinc-700 rounded"></div>
                </div>
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors"></div>
              </div>
              <p className="text-zinc-300 text-sm text-center">{emailData.collectionItem1}</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] bg-zinc-800 rounded-lg mb-2 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-zinc-700 rounded"></div>
                </div>
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors"></div>
              </div>
              <p className="text-zinc-300 text-sm text-center">{emailData.collectionItem2}</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] bg-zinc-800 rounded-lg mb-2 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-zinc-700 rounded"></div>
                </div>
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors"></div>
              </div>
              <p className="text-zinc-300 text-sm text-center">{emailData.collectionItem3}</p>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-12 py-6 text-lg">
              {emailData.ctaText}
            </Button>
            <p className="text-zinc-500 text-sm mt-4">Limited pieces available</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#D4AF37] to-[#c9a332] px-8 py-4 text-center">
          <p className="text-black">✨ Free Shipping on All Collection Items</p>
        </div>

        <div className="bg-[#0a0a0a] px-8 py-6 text-center">
          <p className="text-zinc-500 text-sm mb-2">© 2025 {emailData.brandName}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
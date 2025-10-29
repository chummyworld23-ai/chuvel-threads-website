import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { WelcomeEmail } from './emails/WelcomeEmail';
import { AbandonedCartEmail } from './components/AbandonedCartEmail';
import { PostPurchaseEmail } from './components/PostPurchaseEmail';
import { BirthdayEmail } from './components/BirthdayEmail';
import { NewCollectionEmail } from './components/NewCollectionEmail';
import { FlashSaleEmail } from './components/FlashSaleEmail';
import { BFCMEmail } from './components/BFCMEmail';
import { StyleGuideEmail } from './components/StyleGuideEmail';

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[#D4AF37] mb-2">Fashion Email Templates</h1>
          <p className="text-zinc-400">Professional email designs for your fashion brand - Easy to customize and send</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-zinc-800 mb-8">
            <TabsTrigger value="welcome" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Welcome
            </TabsTrigger>
            <TabsTrigger value="cart" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Abandoned Cart
            </TabsTrigger>
            <TabsTrigger value="review" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Post-Purchase
            </TabsTrigger>
            <TabsTrigger value="birthday" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Birthday
            </TabsTrigger>
            <TabsTrigger value="collection" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              New Collection
            </TabsTrigger>
            <TabsTrigger value="flash" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Flash Sale
            </TabsTrigger>
            <TabsTrigger value="bfcm" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              BFCM
            </TabsTrigger>
            <TabsTrigger value="style" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Style Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="welcome">
            <WelcomeEmail />
          </TabsContent>

          <TabsContent value="cart">
            <AbandonedCartEmail />
          </TabsContent>

          <TabsContent value="review">
            <PostPurchaseEmail />
          </TabsContent>

          <TabsContent value="birthday">
            <BirthdayEmail />
          </TabsContent>

          <TabsContent value="collection">
            <NewCollectionEmail />
          </TabsContent>

          <TabsContent value="flash">
            <FlashSaleEmail />
          </TabsContent>

          <TabsContent value="bfcm">
            <BFCMEmail />
          </TabsContent>

          <TabsContent value="style">
            <StyleGuideEmail />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
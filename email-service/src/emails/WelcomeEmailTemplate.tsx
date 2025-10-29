// src/emails/WelcomeEmailTemplate.tsx
import '../styles/global.css';
import '../styles/index.css';

type WelcomeEmailProps = {
  brandName: string;
  heading: string;
  subheading: string;
  message: string;
  discountCode: string;
  discountAmount: string;
  ctaText: string;
  bestseller1: string;
  bestseller2: string;
  bestseller3: string;
};

export const WelcomeEmailTemplate = ({
  brandName,
  heading,
  subheading,
  message,
  discountCode,
  discountAmount,
  ctaText,
  bestseller1,
  bestseller2,
  bestseller3,
}: WelcomeEmailProps) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-2xl font-sans">
    {/* Header */}
    <div className="bg-[#1a1a1a] text-white px-8 py-6 text-center">
      <h1 className="text-[#D4AF37] tracking-wider">{brandName}</h1>
    </div>

    {/* Body */}
    <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white px-8 py-12 text-center">
      <h2 className="text-[#D4AF37] mb-2">{heading}</h2>
      <p className="text-zinc-300 mb-6">{subheading}</p>
      <p className="text-zinc-400 max-w-md mx-auto mb-8">{message}</p>

      <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37] rounded-lg p-6 max-w-sm mx-auto mb-8">
        <p className="text-zinc-300 mb-2">Your Exclusive Welcome Offer</p>
        <div className="text-[#D4AF37] mb-2">{discountAmount}</div>
        <div className="bg-[#1a1a1a] px-4 py-2 rounded inline-block">
          <code className="text-[#D4AF37]">{discountCode}</code>
        </div>
      </div>

      <a
        href="https://chuvelthreads.com"
        className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-8 py-3 rounded font-medium inline-block"
      >
        {ctaText}
      </a>
    </div>

    {/* Bestsellers */}
    <div className="bg-[#1a1a1a] px-8 py-12">
      <h3 className="text-[#D4AF37] text-center mb-8">
        Discover Our Bestsellers
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-zinc-800 aspect-square rounded-lg mb-3 flex items-center justify-center">
            <div className="w-24 h-24 bg-zinc-700 rounded"></div>
          </div>
          <p className="text-zinc-300 text-sm">{bestseller1}</p>
        </div>
        <div className="text-center">
          <div className="bg-zinc-800 aspect-square rounded-lg mb-3 flex items-center justify-center">
            <div className="w-24 h-24 bg-zinc-700 rounded"></div>
          </div>
          <p className="text-zinc-300 text-sm">{bestseller2}</p>
        </div>
        <div className="text-center">
          <div className="bg-zinc-800 aspect-square rounded-lg mb-3 flex items-center justify-center">
            <div className="w-24 h-24 bg-zinc-700 rounded"></div>
          </div>
          <p className="text-zinc-300 text-sm">{bestseller3}</p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="bg-[#0a0a0a] px-8 py-6 text-center">
      <p className="text-zinc-500 text-sm mb-2">
        © 2025 {brandName}. All rights reserved.
      </p>
      <p className="text-zinc-600 text-xs">
        You're receiving this because you signed up for our newsletter.
      </p>
    </div>
  </div>
);

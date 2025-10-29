// email-service/src/emails/WelcomeEmailTemplate.jsx
import './styles/global.css';
import './styles/index.css';

export const WelcomeEmailTemplate = ({ brandName, heading, subheading, message, discountCode, discountAmount, ctaText, bestseller1, bestseller2, bestseller3 }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
    <div className="bg-[#1a1a1a] text-white px-8 py-6 text-center">
      <h1 className="text-[#D4AF37] tracking-wider">{brandName}</h1>
    </div>

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

      <a href="https://chuvelthreads.com" className="bg-[#D4AF37] text-black hover:bg-[#c9a332] px-8 py-3 rounded font-medium">
        {ctaText}
      </a>
    </div>

    <div className="bg-[#0a0a0a] px-8 py-6 text-center">
      <p className="text-zinc-500 text-sm mb-2">© 2025 {brandName}. All rights reserved.</p>
      <p className="text-zinc-600 text-xs">You're receiving this because you signed up for our newsletter.</p>
    </div>
  </div>
);

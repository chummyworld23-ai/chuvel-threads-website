import { useState } from 'react';

export const WelcomeEmail = ({ name }) => (
  <html>
    <head>
      <style>{`
        body {
          background: #f9fafb;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          color: #111827;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .header {
          background: linear-gradient(135deg, #1f2937, #4b5563);
          color: white;
          padding: 30px 20px;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
        }
        .content {
          padding: 40px 30px;
          text-align: left;
        }
        .cta-button {
          display: inline-block;
          background: #000;
          color: #fff;
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 8px;
          font-weight: 600;
          margin-top: 24px;
        }
        .footer {
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">Welcome to Chuvel Threads 👕</div>
        <div className="content">
          <p>Hi <strong>{name}</strong>,</p>
          <p>
            We’re thrilled to have you as part of <strong>Chuvel Threads</strong> — 
            your new home for premium men’s fashion and timeless style.
          </p>
          <p>Start exploring the latest designs curated just for you.</p>
          <a href="https://chuvelthreads.store" className="cta-button">
            Visit the Store
          </a>
        </div>
        <div className="footer">
          © {new Date().getFullYear()} Chuvel Threads. All rights reserved.<br />
          <a href="https://chuvelthreads.store" style={{ color: '#6b7280' }}>chuvelthreads.store</a>
        </div>
      </div>
    </body>
  </html>
);

// supabase/functions/send-welcome-email/index.ts
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";

// --- Configuration & Dynamic Variables ---
// ⚠️ 1. CHANGE THESE VALUES TO YOUR ACTUAL URLS AND SENDER EMAIL ⚠️
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY'); 
const SENDER_EMAIL = 'hello@yourverifieddomain.com'; // Your verified sender email
// I've moved the actual website URL definition to the variable below:
const HOMEPAGE_URL = 'https://chuvel-threads-website.vercel.app'; // <--- CORRECTED URL HERE
const KAFTAN_URL = `${HOMEPAGE_URL}/kaftan`;
const DESIGNER_URL = `${HOMEPAGE_URL}/designer`;
const SIGNATURE_URL = `${HOMEPAGE_URL}/signature`;


// --- 2. THE FULL HTML TEMPLATE ---
// The HTML below includes your updated social links!
const WELCOME_HTML_TEMPLATE = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chuvel Threads</title>
</head>
<body style="margin: 0; padding: 0; background-color: #121212; font-family: sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
            <td align="center" style="padding: 20px 0 30px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #1a1a1a; border-radius: 8px; color: #f0f0f0;">
                    
                    <tr>
                        <td align="center" style="padding: 40px 0 20px 0;">
                            <img src="YOUR_BRAND_ICON_URL" alt="Star Icon" width="40" height="40" style="display: block; margin: 0 auto 10px;">
                            <h1 style="color: #f0f0f0; margin: 0; font-size: 28px;">Chuvel Threads</h1>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 20px 40px;">
                            <h2 style="color: #FFD700; margin: 0; font-size: 20px;">Welcome, {{user_first_name}}!</h2> 
                            <p style="color: #c0c0c0; font-size: 16px; line-height: 1.5;">Discover Premium Styles That Define You</p>

                            <p style="color: #f0f0f0; font-size: 15px; line-height: 1.6; margin-top: 20px;">
                                Thank you for joining us. We're excited to have you on this journey crafting timeless senator wears & urban styles. From luxury Agbadas to modern streetwear.
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="padding: 20px 40px 10px 40px;">
                            <div style="background-color: #333333; padding: 25px; border-radius: 6px;">
                                <h3 style="color: #FFD700; margin: 0 0 5px 0; font-size: 18px;">Your Exclusive Welcome Gift</h3>
                                <p style="color: #c0c0c0; margin: 0 0 10px 0;">Enjoy complimentary styling consultation on your first purchase.</p>
                                <p style="color: #aaaaaa; font-size: 12px; margin: 0;">*T&C Applies: Available only for orders over NGN 50,000.*</p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 20px 40px 30px 40px;">
                            <a href="{{homepage_url}}" target="_blank" style="display: inline-block; padding: 12px 25px; background-color: #FFD700; color: #1a1a1a; text-decoration: none; border-radius: 4px; font-weight: bold;">
                                Start Shopping
                            </a>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="padding: 10px 40px 30px 40px;">
                            <h3 style="color: #f0f0f0; margin: 20px 0 25px 0;">Discover Our Bestsellers</h3>
                            
                            <table border="0" cellpadding="0" cellspacing="10" width="100%">
                                <tr>
                                    <td align="center" width="33%">
                                        <a href="{{kaftan_link}}" target="_blank" style="text-decoration: none; color: #f0f0f0;">
                                            <div style="width: 100%; height: 120px; background-color: #333333; border-radius: 4px; margin-bottom: 8px;"></div>
                                            <p style="margin: 0; font-size: 14px;">Premium Kaftan Wear</p>
                                        </a>
                                    </td>
                                    <td align="center" width="33%">
                                        <a href="{{designer_link}}" target="_blank" style="text-decoration: none; color: #f0f0f0;">
                                            <div style="width: 100%; height: 120px; background-color: #333333; border-radius: 4px; margin-bottom: 8px;"></div>
                                            <p style="margin: 0; font-size: 14px;">Designer Collection</p>
                                        </a>
                                    </td>
                                    <td align="center" width="33%">
                                        <a href="{{signature_link}}" target="_blank" style="text-decoration: none; color: #f0f0f0;">
                                            <div style="width: 100%; height: 120px; background-color: #333333; border-radius: 4px; margin-bottom: 8px;"></div>
                                            <p style="margin: 0; font-size: 14px;">Signature Styles</p>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="padding: 20px 40px 40px 40px; border-top: 1px solid #333333;">
                            <h4 style="color: #f0f0f0; margin: 0 0 15px 0;">Follow Us</h4>
                            <table border="0" cellpadding="0" cellspacing="15">
                                <tr>
                                    <td><a href="https://www.tiktok.com/@chuvel_threads?_t=ZN-90sjG7pUsxK&_r=1" target="_blank"><img src="https://example-cdn.com/tiktok-icon-dark.png" alt="TikTok" width="24" height="24" style="display: block;"></a></td>
                                    <td><a href="https://www.instagram.com/chuvel_threads" target="_blank"><img src="https://example-cdn.com/instagram-icon-dark.png" alt="Instagram" width="24" height="24" style="display: block;"></a></td>
                                    <td><a href="https://web.facebook.com/profile.php?id=61581968367375" target="_blank"><img src="https://example-cdn.com/facebook-icon-dark.png" alt="Facebook" width="24" height="24" style="display: block;"></a></td>
                                    <td><a href="YOUR_YOUTUBE_URL" target="_blank"><img src="YOUR_YOUTUBE_ICON_URL" alt="YouTube" width="24" height="24" style="display: block;"></a></td>
                                </tr>
                            </table>
                            
                            <p style="color: #888888; font-size: 12px; margin-top: 20px;">
                                &copy; 2025 Chuvel Threads. All rights reserved.<br>
                                You're receiving this because you signed up for our newsletter.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
// --- END OF HTML TEMPLATE ---


serve(async (req) => {
    if (!RESEND_API_KEY) {
        return new Response('Missing RESEND_API_KEY secret. Deployment issue.', { status: 500 });
    }
    
    try {
        // 1. Get User Data from the Supabase Auth Hook payload
        const data = await req.json();
        const user = data.record; 

        const userEmail = user.email;
        const userName = user.user_metadata?.first_name || 'Valued Customer'; 

        // 2. Customize the HTML Template (Replace ALL dynamic placeholders)
        let finalHtml = WELCOME_HTML_TEMPLATE.replace('{{user_first_name}}', userName);
        
        // 🛠️ CORRECTED: Using the HOMEPAGE_URL variable
        finalHtml = finalHtml.replace(/{{homepage_url}}/g, HOMEPAGE_URL); 
        finalHtml = finalHtml.replace(/{{kaftan_link}}/g, KAFTAN_URL);
        finalHtml = finalHtml.replace(/{{designer_link}}/g, DESIGNER_URL);
        finalHtml = finalHtml.replace(/{{signature_link}}/g, SIGNATURE_URL);
        
        // 3. Send Email via Resend API (or Postmark/Sendgrid)
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: `Chuvel Threads <${SENDER_EMAIL}>`,
                to: [userEmail],
                subject: 'Welcome to Chuvel - Your Style Journey Begins',
                html: finalHtml,
            }),
        });

        if (resendResponse.ok) {
            return new Response('Welcome email sent successfully!', { status: 200 });
        } else {
            console.error('Email send failed:', await resendResponse.text());
            return new Response('Failed to send email.', { status: 500 });
        }

    } catch (error) {
        console.error('Edge Function Error:', error);
        return new Response(`Error: ${error.message}`, { status: 500 });
    }
});
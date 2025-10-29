// supabase/functions/send-welcome-email/index.ts
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";

// --- Configuration & Dynamic Variables ---
// ⚠️ 1. CHANGE THESE VALUES TO YOUR ACTUAL URLS AND SENDER EMAIL ⚠️
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY'); 
const SENDER_EMAIL = 'hello@yourverifieddomain.com'; // Your verified sender email
const HOMEPAGE_URL = 'https://yourbrand.vercel.app'; // Your main website URL
const KAFTAN_URL = `${HOMEPAGE_URL}/kaftan`;
const DESIGNER_URL = `${HOMEPAGE_URL}/designer`;
const SIGNATURE_URL = `${HOMEPAGE_URL}/signature`;


// --- ⚠️ 2. PASTE YOUR FULL HTML TEMPLATE HERE ⚠️ ---
// Replace all content between the backticks (`) with the full HTML code from Section 1.
const WELCOME_HTML_TEMPLATE = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Chuvel Threads</title>
    </head>
    <body style="/* Your body styles */">
        </body>
    </html>
`;
// --- END OF HTML TEMPLATE ---


serve(async (req) => {
    if (!RESEND_API_KEY) {
        return new Response('Missing RESEND_API_KEY secret.', { status: 500 });
    }
    
    try {
        // 1. Get User Data from the Supabase Auth Hook payload
        const data = await req.json();
        const user = data.record; 

        const userEmail = user.email;
        // Assuming user_metadata might store a name, otherwise use a generic greeting
        const userName = user.user_metadata?.first_name || 'Valued Customer'; 

        // 2. Customize the HTML Template (Replace ALL dynamic placeholders)
        let finalHtml = WELCOME_HTML_TEMPLATE.replace('{{user_first_name}}', userName);
        
        // Replace Link URLs
        finalHtml = finalHtml.replace('{{homepage_url}}', HOMEPAGE_URL);
        finalHtml = finalHtml.replace('{{kaftan_link}}', KAFTAN_URL);
        finalHtml = finalHtml.replace('{{designer_link}}', DESIGNER_URL);
        finalHtml = finalHtml.replace('{{signature_link}}', SIGNATURE_URL);
        
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
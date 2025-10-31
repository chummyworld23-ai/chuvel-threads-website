import { Resend } from 'resend';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { WelcomeEmail } from '../../../email-service/emails/WelcomeEmail.jsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  try {
    const { record } = await req.json();

    // record contains the new user's data
    const email = record.email;
    const name = record.raw_user_meta_data?.name || 'there';

    await resend.emails.send({
      from: 'Chuvel Threads <onboarding@resend.dev>', // ✅ use resend.dev sender until domain is verified
      to: email,
      subject: `Welcome to Chuvel Threads, ${name}!`,
      react: <WelcomeEmail name={name} />,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

import { Resend } from 'resend';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { WelcomeEmail } from '../../../email-service/emails/WelcomeEmail.tsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  try {
    const { email, name } = await req.json();

    if (!email) return new Response('Missing email', { status: 400 });

    await resend.emails.send({
      from: 'Chuvel Threads <hello@chuvelthreads.store>',
      to: email,
      subject: `Welcome to Chuvel Threads, ${name || 'Fashion Lover'}!`,
      react: <WelcomeEmail name={name || 'Fashion Lover'} />,
    });

    return new Response('✅ Email sent', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('❌ Failed to send', { status: 500 });
  }
});

import { Resend } from 'resend';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { WelcomeEmail } from '../../../email-service/emails/WelcomeEmail.jsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  const { type, user } = await req.json();

  try {
    if (type === 'welcome') {
      await resend.emails.send({
        from: 'Chuvel Threads <hello@Chuvel Threads.com>',
        to: user.email,
        subject: `Welcome to Chuvel Threads, ${user.name}!`,
        react: <WelcomeEmail name={user.name} />,
      });
    }

    return new Response('✅ Email sent', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('❌ Error sending email', { status: 500 });
  }
});

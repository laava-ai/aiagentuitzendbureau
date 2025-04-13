import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, newsletter } = body;

    // Check if this is a newsletter subscription
    if (newsletter) {
      if (!email) {
        return NextResponse.json(
          { error: 'Email is verplicht voor nieuwsbrief aanmelding' },
          { status: 400 }
        );
      }

      // Send confirmation email to subscriber
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welkom bij de Laava Nieuwsbrief',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #6366f1;">Laava Nieuwsbrief</h1>
            </div>
            <p>Beste ${email},</p>
            <p>Bedankt voor uw aanmelding bij de Laava nieuwsbrief!</p>
            <p>U zult voortaan regelmatig updates ontvangen over de nieuwste ontwikkelingen op het gebied van AI, handige tips en exclusieve aanbiedingen.</p>
            <p>Mocht u vragen hebben, aarzel dan niet om contact met ons op te nemen.</p>
            <p>Met vriendelijke groet,</p>
            <p>Het Laava Team</p>
          </div>
        `,
      });

      // Save to database or external service (placeholder)
      console.log('Newsletter subscription:', { email });

      return NextResponse.json(
        { 
          success: true,
          message: 'Bedankt voor uw aanmelding bij onze nieuwsbrief!' 
        },
        { status: 200 }
      );
    }

    // For regular contact form
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Naam, email en bericht zijn verplicht' },
        { status: 400 }
      );
    }

    // Send email notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `Nieuw contactformulier bericht van ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #6366f1;">Nieuw Contact Formulier Bericht</h1>
          </div>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
          <div style="margin-top: 20px;">
            <p><strong>Bericht:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bedankt voor uw bericht aan Laava',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #6366f1;">Laava</h1>
          </div>
          <p>Beste ${name},</p>
          <p>Bedankt voor uw bericht. We hebben uw aanvraag ontvangen en zullen zo snel mogelijk contact met u opnemen.</p>
          <p>Voor uw administratie, hier is een kopie van uw bericht:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <p>Met vriendelijke groet,</p>
          <p>Het Laava Team</p>
        </div>
      `,
    });

    console.log('Contact form submission:', { name, email, company, message });

    return NextResponse.json(
      { 
        success: true,
        message: 'Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Er is een fout opgetreden bij het verwerken van uw verzoek. Probeer het later opnieuw.' 
      },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Naam, email en bericht zijn verplicht' },
        { status: 400 }
      );
    }

    // Here you would typically send an email or store the contact in a database
    // This is a placeholder for that logic
    console.log('Contact form submission:', { name, email, company, message });

    // For demo purposes, simulate a successful submission
    return NextResponse.json(
      { 
        success: true,
        message: 'Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Er is een fout opgetreden bij het verwerken van uw verzoek. Probeer het later opnieuw.' 
      },
      { status: 500 }
    );
  }
} 
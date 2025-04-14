import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get title from query params
    const title = searchParams.get('title') || 'Laava | AI Agents & Digitale Collega\'s';
    
    // Get optional subtitle
    const subtitle = searchParams.get('subtitle') || 'Intelligente AI-assistenten voor uw organisatie';
    
    // Determine if this is a blog post
    const isBlog = searchParams.get('type') === 'blog';
    
    // Get optional image path
    const imagePath = searchParams.get('image') || null;
    
    // Prepare fonts
    let fonts = [];
    
    try {
      // Font regular
      const interData = await fetch(
        new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap', req.url)
      ).then((res) => res.text());
      
      // Extract font URLs
      const fontRegularUrl = interData.match(
        /src: url\((.+?)\) format\('(opentype|truetype)'\)/
      )?.[1];
      
      const fontBoldUrl = interData.match(
        /src: url\((.+?)\) format\('(opentype|truetype)'\)/g
      )?.[1]?.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
      
      if (fontRegularUrl) {
        const fontRegularData = await fetch(fontRegularUrl).then((res) => res.arrayBuffer());
        fonts.push({
          name: 'Inter',
          data: fontRegularData,
          weight: 400,
          style: 'normal',
        });
      }
      
      if (fontBoldUrl) {
        const fontBoldData = await fetch(fontBoldUrl).then((res) => res.arrayBuffer());
        fonts.push({
          name: 'Inter',
          data: fontBoldData,
          weight: 700,
          style: 'normal',
        });
      }
    } catch (error) {
      console.error('Error loading fonts:', error);
      // Continue without custom fonts if there's an error
    }
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F172A',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #475569 2px, transparent 0), radial-gradient(circle at 75px 75px, #475569 2px, transparent 0)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 80px',
              textAlign: 'center',
              backgroundImage: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
              borderRadius: '24px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: '90%',
              maxWidth: '1000px',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  height: '60px',
                  width: '60px',
                  background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                  borderRadius: '50%',
                  marginRight: '20px',
                }}
              />
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Laava
              </span>
            </div>
            
            {/* Title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                  background: 'linear-gradient(to right, #c4b5fd, #818cf8)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  maxWidth: '900px',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: '32px',
                  color: '#CBD5E1',
                  marginBottom: '40px',
                  maxWidth: '800px',
                }}
              >
                {subtitle}
              </p>
            </div>
            
            {/* Blog indicator */}
            {isBlog && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 24px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  color: '#c4b5fd',
                  fontSize: '24px',
                  marginTop: '10px',
                }}
              >
                AI Agents Blog
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              fontSize: '24px',
            }}
          >
            <span style={{ opacity: 0.7 }}>laava.nl</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
} 
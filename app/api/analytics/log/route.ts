import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Add server timestamp
    const data = {
      ...body,
      server_timestamp: new Date().toISOString(),
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    };
    
    // Log the complete data to console for immediate debugging
    console.log('Analytics event logged:', JSON.stringify(data, null, 2));
    
    // Store the data in a JSON file for persistence
    // NOTE: In a production environment, you would use a database instead
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      
      // Create logs directory if it doesn't exist
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      
      // Create a filename based on the date
      const date = new Date();
      const filename = `analytics-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.json`;
      const filePath = path.join(logsDir, filename);
      
      // Append to the file
      let fileData = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        fileData = JSON.parse(fileContent);
      }
      
      fileData.push(data);
      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    } catch (fileError) {
      console.error('Error saving analytics to file:', fileError);
    }
    
    // You might want to send this to a third-party analytics service or database as well
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing analytics:', error);
    return NextResponse.json({ error: 'Failed to process analytics data' }, { status: 500 });
  }
} 
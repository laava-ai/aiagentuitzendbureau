import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { connectToDatabase } from '@/lib/db';
import Visitor, { IVisitor } from '@/lib/models/visitor';

// Interface for IP-API response
interface IpApiResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string; // This is often the company/organization
  as: string;
  query: string; // The IP address
}

// Process POST requests to track visitors
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get visitor data from request
    const data = await request.json();
    const { ip, page, userAgent, referrer } = data;
    
    if (!ip) {
      return NextResponse.json(
        { error: 'IP address is required' },
        { status: 400 }
      );
    }
    
    // Get additional IP information from ip-api.com
    // Note: Free tier is limited to 45 requests per minute
    const ipApiUrl = `http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
    const ipInfo = await axios.get<IpApiResponse>(ipApiUrl);
    
    if (ipInfo.data.status !== 'success') {
      return NextResponse.json(
        { error: 'Could not retrieve IP information' },
        { status: 500 }
      );
    }
    
    // Check if visitor exists
    const existingVisitor = await Visitor.findOne({ ip });
    
    if (existingVisitor) {
      // Update existing visitor
      existingVisitor.lastVisited = new Date();
      existingVisitor.visitCount += 1;
      
      // Add new page if not already tracked
      if (page && !existingVisitor.pages.includes(page)) {
        existingVisitor.pages.push(page);
      }
      
      // Update visitor info in case it has changed
      existingVisitor.company = ipInfo.data.org || 'Unknown';
      existingVisitor.city = ipInfo.data.city;
      existingVisitor.country = ipInfo.data.country;
      existingVisitor.isp = ipInfo.data.isp;
      existingVisitor.region = ipInfo.data.regionName;
      existingVisitor.timezone = ipInfo.data.timezone;
      
      // Update user agent and referrer if provided
      if (userAgent) existingVisitor.userAgent = userAgent;
      if (referrer) existingVisitor.referrer = referrer;
      
      await existingVisitor.save();
      
      return NextResponse.json({ success: true, visitor: existingVisitor });
    } else {
      // Create new visitor
      const newVisitor = new Visitor({
        ip,
        company: ipInfo.data.org || 'Unknown',
        city: ipInfo.data.city,
        country: ipInfo.data.country,
        isp: ipInfo.data.isp,
        region: ipInfo.data.regionName,
        timezone: ipInfo.data.timezone,
        pages: page ? [page] : [],
        userAgent,
        referrer,
      });
      
      await newVisitor.save();
      
      return NextResponse.json({ success: true, visitor: newVisitor });
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
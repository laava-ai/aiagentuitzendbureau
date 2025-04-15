import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Visitor from '@/lib/models/visitor';
// Remove next-auth import since we're not using it yet
// import { getServerSession } from 'next-auth';

// Apply basic auth for security (you can replace with NextAuth.js if you have it)
const checkAuth = async (req: NextRequest) => {
  // Option 1: Check for NextAuth session
  try {
    // Uncomment if you're using NextAuth
    // const session = await getServerSession();
    // return !!session;
  } catch (error) {
    // Continue with alternative auth if NextAuth isn't configured
  }
  
  // Option 2: Basic auth header check
  // The expected format is "Basic base64(username:password)"
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }
  
  // Decode auth header
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  // Check credentials against environment variables
  const validUsername = process.env.DASHBOARD_USERNAME || 'admin';
  const validPassword = process.env.DASHBOARD_PASSWORD || 'password';
  
  return username === validUsername && password === validPassword;
};

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const isAuthorized = await checkAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { 
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Visitor Dashboard", charset="UTF-8"'
          }
        }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;
    
    // Get sorting parameters
    const sortField = searchParams.get('sort') || 'lastVisited';
    const sortOrder = searchParams.get('order') === 'asc' ? 1 : -1;
    
    // Fix the sort options type
    const sortOptions: { [key: string]: 1 | -1 } = { 
      [sortField]: sortOrder 
    };
    
    // Search filters
    const company = searchParams.get('company');
    const country = searchParams.get('country');
    const ip = searchParams.get('ip');
    const dateFrom = searchParams.get('from');
    const dateTo = searchParams.get('to');
    
    // Build query
    const query: Record<string, any> = {};
    
    if (company) query.company = { $regex: company, $options: 'i' };
    if (country) query.country = { $regex: country, $options: 'i' };
    if (ip) query.ip = { $regex: ip, $options: 'i' };
    
    // Date range filter
    if (dateFrom || dateTo) {
      query.lastVisited = {};
      if (dateFrom) query.lastVisited.$gte = new Date(dateFrom);
      if (dateTo) query.lastVisited.$lte = new Date(dateTo);
    }
    
    // Get data with pagination
    const totalVisitors = await Visitor.countDocuments(query);
    const visitors = await Visitor.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalVisitors / limit);
    
    return NextResponse.json({
      success: true,
      data: visitors,
      pagination: {
        page,
        limit,
        totalItems: totalVisitors,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Visitor from '@/lib/models/visitor';
import { startOfDay, subDays, startOfMonth, subMonths, format } from 'date-fns';

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
    
    // Get date parameters
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30days'; // Default to last 30 days
    
    // Calculate date range based on period
    let startDate;
    const now = new Date();
    
    switch (period) {
      case '7days':
        startDate = subDays(startOfDay(now), 6); // Last 7 days
        break;
      case '30days':
        startDate = subDays(startOfDay(now), 29); // Last 30 days
        break;
      case '90days':
        startDate = subDays(startOfDay(now), 89); // Last 90 days
        break;
      case '6months':
        startDate = subMonths(startOfDay(now), 6); // Last 6 months
        break;
      case '12months':
        startDate = subMonths(startOfDay(now), 12); // Last 12 months
        break;
      default:
        startDate = subDays(startOfDay(now), 29); // Default to last 30 days
    }
    
    // Build base query for date range
    const baseQuery = {
      lastVisited: { $gte: startDate }
    };
    
    // 1. Total unique visitors and total visits
    const totalUniqueVisitors = await Visitor.countDocuments(baseQuery);
    const totalVisitsAgg = await Visitor.aggregate([
      { $match: baseQuery },
      { $group: { _id: null, totalVisits: { $sum: "$visitCount" } } }
    ]);
    const totalVisits = totalVisitsAgg.length > 0 ? totalVisitsAgg[0].totalVisits : 0;
    
    // 2. Top countries
    const topCountries = await Visitor.aggregate([
      { $match: baseQuery },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // 3. Top companies
    const topCompanies = await Visitor.aggregate([
      { $match: baseQuery },
      { $match: { company: { $ne: "Unknown" } } },
      { $group: { _id: "$company", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // 4. Top pages
    const topPages = await Visitor.aggregate([
      { $match: baseQuery },
      { $unwind: "$pages" },
      { $group: { _id: "$pages", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // 5. Visitors over time (daily)
    const visitorsOverTime = await Visitor.aggregate([
      { $match: baseQuery },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$lastVisited" }
          },
          visitors: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    
    // 6. Average visits per visitor
    const avgVisitsPerVisitor = totalVisits / totalUniqueVisitors || 0;
    
    // 7. New vs returning visitors
    // For simplicity, we'll consider first visit = last visit as new visitors
    const newVisitorsCount = await Visitor.countDocuments({
      ...baseQuery,
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$firstVisited" } },
          { $dateToString: { format: "%Y-%m-%d", date: "$lastVisited" } }
        ]
      }
    });
    
    const returningVisitorsCount = totalUniqueVisitors - newVisitorsCount;
    
    return NextResponse.json({
      success: true,
      data: {
        totalUniqueVisitors,
        totalVisits,
        avgVisitsPerVisitor,
        newVsReturning: {
          new: newVisitorsCount,
          returning: returningVisitorsCount
        },
        topCountries,
        topCompanies,
        topPages,
        visitorsOverTime
      },
      period
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
'use client';

import React, { Suspense } from 'react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { format } from 'date-fns';
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

// Types
interface Visitor {
  _id: string;
  ip: string;
  company: string;
  city: string;
  country: string;
  pages: string[];
  lastVisited: string;
  firstVisited: string;
  visitCount: number;
  isp: string;
  region: string;
  timezone: string;
  userAgent?: string;
  referrer?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

// Authentication protection wrapper
function AuthProtection({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated (via localStorage)
  useEffect(() => {
    const storedAuth = localStorage.getItem('dashboard_auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        const expiryTime = authData.expires;
        
        // Check if the authentication is still valid
        if (expiryTime && new Date().getTime() < expiryTime) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('dashboard_auth');
        }
      } catch (e) {
        localStorage.removeItem('dashboard_auth');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Create Basic Auth header
      const username = process.env.NEXT_PUBLIC_DASHBOARD_USERNAME || 'admin';
      const credentials = `${username}:${password}`;
      const encodedCredentials = btoa(credentials);
      
      // Try to fetch data with these credentials
      const response = await axios.get('/api/visitors', {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
        // Limit to just 1 record to minimize data transfer for auth check
        params: { limit: 1 }
      });
      
      // If we get here, authentication was successful
      setIsAuthenticated(true);
      
      // Store auth in localStorage (expires in 2 hours)
      const expiryTime = new Date().getTime() + (2 * 60 * 60 * 1000);
      localStorage.setItem('dashboard_auth', JSON.stringify({
        expires: expiryTime
      }));
      
      // Also store credentials for future API calls
      localStorage.setItem('dashboard_credentials', encodedCredentials);
      
    } catch (err: any) {
      console.error('Authentication error:', err);
      if (err.response?.status === 401) {
        setError('Incorrect password');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dashboard_auth');
    localStorage.removeItem('dashboard_credentials');
  };

  // Login screen with dark theme
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-full max-w-md p-8 rounded-lg bg-gray-900 border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-indigo-900/50 flex items-center justify-center">
              <LockIcon className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-2">Restricted Area</h1>
          <p className="text-gray-400 text-center mb-8">Enter password to access the dashboard</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white w-full"
                  placeholder="Enter dashboard password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm bg-red-950/50 p-3 rounded-md border border-red-900">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Login to Dashboard'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Include logout button when authenticated
  return (
    <div>
      <div className="container mx-auto px-4 py-4 flex justify-end">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="text-gray-500 hover:text-gray-700"
        >
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
}

// Create a separate Dashboard component that uses hooks
function DashboardContent() {
  // State
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    totalItems: 0,
    totalPages: 1,
  });
  const [sortField, setSortField] = useState('lastVisited');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    company: '',
    country: '',
    ip: '',
    from: '',
    to: '',
  });
  
  // Router and search params
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Fetch visitors data with filters, sorting, and pagination
  const fetchVisitors = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.set('page', pagination.page.toString());
      params.set('limit', pagination.limit.toString());
      params.set('sort', sortField);
      params.set('order', sortOrder);
      
      // Add filters if they exist
      if (filters.company) params.set('company', filters.company);
      if (filters.country) params.set('country', filters.country);
      if (filters.ip) params.set('ip', filters.ip);
      if (filters.from) params.set('from', filters.from);
      if (filters.to) params.set('to', filters.to);
      
      // Get stored credentials
      const credentials = localStorage.getItem('dashboard_credentials');
      
      // Make API request with authentication
      const response = await axios.get(`/api/visitors?${params.toString()}`, {
        headers: credentials ? {
          Authorization: `Basic ${credentials}`
        } : undefined
      });
      const { data, pagination: paginationInfo } = response.data;
      
      setVisitors(data);
      setPagination(paginationInfo);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch visitors');
      console.error('Error fetching visitors:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, sortField, sortOrder, filters]);
  
  // Apply filters
  const applyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
    fetchVisitors();
  };
  
  // Clear filters
  const clearFilters = () => {
    setFilters({
      company: '',
      country: '',
      ip: '',
      from: '',
      to: '',
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  // Handle sort change
  const handleSort = (field: string) => {
    if (field === sortField) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending
      setSortField(field);
      setSortOrder('desc');
    }
  };
  
  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);
  
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Visitor Tracking Dashboard</h1>
      
      <Tabs defaultValue="visitors" className="mb-6">
        <TabsList>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visitors">
          <Card>
            <CardHeader>
              <CardTitle>Website Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Company</label>
                  <Input 
                    placeholder="Filter by company"
                    value={filters.company}
                    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Country</label>
                  <Input 
                    placeholder="Filter by country"
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">IP Address</label>
                  <Input 
                    placeholder="Filter by IP"
                    value={filters.ip}
                    onChange={(e) => setFilters({ ...filters, ip: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">From Date</label>
                  <Input
                    type="date"
                    value={filters.from}
                    onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">To Date</label>
                  <Input
                    type="date"
                    value={filters.to}
                    onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Show:</span>
                  <Select 
                    value={pagination.limit.toString()} 
                    onValueChange={(val) => setPagination({ ...pagination, limit: parseInt(val), page: 1 })}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder={pagination.limit.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Main table */}
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('company')}>
                        Company {sortField === 'company' && (sortOrder === 'asc' ? '▲' : '▼')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('ip')}>
                        IP Address {sortField === 'ip' && (sortOrder === 'asc' ? '▲' : '▼')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('country')}>
                        Location {sortField === 'country' && (sortOrder === 'asc' ? '▲' : '▼')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('lastVisited')}>
                        Last Visit {sortField === 'lastVisited' && (sortOrder === 'asc' ? '▲' : '▼')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('visitCount')}>
                        Visits {sortField === 'visitCount' && (sortOrder === 'asc' ? '▲' : '▼')}
                      </TableHead>
                      <TableHead>Pages</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-red-500">
                          {error}
                        </TableCell>
                      </TableRow>
                    ) : visitors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          No visitors found
                        </TableCell>
                      </TableRow>
                    ) : (
                      visitors.map((visitor) => (
                        <TableRow key={visitor._id}>
                          <TableCell>
                            <div className="font-medium">{visitor.company}</div>
                            <div className="text-sm text-gray-500">{visitor.isp}</div>
                          </TableCell>
                          <TableCell>{visitor.ip}</TableCell>
                          <TableCell>
                            <div>{visitor.city}</div>
                            <div className="text-sm text-gray-500">{visitor.country}</div>
                          </TableCell>
                          <TableCell>
                            <div>{formatDate(visitor.lastVisited)}</div>
                            <div className="text-xs text-gray-500">
                              First: {formatDate(visitor.firstVisited)}
                            </div>
                          </TableCell>
                          <TableCell>{visitor.visitCount}</TableCell>
                          <TableCell>
                            <div className="max-h-20 overflow-y-auto text-xs">
                              {visitor.pages.slice(0, 5).map((page, idx) => (
                                <div key={idx} className="truncate max-w-xs mb-1">
                                  {page}
                                </div>
                              ))}
                              {visitor.pages.length > 5 && 
                                <div className="text-gray-500">+ {visitor.pages.length - 5} more</div>
                              }
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => pagination.page > 1 && handlePageChange(pagination.page - 1)}
                        className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {[...Array(pagination.totalPages)].map((_, i) => {
                      const pageNumber = i + 1;
                      
                      // Logic to show limited page numbers
                      if (
                        pageNumber === 1 ||
                        pageNumber === pagination.totalPages ||
                        (pageNumber >= pagination.page - 1 && pageNumber <= pagination.page + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              isActive={pageNumber === pagination.page}
                              onClick={() => handlePageChange(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      // Show ellipsis
                      if (
                        (pageNumber === 2 && pagination.page > 3) ||
                        (pageNumber === pagination.totalPages - 1 && pagination.page < pagination.totalPages - 2)
                      ) {
                        return <PaginationEllipsis key={pageNumber} />;
                      }
                      
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => 
                          pagination.page < pagination.totalPages && 
                          handlePageChange(pagination.page + 1)
                        }
                        className={pagination.page >= pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p>Statistics dashboard coming soon!</p>
                <p className="text-sm text-gray-500 mt-2">
                  This section will include charts and graphs showing visitor trends.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    </div>
  );
}

// Main page component with suspense boundary and auth protection
export default function VisitorDashboard() {
  return (
    <AuthProtection>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent />
      </Suspense>
    </AuthProtection>
  );
} 
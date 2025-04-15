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
      
      // Make API request
      const response = await axios.get(`/api/visitors?${params.toString()}`);
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
  
  // Auth warning banner (if needed)
  const AuthWarning = () => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
      <p className="font-bold">Authentication Required</p>
      <p>
        This dashboard requires authentication. If you&apos;re seeing an empty table or authorization errors,
        make sure you&apos;re properly logged in or have provided the correct credentials.
      </p>
    </div>
  );
  
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
      
      <AuthWarning />
      
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

// Loading component to display while suspense is active
function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Visitor Tracking Dashboard</h1>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4">
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4">
                <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with suspense boundary
export default function VisitorDashboard() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
} 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, CreditCard, TrendingUp, MessageSquare, Star, ThumbsDown, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface CsvUpload {
  id: string;
  file_name: string;
  upload_date: string;
  status: string;
  row_count: number;
}

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  review_type: string;
  created_at: string;
}

interface Stats {
  messagesSent: number;
  goodReviews: number;
  badReviews: number;
  responseRate: number;
}

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [csvUploads, setCsvUploads] = useState<CsvUpload[]>([]);
  const [goodReviews, setGoodReviews] = useState<Review[]>([]);
  const [badReviews, setBadReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<Stats>({
    messagesSent: 0,
    goodReviews: 0,
    badReviews: 0,
    responseRate: 85
  });
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchBusinessData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/owner-login');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'owner')
      .single();

    if (!roleData) {
      navigate('/owner-login');
    }
  };

  const fetchBusinessData = async () => {
    // Fetch or create business for current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get or create business
    let { data: business } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!business) {
      const { data: newBusiness } = await supabase
        .from('businesses')
        .insert({
          user_id: user.id,
          business_name: 'My Business',
        })
        .select()
        .single();
      business = newBusiness;
    }

    if (business) {
      setBusinessId(business.id);
      fetchCsvUploads(business.id);
      fetchReviews(business.id);
      fetchStats(business.id);
    }
  };

  const fetchCsvUploads = async (businessId: string) => {
    const { data } = await supabase
      .from('csv_uploads')
      .select('*')
      .eq('business_id', businessId)
      .order('upload_date', { ascending: false });
    
    if (data) setCsvUploads(data);
  };

  const fetchReviews = async (businessId: string) => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setGoodReviews(data.filter(r => r.review_type === 'good'));
      setBadReviews(data.filter(r => r.review_type === 'bad'));
    }
  };

  const fetchStats = async (businessId: string) => {
    const { data: reviews } = await supabase
      .from('reviews')
      .select('review_type')
      .eq('business_id', businessId);

    const { data: messages } = await supabase
      .from('messages')
      .select('id')
      .eq('business_id', businessId);

    if (reviews) {
      setStats({
        messagesSent: messages?.length || 0,
        goodReviews: reviews.filter(r => r.review_type === 'good').length,
        badReviews: reviews.filter(r => r.review_type === 'bad').length,
        responseRate: 85
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && businessId) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      
      // Save to database
      const { error } = await supabase
        .from('csv_uploads')
        .insert({
          business_id: businessId,
          file_name: uploadedFile.name,
          status: 'pending',
          row_count: 0
        });

      if (error) {
        toast.error('Failed to upload file');
      } else {
        toast.success('File uploaded successfully');
        fetchCsvUploads(businessId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Owner Dashboard</h1>
          <p className="text-muted-foreground">Manage your reviews and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Messages Sent</p>
                <p className="text-3xl font-bold text-foreground">{stats.messagesSent}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-primary" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Good Reviews</p>
                <p className="text-3xl font-bold text-primary">{stats.goodReviews}</p>
              </div>
              <Star className="w-12 h-12 text-primary" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Feedback Collected</p>
                <p className="text-3xl font-bold text-gp-warn">{stats.badReviews}</p>
              </div>
              <ThumbsDown className="w-12 h-12 text-gp-warn" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Response Rate</p>
                <p className="text-3xl font-bold text-foreground">{stats.responseRate}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-gp-link" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* CSV Upload Section */}
          <Card className="p-8 bg-card border-2 border-border shadow-card">
            <div className="flex items-center mb-4">
              <Upload className="w-6 h-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold text-foreground">Upload Customer Data</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Upload your monthly CSV file with customer information to start sending review requests.
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground mb-2">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-muted-foreground">CSV files only</p>
              </label>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Process Upload
            </Button>
          </Card>

          {/* Payment Section */}
          <Card className="p-8 bg-card border-2 border-border shadow-card">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold text-foreground">Payment</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Manage your subscription and make payments securely through Stripe.
            </p>
            <div className="bg-muted rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Current Plan</span>
                <span className="font-bold text-foreground">Pro Plan</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Monthly Cost</span>
                <span className="font-bold text-foreground">$99/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-bold text-foreground">Jan 15, 2025</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3">
              Make Payment
            </Button>
            <Button variant="outline" className="w-full border-border text-foreground">
              View Payment History
            </Button>
          </Card>
        </div>

        {/* CSV Upload History */}
        <Card className="p-8 bg-card border-2 border-border shadow-card mb-6">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-2xl font-bold text-foreground">CSV Upload History</h2>
          </div>
          {csvUploads.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No uploads yet</p>
          ) : (
            <div className="space-y-4">
              {csvUploads.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{upload.file_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(upload.upload_date), 'MMM dd, yyyy')} • {upload.row_count} rows
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    upload.status === 'processed' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gp-warn/10 text-gp-warn'
                  }`}>
                    {upload.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Good Reviews */}
          <Card className="p-8 bg-card border-2 border-border shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-6">Good Reviews</h2>
            {goodReviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No good reviews yet</p>
            ) : (
              <div className="space-y-4">
                {goodReviews.map((review) => (
                  <div key={review.id} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-foreground">{review.customer_name}</p>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {format(new Date(review.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Bad Reviews */}
          <Card className="p-8 bg-card border-2 border-border shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-6">Private Feedback</h2>
            {badReviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No feedback yet</p>
            ) : (
              <div className="space-y-4">
                {badReviews.map((review) => (
                  <div key={review.id} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-foreground">{review.customer_name}</p>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {format(new Date(review.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OwnerDashboard;

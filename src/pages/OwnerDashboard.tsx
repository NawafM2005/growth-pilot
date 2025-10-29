import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, CreditCard, TrendingUp, MessageSquare, Star, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

const OwnerDashboard = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success('File uploaded successfully');
    }
  };

  // Placeholder stats - will be replaced with real data
  const stats = {
    messagesSent: 247,
    goodReviews: 42,
    badReviews: 8,
    responseRate: 85
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gp-bg mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your reviews and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Messages Sent</p>
                <p className="text-3xl font-bold text-gp-bg">{stats.messagesSent}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-gp-accent" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Good Reviews</p>
                <p className="text-3xl font-bold text-gp-accent">{stats.goodReviews}</p>
              </div>
              <Star className="w-12 h-12 text-gp-accent" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Feedback Collected</p>
                <p className="text-3xl font-bold text-gp-warn">{stats.badReviews}</p>
              </div>
              <ThumbsDown className="w-12 h-12 text-gp-warn" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Response Rate</p>
                <p className="text-3xl font-bold text-gp-bg">{stats.responseRate}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-gp-link" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CSV Upload Section */}
          <Card className="p-8 bg-white border-2 border-border shadow-card">
            <div className="flex items-center mb-4">
              <Upload className="w-6 h-6 text-gp-accent mr-2" />
              <h2 className="text-2xl font-bold text-gp-bg">Upload Customer Data</h2>
            </div>
            <p className="text-gray-600 mb-6">
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
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-400">CSV files only</p>
              </label>
            </div>
            <Button className="w-full bg-gp-accent hover:bg-gp-accent/90 text-white">
              Process Upload
            </Button>
          </Card>

          {/* Payment Section */}
          <Card className="p-8 bg-white border-2 border-border shadow-card">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-gp-accent mr-2" />
              <h2 className="text-2xl font-bold text-gp-bg">Payment</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Manage your subscription and make payments securely through Stripe.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Current Plan</span>
                <span className="font-bold text-gp-bg">Pro Plan</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Monthly Cost</span>
                <span className="font-bold text-gp-bg">$99/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Billing Date</span>
                <span className="font-bold text-gp-bg">Jan 15, 2025</span>
              </div>
            </div>
            <Button className="w-full bg-gp-accent hover:bg-gp-accent/90 text-white mb-3">
              Make Payment
            </Button>
            <Button variant="outline" className="w-full">
              View Payment History
            </Button>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-8 bg-white border-2 border-border shadow-card mt-6">
          <h2 className="text-2xl font-bold text-gp-bg mb-6">Recent Reviews</h2>
          <div className="space-y-4">
            {[
              { name: 'John Smith', rating: 5, comment: 'Excellent service!', date: '2 hours ago' },
              { name: 'Sarah Johnson', rating: 5, comment: 'Highly recommend!', date: '5 hours ago' },
              { name: 'Mike Brown', rating: 4, comment: 'Great experience overall', date: '1 day ago' }
            ].map((review, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-gp-bg">{review.name}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-2">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OwnerDashboard;

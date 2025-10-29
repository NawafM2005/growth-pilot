import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Send, MessageSquare, DollarSign, Star, ThumbsDown, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const AdminPanel = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  // Placeholder data - will be replaced with real data
  const businesses = [
    { id: '1', name: 'Downtown Dental', status: 'active', payment: 'paid', reviews: { good: 45, bad: 3 } },
    { id: '2', name: 'City Auto Repair', status: 'active', payment: 'pending', reviews: { good: 32, bad: 7 } },
    { id: '3', name: 'Main Street Cafe', status: 'paused', payment: 'paid', reviews: { good: 67, bad: 5 } }
  ];

  const messages = [
    { id: '1', business: 'Downtown Dental', customer: 'John Doe', text: 'How was your experience?', status: 'sent', response: 'Great service!' },
    { id: '2', business: 'City Auto Repair', customer: 'Jane Smith', text: 'Please rate our service', status: 'pending', response: null },
    { id: '3', business: 'Main Street Cafe', customer: 'Bob Wilson', text: 'We value your feedback', status: 'sent', response: 'Food was amazing!' }
  ];

  const handleSendMessage = (businessId: string) => {
    toast.success(`Messages sent to customers of business ${businessId}`);
  };

  const handleReply = () => {
    if (messageText.trim()) {
      toast.success('Reply sent successfully');
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gp-bg mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage businesses, reviews, and messaging</p>
        </div>

        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList className="bg-white border-2 border-border">
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Businesses Tab */}
          <TabsContent value="businesses">
            <div className="grid grid-cols-1 gap-4">
              {businesses.map((business) => (
                <Card key={business.id} className="p-6 bg-white border-2 border-border shadow-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Building2 className="w-8 h-8 text-gp-accent" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gp-bg mb-2">{business.name}</h3>
                        <div className="flex gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className={`text-sm font-semibold ${business.status === 'active' ? 'text-gp-accent' : 'text-gp-warn'}`}>
                              {business.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Payment:</span>
                            <span className={`text-sm font-semibold ${business.payment === 'paid' ? 'text-gp-accent' : 'text-gp-warn'}`}>
                              {business.payment}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-gp-accent" />
                            <span className="text-sm text-gray-600">{business.reviews.good} Good Reviews</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ThumbsDown className="w-5 h-5 text-gp-warn" />
                            <span className="text-sm text-gray-600">{business.reviews.bad} Feedback</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSendMessage(business.id)}
                      className="bg-gp-accent hover:bg-gp-accent/90 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Messages
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Good Reviews */}
              <Card className="p-6 bg-white border-2 border-border shadow-card">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-gp-accent" />
                  <h2 className="text-2xl font-bold text-gp-bg">Good Reviews</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { business: 'Downtown Dental', customer: 'John Smith', rating: 5, comment: 'Excellent service!' },
                    { business: 'Main Street Cafe', customer: 'Sarah Johnson', rating: 5, comment: 'Best food in town!' },
                    { business: 'City Auto Repair', customer: 'Mike Brown', rating: 4, comment: 'Quick and professional' }
                  ].map((review, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gp-bg">{review.customer}</p>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{review.business}</p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Feedback Collected */}
              <Card className="p-6 bg-white border-2 border-border shadow-card">
                <div className="flex items-center gap-2 mb-6">
                  <ThumbsDown className="w-6 h-6 text-gp-warn" />
                  <h2 className="text-2xl font-bold text-gp-bg">Private Feedback</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { business: 'Downtown Dental', customer: 'Jane Doe', rating: 3, comment: 'Long wait time' },
                    { business: 'City Auto Repair', customer: 'Tom Wilson', rating: 2, comment: 'Price higher than expected' },
                    { business: 'Main Street Cafe', customer: 'Lisa Brown', rating: 3, comment: 'Food was cold' }
                  ].map((review, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gp-bg">{review.customer}</p>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{review.business}</p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Message List */}
              <Card className="p-6 bg-white border-2 border-border shadow-card">
                <h2 className="text-2xl font-bold text-gp-bg mb-6">Message Tracking</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedBusiness(message.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedBusiness === message.id ? 'bg-gp-accent/10 border-2 border-gp-accent' : 'bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gp-bg">{message.customer}</p>
                        {message.status === 'sent' ? (
                          <CheckCircle className="w-5 h-5 text-gp-accent" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gp-warn" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{message.business}</p>
                      <p className="text-sm text-gray-700">{message.text}</p>
                      {message.response && (
                        <p className="text-sm text-gp-accent mt-2">Response: {message.response}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Reply Section */}
              <Card className="p-6 bg-white border-2 border-border shadow-card">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-6 h-6 text-gp-accent" />
                  <h2 className="text-2xl font-bold text-gp-bg">Send Reply</h2>
                </div>
                {selectedBusiness ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Replying to: <span className="font-semibold text-gp-bg">
                        {messages.find(m => m.id === selectedBusiness)?.customer}
                      </span>
                    </p>
                    <Textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your reply here..."
                      className="mb-4 min-h-[200px]"
                    />
                    <Button
                      onClick={handleReply}
                      className="w-full bg-gp-accent hover:bg-gp-accent/90 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    Select a message to reply
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="p-6 bg-white border-2 border-border shadow-card">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-6 h-6 text-gp-accent" />
                <h2 className="text-2xl font-bold text-gp-bg">Payment Overview</h2>
              </div>
              <div className="space-y-4">
                {businesses.map((business) => (
                  <div key={business.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gp-bg mb-1">{business.name}</p>
                      <p className="text-sm text-gray-600">Pro Plan - $99/month</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        business.payment === 'paid' 
                          ? 'bg-gp-accent/10 text-gp-accent' 
                          : 'bg-gp-warn/10 text-gp-warn'
                      }`}>
                        {business.payment}
                      </span>
                      {business.payment === 'pending' && (
                        <Button size="sm" variant="outline">
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;

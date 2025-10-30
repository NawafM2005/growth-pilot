import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Building2, Star, Send, PlayCircle, FileText, MessageCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Business {
  id: string;
  business_name: string;
  status: string;
  payment_status: string;
  plan: string;
  monthly_cost: number;
  created_at: string;
}

interface Review {
  id: string;
  business_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  review_type: string;
  created_at: string;
  businesses?: { business_name: string };
}

interface Message {
  id: string;
  business_id: string;
  customer_name: string;
  customer_phone: string;
  message_content: string;
  status: string;
  sent_at: string;
  reply_content: string | null;
  businesses?: { business_name: string };
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [goodReviews, setGoodReviews] = useState<Review[]>([]);
  const [badReviews, setBadReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [csvUploads, setCsvUploads] = useState<any[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newBusinessEmail, setNewBusinessEmail] = useState('');
  const [newBusinessPassword, setNewBusinessPassword] = useState('');
  const [newBusinessName, setNewBusinessName] = useState('');

  useEffect(() => {
    checkAuth();
    fetchBusinesses();
    fetchReviews();
    fetchMessages();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin-login');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (!roleData) {
      navigate('/admin-login');
    }
  };

  const fetchBusinesses = async () => {
    const { data } = await supabase
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setBusinesses(data);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*, businesses(business_name)')
      .order('created_at', { ascending: false });

    if (data) {
      setGoodReviews(data.filter(r => r.review_type === 'good'));
      setBadReviews(data.filter(r => r.review_type === 'bad'));
    }
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*, businesses(business_name)')
      .order('sent_at', { ascending: false });

    if (data) setMessages(data);
  };

  const fetchBusinessDetails = async (businessId: string) => {
    const { data: uploads } = await supabase
      .from('csv_uploads')
      .select('*')
      .eq('business_id', businessId)
      .order('upload_date', { ascending: false });

    if (uploads) setCsvUploads(uploads);
  };

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
    fetchBusinessDetails(business.id);
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    const { error } = await supabase
      .from('messages')
      .update({
        reply_content: replyText,
        replied_at: new Date().toISOString()
      })
      .eq('id', selectedMessage.id);

    if (error) {
      toast.error('Failed to send reply');
    } else {
      toast.success('Reply sent successfully');
      setReplyText('');
      fetchMessages();
    }
  };

  const handleRunOutreach = (businessId: string) => {
    toast.success('Outreach script triggered for business');
  };

  const handleCreateBusiness = async () => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newBusinessEmail,
        password: newBusinessPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create owner role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: authData.user.id, role: 'owner' });

        if (roleError) throw roleError;

        // Create business
        const { error: businessError } = await supabase
          .from('businesses')
          .insert({
            user_id: authData.user.id,
            business_name: newBusinessName,
            status: 'active',
            plan: 'Pro Plan',
            payment_status: 'pending',
            monthly_cost: 99.00
          });

        if (businessError) throw businessError;

        toast.success('Business created successfully!');
        setCreateDialogOpen(false);
        setNewBusinessEmail('');
        setNewBusinessPassword('');
        setNewBusinessName('');
        fetchBusinesses();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create business');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage businesses, reviews, and messages</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Business
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-2 border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Create New Business</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={newBusinessName}
                    onChange={(e) => setNewBusinessName(e.target.value)}
                    placeholder="Enter business name"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="owner-email">Owner Email</Label>
                  <Input
                    id="owner-email"
                    type="email"
                    value={newBusinessEmail}
                    onChange={(e) => setNewBusinessEmail(e.target.value)}
                    placeholder="owner@business.com"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="owner-password">Owner Password</Label>
                  <Input
                    id="owner-password"
                    type="password"
                    value={newBusinessPassword}
                    onChange={(e) => setNewBusinessPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <Button
                  onClick={handleCreateBusiness}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Create Business
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Businesses Tab */}
          <TabsContent value="businesses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business List */}
              <Card className="p-6 bg-card border-2 border-border shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">All Businesses</h2>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {businesses.map((business) => (
                      <div
                        key={business.id}
                        onClick={() => handleBusinessClick(business)}
                        className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-primary" />
                            <div>
                              <h3 className="font-bold text-foreground">{business.business_name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(business.created_at), 'MMM dd, yyyy')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant={business.status === 'active' ? 'default' : 'secondary'}>
                            {business.status}
                          </Badge>
                          <Badge variant={business.payment_status === 'paid' ? 'default' : 'outline'}>
                            {business.payment_status}
                          </Badge>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRunOutreach(business.id);
                          }}
                          className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                          size="sm"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Run Outreach Script
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>

              {/* Business Details */}
              <Card className="p-6 bg-card border-2 border-border shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Business Details</h2>
                {selectedBusiness ? (
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{selectedBusiness.business_name}</h3>
                        <p className="text-sm text-muted-foreground">Plan: {selectedBusiness.plan}</p>
                        <p className="text-sm text-muted-foreground">Status: {selectedBusiness.status}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          CSV Upload History
                        </h4>
                        {csvUploads.length === 0 ? (
                          <p className="text-muted-foreground text-sm">No uploads yet</p>
                        ) : (
                          <div className="space-y-2">
                            {csvUploads.map((upload) => (
                              <div key={upload.id} className="p-3 bg-background rounded border border-border">
                                <p className="text-sm font-medium text-foreground">{upload.file_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {format(new Date(upload.upload_date), 'MMM dd, yyyy')}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                    Select a business to view details
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Good Reviews */}
              <Card className="p-6 bg-card border-2 border-border shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Good Reviews</h2>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {goodReviews.map((review) => (
                      <div key={review.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold text-foreground">{review.customer_name}</p>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{review.businesses?.business_name}</span>
                          <span>{format(new Date(review.created_at), 'MMM dd')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>

              {/* Bad Reviews */}
              <Card className="p-6 bg-card border-2 border-border shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Private Feedback</h2>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {badReviews.map((review) => (
                      <div key={review.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold text-foreground">{review.customer_name}</p>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{review.businesses?.business_name}</span>
                          <span>{format(new Date(review.created_at), 'MMM dd')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Messages List */}
              <Card className="p-6 bg-card border-2 border-border shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Conversations
                </h2>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{message.customer_name}</p>
                            <p className="text-xs text-muted-foreground">{message.businesses?.business_name}</p>
                          </div>
                          <Badge variant={message.reply_content ? 'default' : 'outline'}>
                            {message.reply_content ? 'Replied' : 'New'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{message.message_content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(new Date(message.sent_at), 'MMM dd, h:mm a')}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>

              {/* Reply Section */}
              <Card className="p-6 bg-card border-2 border-border shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Reply</h2>
                {selectedMessage ? (
                  <div className="h-[600px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {/* Customer Message */}
                      <div className="flex justify-start">
                        <div className="bg-muted p-4 rounded-lg max-w-[80%]">
                          <p className="font-semibold text-foreground text-sm mb-1">
                            {selectedMessage.customer_name}
                          </p>
                          <p className="text-foreground">{selectedMessage.message_content}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {format(new Date(selectedMessage.sent_at), 'h:mm a')}
                          </p>
                        </div>
                      </div>

                      {/* Admin Reply */}
                      {selectedMessage.reply_content && (
                        <div className="flex justify-end">
                          <div className="bg-primary p-4 rounded-lg max-w-[80%]">
                            <p className="font-semibold text-primary-foreground text-sm mb-1">You</p>
                            <p className="text-primary-foreground">{selectedMessage.reply_content}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="flex-1 bg-background border-border text-foreground"
                        onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                      />
                      <Button onClick={handleReply} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                    Select a conversation to reply
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="p-6 bg-card border-2 border-border shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">Payment Overview</h2>
              <div className="space-y-4">
                {businesses.map((business) => (
                  <div key={business.id} className="p-6 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{business.business_name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{business.plan}</p>
                        <p className="text-sm font-semibold text-foreground">${business.monthly_cost}/month</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={business.payment_status === 'paid' ? 'default' : 'destructive'}
                          className="mb-2"
                        >
                          {business.payment_status}
                        </Badge>
                        {business.payment_status === 'pending' && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Send Reminder
                          </Button>
                        )}
                      </div>
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

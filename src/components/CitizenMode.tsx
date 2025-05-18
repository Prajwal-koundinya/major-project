
import React, { useState } from 'react';
import { AlertCircle, Send, MapPin, Image as ImageIcon, CheckCircle, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const complaintCategories = [
  { value: 'garbage', label: 'Garbage Collection' },
  { value: 'roads', label: 'Road Maintenance' },
  { value: 'water', label: 'Water Supply' },
  { value: 'electricity', label: 'Electricity Issues' },
  { value: 'drainage', label: 'Drainage Problems' },
  { value: 'other', label: 'Other Issues' },
];

const mockComplaints = [
  {
    id: 'c001',
    category: 'roads',
    title: 'Pothole on Kalidasa Road',
    description: 'Large pothole near junction causing traffic issues',
    status: 'in-progress',
    date: '2023-05-10T10:30:00Z',
    updates: [
      { date: '2023-05-10T14:45:00Z', message: 'Complaint registered' },
      { date: '2023-05-12T09:15:00Z', message: 'Assigned to road maintenance department' },
      { date: '2023-05-14T11:00:00Z', message: 'Inspection scheduled for tomorrow' },
    ]
  },
  {
    id: 'c002',
    category: 'garbage',
    title: 'Garbage not collected',
    description: 'Regular collection missed for 3 days in Saraswathipuram area',
    status: 'resolved',
    date: '2023-05-05T08:45:00Z',
    updates: [
      { date: '2023-05-05T10:00:00Z', message: 'Complaint registered' },
      { date: '2023-05-05T14:30:00Z', message: 'Assigned to waste management team' },
      { date: '2023-05-06T09:00:00Z', message: 'Collection scheduled for today' },
      { date: '2023-05-06T16:00:00Z', message: 'Garbage collected, issue resolved' },
    ]
  },
  {
    id: 'c003',
    category: 'water',
    title: 'Low water pressure',
    description: 'Very low water pressure in Yadavagiri area for the past week',
    status: 'pending',
    date: '2023-05-15T15:20:00Z',
    updates: [
      { date: '2023-05-15T16:00:00Z', message: 'Complaint registered' },
      { date: '2023-05-16T10:00:00Z', message: 'Assessment pending' },
    ]
  }
];

const CitizenMode: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLocation("Detecting your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        () => {
          setLocation("");
          toast({
            title: "Location Error",
            description: "Could not detect your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) {
      toast({
        title: "Missing Information",
        description: "Please select a complaint category",
        variant: "destructive",
      });
      return;
    }

    if (!description) {
      toast({
        title: "Missing Information",
        description: "Please provide a description of the issue",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully registered. You can track its status in 'My Complaints'.",
      });
      setCategory("");
      setDescription("");
      setLocation("");
      setImagePreview(null);
      setIsSubmitting(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container pb-16 pt-24 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <AlertCircle size={28} className="text-mysore-heritage-red" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Citizen Reporter</h2>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Report civic issues and track their resolution status.
        </p>

        <Tabs defaultValue="new-complaint" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="new-complaint">New Complaint</TabsTrigger>
            <TabsTrigger value="my-complaints">My Complaints</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-complaint">
            <Card>
              <CardHeader>
                <CardTitle>Report an Issue</CardTitle>
                <CardDescription>
                  Help us improve Mysuru by reporting civic issues in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Complaint Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {complaintCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      placeholder="Please describe the issue in detail..." 
                      className="min-h-[100px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter location or use current location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-grow"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={getCurrentLocation}
                        className="flex-shrink-0"
                      >
                        <MapPin className="h-4 w-4 mr-1" /> Get Location
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Image (Optional)</label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="mx-auto max-h-[200px] rounded-lg"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => setImagePreview(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <div className="flex flex-col items-center justify-center py-6">
                            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-1">
                              Click to upload an image
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG or JPEG (max. 5MB)
                            </p>
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => {
                    setCategory("");
                    setDescription("");
                    setLocation("");
                    setImagePreview(null);
                  }}
                >
                  Reset
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="bg-mysore-heritage-red hover:bg-mysore-heritage-red/90"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-complaints">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>
                    Track the status of your reported issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockComplaints.map((complaint) => (
                      <Card key={complaint.id} className="overflow-hidden">
                        <div className={cn(
                          "flex items-center text-xs font-medium px-4 py-1",
                          getStatusColor(complaint.status)
                        )}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-2 capitalize">
                            {complaint.status === 'in-progress' ? 'In Progress' : complaint.status}
                          </span>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{complaint.title}</CardTitle>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(complaint.date)}
                            </span>
                          </div>
                          <CardDescription>
                            Category: {complaintCategories.find(c => c.value === complaint.category)?.label}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm">{complaint.description}</p>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Progress Timeline</h4>
                            <div className="space-y-3">
                              {complaint.updates.map((update, idx) => (
                                <div key={idx} className="flex">
                                  <div className="mr-2 flex flex-col items-center">
                                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-mysore-heritage-red' : 'bg-gray-400'}`}></div>
                                    {idx < complaint.updates.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
                                  </div>
                                  <div className="pb-2">
                                    <p className="text-xs text-muted-foreground">
                                      {formatDate(update.date)} at {formatTime(update.date)}
                                    </p>
                                    <p className="text-sm">{update.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-mysore-marigold/20 to-mysore-sandalwood/20 p-6 rounded-2xl">
                <h3 className="font-heading font-semibold mb-2">Citizen Services</h3>
                <p className="text-sm mb-4">Quick access to essential city services</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="bg-white/50 hover:bg-white/80 h-auto py-3 px-4 flex flex-col items-center">
                    <span className="text-xs mb-1">Water Bill</span>
                    <span className="text-lg font-semibold">Pay</span>
                  </Button>
                  <Button variant="outline" className="bg-white/50 hover:bg-white/80 h-auto py-3 px-4 flex flex-col items-center">
                    <span className="text-xs mb-1">Property Tax</span>
                    <span className="text-lg font-semibold">Pay</span>
                  </Button>
                  <Button variant="outline" className="bg-white/50 hover:bg-white/80 h-auto py-3 px-4 flex flex-col items-center">
                    <span className="text-xs mb-1">Birth/Death</span>
                    <span className="text-lg font-semibold">Certificates</span>
                  </Button>
                  <Button variant="outline" className="bg-white/50 hover:bg-white/80 h-auto py-3 px-4 flex flex-col items-center">
                    <span className="text-xs mb-1">Trade</span>
                    <span className="text-lg font-semibold">License</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CitizenMode;

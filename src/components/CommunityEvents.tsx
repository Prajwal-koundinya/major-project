
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';

const communityEvents = [
  {
    id: 1,
    name: 'Mysuru Marathon 2024',
    date: 'December 15, 2024',
    time: '6:00 AM',
    description: 'Annual marathon promoting fitness and community spirit with routes through historic Mysuru.',
    venue: 'Mysore Palace to Brindavan Gardens',
    category: 'Sports',
    participants: '5000+ expected',
    status: 'Registration Open'
  },
  {
    id: 2,
    name: 'Clean Mysuru Drive',
    date: 'Every Saturday',
    time: '7:00 AM - 9:00 AM',
    description: 'Weekly community cleaning drive to keep our heritage city beautiful and clean.',
    venue: 'Various locations',
    category: 'Environment',
    participants: '200+ volunteers',
    status: 'Ongoing'
  },
  {
    id: 3,
    name: 'Charity Cricket Match',
    date: 'January 26, 2025',
    time: '2:00 PM',
    description: 'Cricket match between local celebrities and citizens to raise funds for education.',
    venue: 'Mysore Race Club Grounds',
    category: 'Sports & Charity',
    participants: 'Open registration',
    status: 'Upcoming'
  },
  {
    id: 4,
    name: 'Heritage Walk & Photography',
    date: 'Every Sunday',
    time: '6:30 AM - 8:30 AM',
    description: 'Guided walks through historic areas with photography workshops for enthusiasts.',
    venue: 'Starting from Mysore Palace',
    category: 'Culture',
    participants: '50 per session',
    status: 'Regular'
  },
  {
    id: 5,
    name: 'Blood Donation Camp',
    date: 'Last Sunday of every month',
    time: '9:00 AM - 4:00 PM',
    description: 'Monthly blood donation drive organized by local NGOs and hospitals.',
    venue: 'Town Hall, Mysuru',
    category: 'Health & Social',
    participants: '300+ donors',
    status: 'Regular'
  },
  {
    id: 6,
    name: 'Cultural Exchange Festival',
    date: 'March 10-12, 2025',
    time: 'All Day',
    description: 'Three-day festival celebrating diversity with food, music, and art from different communities.',
    venue: 'Karanji Lake Nature Park',
    category: 'Culture',
    participants: '10,000+ visitors',
    status: 'Planning Stage'
  }
];

const CommunityEvents = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Users className="h-8 w-8 text-mysore-royal-purple" />
          Community Events in Mysuru
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join fellow Mysoreans in making our city better through various community initiatives, 
          sports events, and cultural activities that bring people together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{event.name}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'Registration Open' 
                    ? 'bg-green-100 text-green-800' 
                    : event.status === 'Ongoing' || event.status === 'Regular'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {event.status}
                </span>
              </div>
              <CardDescription className="text-sm text-mysore-heritage-red font-medium">
                {event.category}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm">{event.description}</p>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.venue}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.participants}
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Join Event
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityEvents;

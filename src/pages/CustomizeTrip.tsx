
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock, MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TripEvent {
  id: string;
  name: string;
  time: string;
  duration: string;
  description?: string;
  day: number;
}

const CustomizeTrip = () => {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    name: '',
    time: '',
    duration: '',
    description: '',
    day: 1
  });

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.time) {
      // Add event to itinerary (this would normally update a global state or database)
      console.log('Adding event to Day', newEvent.day, ':', newEvent);
      
      // Reset form
      setNewEvent({
        name: '',
        time: '',
        duration: '',
        description: '',
        day: 1
      });
      
      // Navigate back to tourist mode
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tourist Assistant
          </Button>
          <h1 className="text-3xl font-bold">Customize Your Trip</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Place to Visit
            </CardTitle>
            <CardDescription>
              Add a new destination to your Mysuru itinerary with your preferred timing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="place-name">Place Name</Label>
                <Input
                  id="place-name"
                  placeholder="Enter place name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visit-time">Visit Time</Label>
                <Input
                  id="visit-time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 2 hours"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="day-select">Add to Day</Label>
                <Select value={newEvent.day.toString()} onValueChange={(value) => setNewEvent({ ...newEvent, day: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Day 1</SelectItem>
                    <SelectItem value="2">Day 2</SelectItem>
                    <SelectItem value="3">Day 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any notes about this place..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>
            
            <Button onClick={handleAddEvent} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Event to Itinerary
            </Button>
          </CardContent>
        </Card>

        {/* Quick Navigation to Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Button variant="outline" onClick={() => navigate('/#attractions')}>
            <MapPin className="h-4 w-4 mr-2" />
            View Attractions
          </Button>
          <Button variant="outline" onClick={() => navigate('/#food')}>
            View Food Options
          </Button>
          <Button variant="outline" onClick={() => navigate('/#events')}>
            View Events
          </Button>
          <Button variant="outline" onClick={() => navigate('/#weather')}>
            <Clock className="h-4 w-4 mr-2" />
            Weather Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTrip;

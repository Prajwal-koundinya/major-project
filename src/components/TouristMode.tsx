import React, { useState } from 'react';
import { Compass, Utensils, Info, Calendar, MapPin, Star, Clock, Sun, Cloud, CloudRain, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import CommunityEvents from './CommunityEvents';

// Updated attractions with new places and placeholder images
const topAttractions = [
  {
    id: 1,
    name: 'Mysore Palace',
    category: 'Historical',
    description: 'The official residence of the Wadiyar dynasty, this magnificent palace is one of the most famous tourist attractions in India.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&q=80',
    rating: 4.8,
    timings: '10:00 AM - 5:30 PM',
    entryFee: '₹70 for Indians',
    bestTime: 'morning', // morning, afternoon, evening
    isOpen: true
  },
  {
    id: 2,
    name: 'Chamundi Hills',
    category: 'Nature',
    description: 'A hilltop with panoramic views of Mysuru city and home to the famous Chamundeshwari Temple.',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=80',
    rating: 4.6,
    timings: '6:00 AM - 9:00 PM',
    entryFee: 'Free',
    bestTime: 'morning',
    isOpen: true
  },
  {
    id: 3,
    name: 'Brindavan Gardens',
    category: 'Family-Friendly',
    description: 'Beautiful terraced gardens with musical fountains. Perfect for family outings.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&q=80',
    rating: 4.3,
    timings: '6:30 PM - 8:30 PM (Fountain Show)',
    entryFee: '₹25 for Adults',
    bestTime: 'evening',
    isOpen: true
  },
  {
    id: 4,
    name: 'Jaganmohan Art Gallery',
    category: 'Cultural',
    description: 'One of the oldest art galleries in India, housing an impressive collection of paintings and artifacts.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&q=80',
    rating: 4.4,
    timings: '8:30 AM - 5:30 PM',
    entryFee: '₹25 for Indians',
    bestTime: 'afternoon',
    isOpen: true
  },
  {
    id: 5,
    name: 'Mysore Zoo',
    category: 'Family-Friendly',
    description: 'One of the oldest and most well-maintained zoos in India, home to diverse wildlife.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    rating: 4.5,
    timings: '8:30 AM - 5:30 PM',
    entryFee: '₹60 for Adults',
    bestTime: 'morning',
    isOpen: true
  },
  {
    id: 6,
    name: "St. Philomena's Church",
    category: 'Religious',
    description: 'A beautiful neo-gothic church with stunning architecture and peaceful ambiance.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&q=80',
    rating: 4.7,
    timings: '6:00 AM - 6:00 PM',
    entryFee: 'Free',
    bestTime: 'afternoon',
    isOpen: true
  }
];

// Updated food spots with new places
const localFoodSpots = [
  {
    id: 1,
    name: 'Mylari Dosa',
    cuisine: 'South Indian',
    description: 'Famous for their butter dosas and authentic South Indian breakfast.',
    rating: 4.7,
    priceRange: '₹50-150',
    specialty: 'Butter Dosa'
  },
  {
    id: 2,
    name: 'Hotel RRR',
    cuisine: 'Multi-Cuisine',
    description: 'Known for their Andhra-style non-vegetarian dishes and thalis.',
    rating: 4.5,
    priceRange: '₹200-400',
    specialty: 'Andhra Meals'
  },
  {
    id: 3,
    name: 'Mahesh Prasad',
    cuisine: 'Vegetarian',
    description: 'Traditional Mysore-style vegetarian meals served on banana leaves.',
    rating: 4.6,
    priceRange: '₹100-250',
    specialty: 'Traditional Thali'
  },
  {
    id: 4,
    name: 'GTR (Gayatri Tiffin Room)',
    cuisine: 'South Indian',
    description: 'Famous for their crisp dosas, idlis, vadas, and traditional filter coffee.',
    rating: 4.8,
    priceRange: '₹40-120',
    specialty: 'Crisp Dosas & Filter Coffee'
  },
  {
    id: 5,
    name: 'Hotel Dasaprakash',
    cuisine: 'Multi-Cuisine',
    description: 'Classical South Indian thalis, sweets, and North Indian options too.',
    rating: 4.4,
    priceRange: '₹150-300',
    specialty: 'South Indian Thalis'
  },
  {
    id: 6,
    name: 'Oyster Bay',
    cuisine: 'Fusion',
    description: 'Royal ambience, fusion of South Indian & continental dishes.',
    rating: 4.6,
    priceRange: '₹300-600',
    specialty: 'Fusion Cuisine'
  }
];

// Expanded cultural events
const culturalEvents = [
  {
    id: 1,
    name: 'Mysuru Dasara',
    date: 'October 15-24, 2024',
    description: 'The grandest festival of Karnataka featuring royal processions, cultural shows, and illuminated palace.',
    status: 'Upcoming',
    venue: 'Mysore Palace & City'
  },
  {
    id: 2,
    name: 'Classical Music Festival',
    date: 'November 5-12, 2024',
    description: 'Week-long celebration of Indian classical music with renowned artists.',
    status: 'Upcoming',
    venue: 'Jaganmohan Palace'
  },
  {
    id: 3,
    name: 'Yoga Day Celebration',
    date: 'Every Sunday',
    description: 'Morning yoga sessions in the beautiful palace grounds.',
    status: 'Regular',
    venue: 'Palace Grounds'
  },
  {
    id: 4,
    name: 'Mysuru Literature Festival',
    date: 'December 1-3, 2024',
    description: 'Annual celebration of literature with renowned authors and poets.',
    status: 'Upcoming',
    venue: 'University of Mysore'
  },
  {
    id: 5,
    name: 'Traditional Handicrafts Exhibition',
    date: 'January 15-21, 2025',
    description: 'Showcase of traditional Mysuru silk, sandalwood, and rosewood crafts.',
    status: 'Upcoming',
    venue: 'Mysore Exhibition Grounds'
  }
];

// Weather recommendations remain the same
const weatherRecommendations = [
  {
    id: 1,
    weather: 'Sunny',
    icon: Sun,
    activity: 'Visit Chamundi Hills',
    description: 'Perfect weather for outdoor sightseeing and temple visits',
    temperature: '28°C'
  },
  {
    id: 2,
    weather: 'Cloudy',
    icon: Cloud,
    activity: 'Explore Palace Museum',
    description: 'Ideal for indoor attractions and museum tours',
    temperature: '25°C'
  },
  {
    id: 3,
    weather: 'Light Rain',
    icon: CloudRain,
    activity: 'Shopping at Devaraja Market',
    description: 'Great time for covered markets and indoor activities',
    temperature: '22°C'
  }
];

// Sample itinerary remains the same
const sampleItinerary = [
  {
    day: 'Day 1',
    title: 'Royal Heritage',
    activities: [
      { time: '9:00 AM', activity: 'Mysore Palace Visit', duration: '2 hours' },
      { time: '12:00 PM', activity: 'Lunch at Mylari Dosa', duration: '1 hour' },
      { time: '3:00 PM', activity: 'Jaganmohan Palace Art Gallery', duration: '1.5 hours' },
      { time: '6:00 PM', activity: 'Brindavan Gardens Musical Fountain', duration: '2 hours' }
    ]
  },
  {
    day: 'Day 2',
    title: 'Nature & Spirituality',
    activities: [
      { time: '7:00 AM', activity: 'Chamundi Hills Temple', duration: '3 hours' },
      { time: '11:00 AM', activity: 'St. Philomena Church', duration: '1 hour' },
      { time: '1:00 PM', activity: 'Traditional Lunch at Mahesh Prasad', duration: '1 hour' },
      { time: '4:00 PM', activity: 'Mysuru Zoo Safari', duration: '2.5 hours' }
    ]
  },
  {
    day: 'Day 3',
    title: 'Culture & Shopping',
    activities: [
      { time: '9:00 AM', activity: 'Devaraja Market Shopping', duration: '2 hours' },
      { time: '12:00 PM', activity: 'Silk Weaving Factory Tour', duration: '1.5 hours' },
      { time: '3:00 PM', activity: 'Karanji Lake Nature Walk', duration: '2 hours' },
      { time: '6:00 PM', activity: 'Cultural Show at Palace', duration: '1.5 hours' }
    ]
  }
];

// Additional must-try items
const mustTryItems = [
  {
    id: 1,
    name: 'Mysore Pak',
    description: 'Made with gram flour, sugar, and ghee, this melt-in-your-mouth treat originated in the royal kitchens.',
    bestPlaces: ['Sri Krishna Sweets', 'Guru Sweet Mart', 'Palace Sweet Stall'],
    priceRange: '₹400-800 per kg',
    shelfLife: '5-7 days (perfect for gifting)'
  },
  {
    id: 2,
    name: 'Mysore Silk Sarees',
    description: 'World-famous silk sarees known for their rich texture, vibrant colors, and intricate zari work.',
    bestPlaces: ['Government Silk Weaving Factory', 'Mysore Silk Saree Udyog', 'Cauvery Arts & Crafts'],
    priceRange: '₹3,000-50,000+',
    shelfLife: 'Lifetime with proper care'
  },
  {
    id: 3,
    name: 'Sandalwood Products',
    description: 'Authentic Mysore sandalwood items including soaps, oils, and carved artifacts with divine fragrance.',
    bestPlaces: ['Karnataka Soaps & Detergents', 'Mysore Sandal Soap Factory', 'Government Sandalwood Oil Factory'],
    priceRange: '₹50-5,000',
    shelfLife: '2-5 years'
  },
  {
    id: 4,
    name: 'Traditional Coffee',
    description: 'Mysore filter coffee made with specially roasted beans and served in traditional brass vessels.',
    bestPlaces: ['Central Tiffin Room', 'Mylari', 'Hotel Hanumanthu Mess'],
    priceRange: '₹15-50 per cup',
    shelfLife: 'Best served fresh'
  }
];

const TouristMode: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const getBestTimeColor = (bestTime: string) => {
    const currentHour = new Date().getHours();
    const isOptimalTime = 
      (bestTime === 'morning' && currentHour >= 6 && currentHour < 12) ||
      (bestTime === 'afternoon' && currentHour >= 12 && currentHour < 17) ||
      (bestTime === 'evening' && currentHour >= 17 && currentHour < 21);
    
    return isOptimalTime ? 'bg-green-500' : 'bg-orange-500';
  };

  const InfoTile = ({ icon: Icon, title, children, className = "" }: { icon: any, title: string, children: React.ReactNode, className?: string }) => (
    <Card className={cn("hover:shadow-lg transition-all duration-300 hover:scale-105", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <Icon className="h-6 w-6 text-mysore-royal-purple" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container pb-16 pt-24 animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Compass size={28} className="text-mysore-royal-purple" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Tourist Assistant</h2>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          Discover the beauty and heritage of Mysuru with our interactive guide.
        </p>

        {/* Interactive Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoTile icon={MapPin} title="Top Attractions" className="bg-gradient-to-br from-mysore-royal-purple/10 to-mysore-heritage-red/10">
            <div className="space-y-3">
              {topAttractions.slice(0, 2).map((attraction) => (
                <div key={attraction.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{attraction.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 fill-mysore-marigold text-mysore-marigold" />
                      {attraction.rating}
                    </p>
                  </div>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full mt-3" onClick={() => scrollToSection('attractions')}>
                View All
              </Button>
            </div>
          </InfoTile>

          <InfoTile icon={Utensils} title="Local Food" className="bg-gradient-to-br from-mysore-marigold/10 to-mysore-palace-gold/10">
            <div className="space-y-3">
              {localFoodSpots.slice(0, 2).map((spot) => (
                <div key={spot.id}>
                  <p className="font-medium text-sm">{spot.name}</p>
                  <p className="text-xs text-muted-foreground">{spot.specialty}</p>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full mt-3" onClick={() => scrollToSection('food')}>
                Explore Food
              </Button>
            </div>
          </InfoTile>

          <InfoTile icon={Calendar} title="Cultural Events" className="bg-gradient-to-br from-mysore-silk-green/10 to-mysore-sandalwood/10">
            <div className="space-y-3">
              {culturalEvents.slice(0, 2).map((event) => (
                <div key={event.id}>
                  <p className="font-medium text-sm">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full mt-3" onClick={() => scrollToSection('events')}>
                View Events
              </Button>
            </div>
          </InfoTile>

          <InfoTile icon={Thermometer} title="Weather Tips" className="bg-gradient-to-br from-blue-100 to-sky-100">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-orange-500" />
                <span className="text-sm">28°C - Perfect for sightseeing</span>
              </div>
              <p className="text-xs text-muted-foreground">Visit outdoor attractions today!</p>
              <Button size="sm" variant="outline" className="w-full mt-3" onClick={() => scrollToSection('weather')}>
                Weather Guide
              </Button>
            </div>
          </InfoTile>
        </div>

        {/* Sample Itinerary Planner Carousel */}
        <Card className="bg-gradient-to-r from-mysore-royal-purple/5 to-mysore-heritage-red/5 border-mysore-royal-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-mysore-royal-purple" />
              Sample 3-Day Mysuru Itinerary
            </CardTitle>
            <CardDescription>
              Expertly crafted itinerary covering the best of Mysuru's heritage, culture, and attractions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full">
              <CarouselContent>
                {sampleItinerary.map((day, index) => (
                  <CarouselItem key={index}>
                    <Card className="bg-white/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-mysore-royal-purple">{day.day}: {day.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="flex items-start gap-3 p-3 rounded-lg bg-white/70">
                              <Clock className="h-4 w-4 text-mysore-heritage-red mt-0.5" />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-sm">{activity.time}</span>
                                  <span className="text-xs text-muted-foreground">{activity.duration}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{activity.activity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-mysore-royal-purple hover:bg-mysore-royal-purple/90"
              onClick={() => navigate('/customize-trip')}
            >
              Customize My Trip
            </Button>
          </CardFooter>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="attractions" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="attractions" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Attractions</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">Food</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span className="hidden sm:inline">Weather</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="attractions" id="attractions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topAttractions.map((attraction) => (
                <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Placeholder Image</span>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{attraction.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="bg-mysore-marigold text-black px-2 py-1 rounded-full text-xs font-medium">
                          {attraction.rating}★
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getBestTimeColor(attraction.bestTime)}`} title="Best time indicator"></div>
                      </div>
                    </div>
                    <CardDescription>{attraction.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{attraction.description}</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p><Clock className="inline h-3 w-3 mr-1" /> {attraction.timings}</p>
                      <p><Info className="inline h-3 w-3 mr-1" /> {attraction.entryFee}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Add to Trip</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="food" id="food">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localFoodSpots.map((spot) => (
                <Card key={spot.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{spot.name}</CardTitle>
                      <span className="bg-mysore-marigold text-black px-2 py-1 rounded-full text-xs font-medium">
                        {spot.rating}★
                      </span>
                    </div>
                    <CardDescription>{spot.cuisine}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{spot.description}</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p><Utensils className="inline h-3 w-3 mr-1" /> {spot.specialty}</p>
                      <p><Info className="inline h-3 w-3 mr-1" /> {spot.priceRange}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">View Menu & Location</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" id="events">
            <div className="space-y-6">
              {culturalEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </CardDescription>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        event.status === 'Upcoming' ? 'bg-mysore-marigold/20 text-mysore-heritage-red' : 'bg-mysore-silk-green/20 text-mysore-silk-green'
                      )}>
                        {event.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      <MapPin className="inline h-3 w-3 mr-1" /> {event.venue}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="weather" id="weather">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weatherRecommendations.map((rec) => (
                <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <rec.icon className="h-6 w-6 text-mysore-royal-purple" />
                      {rec.weather}
                    </CardTitle>
                    <CardDescription className="text-2xl font-bold text-mysore-heritage-red">
                      {rec.temperature}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2">Recommended Activity:</h4>
                    <p className="font-semibold text-mysore-royal-purple mb-2">{rec.activity}</p>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Plan Activity</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Must Try Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center mb-6">Must Try in Mysuru</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mustTryItems.map((item) => (
              <Card key={item.id} className="bg-gradient-to-r from-mysore-marigold/20 to-mysore-sandalwood/20 border-mysore-marigold/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-mysore-heritage-red" />
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{item.description}</p>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold mb-1">Best Places:</h5>
                      <ul className="text-muted-foreground space-y-1">
                        {item.bestPlaces.map((place, index) => (
                          <li key={index}>• {place}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-1">Price Range:</h5>
                        <p className="text-muted-foreground">{item.priceRange}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Details:</h5>
                        <p className="text-muted-foreground">{item.shelfLife}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="ml-auto text-mysore-royal-purple">Find Near Me</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Events Section */}
        <Separator className="my-12" />
        <CommunityEvents />
      </div>
    </div>
  );
};

export default TouristMode;

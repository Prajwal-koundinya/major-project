
import React, { useState } from 'react';
import { Map, Compass, Utensils, Info, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapComponent from './MapComponent';

const attractions = [
  {
    id: 1,
    name: 'Mysore Palace',
    category: 'Historical',
    description: 'The official residence of the Wadiyar dynasty, this magnificent palace is one of the most famous tourist attractions in India.',
    image: '/placeholder.svg',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Chamundi Hills',
    category: 'Nature',
    description: 'A hilltop with panoramic views of Mysuru city and home to the famous Chamundeshwari Temple.',
    image: '/placeholder.svg',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Brindavan Gardens',
    category: 'Family-Friendly',
    description: 'Beautiful terraced gardens with musical fountains. Perfect for family outings.',
    image: '/placeholder.svg',
    rating: 4.3,
  },
  {
    id: 4,
    name: 'Mysuru Zoo',
    category: 'Family-Friendly',
    description: 'One of the oldest and most popular zoos in India with a wide variety of species.',
    image: '/placeholder.svg',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'St. Philomena\'s Church',
    category: 'Historical',
    description: 'A beautiful Neo-Gothic style Catholic church, one of the largest in India.',
    image: '/placeholder.svg',
    rating: 4.4,
  },
];

const restaurants = [
  {
    id: 1,
    name: 'Mylari Dosa',
    cuisine: 'South Indian',
    description: 'Famous for their butter dosas and authentic South Indian breakfast.',
    image: '/placeholder.svg',
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Hotel RRR',
    cuisine: 'Multi-Cuisine',
    description: 'Known for their Andhra-style non-vegetarian dishes and thalis.',
    image: '/placeholder.svg',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Mahesh Prasad',
    cuisine: 'Vegetarian',
    description: 'Traditional Mysore-style vegetarian meals served on banana leaves.',
    image: '/placeholder.svg',
    rating: 4.6,
  },
];

const TouristMode: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredAttractions = selectedCategory === 'All' 
    ? attractions 
    : attractions.filter(attraction => attraction.category === selectedCategory);

  return (
    <div className="container pb-16 pt-24 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Compass size={28} className="text-mysore-royal-purple" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Tourist Assistant</h2>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Discover the beauty and heritage of Mysuru with our interactive guide.
        </p>
        
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger value="attractions" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Attractions</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">Food</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="min-h-[60vh]">
            <Card>
              <CardHeader>
                <CardTitle>Explore Mysuru</CardTitle>
                <CardDescription>
                  Interactive map showing key attractions and landmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="map-container">
                  <MapComponent />
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Tap on landmarks to see more information
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="attractions">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === 'All' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('All')}
                  className={selectedCategory === 'All' ? 'bg-mysore-royal-purple' : ''}
                >
                  All
                </Button>
                <Button 
                  variant={selectedCategory === 'Historical' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('Historical')}
                  className={selectedCategory === 'Historical' ? 'bg-mysore-royal-purple' : ''}
                >
                  Historical
                </Button>
                <Button 
                  variant={selectedCategory === 'Nature' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('Nature')}
                  className={selectedCategory === 'Nature' ? 'bg-mysore-royal-purple' : ''}
                >
                  Nature
                </Button>
                <Button 
                  variant={selectedCategory === 'Family-Friendly' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('Family-Friendly')}
                  className={selectedCategory === 'Family-Friendly' ? 'bg-mysore-royal-purple' : ''}
                >
                  Family-Friendly
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAttractions.map((attraction) => (
                  <Card key={attraction.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={attraction.image} 
                        alt={attraction.name} 
                        className="w-full h-full object-cover transform transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{attraction.name}</CardTitle>
                        <span className="bg-mysore-marigold text-black px-2 py-1 rounded-full text-xs font-medium">
                          {attraction.rating}★
                        </span>
                      </div>
                      <CardDescription>
                        {attraction.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{attraction.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Add to Itinerary
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="food">
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold">Local Culinary Delights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="flex flex-col h-full">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <span className="bg-mysore-marigold text-black px-2 py-1 rounded-full text-xs font-medium">
                          {restaurant.rating}★
                        </span>
                      </div>
                      <CardDescription>{restaurant.cuisine}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p>{restaurant.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">View on Map</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-mysore-marigold/20 to-mysore-sandalwood/20 border-mysore-marigold/30">
                <CardHeader>
                  <CardTitle className="text-lg">Must Try: Mysore Pak</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Don't leave Mysuru without trying its famous sweet delicacy - Mysore Pak. 
                    Made with gram flour, sugar, and ghee, this melt-in-your-mouth treat is a 
                    local favorite.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="ml-auto">Find Sweet Shops</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-gradient-to-r from-mysore-royal-purple/20 to-mysore-heritage-red/20 p-6 rounded-2xl mt-8">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-5 w-5 text-mysore-royal-purple" />
            <h3 className="font-heading font-semibold text-lg">Upcoming Events</h3>
          </div>
          <div className="divide-y">
            <div className="py-3">
              <div className="flex justify-between">
                <h4 className="font-medium">Mysuru Dasara</h4>
                <span className="text-sm bg-mysore-marigold/30 text-mysore-heritage-red px-2 py-1 rounded-full">
                  Oct 15-24
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                The state festival of Karnataka. Experience the grandeur of processions, cultural shows, and illuminated palace.
              </p>
            </div>
            <div className="py-3">
              <div className="flex justify-between">
                <h4 className="font-medium">Yoga in the Palace</h4>
                <span className="text-sm bg-mysore-marigold/30 text-mysore-heritage-red px-2 py-1 rounded-full">
                  Every Sunday
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Morning yoga sessions in the beautiful palace grounds. Open to tourists and locals alike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristMode;


import React, { useState } from 'react';
import { Camera, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ComplaintForm = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Complaint submitted:', { description, location, photos });
    // Reset form
    setDescription('');
    setLocation('');
    setPhotos([]);
  };

  return (
    <Card className="mb-8 border-mysore-royal-purple/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-mysore-royal-purple">
          <Send className="h-6 w-6" />
          Register a Complaint
        </CardTitle>
        <CardDescription>
          Report civic issues in your area with geotagged photos and detailed descriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Issue Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Input
                id="location"
                placeholder="Enter location or address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
                required
              />
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photos">Upload Geotagged Photos</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photos')?.click()}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Upload Photos
              </Button>
              {photos.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {photos.length} photo(s) selected
                </span>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-mysore-royal-purple hover:bg-mysore-royal-purple/90"
          >
            Submit Complaint
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;

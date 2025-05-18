
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

// This is a placeholder map component - in a real implementation, this would integrate
// with a mapping library like Google Maps, Mapbox, or Leaflet
const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, this is where we would initialize the map
    if (!mapRef.current) return;
    
    // For now, we'll just display a placeholder with some animation
    const mapPlaceholder = mapRef.current;
    
    // Add some "markers" to the map for visual interest
    const addMarkers = () => {
      const markers = [
        { left: '30%', top: '40%', name: 'Mysore Palace' },
        { left: '45%', top: '25%', name: 'Chamundi Hills' },
        { left: '65%', top: '50%', name: 'Brindavan Gardens' },
        { left: '20%', top: '60%', name: 'Mysore Zoo' },
        { left: '50%', top: '55%', name: 'St. Philomena\'s Church' },
      ];
      
      markers.forEach((marker, index) => {
        const markerEl = document.createElement('div');
        markerEl.className = 'absolute animate-pulse';
        markerEl.style.left = marker.left;
        markerEl.style.top = marker.top;
        
        const pin = document.createElement('div');
        pin.className = 'w-3 h-3 bg-mysore-royal-purple rounded-full shadow-lg relative';
        
        const ripple = document.createElement('div');
        ripple.className = 'absolute -inset-1 bg-mysore-royal-purple/30 rounded-full animate-ping';
        pin.appendChild(ripple);
        
        const label = document.createElement('div');
        label.className = 'absolute top-4 left-1/2 -translate-x-1/2 text-xs font-medium bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap';
        label.textContent = marker.name;
        
        markerEl.appendChild(pin);
        markerEl.appendChild(label);
        
        // Stagger the animation
        setTimeout(() => {
          mapPlaceholder.appendChild(markerEl);
        }, index * 300);
      });
    };
    
    // Simulate map loading
    const loader = document.createElement('div');
    loader.className = 'absolute inset-0 flex items-center justify-center bg-gray-100 z-10';
    loader.innerHTML = '<div class="flex flex-col items-center"><div class="w-8 h-8 border-2 border-t-mysore-royal-purple border-r-mysore-royal-purple border-b-transparent border-l-transparent rounded-full animate-spin mb-2"></div><span class="text-sm">Loading map...</span></div>';
    mapPlaceholder.appendChild(loader);
    
    setTimeout(() => {
      // Remove loader
      loader.classList.add('animate-fade-out');
      setTimeout(() => {
        mapPlaceholder.removeChild(loader);
      }, 300);
      
      // Add markers
      addMarkers();
    }, 1500);
    
  }, []);
  
  return (
    <div className="h-full w-full relative" ref={mapRef}>
      {/* Map will be initialized here */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"></div>
      
      {/* Simulate some roads/paths */}
      <div className="absolute left-1/4 top-1/4 w-1/2 h-[1px] bg-gray-400 rotate-45"></div>
      <div className="absolute left-1/4 top-3/4 w-1/2 h-[1px] bg-gray-400 rotate-[20deg]"></div>
      <div className="absolute left-1/2 top-1/4 w-[1px] h-1/2 bg-gray-400"></div>
      
      {/* Water body simulation */}
      <div className="absolute right-10 bottom-10 w-1/4 h-1/5 rounded-full bg-blue-100/50"></div>
      
      {/* Map controls placeholder */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Card className="w-8 h-8 flex items-center justify-center text-lg font-bold">+</Card>
        <Card className="w-8 h-8 flex items-center justify-center text-lg font-bold">-</Card>
      </div>
      
      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
        Map data placeholder
      </div>
    </div>
  );
};

export default MapComponent;

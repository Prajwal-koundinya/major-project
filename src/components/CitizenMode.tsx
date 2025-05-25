
import React from 'react';
import { Users, Building, AlertTriangle, Phone, Calendar, Megaphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CommunityEvents from './CommunityEvents';
import ComplaintForm from './ComplaintForm';

const CitizenMode = () => {
  const services = [
    {
      icon: Building,
      title: 'Municipal Services',
      description: 'Access city services, pay bills, and track service requests',
      actions: ['Pay Property Tax', 'Water Bill', 'Trade License', 'Birth/Death Certificate']
    },
    {
      icon: AlertTriangle,
      title: 'Report Issues',
      description: 'Report civic issues and track their resolution status',
      actions: ['Pothole Complaints', 'Street Light Issues', 'Garbage Collection', 'Water Supply Problems']
    },
    {
      icon: Phone,
      title: 'Emergency Services',
      description: 'Quick access to emergency contacts and services',
      actions: ['Police: 100', 'Fire: 101', 'Ambulance: 108', 'City Helpline: 1077']
    },
    {
      icon: Calendar,
      title: 'City Events',
      description: 'Stay updated with official city events and announcements',
      actions: ['Public Meetings', 'Cultural Programs', 'Development Projects', 'Public Holidays']
    }
  ];

  return (
    <div className="container pb-16 pt-24 animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Users size={28} className="text-mysore-royal-purple" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Citizen Services</h2>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          Your gateway to Mysuru city services, civic engagement, and community participation.
        </p>

        {/* Complaint Registration Form */}
        <ComplaintForm />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <service.icon className="h-6 w-6 text-mysore-royal-purple" />
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {service.actions.map((action, actionIndex) => (
                    <Button key={actionIndex} variant="outline" size="sm" className="w-full justify-start">
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* City Announcements */}
        <Card className="bg-gradient-to-r from-mysore-royal-purple/5 to-mysore-heritage-red/5 border-mysore-royal-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Megaphone className="h-6 w-6 text-mysore-royal-purple" />
              Latest City Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h4 className="font-semibold text-mysore-royal-purple mb-2">Water Supply Maintenance</h4>
                <p className="text-sm text-muted-foreground">
                  Scheduled maintenance on December 20th from 10 AM to 4 PM in Saraswathipuram area.
                </p>
                <span className="text-xs text-mysore-heritage-red">Dec 18, 2024</span>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h4 className="font-semibold text-mysore-royal-purple mb-2">Traffic Diversion Notice</h4>
                <p className="text-sm text-muted-foreground">
                  Temporary traffic diversion near Mysore Palace due to Dasara preparation works.
                </p>
                <span className="text-xs text-mysore-heritage-red">Dec 15, 2024</span>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h4 className="font-semibold text-mysore-royal-purple mb-2">New Online Services Launch</h4>
                <p className="text-sm text-muted-foreground">
                  Property tax payment and trade license renewal now available online through the citizen portal.
                </p>
                <span className="text-xs text-mysore-heritage-red">Dec 10, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Events Section */}
        <Separator className="my-12" />
        <CommunityEvents />
      </div>
    </div>
  );
};

export default CitizenMode;

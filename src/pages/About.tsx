
import React from 'react';
import { ArrowLeft, Users, Code, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Prajwal Koundinya',
      role: 'Full Stack Developer',
      description: 'Lead developer focused on user experience and system architecture'
    },
    {
      name: 'Likith V K',
      role: 'Frontend Developer',
      description: 'UI/UX specialist ensuring beautiful and responsive design'
    },
    {
      name: 'Tejas I M',
      role: 'Backend Developer',
      description: 'Database and API expert handling server-side functionality'
    },
    {
      name: 'Shramik S',
      role: 'System Designer',
      description: 'Project coordinator and quality assurance specialist'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-mysore-royal-purple">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Meet the team behind Mysuru Assist
            </p>
          </div>
        </div>

        {/* Project Description */}
        <Card className="border-mysore-royal-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-mysore-heritage-red" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Mysuru Assist is a comprehensive digital platform designed to bridge the gap between 
              citizens and tourists in the beautiful city of Mysuru. Our goal is to enhance the 
              experience of both locals and visitors by providing easy access to city services, 
              tourist information, and community engagement opportunities.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We believe in leveraging technology to create smarter, more connected communities 
              while preserving the rich cultural heritage that makes Mysuru special.
            </p>
          </CardContent>
        </Card>

        {/* Team Members */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-mysore-royal-purple" />
            <h2 className="text-2xl font-heading font-bold">Our Team</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-mysore-royal-purple">{member.name}</CardTitle>
                  <CardDescription className="text-mysore-heritage-red font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="bg-gradient-to-r from-mysore-royal-purple/5 to-mysore-heritage-red/5 border-mysore-royal-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Code className="h-6 w-6 text-mysore-royal-purple" />
              Built With Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h4 className="font-semibold text-mysore-royal-purple">React</h4>
                <p className="text-xs text-muted-foreground">Frontend Framework</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h4 className="font-semibold text-mysore-royal-purple">TypeScript</h4>
                <p className="text-xs text-muted-foreground">Type Safety</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h4 className="font-semibold text-mysore-royal-purple">Tailwind CSS</h4>
                <p className="text-xs text-muted-foreground">Styling</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h4 className="font-semibold text-mysore-royal-purple">Shadcn/ui</h4>
                <p className="text-xs text-muted-foreground">Components</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-mysore-heritage-red/20">
          <CardHeader>
            <CardTitle className="text-mysore-heritage-red">Get In Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Have feedback or suggestions? We'd love to hear from you! This project was 
              developed with the vision of making Mysuru more accessible and connected 
              for everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;

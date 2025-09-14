import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import CommunityHubDialog from '@/components/common/CommunityHub';
import { 
  Shield, 
  Eye, 
  TrendingUp, 
  Users, 
  Building, 
  GraduationCap,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Globe
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Verified',
      description: 'Every transaction is cryptographically verified and stored on blockchain for immutable proof.'
    },
    {
      icon: Eye,
      title: 'Complete Transparency',
      description: 'Track funds from source to destination with real-time updates and detailed audit trails.'
    },
    {
      icon: TrendingUp,
      title: 'Anomaly Detection',
      description: 'AI-powered system detects unusual patterns and potential fraud automatically.'
    },
    {
      icon: Users,
      title: 'Community Feedback',
      description: 'Citizens can provide feedback and report issues directly through the platform.'
    }
  ];

  const stats = [
    { label: 'Total Tracked', value: '₹2,50,000 Cr', description: 'Government & Institution Funds' },
    { label: 'Transactions', value: '1,32,142', description: 'Verified on Blockchain' },
    { label: 'Institutions', value: '2,847', description: 'Connected Nationwide' },
    { label: 'Citizens Served', value: '15.2M', description: 'Empowered with Transparency' }
  ];

  const useCases = [
    {
      icon: Building,
      title: 'Government Departments',
      description: 'Health Ministry, Education, Infrastructure - track budget allocation and spending',
      link: '/government',
      color: 'from-primary/10 to-secondary/10'
    },
    {
      icon: GraduationCap,
      title: 'Educational Institutions',
      description: 'Colleges, Universities - transparent fee collection and fund utilization',
      link: '/institutions',
      color: 'from-secondary/10 to-accent/10'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-20">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" variant="outline">
            Powered by Blockchain • Trusted by Millions
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Financial Transparency
            <br />
            for Everyone
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            FundsFlow brings clarity and trust to public and institutional finances through 
            blockchain-verified transactions, real-time tracking, and community oversight.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="hero" asChild>
              <Link to="/government">
                Explore Government Funds
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="hero" asChild>
              <Link to="/institutions">
                View Institutions
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-surface/50 border-border/30 hover:bg-surface transition-colors">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Where FundsFlow Makes a Difference</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From government departments to educational institutions, we're transforming 
              how financial transparency works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card key={index} className={`relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${useCase.color}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <useCase.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6 leading-relaxed">
                    {useCase.description}
                  </CardDescription>
                  <Button variant="default" asChild className="group-hover:shadow-md transition-all">
                    <Link to={useCase.link}>
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Trust & Accountability</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to ensure complete transparency and build trust 
              between institutions and the communities they serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience True Transparency?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of institutions and millions of citizens who trust FundsFlow 
            for complete financial transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="secondary" size="hero" asChild>
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <CommunityHubDialog />
          </div>

          <div className="flex items-center justify-center space-x-8 mt-12 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Blockchain Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Nationwide Coverage</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
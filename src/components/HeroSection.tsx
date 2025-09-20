import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RegisterModal } from './modals/RegisterModal';
import { useUser } from '@/contexts/UserContext';
import heroImage from '@/assets/hero-youth.jpg';

export const HeroSection: React.FC = () => {
  const { isLoggedIn } = useUser();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Unlock Your Potential with 
                <span className="block text-primary-light">Government Initiatives</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-lg">
                Join a platform designed to help youth connect with various career and education opportunities.
              </p>

              {!isLoggedIn ? (
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 text-lg font-semibold shadow-government"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Register Now
                </Button>
              ) : (
                <Button 
                  size="lg"
                  className="bg-success hover:bg-success-light text-success-foreground px-8 py-3 text-lg font-semibold shadow-government"
                  onClick={() => window.location.href = '/quizzes'}
                >
                  Take Quiz
                </Button>
              )}
            </div>

            {/* Image */}
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Young people collaborating"
                className="rounded-lg shadow-government w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-accent-foreground mb-4">
            Sign up today and unlock your full potential!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of youth across India in building a brighter future
          </p>
          {!isLoggedIn ? (
            <Button 
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-opacity px-8 py-3"
              onClick={() => setShowRegisterModal(true)}
            >
              Get Started Today
            </Button>
          ) : (
            <Button 
              size="lg"
              className="bg-gradient-secondary hover:opacity-90 transition-opacity px-8 py-3"
              onClick={() => window.location.href = '/quizzes'}
            >
              Explore Quizzes
            </Button>
          )}
        </div>
      </section>

      <RegisterModal 
        open={showRegisterModal} 
        onOpenChange={setShowRegisterModal}
      />
    </>
  );
};
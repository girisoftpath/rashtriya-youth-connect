import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { LoginModal } from './modals/LoginModal';
import { RegisterModal } from './modals/RegisterModal';
import { MobileRegisterModal } from './modals/MobileRegisterModal';
import { OTPModal } from './modals/OTPModal';
import governmentLogo from '@/assets/government-logo.png';
import yasLogo from '@/assets/yas-logo.png';
import mybharatLogo from '@/assets/mybharat-logo.png';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const { user, isLoggedIn, logout } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showMobileRegisterModal, setShowMobileRegisterModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={governmentLogo} 
                  alt="Government of India" 
                  className="h-12 w-12 object-contain"
                />
                <img 
                  src={yasLogo} 
                  alt="Ministry of Youth Affairs & Sports" 
                  className="h-12 w-auto object-contain"
                />
                <img 
                  src={mybharatLogo} 
                  alt="MY Bharat" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary">MY Bharat Portal</h1>
                <p className="text-sm text-muted-foreground">Youth Empowerment Initiative</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#youth" className="text-foreground hover:text-primary transition-colors font-medium">Youth</a>
              <a href="/quizzes" className="text-foreground hover:text-primary transition-colors font-medium">Quiz</a>
              <a href="#cv-builder" className="text-foreground hover:text-primary transition-colors font-medium">CV Builder</a>
              <a href="#experimental-learning" className="text-foreground hover:text-primary transition-colors font-medium">Experimental Learning</a>
              <a href="#volunteer" className="text-foreground hover:text-primary transition-colors font-medium">Volunteer for Bharath</a>
              <a href="#vbyld" className="text-foreground hover:text-primary transition-colors font-medium">VBYLD-2026</a>
              <a href="#mega-events" className="text-foreground hover:text-primary transition-colors font-medium">Mega Events</a>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="ghost"
                    onClick={() => setShowLoginModal(true)}
                    className="text-foreground hover:text-primary"
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:opacity-90 transition-opacity"
                    onClick={() => setShowMobileRegisterModal(true)}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <MobileRegisterModal 
        open={showMobileRegisterModal} 
        onOpenChange={setShowMobileRegisterModal}
        onOTPSent={(mobile) => {
          setMobileNumber(mobile);
          setShowMobileRegisterModal(false);
          setShowOTPModal(true);
        }}
        onSwitchToLogin={() => {
          setShowMobileRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
      <OTPModal 
        open={showOTPModal} 
        onOpenChange={setShowOTPModal}
        mobileNumber={mobileNumber}
        onVerifySuccess={() => {
          setShowOTPModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal 
        open={showRegisterModal} 
        onOpenChange={setShowRegisterModal}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};
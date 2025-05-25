
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Languages, LogIn, User, Users } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    countryCode: '+91'
  });

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
  ];

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate credentials
    console.log('Login attempt:', formData);
    onLogin();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically create new account
    console.log('Signup attempt:', formData);
    onLogin();
  };

  const content = {
    en: {
      welcome: 'Welcome to Mysuru',
      subtitle: 'Your gateway to the City of Palaces',
      loginTab: 'Login',
      signupTab: 'Sign Up',
      loginTitle: 'Sign in to your account',
      loginDesc: 'Enter your credentials to access your account',
      signupTitle: 'Create new account',
      signupDesc: 'Join us to explore Mysuru and report civic issues',
      emailLabel: 'Email Address',
      mobileLabel: 'Mobile Number',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      fullNameLabel: 'Full Name',
      languageLabel: 'Choose Language',
      loginButton: 'Sign In',
      signupButton: 'Create Account',
      switchToMobile: 'Use Mobile Number',
      switchToEmail: 'Use Email Address',
      orContinue: 'Or continue with',
      tourist: 'Tourist',
      citizen: 'Citizen',
      government: 'Government Official'
    },
    hi: {
      welcome: 'मैसूरु में आपका स्वागत है',
      subtitle: 'महलों के शहर का प्रवेश द्वार',
      loginTab: 'लॉगिन',
      signupTab: 'साइन अप',
      loginTitle: 'अपने खाते में साइन इन करें',
      loginDesc: 'अपने खाते तक पहुंचने के लिए अपनी जानकारी दर्ज करें',
      signupTitle: 'नया खाता बनाएं',
      signupDesc: 'मैसूरु का अन्वेषण करने और नागरिक मुद्दों की रिपोर्ट करने के लिए हमसे जुड़ें',
      emailLabel: 'ईमेल पता',
      mobileLabel: 'मोबाइल नंबर',
      passwordLabel: 'पासवर्ड',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      fullNameLabel: 'पूरा नाम',
      languageLabel: 'भाषा चुनें',
      loginButton: 'साइन इन करें',
      signupButton: 'खाता बनाएं',
      switchToMobile: 'मोबाइल नंबर का उपयोग करें',
      switchToEmail: 'ईमेल पते का उपयोग करें',
      orContinue: 'या इसके साथ जारी रखें',
      tourist: 'पर्यटक',
      citizen: 'नागरिक',
      government: 'सरकारी अधिकारी'
    },
    kn: {
      welcome: 'ಮೈಸೂರಿಗೆ ಸ್ವಾಗತ',
      subtitle: 'ಅರಮನೆಗಳ ನಗರಕ್ಕೆ ನಿಮ್ಮ ಪ್ರವೇಶದ್ವಾರ',
      loginTab: 'ಲಾಗಿನ್',
      signupTab: 'ಸೈನ್ ಅಪ್',
      loginTitle: 'ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
      loginDesc: 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ',
      signupTitle: 'ಹೊಸ ಖಾತೆ ರಚಿಸಿ',
      signupDesc: 'ಮೈಸೂರನ್ನು ಅನ್ವೇಷಿಸಲು ಮತ್ತು ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಲು ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ',
      emailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ',
      mobileLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
      confirmPasswordLabel: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
      fullNameLabel: 'ಪೂರ್ಣ ಹೆಸರು',
      languageLabel: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
      loginButton: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
      signupButton: 'ಖಾತೆ ರಚಿಸಿ',
      switchToMobile: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಬಳಸಿ',
      switchToEmail: 'ಇಮೇಲ್ ವಿಳಾಸ ಬಳಸಿ',
      orContinue: 'ಅಥವಾ ಇದರೊಂದಿಗೆ ಮುಂದುವರಿಸಿ',
      tourist: 'ಪ್ರವಾಸಿ',
      citizen: 'ನಾಗರಿಕ',
      government: 'ಸರ್ಕಾರಿ ಅಧಿಕಾರಿ'
    }
  };

  const t = content[selectedLanguage as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-mysore-royal-purple via-mysore-marigold/20 to-mysore-palace-gold/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="mb-6 flex justify-center">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48 glassmorphism">
              <Languages className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-md">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Main Card */}
        <Card className="glassmorphism border-white/30">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-mysore-royal-purple to-mysore-marigold rounded-full flex items-center justify-center">
              <div className="text-2xl font-bold text-white">M</div>
            </div>
            <div>
              <CardTitle className="text-2xl font-heading text-mysore-royal-purple">
                {t.welcome}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {t.subtitle}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 glassmorphism">
                <TabsTrigger value="login">{t.loginTab}</TabsTrigger>
                <TabsTrigger value="signup">{t.signupTab}</TabsTrigger>
              </TabsList>
              
              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">{t.loginTitle}</h3>
                  <p className="text-sm text-gray-600">{t.loginDesc}</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Login Method Toggle */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={loginMethod === 'email' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoginMethod('email')}
                      className="flex-1"
                    >
                      {t.switchToEmail}
                    </Button>
                    <Button
                      type="button"
                      variant={loginMethod === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoginMethod('mobile')}
                      className="flex-1"
                    >
                      {t.switchToMobile}
                    </Button>
                  </div>

                  {/* Email/Mobile Input */}
                  {loginMethod === 'email' ? (
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.emailLabel}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="mobile">{t.mobileLabel}</Label>
                      <div className="flex gap-2">
                        <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          placeholder="9876543210"
                          className="flex-1"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.passwordLabel}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-mysore-royal-purple hover:bg-mysore-royal-purple/90">
                    <LogIn className="w-4 h-4 mr-2" />
                    {t.loginButton}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">{t.signupTitle}</h3>
                  <p className="text-sm text-gray-600">{t.signupDesc}</p>
                </div>
                
                <form onSubmit={handleSignup} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullNameLabel}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Login Method Toggle */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={loginMethod === 'email' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoginMethod('email')}
                      className="flex-1"
                    >
                      {t.switchToEmail}
                    </Button>
                    <Button
                      type="button"
                      variant={loginMethod === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoginMethod('mobile')}
                      className="flex-1"
                    >
                      {t.switchToMobile}
                    </Button>
                  </div>

                  {/* Email/Mobile Input */}
                  {loginMethod === 'email' ? (
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{t.emailLabel}</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="signup-mobile">{t.mobileLabel}</Label>
                      <div className="flex gap-2">
                        <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="signup-mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          placeholder="9876543210"
                          className="flex-1"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t.passwordLabel}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t.confirmPasswordLabel}</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-mysore-royal-purple hover:bg-mysore-royal-purple/90">
                    <User className="w-4 h-4 mr-2" />
                    {t.signupButton}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Quick Access Buttons */}
            <div className="mt-6">
              <Separator className="my-4" />
              <p className="text-center text-sm text-gray-600 mb-4">{t.orContinue}</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={onLogin} className="flex flex-col h-16 gap-1">
                  <User className="w-4 h-4" />
                  <span className="text-xs">{t.tourist}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={onLogin} className="flex flex-col h-16 gap-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">{t.citizen}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={onLogin} className="flex flex-col h-16 gap-1">
                  <LogIn className="w-4 h-4" />
                  <span className="text-xs">{t.government}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, CheckCircle, Home, TrendingUp, Users, Award, Clock, Shield, Star, DollarSign, FileText, Search, ChevronDown, ChevronRight, ArrowLeft, Building2, Target, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Label } from './components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Badge } from './components/ui/badge';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Slider } from './components/ui/slider';
import yamanPhoto from 'figma:asset/62ea924c00b12b7a7ac23d7f281dd070e0528c69.png';
import { BookConsultation } from './components/BookConsultation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking'>('home');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    houseType: '',
    budget: [500000],
    mortgageStatus: '',
    propertyType: ''
  });

  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handleBack = () => {
    setFormStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormStep(1);
    }, 5000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      setCurrentPage('booking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Show booking page if selected
  if (currentPage === 'booking') {
    return <BookConsultation onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Modern Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-amber-400 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Realtor Yadav</h1>
            <p className="text-xs text-slate-400">Edmonton Real Estate Expert</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection('about')} className="hidden md:inline text-slate-300 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0">About Me</button>
            <button onClick={() => scrollToSection('services')} className="hidden md:inline text-slate-300 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0">Services</button>
            <button onClick={() => scrollToSection('contact')} className="hidden md:inline text-slate-300 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0">FAQ</button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-4 py-2 rounded-lg hover:from-amber-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book Consultation</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section with Form */}
      <section 
        id="hero"
        className="relative min-h-[700px] md:min-h-[800px] bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.85) 50%, rgba(15, 23, 42, 0.5) 100%), url('https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxMzA0MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Side - Content */}
              <div className="text-white pt-8">
                <Badge className="mb-6 bg-amber-500 text-slate-900 hover:bg-amber-400 border-0">
                  🏆 Licensed REALTOR® • Edmonton, AB
                </Badge>
                
                <h2 className="text-white mb-6 text-5xl md:text-6xl leading-tight">
                  Find Your Dream Home in Edmonton
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                  Expert guidance for buyers and sellers. Let's make your real estate journey simple, transparent, and successful.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                  <h4 className="text-white mb-4">Why Choose Realtor Yadav?</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1">
                        <CheckCircle className="w-4 h-4 text-slate-900" />
                      </div>
                      <p className="text-gray-200">Deep knowledge of Edmonton neighborhoods and market trends</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1">
                        <CheckCircle className="w-4 h-4 text-slate-900" />
                      </div>
                      <p className="text-gray-200">Personalized service tailored to your unique goals</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1">
                        <CheckCircle className="w-4 h-4 text-slate-900" />
                      </div>
                      <p className="text-gray-200">Proven track record with 100+ satisfied clients</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1">
                        <CheckCircle className="w-4 h-4 text-slate-900" />
                      </div>
                      <p className="text-gray-200">Available 7 days a week for your convenience</p>
                    </div>
                  </div>
                </div>

                <a href="tel:587-568-8591" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition">
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">587-568-8591</span>
                </a>
              </div>

              {/* Right Side - Form Card */}
              <div id="contact" className="lg:pt-0">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardContent className="p-6 md:p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="mb-3">Thank You!</h3>
                        <p className="text-gray-600 mb-2">
                          I've received your consultation request and will contact you within 24 hours.
                        </p>
                        <p className="text-gray-600 mb-6">
                          In the meantime, feel free to call me directly at <a href="tel:587-568-8591" className="text-blue-600 hover:underline">587-568-8591</a>
                        </p>
                        <Button onClick={() => setSubmitted(false)} variant="outline">
                          Submit Another Request
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-6">
                          <h3 className="mb-2">Book Your Free Consultation</h3>
                          <p className="text-gray-600">Fill out the form below to get started</p>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Step {formStep} of 2</span>
                            <span className="text-sm text-gray-600">{formStep === 1 ? 'Personal Info' : 'Property Details'}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-amber-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(formStep / 2) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Step 1: Personal Information */}
                        {formStep === 1 && (
                          <form onSubmit={handleNext} className="space-y-5">
                            <div>
                              <Label htmlFor="name">Full Name *</Label>
                              <Input 
                                id="name" 
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-2"
                                placeholder="John Smith"
                              />
                            </div>

                            <div>
                              <Label htmlFor="phone">Phone Number *</Label>
                              <Input 
                                id="phone" 
                                type="tel" 
                                required 
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="mt-2"
                                placeholder="(587) 123-4567"
                              />
                            </div>

                            <div>
                              <Label htmlFor="email">Email Address *</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                required 
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-2"
                                placeholder="john@example.com"
                              />
                            </div>

                            <div>
                              <Label className="mb-3 block">Is this your first house or second? *</Label>
                              <RadioGroup 
                                required 
                                value={formData.houseType}
                                onValueChange={(value) => setFormData({ ...formData, houseType: value })}
                              >
                                <div className="flex items-center space-x-2 mb-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                  <RadioGroupItem value="first" id="first" />
                                  <Label htmlFor="first" className="cursor-pointer flex-1">🏠 First House (First-time buyer)</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                  <RadioGroupItem value="second" id="second" />
                                  <Label htmlFor="second" className="cursor-pointer flex-1">🏘️ Second House or More</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg" size="lg">
                              Next Step
                              <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>

                            <div className="bg-slate-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600 text-center">
                                <Shield className="w-4 h-4 inline mr-1" />
                                100% Confidential. No spam, ever.
                              </p>
                            </div>
                          </form>
                        )}

                        {/* Step 2: Property Details */}
                        {formStep === 2 && (
                          <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                              <Label htmlFor="budget" className="mb-3 block">
                                Budget (CAD) *
                              </Label>
                              <div className="space-y-4">
                                <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg border-2 border-blue-200">
                                  <span className="text-blue-700">{formatCurrency(formData.budget[0])}</span>
                                </div>
                                <Slider
                                  id="budget"
                                  min={50000}
                                  max={2000000}
                                  step={10000}
                                  value={formData.budget}
                                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                                  className="mt-2"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>$50K</span>
                                  <span>$2M</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="mortgageStatus">Mortgage Approval Status *</Label>
                              <Select 
                                required
                                value={formData.mortgageStatus}
                                onValueChange={(value) => setFormData({ ...formData, mortgageStatus: value })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pre-approved">✅ Pre-Approved</SelectItem>
                                  <SelectItem value="not-started">🔍 Not Started Yet</SelectItem>
                                  <SelectItem value="in-progress">📝 Application In Progress</SelectItem>
                                  <SelectItem value="approved">✨ Fully Approved</SelectItem>
                                  <SelectItem value="cash-buyer">💵 Cash Buyer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="propertyType">Property Type *</Label>
                              <Select 
                                required
                                value={formData.propertyType}
                                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="house">🏠 House</SelectItem>
                                  <SelectItem value="duplex">🏘️ Duplex</SelectItem>
                                  <SelectItem value="triplex">🏘️ Triplex</SelectItem>
                                  <SelectItem value="apartment-1br">🏢 Apartment - 1 Bedroom</SelectItem>
                                  <SelectItem value="apartment-2br">🏢 Apartment - 2 Bedrooms</SelectItem>
                                  <SelectItem value="apartment-3br">🏢 Apartment - 3 Bedrooms</SelectItem>
                                  <SelectItem value="condominium">🏙️ Condominium</SelectItem>
                                  <SelectItem value="land">🌳 Land</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex gap-3">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={handleBack}
                                className="w-1/3"
                              >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                              </Button>
                              <Button 
                                type="submit" 
                                className="w-2/3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg" 
                                size="lg"
                              >
                                Submit Request
                                <CheckCircle className="w-5 h-5 ml-2" />
                              </Button>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600 text-center">
                                <Shield className="w-4 h-4 inline mr-1" />
                                Response within 24 hours guaranteed
                              </p>
                            </div>
                          </form>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 py-16 border-y border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition">
                <div className="text-amber-400 mb-2 text-4xl md:text-5xl">100+</div>
                <p className="text-slate-300">Happy Clients</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition">
                <div className="text-amber-400 mb-2 text-4xl md:text-5xl">5+</div>
                <p className="text-slate-300">Years Experience</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition">
                <div className="text-amber-400 mb-2 text-4xl md:text-5xl">95%</div>
                <p className="text-slate-300">Satisfaction Rate</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition">
                <div className="text-amber-400 mb-2 text-4xl md:text-5xl">$50M+</div>
                <p className="text-slate-300">In Sales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98)), url('https://images.unsplash.com/photo-1706809019104-02d83b4541ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzYxMzA0MjgyfDA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-amber-500/20 text-amber-400 border-amber-500/50">About Me</Badge>
              <h2 className="mb-4 text-white">Meet Yaman Yadav</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Your trusted partner in navigating Edmonton's real estate market
              </p>
            </div>

            {/* Photo and Experience Section */}
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-16">
              {/* Professional Photo */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative">
                  <img 
                    src={yamanPhoto}
                    alt="Yaman Yadav - Edmonton Real Estate Agent"
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl border-2 border-white/10"
                  />
                </div>
              </div>

              {/* Experience Highlights */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition">
                  <CardContent className="pt-6 text-center">
                    <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-3xl text-white mb-1">5+</div>
                    <p className="text-slate-300 text-sm">Years Experience</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-500/30 backdrop-blur-sm hover:scale-105 transition">
                  <CardContent className="pt-6 text-center">
                    <Users className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-3xl text-white mb-1">100+</div>
                    <p className="text-slate-300 text-sm">Happy Clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 backdrop-blur-sm hover:scale-105 transition">
                  <CardContent className="pt-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-3xl text-white mb-1">$50M+</div>
                    <p className="text-slate-300 text-sm">In Sales</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition">
                  <CardContent className="pt-6 text-center">
                    <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-3xl text-white mb-1">4.9★</div>
                    <p className="text-slate-300 text-sm">Client Rating</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                  <CardContent className="pt-6">
                    <h3 className="mb-4 text-white">Professional Background</h3>
                    <p className="text-slate-300 mb-4">
                      As a licensed REALTOR® with deep roots in the Edmonton community, I bring a unique combination of local market expertise, professional training, and genuine passion for helping people achieve their real estate dreams.
                    </p>
                    <p className="text-slate-300">
                      My approach is built on three pillars: <span className="text-amber-400">integrity</span>, <span className="text-amber-400">expertise</span>, and <span className="text-amber-400">results</span>. I believe that every client deserves personalized attention and honest guidance throughout their real estate journey.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                  <CardContent className="pt-6">
                    <h4 className="mb-4 text-white">What Sets Me Apart</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">In-depth knowledge of Edmonton neighborhoods and market trends</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Strong negotiation skills that protect your interests</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Responsive communication - I'm always just a call away</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Commitment to transparency and ethical practices</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                  <CardContent className="pt-6">
                    <h3 className="mb-4 text-white">My Commitment to You</h3>
                    <p className="text-slate-300 mb-4">
                      When you work with me, you're not just getting a real estate agent—you're gaining a trusted advisor who is invested in your success. I take the time to understand your unique situation, goals, and concerns.
                    </p>
                    <p className="text-slate-300">
                      Whether you're a first-time buyer feeling overwhelmed by the process, a growing family looking for more space, or a homeowner ready to sell and move on to your next chapter, I provide the expertise and support you need to make informed, confident decisions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/20 to-blue-500/20 border-amber-500/30 backdrop-blur-sm hover:bg-amber-500/30 transition">
                  <CardContent className="pt-6">
                    <Sparkles className="w-8 h-8 text-amber-400 mb-3" />
                    <h4 className="mb-3 text-white">My Promise</h4>
                    <p className="text-slate-200 mb-4 italic">
                      "I promise to listen to your needs, provide honest advice, work tirelessly on your behalf, and guide you through every step of your real estate journey with professionalism and care."
                    </p>
                    <p className="text-amber-400">— Yaman Yadav, REALTOR®</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/50">Services</Badge>
              <h2 className="mb-4 text-white">How I Can Help You</h2>
              <p className="text-xl text-slate-300">
                Comprehensive real estate services tailored to your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Buying */}
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition backdrop-blur-sm group">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-white">Home Buying</h3>
                  <p className="text-slate-300 mb-4">
                    Find your dream home with expert guidance through every step of the buying process.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Personalized property search</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Neighborhood insights & analysis</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Negotiation & offer preparation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Support through closing</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Selling */}
              <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-500/30 hover:from-amber-500/30 hover:to-amber-600/30 transition backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-amber-500 text-slate-900 border-0">Most Popular</Badge>
                </div>
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-white">Home Selling</h3>
                  <p className="text-slate-200 mb-4">
                    Maximize your home's value with strategic marketing and expert negotiation.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      <span>Professional market evaluation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      <span>High-impact marketing strategy</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      <span>Professional photography & staging</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      <span>Expert price negotiation</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-600 hover:to-amber-700 cursor-pointer shadow-lg shadow-amber-500/30 border-0"
                  >
                    Get Free Evaluation
                  </Button>
                </CardContent>
              </Card>

              {/* Investment */}
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition backdrop-blur-sm group">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-white">Investment Properties</h3>
                  <p className="text-slate-300 mb-4">
                    Build wealth through smart real estate investments in Edmonton's growing market.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Investment property analysis</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>ROI & cash flow projections</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Market trend insights</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Portfolio growth strategy</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 cursor-pointer shadow-lg shadow-green-500/20"
                  >
                    Explore Options
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-amber-500/20 text-amber-400 border-amber-500/50">Process</Badge>
              <h2 className="mb-4 text-white">My Consultation Process</h2>
              <p className="text-xl text-slate-300">
                What to expect when you book a consultation with me
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="bg-gradient-to-br from-blue-500 to-amber-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  1
                </div>
                <h4 className="mb-2 text-white">Initial Contact</h4>
                <p className="text-slate-400 text-sm">
                  Book your free consultation through the form or call me directly. I'll respond within 24 hours.
                </p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="bg-gradient-to-br from-blue-500 to-amber-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  2
                </div>
                <h4 className="mb-2 text-white">Discovery Meeting</h4>
                <p className="text-slate-400 text-sm">
                  We'll discuss your goals, timeline, and specific needs. In-person, phone, or video call.
                </p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="bg-gradient-to-br from-blue-500 to-amber-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  3
                </div>
                <h4 className="mb-2 text-white">Custom Strategy</h4>
                <p className="text-slate-400 text-sm">
                  I'll create a personalized action plan tailored to your situation with clear next steps.
                </p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="bg-gradient-to-br from-blue-500 to-amber-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  4
                </div>
                <h4 className="mb-2 text-white">Moving Forward</h4>
                <p className="text-slate-400 text-sm">
                  If you decide to work together, I'll guide you through every step with ongoing support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/50">Testimonials</Badge>
              <h2 className="mb-4 text-white">What Clients Say</h2>
              <p className="text-xl text-slate-300">
                Real experiences from real people I've helped
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-slate-300 mb-6 italic">
                    "Yaman made our first home purchase stress-free. He explained everything clearly, was patient with all our questions, and found us the perfect starter home in our budget."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white">AK</span>
                    </div>
                    <div>
                      <p className="text-white">Anita K.</p>
                      <p className="text-sm text-slate-400">First-Time Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-slate-300 mb-6 italic">
                    "Sold our home above asking price in less than a week! Yaman's marketing strategy and negotiation skills are exceptional. Highly recommend!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <span className="text-white">HS</span>
                    </div>
                    <div>
                      <p className="text-white">Harpreet S.</p>
                      <p className="text-sm text-slate-400">Home Seller</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-slate-300 mb-6 italic">
                    "As an investor, I needed someone who understood the numbers. Yaman provided detailed analysis and helped me build a profitable rental property portfolio."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white">RD</span>
                    </div>
                    <div>
                      <p className="text-white">Rajesh D.</p>
                      <p className="text-sm text-slate-400">Real Estate Investor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/50">Benefits</Badge>
              <h2 className="mb-4 text-white">Why Work With Me?</h2>
              <p className="text-xl text-slate-300">
                The advantages of choosing Realtor Yadav
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-white">Local Market Expert</h4>
                  <p className="text-slate-400">
                    Deep knowledge of Edmonton neighborhoods, schools, amenities, and market trends to help you make informed decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-white">Always Available</h4>
                  <p className="text-slate-400">
                    Responsive communication when you need it. I'm just a call, text, or email away, ready to answer your questions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-white">Client Protection</h4>
                  <p className="text-slate-400">
                    Your interests always come first. I provide honest advice and strong negotiation to protect your investment.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-white">Maximum Value</h4>
                  <p className="text-slate-400">
                    Whether buying or selling, I work to ensure you get the best possible value for your money and property.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-white">Smooth Transactions</h4>
                  <p className="text-slate-400">
                    I handle all the paperwork, coordination, and details so you can focus on your exciting next chapter.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-white">Personalized Service</h4>
                  <p className="text-slate-400">
                    No cookie-cutter approach. I tailor my service to your unique needs, timeline, and goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/50">FAQ</Badge>
              <h2 className="mb-4 text-white">Frequently Asked Questions</h2>
              <p className="text-xl text-slate-300">
                Common questions about working with a realtor
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white/5 px-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <AccordionTrigger className="hover:no-underline text-white hover:text-amber-400">
                  <span>What does the consultation cost?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-300">
                    The initial consultation is completely free with no obligation. This is an opportunity for us to meet, discuss your goals, and see if we're a good fit to work together. I believe in earning your trust before asking for your business.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white/5 px-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <AccordionTrigger className="hover:no-underline text-white hover:text-amber-400">
                  <span>How long does the buying/selling process typically take?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-300">
                    The timeline varies depending on your specific situation and market conditions. For buyers, it can range from a few weeks to several months depending on your criteria and the current inventory. For sellers, homes can sell quickly in the right market—sometimes within days—but I recommend planning for 30-90 days for the complete process including closing.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white/5 px-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <AccordionTrigger className="hover:no-underline text-white hover:text-amber-400">
                  <span>What areas of Edmonton do you serve?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-300">
                    I serve all of Edmonton and surrounding areas including St. Albert, Sherwood Park, Spruce Grove, and other neighboring communities. My extensive knowledge of the greater Edmonton area ensures I can help you find the perfect location for your needs.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white/5 px-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <AccordionTrigger className="hover:no-underline text-white hover:text-amber-400">
                  <span>Do you work with first-time home buyers?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-300">
                    Absolutely! I love working with first-time buyers. I understand the process can feel overwhelming, so I take extra time to explain each step, answer all your questions, and ensure you feel confident in your decisions. I'll also connect you with trusted mortgage brokers, home inspectors, and other professionals you'll need.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white/5 px-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <AccordionTrigger className="hover:no-underline text-white hover:text-amber-400">
                  <span>How do realtor fees work?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-300">
                    For buyers, my services are typically free—the seller pays the commission. For sellers, commission rates are negotiable and discussed during our initial consultation. I believe in transparency, so all fees and costs will be clearly explained upfront with no hidden surprises.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white/5 px-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <AccordionTrigger className="hover:no-underline text-white hover:text-amber-400">
                  <span>Can I schedule a consultation outside of business hours?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-300">
                    Yes! I understand that you have a busy schedule. I'm happy to accommodate evening and weekend consultations. Just let me know your preferred time when you book, and I'll do my best to make it work.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA after FAQ */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-br from-amber-500/10 to-blue-500/10 border border-amber-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="mb-4 text-white">Still Have Questions?</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Book a free consultation to discuss your real estate goals and get personalized answers to all your questions.
                </p>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/30"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-amber-400 mb-4">Realtor Yadav</h3>
              <p className="text-slate-400 mb-4">
                Your trusted Edmonton real estate expert, dedicated to helping you find your dream home.
              </p>
              <div className="flex gap-4">
                <a href="tel:587-568-8591" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:bg-white/10 transition">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="mailto:yaman@realtoryadav.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:bg-white/10 transition">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('about')} className="text-slate-400 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0">About Me</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-slate-400 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0">Services</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0">Book Consultation</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0">FAQ</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Contact Info</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                  <a href="tel:587-568-8591" className="hover:text-amber-400 transition">587-568-8591</a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                  <a href="mailto:yaman@realtoryadav.com" className="hover:text-amber-400 transition">yaman@realtoryadav.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                  <span>Serving Edmonton & Surrounding Areas</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>© 2025 Realtor Yadav. All rights reserved. | Licensed REALTOR® serving Edmonton, AB</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

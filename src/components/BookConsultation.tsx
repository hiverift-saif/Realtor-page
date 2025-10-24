import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  CheckCircle, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock,
  Shield,
  Award,
  Star,
  Home as HomeIcon
} from 'lucide-react';
import yamanPhoto from 'figma:asset/62ea924c00b12b7a7ac23d7f281dd070e0528c69.png';

interface BookConsultationProps {
  onBack: () => void;
}

export function BookConsultation({ onBack }: BookConsultationProps) {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goal: '',
    firstHouse: '',
    budget: '',
    timeline: '',
    location: '',
    propertyType: '',
    additionalInfo: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setFormStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition bg-transparent border-0 cursor-pointer p-0"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
            </div>
            <div>
              <h1 className="text-amber-400">Realtor Yadav</h1>
              <p className="text-xs text-slate-400 text-right">Edmonton Real Estate Expert</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/50">
                Free Consultation
              </Badge>
              <h1 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">
                Book Your Consultation
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                Let's discuss your real estate goals and create a personalized plan for your success
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
              {/* Left Column - Agent Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Agent Card */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative group mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition"></div>
                        <img 
                          src={yamanPhoto}
                          alt="Yaman Yadav"
                          className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-white/10"
                        />
                      </div>
                      <h3 className="text-white mb-1">Yaman Yadav</h3>
                      <p className="text-slate-400 text-sm">Licensed REALTOR®</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-slate-400 text-sm ml-1">(4.9)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Phone</p>
                          <a href="tel:587-568-8591" className="text-slate-200 hover:text-amber-400 transition">
                            587-568-8591
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Email</p>
                          <a href="mailto:yaman@realtoryadav.com" className="text-slate-200 hover:text-amber-400 transition break-all">
                            yaman@realtoryadav.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Service Area</p>
                          <p className="text-slate-200">Edmonton & Surrounding Areas</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 backdrop-blur-sm">
                    <CardContent className="pt-6 text-center">
                      <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl text-white mb-1">5+</div>
                      <p className="text-slate-300 text-xs">Years Exp.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-500/30 backdrop-blur-sm">
                    <CardContent className="pt-6 text-center">
                      <HomeIcon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                      <div className="text-2xl text-white mb-1">100+</div>
                      <p className="text-slate-300 text-xs">Happy Clients</p>
                    </CardContent>
                  </Card>
                </div>

                {/* What to Expect */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hidden lg:block">
                  <CardContent className="p-6">
                    <h4 className="text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      What to Expect
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Response within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">30-minute free consultation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Personalized market insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">No obligation or pressure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Available evenings & weekends</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-3">
                <Card className="shadow-2xl border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="mb-3 text-white text-2xl">Thank You!</h3>
                        <p className="text-slate-300 mb-2">
                          I've received your consultation request and will contact you within 24 hours.
                        </p>
                        <p className="text-slate-300 mb-6">
                          In the meantime, feel free to call me directly at{' '}
                          <a href="tel:587-568-8591" className="text-amber-400 hover:underline">
                            587-568-8591
                          </a>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button 
                            onClick={() => setSubmitted(false)} 
                            variant="outline"
                            className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
                          >
                            Submit Another Request
                          </Button>
                          <Button 
                            onClick={onBack}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-600 hover:to-amber-700"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-6">
                          <h3 className="mb-2 text-white">Let's Get Started</h3>
                          <p className="text-slate-400">Fill out the form below to book your free consultation</p>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">Step {formStep} of 2</span>
                            <span className="text-sm text-slate-400">
                              {formStep === 1 ? 'Personal Info' : 'Property Details'}
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-amber-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(formStep / 2) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Step 1: Personal Information */}
                        {formStep === 1 && (
                          <form onSubmit={handleNext} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="firstName" className="text-slate-300">
                                  First Name *
                                </Label>
                                <Input
                                  id="firstName"
                                  required
                                  value={formData.firstName}
                                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                  className="mt-2 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                                  placeholder="John"
                                />
                              </div>
                              <div>
                                <Label htmlFor="lastName" className="text-slate-300">
                                  Last Name *
                                </Label>
                                <Input
                                  id="lastName"
                                  required
                                  value={formData.lastName}
                                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                  className="mt-2 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                                  placeholder="Doe"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="email" className="text-slate-300">
                                Email Address *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-2 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                                placeholder="john.doe@example.com"
                              />
                            </div>

                            <div>
                              <Label htmlFor="phone" className="text-slate-300">
                                Phone Number *
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="mt-2 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                                placeholder="(587) 123-4567"
                              />
                            </div>

                            <div>
                              <Label className="mb-3 block text-slate-300">
                                What's your main goal? *
                              </Label>
                              <RadioGroup
                                required
                                value={formData.goal}
                                onValueChange={(value) => setFormData({ ...formData, goal: value })}
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2 p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                                  <RadioGroupItem value="buying" id="buying" />
                                  <Label htmlFor="buying" className="cursor-pointer flex-1 text-slate-300">
                                    🏠 Buying a Home
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                                  <RadioGroupItem value="selling" id="selling" />
                                  <Label htmlFor="selling" className="cursor-pointer flex-1 text-slate-300">
                                    💰 Selling a Home
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                                  <RadioGroupItem value="both" id="both" />
                                  <Label htmlFor="both" className="cursor-pointer flex-1 text-slate-300">
                                    🔄 Both Buying & Selling
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                                  <RadioGroupItem value="investing" id="investing" />
                                  <Label htmlFor="investing" className="cursor-pointer flex-1 text-slate-300">
                                    📈 Investment Property
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label className="mb-3 block text-slate-300">
                                Is this your first house? *
                              </Label>
                              <RadioGroup
                                required
                                value={formData.firstHouse}
                                onValueChange={(value) => setFormData({ ...formData, firstHouse: value })}
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2 p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                                  <RadioGroupItem value="first" id="first" />
                                  <Label htmlFor="first" className="cursor-pointer flex-1 text-slate-300">
                                    🏠 First House (First-time buyer)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer">
                                  <RadioGroupItem value="second" id="second" />
                                  <Label htmlFor="second" className="cursor-pointer flex-1 text-slate-300">
                                    🏘️ Second House or More
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg" 
                              size="lg"
                            >
                              Next Step
                              <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>

                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                              <p className="text-sm text-slate-400 text-center">
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
                              <Label htmlFor="budget" className="mb-3 block text-slate-300">
                                Budget (CAD) *
                              </Label>
                              <Select
                                required
                                value={formData.budget}
                                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                              >
                                <SelectTrigger className="mt-2 bg-slate-800 border-slate-700 text-white">
                                  <SelectValue placeholder="Select your budget range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="under-300k">Under $300,000</SelectItem>
                                  <SelectItem value="300k-400k">$300,000 - $400,000</SelectItem>
                                  <SelectItem value="400k-500k">$400,000 - $500,000</SelectItem>
                                  <SelectItem value="500k-700k">$500,000 - $700,000</SelectItem>
                                  <SelectItem value="700k-1m">$700,000 - $1,000,000</SelectItem>
                                  <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="timeline" className="mb-3 block text-slate-300">
                                Timeline *
                              </Label>
                              <Select
                                required
                                value={formData.timeline}
                                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                              >
                                <SelectTrigger className="mt-2 bg-slate-800 border-slate-700 text-white">
                                  <SelectValue placeholder="When are you planning to move?" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="asap">As soon as possible</SelectItem>
                                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                                  <SelectItem value="just-looking">Just looking/researching</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="location" className="text-slate-300">
                                Preferred Location(s) *
                              </Label>
                              <Input
                                id="location"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="mt-2 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                                placeholder="e.g., Downtown Edmonton, Windermere, etc."
                              />
                            </div>

                            <div>
                              <Label htmlFor="propertyType" className="mb-3 block text-slate-300">
                                Property Type *
                              </Label>
                              <Select
                                required
                                value={formData.propertyType}
                                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                              >
                                <SelectTrigger className="mt-2 bg-slate-800 border-slate-700 text-white">
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

                            <div>
                              <Label htmlFor="additionalInfo" className="text-slate-300">
                                Additional Information (Optional)
                              </Label>
                              <Textarea
                                id="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                className="mt-2 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                                placeholder="Any specific requirements or questions..."
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={handleBack}
                                className="w-full sm:w-1/3 border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
                              >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                              </Button>
                              <Button 
                                type="submit" 
                                className="w-full sm:w-2/3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg" 
                                size="lg"
                              >
                                Submit Request
                                <CheckCircle className="w-5 h-5 ml-2" />
                              </Button>
                            </div>

                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                              <p className="text-sm text-slate-400 text-center">
                                <Clock className="w-4 h-4 inline mr-1" />
                                Response within 24 hours guaranteed
                              </p>
                            </div>
                          </form>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Mobile "What to Expect" */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm lg:hidden mt-6">
                  <CardContent className="p-6">
                    <h4 className="text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      What to Expect
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Response within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">30-minute free consultation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Personalized market insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">No obligation or pressure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Available evenings & weekends</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Footer */}
      <section className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl md:text-3xl text-amber-400 mb-1">5+</div>
                <p className="text-slate-400 text-xs md:text-sm">Years Experience</p>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl text-amber-400 mb-1">100+</div>
                <p className="text-slate-400 text-xs md:text-sm">Happy Clients</p>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl text-amber-400 mb-1">$50M+</div>
                <p className="text-slate-400 text-xs md:text-sm">In Sales</p>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl text-amber-400 mb-1">4.9★</div>
                <p className="text-slate-400 text-xs md:text-sm">Client Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

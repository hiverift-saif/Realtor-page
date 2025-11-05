import { useState, useRef } from 'react';
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

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setFormStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitBtn = submitBtnRef.current;
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      Submitting...
      <svg class="animate-spin w-5 h-5 ml-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;

    const payload = {
      formType: "rightpricepumps", // ← YE MISSING THA!
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      goal: formData.goal,
      firstHouse: formData.firstHouse,
      budget: formData.budget,
      timeline: formData.timeline,
      location: formData.location.trim(),
      propertyType: formData.propertyType,
      additionalInfo: formData.additionalInfo.trim()
    };

    console.log('Sending payload:', payload);

    try {
      const response = await fetch('https://cakistockmarket.com/api/v1/contact/createRightPricePumpsContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok && data.statusCode === 201) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: any) {
      console.error('Submission Error:', err);
      alert(err.message || 'Failed to submit. Please try again or contact support.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1C1C1C' }}>
      {/* Header */}
      <header className="backdrop-blur-sm border-b sticky top-0 z-50" style={{ backgroundColor: 'rgba(20, 24, 25, 0.95)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 transition bg-transparent border-0 cursor-pointer p-0"
                style={{ color: '#E6E7E8' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#E6E7E8'}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
            </div>
            <div>
              <h1 style={{ color: '#C7A76C' }}>Yaman Yadav</h1>
              <p className="text-xs text-right" style={{ color: '#94A3B8' }}>Edmonton Real Estate Expert</p>
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
              <Badge className="mb-4 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>
                Free Consultation
              </Badge>
              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl" style={{ color: '#FFFFFF' }}>
                Book Your Consultation
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#94A3B8' }}>
                Let's discuss your real estate goals and create a personalized plan for your success
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
              {/* Left Column - Agent Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Agent Card */}
                <Card className="border overflow-hidden" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative group mb-4">
                        <div className="absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-40 transition" style={{ background: 'linear-gradient(135deg, #C7A76C 0%, #B89960 100%)' }}></div>
                        <img 
                          src={yamanPhoto}
                          alt="Yaman Yadav"
                          className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2"
                          style={{ borderColor: 'rgba(199, 167, 108, 0.3)' }}
                        />
                      </div>
                      <h3 style={{ color: '#FFFFFF' }} className="mb-1">Yaman Yadav</h3>
                      <p className="text-sm" style={{ color: '#94A3B8' }}>Licensed REALTOR®</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(199, 167, 108, 0.05)' }}>
                        <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <div>
                          <p className="text-xs mb-1" style={{ color: '#64748B' }}>Phone</p>
                          <a href="tel:587-568-8591" className="transition" style={{ color: '#E6E7E8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#E6E7E8'}>
                            587-568-8591
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(199, 167, 108, 0.05)' }}>
                        <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <div>
                          <p className="text-xs mb-1" style={{ color: '#64748B' }}>Email</p>
                          <a href="mailto:contact@yamanyadav.com" className="transition break-all" style={{ color: '#E6E7E8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#E6E7E8'}>
                            contact@yamanyadav.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(199, 167, 108, 0.05)' }}>
                        <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <div>
                          <p className="text-xs mb-1" style={{ color: '#64748B' }}>Service Areas</p>
                          <p className="text-sm" style={{ color: '#E6E7E8' }}>
                            Edmonton • Greater Edmonton • Sherwood Park • Spruce Grove • St. Albert
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                    <CardContent className="pt-6 text-center">
                      <Award className="w-6 h-6 mx-auto mb-2" style={{ color: '#60A5FA' }} />
                      <div className="text-2xl mb-1" style={{ color: '#FFFFFF' }}>2</div>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Years Exp.</p>
                    </CardContent>
                  </Card>

                  <Card className="border" style={{ background: 'linear-gradient(135deg, rgba(199, 167, 108, 0.15) 0%, rgba(184, 153, 96, 0.15) 100%)', borderColor: 'rgba(199, 167, 108, 0.3)' }}>
                    <CardContent className="pt-6 text-center">
                      <HomeIcon className="w-6 h-6 mx-auto mb-2" style={{ color: '#C7A76C' }} />
                      <div className="text-2xl mb-1" style={{ color: '#FFFFFF' }}>50+</div>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Happy Clients</p>
                    </CardContent>
                  </Card>
                </div>

                {/* What to Expect */}
                <Card className="border hidden lg:block" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                  <CardContent className="p-6">
                    <h4 className="mb-4 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                      <Calendar className="w-5 h-5" style={{ color: '#C7A76C' }} />
                      What to Expect
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>Response within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>30-minute free consultation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>Personalized market insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>No obligation or pressure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>Available evenings & weekends</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-3">
                <Card className="shadow-2xl border" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                  <CardContent className="p-6 md:p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.3)' }}>
                          <CheckCircle className="w-10 h-10" style={{ color: '#22C55E' }} />
                        </div>
                        <h3 className="mb-3 text-2xl" style={{ color: '#FFFFFF' }}>Thank You!</h3>
                        <p className="mb-2" style={{ color: '#94A3B8' }}>
                          I've received your consultation request and will contact you within 24 hours.
                        </p>
                        <p className="mb-6" style={{ color: '#94A3B8' }}>
                          In the meantime, feel free to call me directly at{' '}
                          <a href="tel:587-568-8591" className="hover:underline" style={{ color: '#C7A76C' }}>
                            587-568-8591
                          </a>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button 
                            onClick={() => {
                              setSubmitted(false);
                              setFormStep(1);
                              setFormData({
                                firstName: '', lastName: '', email: '', phone: '',
                                goal: '', firstHouse: '', budget: '', timeline: '',
                                location: '', propertyType: '', additionalInfo: ''
                              });
                            }} 
                            variant="outline"
                            className="border text-white hover:bg-slate-800"
                            style={{ borderColor: '#64748B', backgroundColor: '#334155' }}
                          >
                            Submit Another Request
                          </Button>
                          <Button 
                            onClick={onBack}
                            className="text-slate-900"
                            style={{ background: 'linear-gradient(to right, #C7A76C, #B89960)' }}
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-6">
                          <h3 className="mb-2" style={{ color: '#FFFFFF' }}>Let's Get Started</h3>
                          <p style={{ color: '#94A3B8' }}>Fill out the form below to book your free consultation</p>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm" style={{ color: '#94A3B8' }}>Step {formStep} of 2</span>
                            <span className="text-sm" style={{ color: '#94A3B8' }}>
                              {formStep === 1 ? 'Personal Info' : 'Property Details'}
                            </span>
                          </div>
                          <div className="w-full rounded-full h-2" style={{ backgroundColor: '#334155' }}>
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(formStep / 2) * 100}%`,
                                background: 'linear-gradient(to right, #3B82F6, #C7A76C)'
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Step 1: Personal Information */}
                        {formStep === 1 && (
                          <form onSubmit={handleNext} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="firstName" style={{ color: '#94A3B8' }}>
                                  First Name *
                                </Label>
                                <Input
                                  id="firstName"
                                  required
                                  value={formData.firstName}
                                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                  className="mt-2 text-white placeholder:text-slate-500"
                                  style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                                  placeholder="John"
                                />
                              </div>
                              <div>
                                <Label htmlFor="lastName" style={{ color: '#94A3B8' }}>
                                  Last Name *
                                </Label>
                                <Input
                                  id="lastName"
                                  required
                                  value={formData.lastName}
                                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                  className="mt-2 text-white placeholder:text-slate-500"
                                  style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                                  placeholder="Doe"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="email" style={{ color: '#94A3B8' }}>
                                Email Address *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-2 text-white placeholder:text-slate-500"
                                style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                                placeholder="john.doe@example.com"
                              />
                            </div>

                            <div>
                              <Label htmlFor="phone" style={{ color: '#94A3B8' }}>
                                Phone Number *
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="mt-2 text-white placeholder:text-slate-500"
                                style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                                placeholder="(587) 123-4567"
                              />
                            </div>

                            <div>
                              <Label className="mb-3 block" style={{ color: '#94A3B8' }}>
                                What's your main goal? *
                              </Label>
                              <RadioGroup
                                required
                                value={formData.goal}
                                onValueChange={(value) => setFormData({ ...formData, goal: value })}
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-800" style={{ borderColor: '#475569' }}>
                                  <RadioGroupItem value="buying" id="buying" />
                                  <Label htmlFor="buying" className="cursor-pointer flex-1" style={{ color: '#94A3B8' }}>
                                    Buying a Home
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-800" style={{ borderColor: '#475569' }}>
                                  <RadioGroupItem value="selling" id="selling" />
                                  <Label htmlFor="selling" className="cursor-pointer flex-1" style={{ color: '#94A3B8' }}>
                                    Selling a Home
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-800" style={{ borderColor: '#475569' }}>
                                  <RadioGroupItem value="both" id="both" />
                                  <Label htmlFor="both" className="cursor-pointer flex-1" style={{ color: '#94A3B8' }}>
                                    Both Buying & Selling
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-800" style={{ borderColor: '#475569' }}>
                                  <RadioGroupItem value="investing" id="investing" />
                                  <Label htmlFor="investing" className="cursor-pointer flex-1" style={{ color: '#94A3B8' }}>
                                    Investment Property
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label className="mb-3 block" style={{ color: '#94A3B8' }}>
                                Is this your first house? *
                              </Label>
                              <RadioGroup
                                required
                                value={formData.firstHouse}
                                onValueChange={(value) => setFormData({ ...formData, firstHouse: value })}
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-800" style={{ borderColor: '#475569' }}>
                                  <RadioGroupItem value="first" id="first" />
                                  <Label htmlFor="first" className="cursor-pointer flex-1" style={{ color: '#94A3B8' }}>
                                    First House (First-time buyer)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-800" style={{ borderColor: '#475569' }}>
                                  <RadioGroupItem value="second" id="second" />
                                  <Label htmlFor="second" className="cursor-pointer flex-1" style={{ color: '#94A3B8' }}>
                                    Second House or More
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full shadow-lg" 
                              size="lg"
                              style={{ background: 'linear-gradient(to right, #3B82F6, #C7A76C)' }}
                            >
                              Next Step
                              <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>

                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', borderColor: '#475569' }}>
                              <p className="text-sm text-center" style={{ color: '#94A3B8' }}>
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
                              <Label htmlFor="budget" className="mb-3 block" style={{ color: '#94A3B8' }}>
                                Budget (CAD) *
                              </Label>
                              <Select
                                required
                                value={formData.budget}
                                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                              >
                                <SelectTrigger className="mt-2 text-white" style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}>
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
                              <Label htmlFor="timeline" className="mb-3 block" style={{ color: '#94A3B8' }}>
                                Timeline *
                              </Label>
                              <Select
                                required
                                value={formData.timeline}
                                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                              >
                                <SelectTrigger className="mt-2 text-white" style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}>
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
                              <Label htmlFor="location" style={{ color: '#94A3B8' }}>
                                Preferred Location(s) *
                              </Label>
                              <Input
                                id="location"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="mt-2 text-white placeholder:text-slate-500"
                                style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                                placeholder="e.g., Downtown Edmonton, Windermere, etc."
                              />
                            </div>

                            <div>
                              <Label htmlFor="propertyType" className="mb-3 block" style={{ color: '#94A3B8' }}>
                                Property Type *
                              </Label>
                              <Select
                                required
                                value={formData.propertyType}
                                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                              >
                                <SelectTrigger className="mt-2 text-white" style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}>
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="house">House</SelectItem>
                                  <SelectItem value="duplex">Duplex</SelectItem>
                                  <SelectItem value="triplex">Triplex</SelectItem>
                                  <SelectItem value="apartment-1br">Apartment - 1 Bedroom</SelectItem>
                                  <SelectItem value="apartment-2br">Apartment - 2 Bedrooms</SelectItem>
                                  <SelectItem value="apartment-3br">Apartment - 3 Bedrooms</SelectItem>
                                  <SelectItem value="condominium">Condominium</SelectItem>
                                  <SelectItem value="land">Land</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="additionalInfo" style={{ color: '#94A3B8' }}>
                                Additional Information (Optional)
                              </Label>
                              <Textarea
                                id="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                className="mt-2 text-white placeholder:text-slate-500 min-h-[100px]"
                                style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                                placeholder="Any specific requirements or questions..."
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={handleBack}
                                className="w-full sm:w-1/3 text-white hover:bg-slate-800"
                                style={{ borderColor: '#64748B', backgroundColor: '#334155' }}
                              >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                              </Button>


                     <button
  type="submit"
  ref={submitBtnRef}
  className="w-full sm:w-2/3 shadow-lg flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium rounded-lg transition-all disabled:opacity-70"
  style={{ 
    background: 'linear-gradient(to right, #3B82F6, #C7A76C)',
    color: 'white'
  }}
  disabled={false}
>
  Submit Request
  <CheckCircle className="w-5 h-5" />
</button>



                            </div>

                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', borderColor: '#475569' }}>
                              <p className="text-sm text-center" style={{ color: '#94A3B8' }}>
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
                <Card className="border lg:hidden mt-6" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                  <CardContent className="p-6">
                    <h4 className="mb-4 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                      <Calendar className="w-5 h-5" style={{ color: '#C7A76C' }} />
                      What to Expect
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>Response within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>30-minute free consultation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>Personalized market insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>No obligation or pressure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                        <span style={{ color: '#94A3B8' }}>Available evenings & weekends</span>
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
      <section className="py-8 border-t" style={{ backgroundColor: '#141819', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl md:text-3xl mb-1" style={{ color: '#C7A76C' }}>2</div>
                <p className="text-xs md:text-sm" style={{ color: '#94A3B8' }}>Years Experience</p>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl mb-1" style={{ color: '#C7A76C' }}>50+</div>
                <p className="text-xs md:text-sm" style={{ color: '#94A3B8' }}>Happy Clients</p>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl mb-1" style={{ color: '#C7A76C' }}>$25M+</div>
                <p className="text-xs md:text-sm" style={{ color: '#94A3B8' }}>In Sales</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
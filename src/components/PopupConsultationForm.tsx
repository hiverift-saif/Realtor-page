import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  ChevronRight, 
  Shield,
  ArrowLeft,
  User,
  Mail,
  Phone as PhoneIcon,
  Home,
  DollarSign,
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  Loader2
} from 'lucide-react';

interface PopupConsultationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PopupConsultationForm({ open, onOpenChange }: PopupConsultationFormProps) {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const handleBack = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      formType: "rightpricepumps",
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

    try {
      const response = await fetch('https://cakistockmarket.com/api/v1/contact/createRightPricePumpsContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 201) {
        setSubmitted(true);
      } else {
        alert(data.message || 'Submission failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setLoading(false);
      setFormStep(1);
      setFormData({
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
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-3xl max-h-[90vh] overflow-y-auto border-2 shadow-2xl"
        style={{ 
          backgroundColor: '#141819',
          borderColor: '#C7A76C',
          boxShadow: '0 0 60px rgba(199, 167, 108, 0.3), 0 0 100px rgba(199, 167, 108, 0.15)'
        }}
      >
        {submitted ? (
          <div className="text-center py-16 px-6">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-2 animate-pulse"
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.15)', 
                borderColor: '#22C55E',
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
              }}
            >
              <CheckCircle className="w-12 h-12" style={{ color: '#22C55E' }} />
            </div>
            <h3 className="mb-4 text-3xl" style={{ color: '#C7A76C' }}>
              <Sparkles className="w-6 h-6 inline mr-2" />
              Thank You!
            </h3>
            <p className="mb-3 text-lg" style={{ color: '#FFFFFF' }}>
              I've received your consultation request and will contact you within 24 hours.
            </p>
            <p className="mb-8" style={{ color: '#94A3B8' }}>
              In the meantime, feel free to call me directly at{' '}
              <a href="tel:587-568-8591" className="hover:underline transition-colors" style={{ color: '#C7A76C' }}>
                587-568-8591
              </a>
            </p>
            <Button 
              onClick={handleClose}
              className="shadow-lg text-white"
              size="lg"
              style={{ 
                background: 'linear-gradient(135deg, #C7A76C, #B89960)',
                boxShadow: '0 4px 20px rgba(199, 167, 108, 0.4)'
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="text-center mb-4">
                <Badge 
                  className="mb-5 border-0 text-sm px-4 py-2 animate-pulse shadow-lg" 
                  style={{ 
                    backgroundColor: '#C7A76C', 
                    color: '#141819',
                    boxShadow: '0 4px 15px rgba(199, 167, 108, 0.5)'
                  }}
                >
                  🏆 Free Consultation - Limited Spots Available
                </Badge>
                <DialogTitle className="text-3xl md:text-4xl mb-3" style={{ color: '#C7A76C' }}>
                  Get Your Free Home Consultation
                </DialogTitle>
                <DialogDescription className="text-base md:text-lg" style={{ color: '#94A3B8' }}>
                  Join 50+ happy clients in Edmonton. Let's find your dream home together!
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="px-2">
              {/* Enhanced Step Progress Indicator */}
              <div className="mb-8 relative">
                <div className="flex items-center justify-between mb-4">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${formStep === 1 ? 'scale-110' : ''}`}
                      style={{ 
                        backgroundColor: formStep === 1 ? '#C7A76C' : formStep > 1 ? 'rgba(34, 197, 94, 0.2)' : '#1E293B',
                        borderColor: formStep === 1 ? '#C7A76C' : formStep > 1 ? '#22C55E' : '#475569',
                        boxShadow: formStep === 1 ? '0 0 20px rgba(199, 167, 108, 0.5)' : 'none'
                      }}
                    >
                      {formStep > 1 ? (
                        <CheckCircle className="w-6 h-6" style={{ color: '#22C55E' }} />
                      ) : (
                        <User className="w-6 h-6" style={{ color: formStep === 1 ? '#141819' : '#64748B' }} />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-xs" style={{ color: '#64748B' }}>Step 1</p>
                      <p className="text-xs" style={{ color: formStep === 1 ? '#C7A76C' : '#94A3B8' }}>
                        Contact
                      </p>
                    </div>
                  </div>

                  {/* Connector 1-2 */}
                  <div className="flex-1 h-1 rounded-full relative mx-2" style={{ backgroundColor: '#334155' }}>
                    <div 
                      className="h-1 rounded-full transition-all duration-500"
                      style={{ 
                        width: formStep >= 2 ? '100%' : '0%',
                        background: 'linear-gradient(90deg, #C7A76C, #22C55E)',
                        boxShadow: formStep >= 2 ? '0 0 10px rgba(199, 167, 108, 0.5)' : 'none'
                      }}
                    />
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${formStep === 2 ? 'scale-110' : ''}`}
                      style={{ 
                        backgroundColor: formStep === 2 ? '#C7A76C' : formStep > 2 ? 'rgba(34, 197, 94, 0.2)' : '#1E293B',
                        borderColor: formStep === 2 ? '#C7A76C' : formStep > 2 ? '#22C55E' : '#475569',
                        boxShadow: formStep === 2 ? '0 0 20px rgba(199, 167, 108, 0.5)' : 'none'
                      }}
                    >
                      {formStep > 2 ? (
                        <CheckCircle className="w-6 h-6" style={{ color: '#22C55E' }} />
                      ) : (
                        <Home className="w-6 h-6" style={{ color: formStep === 2 ? '#141819' : '#64748B' }} />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-xs" style={{ color: '#64748B' }}>Step 2</p>
                      <p className="text-xs" style={{ color: formStep === 2 ? '#C7A76C' : '#94A3B8' }}>
                        Goals
                      </p>
                    </div>
                  </div>

                  {/* Connector 2-3 */}
                  <div className="flex-1 h-1 rounded-full relative mx-2" style={{ backgroundColor: '#334155' }}>
                    <div 
                      className="h-1 rounded-full transition-all duration-500"
                      style={{ 
                        width: formStep >= 3 ? '100%' : '0%',
                        background: 'linear-gradient(90deg, #C7A76C, #22C55E)',
                        boxShadow: formStep >= 3 ? '0 0 10px rgba(199, 167, 108, 0.5)' : 'none'
                      }}
                    />
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${formStep === 3 ? 'scale-110' : ''}`}
                      style={{ 
                        backgroundColor: formStep === 3 ? '#C7A76C' : '#1E293B',
                        borderColor: formStep === 3 ? '#C7A76C' : '#475569',
                        boxShadow: formStep === 3 ? '0 0 20px rgba(199, 167, 108, 0.5)' : 'none'
                      }}
                    >
                      <Building2 className="w-6 h-6" style={{ color: formStep === 3 ? '#141819' : '#64748B' }} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs" style={{ color: '#64748B' }}>Step 3</p>
                      <p className="text-xs" style={{ color: formStep === 3 ? '#C7A76C' : '#94A3B8' }}>
                        Property
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1: Contact Information */}
              {formStep === 1 && (
                <form onSubmit={handleNext} className="space-y-5 animate-in fade-in duration-300">
                  <div 
                    className="p-6 rounded-xl border-2"
                    style={{ 
                      backgroundColor: 'rgba(199, 167, 108, 0.05)',
                      borderColor: 'rgba(199, 167, 108, 0.3)',
                      boxShadow: '0 4px 20px rgba(199, 167, 108, 0.1)'
                    }}
                  >
                    <h3 className="mb-4 flex items-center gap-2" style={{ color: '#C7A76C' }}>
                      <User className="w-5 h-5" />
                      Contact Information
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="flex items-center gap-2 mb-2" style={{ color: '#E2E8F0' }}>
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="text-white placeholder:text-slate-500 border-2 focus:border-[#C7A76C] transition-colors"
                          style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="flex items-center gap-2 mb-2" style={{ color: '#E2E8F0' }}>
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="text-white placeholder:text-slate-500 border-2 focus:border-[#C7A76C] transition-colors"
                          style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2" style={{ color: '#E2E8F0' }}>
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-white placeholder:text-slate-500 border-2 focus:border-[#C7A76C] transition-colors"
                        style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2" style={{ color: '#E2E8F0' }}>
                        <PhoneIcon className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="text-white placeholder:text-slate-500 border-2 focus:border-[#C7A76C] transition-colors"
                        style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                        placeholder="(587) 123-4567"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full shadow-xl" 
                    size="lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #C7A76C, #B89960)',
                      boxShadow: '0 6px 25px rgba(199, 167, 108, 0.4)'
                    }}
                  >
                    Continue to Goals
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="p-4 rounded-lg border-2 text-center" style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', borderColor: '#475569' }}>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      <Shield className="w-4 h-4 inline mr-2" />
                      100% Confidential. No spam, ever.
                    </p>
                  </div>
                </form>
              )}

              {/* Step 2: Goals & Status */}
              {formStep === 2 && (
                <form onSubmit={handleNext} className="space-y-5 animate-in fade-in duration-300">
                  <div 
                    className="p-6 rounded-xl border-2"
                    style={{ 
                      backgroundColor: 'rgba(199, 167, 108, 0.05)',
                      borderColor: 'rgba(199, 167, 108, 0.3)',
                      boxShadow: '0 4px 20px rgba(199, 167, 108, 0.1)'
                    }}
                  >
                    <Label className="mb-4 block flex items-center gap-2" style={{ color: '#C7A76C' }}>
                      <Home className="w-5 h-5" />
                      What's your main goal? *
                    </Label>
                    <RadioGroup
                      required
                      value={formData.goal}
                      onValueChange={(value) => setFormData({ ...formData, goal: value })}
                      className="space-y-3"
                    >
                      {[
                        { value: 'buying', emoji: '🏠', label: 'Buying a Home' },
                        { value: 'selling', emoji: '💰', label: 'Selling a Home' },
                        { value: 'both', emoji: '🔄', label: 'Both Buying & Selling' },
                        { value: 'investing', emoji: '📈', label: 'Investment Property' }
                      ].map((option) => (
                        <div 
                          key={option.value}
                          className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-all duration-200"
                          style={{ 
                            borderColor: formData.goal === option.value ? '#C7A76C' : '#475569',
                            backgroundColor: formData.goal === option.value ? 'rgba(199, 167, 108, 0.1)' : 'transparent',
                            boxShadow: formData.goal === option.value ? '0 0 15px rgba(199, 167, 108, 0.2)' : 'none'
                          }}
                        >
                          <RadioGroupItem value={option.value} id={`popup-${option.value}`} />
                          <Label htmlFor={`popup-${option.value}`} className="cursor-pointer flex-1" style={{ color: formData.goal === option.value ? '#C7A76C' : '#E2E8F0' }}>
                            {option.emoji} {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div 
                    className="p-6 rounded-xl border-2"
                    style={{ 
                      backgroundColor: 'rgba(199, 167, 108, 0.05)',
                      borderColor: 'rgba(199, 167, 108, 0.3)',
                      boxShadow: '0 4px 20px rgba(199, 167, 108, 0.1)'
                    }}
                  >
                    <Label className="mb-4 block" style={{ color: '#C7A76C' }}>
                      Is this your first house? *
                    </Label>
                    <RadioGroup
                      required
                      value={formData.firstHouse}
                      onValueChange={(value) => setFormData({ ...formData, firstHouse: value })}
                      className="space-y-3"
                    >
                      {[
                        { value: 'first', emoji: '🏠', label: 'First House (First-time buyer)' },
                        { value: 'second', emoji: '🏘️', label: 'Second House or More' }
                      ].map((option) => (
                        <div 
                          key={option.value}
                          className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-all duration-200"
                          style={{ 
                            borderColor: formData.firstHouse === option.value ? '#C7A76C' : '#475569',
                            backgroundColor: formData.firstHouse === option.value ? 'rgba(199, 167, 108, 0.1)' : 'transparent',
                            boxShadow: formData.firstHouse === option.value ? '0 0 15px rgba(199, 167, 108, 0.2)' : 'none'
                          }}
                        >
                          <RadioGroupItem value={option.value} id={`popup-${option.value}`} />
                          <Label htmlFor={`popup-${option.value}`} className="cursor-pointer flex-1" style={{ color: formData.firstHouse === option.value ? '#C7A76C' : '#E2E8F0' }}>
                            {option.emoji} {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBack}
                      className="w-full sm:w-1/3 text-white hover:bg-slate-700 border-2 transition-colors"
                      style={{ borderColor: '#64748B', backgroundColor: '#334155' }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full sm:w-2/3 shadow-xl" 
                      size="lg"
                      style={{ 
                        background: 'linear-gradient(135deg, #C7A76C, #B89960)',
                        boxShadow: '0 6px 25px rgba(199, 167, 108, 0.4)'
                      }}
                    >
                      Continue to Property Details
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 3: Property Details */}
              {formStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
                  <div 
                    className="p-6 rounded-xl border-2"
                    style={{ 
                      backgroundColor: 'rgba(199, 167, 108, 0.05)',
                      borderColor: 'rgba(199, 167, 108, 0.3)',
                      boxShadow: '0 4px 20px rgba(199, 167, 108, 0.1)'
                    }}
                  >
                    <h3 className="mb-4 flex items-center gap-2" style={{ color: '#C7A76C' }}>
                      <DollarSign className="w-5 h-5" />
                      Budget & Timeline
                    </h3>

                    <div>
                      <Label htmlFor="budget" className="mb-3 block flex items-center gap-2" style={{ color: '#E2E8F0' }}>
                        Budget (CAD) *
                      </Label>
                      <Select
                        required
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger className="text-white border-2 focus:border-[#C7A76C] transition-colors" style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}>
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

                    <div className="mt-4">
                      <Label htmlFor="timeline" className="mb-3 block flex items-center gap-2" style={{ color: '#E2E8F0' }}>
                        <Calendar className="w-4 h-4" />
                        Timeline *
                      </Label>
                      <Select
                        required
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      >
                        <SelectTrigger className="text-white border-2 focus:border-[#C7A76C] transition-colors" style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}>
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
                  </div>

                  <div 
                    className="p-6 rounded-xl border-2"
                    style={{ 
                      backgroundColor: 'rgba(199, 167, 108, 0.05)',
                      borderColor: 'rgba(199, 167, 108, 0.3)',
                      boxShadow: '0 4px 20px rgba(199, 167, 108, 0.1)'
                    }}
                  >
                    <h3 className="mb-4 flex items-center gap-2" style={{ color: '#C7A76C' }}>
                      <Building2 className="w-5 h-5" />
                      Property Preferences
                    </h3>

                    <div>
                      <Label htmlFor="location" className="flex items-center gap-2 mb-2" style={{ color: '#E2E8F0' }}>
                        <MapPin className="w-4 h-4" />
                        Preferred Location(s) *
                      </Label>
                      <Input
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="text-white placeholder:text-slate-500 border-2 focus:border-[#C7A76C] transition-colors"
                        style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                        placeholder="e.g., Downtown Edmonton, Windermere, etc."
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="propertyType" className="mb-3 block" style={{ color: '#E2E8F0' }}>
                        Property Type *
                      </Label>
                      <Select
                        required
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      >
                        <SelectTrigger className="text-white border-2 focus:border-[#C7A76C] transition-colors" style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}>
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

                    <div className="mt-4">
                      <Label htmlFor="additionalInfo" style={{ color: '#E2E8F0' }}>
                        Additional Information (Optional)
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        className="mt-2 text-white placeholder:text-slate-500 min-h-[100px] border-2 focus:border-[#C7A76C] transition-colors"
                        style={{ backgroundColor: '#1E293B', borderColor: '#475569' }}
                        placeholder="Any specific requirements or questions..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBack}
                      className="w-full sm:w-1/3 text-white hover:bg-slate-700 border-2 transition-colors"
                      style={{ borderColor: '#64748B', backgroundColor: '#334155' }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full sm:w-2/3 shadow-xl" 
                      size="lg"
                      style={{ 
                        background: 'linear-gradient(135deg, #C7A76C, #B89960)',
                        boxShadow: '0 6px 25px rgba(199, 167, 108, 0.4)'
                      }}
                    >
                      {loading ? (
                        <>
                          Submitting...
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit Request
                          <CheckCircle className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border-2 text-center" style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', borderColor: '#475569' }}>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      <Shield className="w-4 h-4 inline mr-2" />
                      Response within 24 hours guaranteed
                    </p>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
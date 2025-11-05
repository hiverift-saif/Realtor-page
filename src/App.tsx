import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar,Loader2 , CheckCircle, Home, TrendingUp, Users, Award, Clock, Shield, Star, DollarSign, FileText, Search, ChevronDown, ChevronRight, ArrowLeft, Building2, Target, Sparkles } from 'lucide-react';
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';
import yamanPhoto from 'figma:asset/62ea924c00b12b7a7ac23d7f281dd070e0528c69.png';
import { BookConsultation } from './components/BookConsultation';
import { PopupConsultationForm } from './components/PopupConsultationForm';
import Swal from "sweetalert2";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "booking">("home");
  const [showPopup, setShowPopup] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  {isSubmitting ? "Submitting..." : "Submit Request"}

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    houseType: "", // first / second
    budget: [500000], // slider value
    propertyType: "",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handleBack = () => setFormStep(1);

  // Format budget to match backend enum
  const getBudgetRange = (value: number): string => {
    if (value < 300000) return "under-300k";
    if (value <= 400000) return "300k-400k";
    if (value <= 500000) return "400k-500k";
    if (value <= 700000) return "500k-700k";
    if (value <= 1000000) return "700k-1m";
    return "over-1m";
  };

  const buildPayload = () => {
    const [firstName = "", ...lastNameParts] = formData.name.trim().split(" ");
    const lastName = lastNameParts.join(" ") || "—";

    return {
      formType: "rightpricepumps",
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      goal: "buying",
      firstHouse: formData.houseType === "first" ? "first" : "second",
      budget: getBudgetRange(formData.budget[0]),
      timeline: "1-3-months",
      location: "Edmonton, Alberta",
      propertyType: formData.propertyType,
      additionalInfo: "",
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = buildPayload();
      console.log("Payload:", payload); // DEBUG

      const res = await fetch(
        "https://cakistockmarket.com/api/v1/contact/createRightPricePumpsContact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Response:", data);

      if (res.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your inquiry has been submitted successfully.",
          confirmButtonText: "OK",
          confirmButtonColor: "#C7A76C",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          houseType: "",
          budget: [500000],
          propertyType: "",
        });
        setFormStep(1);
      } else {
        const errorMsg = data.message || "Failed to submit. Please try again.";
        await Swal.fire({
          icon: "error",
          title: "Error",
          html: `<p><strong>${errorMsg}</strong></p>
                 <p class="mt-2 text-sm">Call me directly:</p>
                 <a href="tel:587-568-8591" class="mt-2 inline-block px-4 py-2 bg-[#C7A76C] text-white rounded font-medium">587-568-8591</a>`,
          confirmButtonText: "OK",
          confirmButtonColor: "#C7A76C",
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection.",
        confirmButtonText: "OK",
        confirmButtonColor: "#C7A76C",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "contact") {
      setCurrentPage("booking");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (currentPage === "booking") {
    return <BookConsultation onBack={() => setCurrentPage("home")} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEF8F2" }}>
      <PopupConsultationForm open={showPopup} onOpenChange={setShowPopup} />

      {/* Header */}
      <header
        className="backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm"
        style={{
          backgroundColor: "rgba(254, 248, 242, 0.98)",
          borderColor: "#E6E7E8",
        }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="leading-tight">
              <div className="text-xs tracking-wider uppercase" style={{ color: "#C7A76C" }}>
                CENTURY 21
              </div>
              <div className="flex items-center gap-2 my-0.5">
                <div className="w-4 h-px" style={{ backgroundColor: "#C7A76C" }}></div>
              </div>
              <div className="text-xs mb-1" style={{ color: "#1C1C1C" }}>Smart Realty</div>
              <h1 className="leading-tight" style={{ color: "#141819" }}>Yaman Yadav</h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection("about")} className="hidden md:inline" style={{ color: "#141819" }}>
              About Me
            </button>
            <button onClick={() => scrollToSection("services")} className="hidden md:inline" style={{ color: "#141819" }}>
              Services
            </button>
            <button onClick={() => scrollToSection("service-area")} className="hidden md:inline" style={{ color: "#141819" }}>
              Service Areas
            </button>
            <button onClick={() => scrollToSection("contact")} className="hidden md:inline" style={{ color: "#141819" }}>
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
              style={{ backgroundColor: "#C7A76C", color: "#FFFFFF" }}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book Consultation</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[700px] md:min-h-[800px] bg-cover bg-center"
        style={{
          backgroundColor: "#FEF8F2",
          backgroundImage: `linear-gradient(to right, rgba(254, 248, 242, 0.97) 0%, rgba(254, 248, 242, 0.95) 50%, rgba(254, 248, 242, 0.85) 100%), url('https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxMzA0MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Content */}
              <div className="pt-8">
                <Badge className="mb-6 border-0 shadow-sm" style={{ backgroundColor: "#C7A76C", color: "#FFFFFF" }}>
                  Century 21 Smart Realty • Licensed REALTOR®
                </Badge>
                <h2 className="mb-6 text-5xl md:text-6xl leading-tight" style={{ color: "#141819" }}>
                  Find Your Dream Home in Edmonton
                </h2>
                <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{ color: "#1C1C1C" }}>
                  Expert guidance for buyers and sellers. Let's make your real estate journey simple, transparent, and successful.
                </p>
                <div className="rounded-2xl p-6 mb-8 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E7E8" }}>
                  <div className="mb-4">
                    <div className="text-xs tracking-wider uppercase mb-1" style={{ color: "#C7A76C" }}>
                      CENTURY 21 Smart Realty
                    </div>
                    <h4 style={{ color: "#141819" }}>Why Choose Yaman Yadav?</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Deep knowledge of Edmonton neighborhoods and market trends",
                      "Personalized service tailored to your unique goals",
                      "Proven track record with 50+ satisfied clients",
                      "Available 7 days a week for your convenience",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="rounded-full p-1.5 mt-0.5" style={{ backgroundColor: "#C7A76C" }}>
                          <CheckCircle className="w-4 h-4" style={{ color: "#FFFFFF" }} />
                        </div>
                        <p style={{ color: "#1C1C1C" }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <a href="tel:587-568-8591" className="inline-flex items-center gap-2" style={{ color: "#C7A76C" }}>
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">587-568-8591</span>
                </a>
              </div>

              {/* Right Form */}
              <div id="contact" className="lg:pt-0">
                <Card className="shadow-2xl border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E7E8" }}>
                  <CardContent className="p-6 md:p-8">
                    <div className="text-center mb-6">
                      <h3 className="mb-2" style={{ color: "#141819" }}>Book Your Free Consultation</h3>
                      <p style={{ color: "#1C1C1C" }}>Fill out the form below to get started</p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: "#1C1C1C" }}>Step {formStep} of 2</span>
                        <span className="text-sm" style={{ color: "#1C1C1C" }}>
                          {formStep === 1 ? "Personal Info" : "Property Details"}
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: "#E6E7E8" }}>
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(formStep / 2) * 100}%`, backgroundColor: "#C7A76C" }}
                        ></div>
                      </div>
                    </div>

                    {/* Step 1 */}
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
                            onValueChange={(v) => setFormData({ ...formData, houseType: v })}
                          >
                            <div className="flex items-center space-x-2 mb-3 p-3 border rounded-lg cursor-pointer" style={{ borderColor: "#E6E7E8", backgroundColor: "#FEF8F2" }}>
                              <RadioGroupItem value="first" id="first" />
                              <Label htmlFor="first" className="cursor-pointer flex-1">First House (First-time buyer)</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer" style={{ borderColor: "#E6E7E8", backgroundColor: "#FEF8F2" }}>
                              <RadioGroupItem value="second" id="second" />
                              <Label htmlFor="second" className="cursor-pointer flex-1">Second House or More</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <Button type="submit" className="w-full shadow-lg" style={{ backgroundColor: "#C7A76C", color: "#FFFFFF" }} size="lg">
                          Next Step
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(199, 167, 108, 0.1)" }}>
                          <p className="text-sm text-center" style={{ color: "#1C1C1C" }}>
                            <Shield className="w-4 h-4 inline mr-1" />
                            100% Confidential. No spam, ever.
                          </p>
                        </div>
                      </form>
                    )}

                    {/* Step 2 */}
                    {formStep === 2 && (
                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div>
                          <Label htmlFor="budget" className="mb-3 block">Budget (CAD) *</Label>
                          <div className="space-y-4">
                            <div className="text-center py-4 rounded-lg border-2" style={{ backgroundColor: "rgba(199, 167, 108, 0.1)", borderColor: "#C7A76C" }}>
                              <span style={{ color: "#C7A76C" }}>{formatCurrency(formData.budget[0])}</span>
                            </div>
                            <Slider
                              id="budget"
                              min={0}
                              max={1500000}
                              step={10000}
                              value={formData.budget}
                              onValueChange={(v) => setFormData({ ...formData, budget: v })}
                              className="mt-2"
                            />
                            <div className="flex justify-between text-xs" style={{ color: "#1C1C1C" }}>
                              <span>$0</span>
                              <span>$1.5M+</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="propertyType">Property Type *</Label>
                          <Select
                            required
                            value={formData.propertyType}
                            onValueChange={(v) => setFormData({ ...formData, propertyType: v })}
                          >
                            <SelectTrigger className="mt-2">
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
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                    <div className="flex gap-3">
  <Button type="button" variant="outline" onClick={handleBack} className="w-1/3">
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back
  </Button>

  <Button
    type="submit"
    disabled={isSubmitting}
    className="w-2/3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg transition-all duration-300"
    size="lg"
  >
    {isSubmitting ? (
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

                        <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(199, 167, 108, 0.1)" }}>
                          <p className="text-sm text-center" style={{ color: "#1C1C1C" }}>
                            <Shield className="w-4 h-4 inline mr-1" />
                            Response within 24 hours guaranteed
                          </p>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

















      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: '#141819' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="group text-center p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="mb-3" style={{ color: '#C7A76C' }}>
                  <Users className="w-10 h-10 mx-auto mb-2" />
                </div>
                <div className="text-5xl mb-2" style={{ color: '#FFFFFF' }}>50+</div>
                <p className="text-sm" style={{ color: '#94A3B8' }}>Happy Clients</p>
              </div>
              <div className="group text-center p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="mb-3" style={{ color: '#C7A76C' }}>
                  <Award className="w-10 h-10 mx-auto mb-2" />
                </div>
                <div className="text-5xl mb-2" style={{ color: '#FFFFFF' }}>2+</div>
                <p className="text-sm" style={{ color: '#94A3B8' }}>Years Experience</p>
              </div>
              <div className="group text-center p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="mb-3" style={{ color: '#C7A76C' }}>
                  <Star className="w-10 h-10 mx-auto mb-2" />
                </div>
                <div className="text-5xl mb-2" style={{ color: '#FFFFFF' }}>95%</div>
                <p className="text-sm" style={{ color: '#94A3B8' }}>Satisfaction Rate</p>
              </div>
              <div className="group text-center p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="mb-3" style={{ color: '#C7A76C' }}>
                  <TrendingUp className="w-10 h-10 mx-auto mb-2" />
                </div>
                <div className="text-5xl mb-2" style={{ color: '#FFFFFF' }}>$25M+</div>
                <p className="text-sm" style={{ color: '#94A3B8' }}>In Sales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>About Me</Badge>
              <div className="mb-4">
                <div className="text-sm tracking-wider uppercase mb-2" style={{ color: '#C7A76C' }}>CENTURY 21</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-px" style={{ backgroundColor: '#C7A76C' }}></div>
                </div>
                <div className="text-sm mb-2" style={{ color: '#E6E7E8' }}>Smart Realty</div>
                <h2 style={{ color: '#FFFFFF' }}>Yaman Yadav</h2>
              </div>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94A3B8' }}>
                Your trusted partner in navigating Edmonton's real estate market
              </p>
            </div>

            {/* Photo and Content Layout */}
            <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
              {/* Professional Photo */}
              <div className="lg:col-span-5">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" style={{ background: 'linear-gradient(135deg, #C7A76C 0%, #B89960 100%)' }}></div>
                  <div className="relative">
                    <img 
                      src={yamanPhoto}
                      alt="Yaman Yadav - Edmonton Real Estate Agent"
                      className="w-full h-auto object-cover rounded-3xl shadow-2xl border"
                      style={{ borderColor: 'rgba(199, 167, 108, 0.3)' }}
                    />
                  </div>
                </div>
                
                {/* Quick Stats Below Photo */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                    <div className="text-2xl mb-1" style={{ color: '#C7A76C' }}>2+</div>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Years</p>
                  </div>
                  <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                    <div className="text-2xl mb-1" style={{ color: '#C7A76C' }}>50+</div>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Clients</p>
                  </div>
                  <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                    <div className="text-2xl mb-1" style={{ color: '#C7A76C' }}>$25M+</div>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Sales</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="mb-4" style={{ color: '#FFFFFF' }}>Professional Background</h3>
                  <p className="mb-4" style={{ color: '#94A3B8' }}>
                    As a licensed REALTOR® with deep roots in the Edmonton community, I bring a unique combination of local market expertise, professional training, and genuine passion for helping people achieve their real estate dreams.
                  </p>
                  <p style={{ color: '#94A3B8' }}>
                    My approach is built on three pillars: <span style={{ color: '#C7A76C' }}>integrity</span>, <span style={{ color: '#C7A76C' }}>expertise</span>, and <span style={{ color: '#C7A76C' }}>results</span>. I believe that every client deserves personalized attention and honest guidance throughout their real estate journey.
                  </p>
                </div>

                <div className="border-l-2 pl-6" style={{ borderColor: '#C7A76C' }}>
                  <h4 className="mb-4" style={{ color: '#FFFFFF' }}>What Sets Me Apart</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span style={{ color: '#94A3B8' }}>In-depth knowledge of Edmonton neighborhoods and market trends</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span style={{ color: '#94A3B8' }}>Strong negotiation skills that protect your interests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span style={{ color: '#94A3B8' }}>Responsive communication - I'm always just a call away</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span style={{ color: '#94A3B8' }}>Commitment to transparency and ethical practices</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'rgba(199, 167, 108, 0.08)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                  <h4 className="mb-3" style={{ color: '#FFFFFF' }}>My Commitment to You</h4>
                  <p className="mb-4" style={{ color: '#94A3B8' }}>
                    When you work with me, you're not just getting a real estate agent—you're gaining a trusted advisor who is invested in your success. I take the time to understand your unique situation, goals, and concerns.
                  </p>
                  <p className="italic" style={{ color: '#C7A76C' }}>
                    "Whether you're a first-time buyer or a seasoned investor, I provide the expertise and support you need to make informed, confident decisions."
                  </p>
                  <div className="mt-4">
                    <p style={{ color: '#FFFFFF' }}>— Yaman Yadav</p>
                    <p className="text-sm" style={{ color: '#C7A76C' }}>CENTURY 21 Smart Realty • REALTOR®</p>
                  </div>
                </div>

                <Button 
                  onClick={() => scrollToSection('contact')} 
                  className="w-full md:w-auto px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-xl shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: '#C7A76C', color: '#141819' }}
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24" style={{ backgroundColor: '#141819' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>Services</Badge>
              <h2 className="mb-4" style={{ color: '#FFFFFF' }}>How I Can Help You</h2>
              <p className="text-xl" style={{ color: '#94A3B8' }}>
                Comprehensive real estate services tailored to your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Buying */}
              <Card className="border transition-all duration-300 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-2xl" style={{ backgroundColor: 'rgba(28, 28, 28, 0.5)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#3B82F6' }}>
                    <Search className="w-8 h-8" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h3 className="mb-3" style={{ color: '#FFFFFF' }}>Home Buying</h3>
                  <p className="mb-6" style={{ color: '#94A3B8' }}>
                    Find your dream home with expert guidance through every step of the buying process.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Personalized property search</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Neighborhood insights & analysis</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Negotiation & offer preparation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Support through closing</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6"
                    style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Selling */}
              <Card className="border transition-all duration-300 backdrop-blur-sm relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl" style={{ backgroundColor: 'rgba(199, 167, 108, 0.12)', borderColor: 'rgba(199, 167, 108, 0.4)' }}>
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="border-0 shadow-lg" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>Most Popular</Badge>
                </div>
                <CardContent className="pt-8 pb-8 relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#C7A76C' }}>
                    <Home className="w-8 h-8" style={{ color: '#141819' }} />
                  </div>
                  <h3 className="mb-3" style={{ color: '#FFFFFF' }}>Home Selling</h3>
                  <p className="mb-6" style={{ color: '#E6E7E8' }}>
                    Maximize your home's value with strategic marketing and expert negotiation.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#E6E7E8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Professional market evaluation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#E6E7E8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>High-impact marketing strategy</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#E6E7E8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Professional photography & staging</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#E6E7E8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Expert price negotiation</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl py-6"
                    style={{ backgroundColor: '#C7A76C', color: '#141819' }}
                  >
                    Get Free Evaluation
                  </Button>
                </CardContent>
              </Card>

              {/* Investment */}
              <Card className="border transition-all duration-300 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-2xl" style={{ backgroundColor: 'rgba(28, 28, 28, 0.5)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#10B981' }}>
                    <TrendingUp className="w-8 h-8" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h3 className="mb-3" style={{ color: '#FFFFFF' }}>Investment Properties</h3>
                  <p className="mb-6" style={{ color: '#94A3B8' }}>
                    Build wealth through smart real estate investments in Edmonton's growing market.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Investment property analysis</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>ROI & cash flow projections</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Market trend insights</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                      <span>Portfolio growth strategy</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6"
                    style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
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
      <section className="py-24" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>Process</Badge>
              <h2 className="mb-4" style={{ color: '#FFFFFF' }}>My Consultation Process</h2>
              <p className="text-xl" style={{ color: '#94A3B8' }}>
                What to expect when you book a consultation with me
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative text-center p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #C7A76C 0%, #B89960 100%)', color: '#141819' }}>
                  1
                </div>
                <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Initial Contact</h4>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                  Book your free consultation through the form or call me directly. I'll respond within 24 hours.
                </p>
              </div>
              <div className="relative text-center p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #C7A76C 0%, #B89960 100%)', color: '#141819' }}>
                  2
                </div>
                <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Discovery Meeting</h4>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                  We'll discuss your goals, timeline, and specific needs. In-person, phone, or video call.
                </p>
              </div>
              <div className="relative text-center p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #C7A76C 0%, #B89960 100%)', color: '#141819' }}>
                  3
                </div>
                <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Custom Strategy</h4>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                  I'll create a personalized action plan tailored to your situation with clear next steps.
                </p>
              </div>
              <div className="relative text-center p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #C7A76C 0%, #B89960 100%)', color: '#141819' }}>
                  4
                </div>
                <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Moving Forward</h4>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                  If you decide to work together, I'll guide you through every step with ongoing support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: '#141819' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>Testimonials</Badge>
              <h2 className="mb-4" style={{ color: '#FFFFFF' }}>What Clients Say</h2>
              <p className="text-xl" style={{ color: '#94A3B8' }}>
                Real experiences from real people I've helped
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {/* Testimonial 1 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border backdrop-blur-sm transition h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                      </div>
                      <p className="mb-6 italic" style={{ color: '#E6E7E8' }}>
                        "Yaman made our first home purchase stress-free. He explained everything clearly, was patient with all our questions, and found us the perfect starter home in our budget."
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #3B82F6, #2563EB)' }}>
                          <span style={{ color: '#FFFFFF' }}>AK</span>
                        </div>
                        <div>
                          <p style={{ color: '#FFFFFF' }}>Anita K.</p>
                          <p className="text-sm" style={{ color: '#E0E0E1' }}>First-Time Buyer</p>
                          <p className="text-xs mt-1" style={{ color: '#BABABA' }}>March 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 2 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border backdrop-blur-sm transition h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                      </div>
                      <p className="mb-6 italic" style={{ color: '#E6E7E8' }}>
                        "Sold our home above asking price in less than a week! Yaman's marketing strategy and negotiation skills are exceptional. Highly recommend!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #10B981, #059669)' }}>
                          <span style={{ color: '#FFFFFF' }}>HS</span>
                        </div>
                        <div>
                          <p style={{ color: '#FFFFFF' }}>Harpreet S.</p>
                          <p className="text-sm" style={{ color: '#E0E0E1' }}>Home Seller</p>
                          <p className="text-xs mt-1" style={{ color: '#BABABA' }}>July 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 3 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border backdrop-blur-sm transition h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                        <Star className="w-5 h-5" style={{ fill: '#C7A76C', color: '#C7A76C' }} />
                      </div>
                      <p className="mb-6 italic" style={{ color: '#E6E7E8' }}>
                        "As an investor, I needed someone who understood the numbers. Yaman provided detailed analysis and helped me build a profitable rental property portfolio."
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #A855F7, #9333EA)' }}>
                          <span style={{ color: '#FFFFFF' }}>RD</span>
                        </div>
                        <div>
                          <p style={{ color: '#FFFFFF' }}>Rajesh D.</p>
                          <p className="text-sm" style={{ color: '#E0E0E1' }}>Real Estate Investor</p>
                          <p className="text-xs mt-1" style={{ color: '#BABABA' }}>September 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 4 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Moving from another province was stressful, but Yaman made it easy. He sent video tours, coordinated everything remotely, and we closed smoothly. Couldn't have done it without him!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                          <span className="text-white">ML</span>
                        </div>
                        <div>
                          <p className="text-white">Maria L.</p>
                          <p className="text-sm text-slate-400">Out-of-Province Buyer</p>
                          <p className="text-xs text-slate-500 mt-1">January 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 5 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Yaman helped us find our dream family home in St. Albert. He understood our needs perfectly and showed us properties that matched our lifestyle. Professional and knowledgeable!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                          <span className="text-white">TC</span>
                        </div>
                        <div>
                          <p className="text-white">Thomas C.</p>
                          <p className="text-sm text-slate-400">Family Home Buyer</p>
                          <p className="text-xs text-slate-500 mt-1">May 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 6 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Excellent service! Yaman's knowledge of the Sherwood Park market is outstanding. He negotiated a great deal and made the entire buying process enjoyable."
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                          <span className="text-white">JW</span>
                        </div>
                        <div>
                          <p className="text-white">Jennifer W.</p>
                          <p className="text-sm text-slate-400">Home Buyer</p>
                          <p className="text-xs text-slate-500 mt-1">August 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 7 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "We were downsizing and Yaman made the transition seamless. He sold our large home quickly and found us the perfect condo downtown. Couldn't be happier!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                          <span className="text-white">DB</span>
                        </div>
                        <div>
                          <p className="text-white">David B.</p>
                          <p className="text-sm text-slate-400">Downsizing Client</p>
                          <p className="text-xs text-slate-500 mt-1">February 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 8 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Outstanding realtor! Yaman helped us navigate a competitive market and secure our offer on a beautiful home in Spruce Grove. His guidance was invaluable."
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                          <span className="text-white">SP</span>
                        </div>
                        <div>
                          <p className="text-white">Sarah P.</p>
                          <p className="text-sm text-slate-400">Home Buyer</p>
                          <p className="text-xs text-slate-500 mt-1">June 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 9 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Yaman is the best! He went above and beyond to help us sell our investment property. His market analysis was spot-on, and we got an amazing price. Thank you!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
                          <span className="text-white">KM</span>
                        </div>
                        <div>
                          <p className="text-white">Kevin M.</p>
                          <p className="text-sm text-slate-400">Property Investor</p>
                          <p className="text-xs text-slate-500 mt-1">April 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 10 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Professional, responsive, and results-driven. Yaman listed our home with beautiful photos and marketing. We had multiple offers within 3 days. Highly recommended!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center">
                          <span className="text-white">NR</span>
                        </div>
                        <div>
                          <p className="text-white">Nicole R.</p>
                          <p className="text-sm text-slate-400">Home Seller</p>
                          <p className="text-xs text-slate-500 mt-1">October 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 11 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "As a single parent, buying a home felt overwhelming. Yaman was patient, understanding, and helped me find a safe neighborhood with great schools. Forever grateful!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                          <span className="text-white">LP</span>
                        </div>
                        <div>
                          <p className="text-white">Lisa P.</p>
                          <p className="text-sm text-slate-400">First-Time Buyer</p>
                          <p className="text-xs text-slate-500 mt-1">November 2023</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 12 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Yaman helped us upgrade to a larger home as our family grew. He managed the timing perfectly so we could sell and buy simultaneously. Stress-free experience!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                          <span className="text-white">AF</span>
                        </div>
                        <div>
                          <p className="text-white">Ahmed F.</p>
                          <p className="text-sm text-slate-400">Growing Family</p>
                          <p className="text-xs text-slate-500 mt-1">December 2023</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 13 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Working with Yaman was a pleasure. His attention to detail and market knowledge helped us find an excellent investment opportunity. We've already recommended him to friends!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center">
                          <span className="text-white">BC</span>
                        </div>
                        <div>
                          <p className="text-white">Brandon C.</p>
                          <p className="text-sm text-slate-400">Investment Buyer</p>
                          <p className="text-xs text-slate-500 mt-1">September 2023</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 14 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Exceptional service from start to finish! Yaman's expertise and dedication ensured we got the best value for our property. Would work with him again in a heartbeat!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center">
                          <span className="text-white">EG</span>
                        </div>
                        <div>
                          <p className="text-white">Emily G.</p>
                          <p className="text-sm text-slate-400">Home Seller</p>
                          <p className="text-xs text-slate-500 mt-1">August 2023</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 15 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-slate-300 mb-6 italic">
                        "Yaman is thorough, honest, and genuinely cares about his clients. He helped us navigate a complex purchase and made sure we understood every step. True professional!"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                          <span className="text-white">GH</span>
                        </div>
                        <div>
                          <p className="text-white">Grace H.</p>
                          <p className="text-sm text-slate-400">Home Buyer</p>
                          <p className="text-xs text-slate-500 mt-1">July 2023</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex -left-12 bg-white/10 border-white/20 hover:bg-white/20 text-white" />
              <CarouselNext className="hidden lg:flex -right-12 bg-white/10 border-white/20 hover:bg-white/20 text-white" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-24" style={{ backgroundColor: '#141819' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>Benefits</Badge>
              <h2 className="mb-4" style={{ color: '#FFFFFF' }}>Why Work With Me?</h2>
              <p className="text-xl" style={{ color: '#94A3B8' }}>
                The advantages of choosing Yaman Yadav
              </p>
              <p className="text-sm mt-2" style={{ color: '#C7A76C' }}>CENTURY 21 Smart Realty</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border backdrop-blur-sm hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#3B82F6' }}>
                    <MapPin className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Deep knowledge of Edmonton</h4>
                  <p style={{ color: '#E0E0E1' }}>
                    neighborhoods, schools, amenities, and market trends to help you make informed decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border backdrop-blur-sm hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#10B981' }}>
                    <Clock className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Responsive communication when you need</h4>
                  <p style={{ color: '#E0E0E1' }}>
                    it. I'm just a call, text, or email away, ready to answer your questions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border backdrop-blur-sm hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#8B5CF6' }}>
                    <Shield className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Your interests always come first. I provide</h4>
                  <p style={{ color: '#E0E0E1' }}>
                    honest advice and strong negotiation to protect your investment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border backdrop-blur-sm hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#F59E0B' }}>
                    <DollarSign className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Whether buying or selling, I work to ensure</h4>
                  <p style={{ color: '#E0E0E1' }}>
                    you get the best possible value for your money and property.
                  </p>
                </CardContent>
              </Card>

              <Card className="border backdrop-blur-sm hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#EF4444' }}>
                    <FileText className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: '#FFFFFF' }}>I handle all the paperwork, coordination, and</h4>
                  <p style={{ color: '#E0E0E1' }}>
                    details so you can focus on your exciting next chapter.
                  </p>
                </CardContent>
              </Card>

              <Card className="border backdrop-blur-sm hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#6366F1' }}>
                    <Users className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h4 className="mb-3" style={{ color: '#FFFFFF' }}>No cookie-cutter approach. I tailor my</h4>
                  <p style={{ color: '#E0E0E1' }}>
                    service to your unique needs, timeline, and goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section id="service-area" className="py-24" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>Coverage</Badge>
              <h2 className="mb-4" style={{ color: '#FFFFFF' }}>Service Areas</h2>
              <p className="text-xl" style={{ color: '#94A3B8' }}>Proudly serving Alberta's vibrant communities</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Interactive Map */}
              <div className="relative">
                <div className="backdrop-blur-sm border rounded-2xl p-8" style={{ backgroundColor: 'rgba(100, 116, 139, 0.5)', borderColor: 'rgba(148, 163, 184, 0.3)' }}>
                  <svg viewBox="0 0 400 500" className="w-full h-auto">
                    {/* Background */}
                    <rect x="0" y="0" width="400" height="500" fill="transparent" />
                    
                    {/* St. Albert - North */}
                    <g className="cursor-pointer transition-all hover:opacity-80 group">
                      <ellipse cx="200" cy="100" rx="70" ry="50" 
                        fill="url(#gradient1)" 
                        opacity="0.3"
                        className="group-hover:opacity-50 transition-opacity" />
                      <text x="200" y="95" textAnchor="middle" className="fill-white text-sm">
                        St. Albert
                      </text>
                      <circle cx="200" cy="110" r="4" fill="#fbbf24" className="animate-pulse" />
                    </g>

                    {/* Spruce Grove - West */}
                    <g className="cursor-pointer transition-all hover:opacity-80 group">
                      <ellipse cx="90" cy="250" rx="65" ry="55" 
                        fill="url(#gradient2)" 
                        opacity="0.3"
                        className="group-hover:opacity-50 transition-opacity" />
                      <text x="90" y="245" textAnchor="middle" className="fill-white text-sm">
                        Spruce
                      </text>
                      <text x="90" y="260" textAnchor="middle" className="fill-white text-sm">
                        Grove
                      </text>
                      <circle cx="90" cy="270" r="4" fill="#fbbf24" className="animate-pulse" />
                    </g>

                    {/* Edmonton - Center */}
                    <g className="cursor-pointer transition-all hover:opacity-80 group">
                      <circle cx="200" cy="250" r="85" 
                        fill="url(#gradient3)" 
                        opacity="0.4"
                        className="group-hover:opacity-60 transition-opacity" />
                      <text x="200" y="250" textAnchor="middle" className="fill-white">
                        Edmonton
                      </text>
                      <circle cx="200" cy="265" r="5" fill="#fbbf24" className="animate-pulse" />
                    </g>

                    {/* Sherwood Park - East */}
                    <g className="cursor-pointer transition-all hover:opacity-80 group">
                      <ellipse cx="310" cy="250" rx="65" ry="55" 
                        fill="url(#gradient4)" 
                        opacity="0.3"
                        className="group-hover:opacity-50 transition-opacity" />
                      <text x="310" y="245" textAnchor="middle" className="fill-white text-sm">
                        Sherwood
                      </text>
                      <text x="310" y="260" textAnchor="middle" className="fill-white text-sm">
                        Park
                      </text>
                      <circle cx="310" cy="270" r="4" fill="#fbbf24" className="animate-pulse" />
                    </g>

                    {/* Greater Edmonton - Outer Circle */}
                    <g className="cursor-pointer transition-all hover:opacity-80 group">
                      <circle cx="200" cy="250" r="140" 
                        fill="none" 
                        stroke="url(#gradient5)" 
                        strokeWidth="2"
                        strokeDasharray="10,5"
                        opacity="0.5"
                        className="group-hover:opacity-80 transition-opacity" />
                      <text x="200" y="410" textAnchor="middle" className="fill-amber-400 text-xs">
                        Greater Edmonton Area
                      </text>
                    </g>

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Service Area List */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F97316' }}>
                    <Building2 className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      Complete coverage of all Edmonton neighborhoods, from downtown condos to suburban family homes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8B5CF6' }}>
                    <MapPin className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      Serving the vibrant community of St. Albert with expert knowledge of local amenities and schools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EC4899' }}>
                    <Home className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      Expert guidance in Sherwood Park's diverse housing market and family-friendly communities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#14B8A6' }}>
                    <Target className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      Comprehensive service in Spruce Grove's growing residential and commercial markets.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border" style={{ backgroundColor: 'rgba(248, 250, 252, 0.05)', borderColor: 'rgba(148, 163, 184, 0.2)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F97316' }}>
                      <Sparkles className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: '#94A3B8' }}>
                        Extended coverage throughout the Greater Edmonton Area and surrounding communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 border-0" style={{ backgroundColor: '#C7A76C', color: '#141819' }}>FAQ</Badge>
              <h2 className="mb-4" style={{ color: '#FFFFFF' }}>Frequently Asked Questions</h2>
              <p className="text-xl" style={{ color: '#94A3B8' }}>
                Common questions about working with a realtor
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="px-6 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <AccordionTrigger className="hover:no-underline py-5" style={{ color: '#FFFFFF' }}>
                  <span>What does the consultation cost?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ color: '#94A3B8' }}>
                    The initial consultation is completely free with no obligation. This is an opportunity for us to meet, discuss your goals, and see if we're a good fit to work together. I believe in earning your trust before asking for your business.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="px-6 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <AccordionTrigger className="hover:no-underline py-5" style={{ color: '#FFFFFF' }}>
                  <span>How long does the buying/selling process typically take?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ color: '#94A3B8' }}>
                    The timeline varies depending on your specific situation and market conditions. For buyers, it can range from a few weeks to several months depending on your criteria and the current inventory. For sellers, homes can sell quickly in the right market—sometimes within days—but I recommend planning for 30-90 days for the complete process including closing.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="px-6 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <AccordionTrigger className="hover:no-underline py-5" style={{ color: '#FFFFFF' }}>
                  <span>What areas of Edmonton do you serve?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ color: '#94A3B8' }}>
                    I serve all of Edmonton and surrounding areas including St. Albert, Sherwood Park, Spruce Grove, and other neighboring communities. My extensive knowledge of the greater Edmonton area ensures I can help you find the perfect location for your needs.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="px-6 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <AccordionTrigger className="hover:no-underline py-5" style={{ color: '#FFFFFF' }}>
                  <span>Do you work with first-time home buyers?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ color: '#94A3B8' }}>
                    Absolutely! I love working with first-time buyers. I understand the process can feel overwhelming, so I take extra time to explain each step, answer all your questions, and ensure you feel confident in your decisions. I'll also connect you with trusted mortgage brokers, home inspectors, and other professionals you'll need.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="px-6 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <AccordionTrigger className="hover:no-underline py-5" style={{ color: '#FFFFFF' }}>
                  <span>How do realtor fees work?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ color: '#94A3B8' }}>
                    For buyers, my services are typically free—the seller pays the commission. For sellers, commission rates are negotiable and discussed during our initial consultation. I believe in transparency, so all fees and costs will be clearly explained upfront with no hidden surprises.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="px-6 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
                <AccordionTrigger className="hover:no-underline py-5" style={{ color: '#FFFFFF' }}>
                  <span>Can I schedule a consultation outside of business hours?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ color: '#94A3B8' }}>
                    Yes! I understand that you have a busy schedule. I'm happy to accommodate evening and weekend consultations. Just let me know your preferred time when you book, and I'll do my best to make it work.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA after FAQ */}
            <div className="text-center mt-16">
              <div className="rounded-3xl p-10 md:p-12 backdrop-blur-sm border" style={{ background: 'linear-gradient(135deg, rgba(199, 167, 108, 0.15) 0%, rgba(199, 167, 108, 0.05) 100%)', borderColor: 'rgba(199, 167, 108, 0.3)' }}>
                <h3 className="mb-4" style={{ color: '#FFFFFF' }}>Still Have Questions?</h3>
                <p className="mb-8 max-w-2xl mx-auto text-lg" style={{ color: '#94A3B8' }}>
                  Book a free consultation to discuss your real estate goals and get personalized answers to all your questions.
                </p>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 rounded-xl"
                  style={{ backgroundColor: '#C7A76C', color: '#141819' }}
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
      <footer className="border-t py-16" style={{ backgroundColor: '#0F1011', borderColor: 'rgba(199, 167, 108, 0.2)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-4">
                <div className="text-xs tracking-wider uppercase mb-1" style={{ color: '#C7A76C' }}>CENTURY 21</div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-px" style={{ backgroundColor: '#C7A76C' }}></div>
                </div>
                <div className="text-xs mb-2" style={{ color: '#94A3B8' }}>Smart Realty</div>
                <h3 style={{ color: '#C7A76C' }}>Yaman Yadav</h3>
              </div>
              <p className="mb-6" style={{ color: '#94A3B8' }}>
                Your trusted Edmonton real estate expert, dedicated to helping you find your dream home.
              </p>
              <div className="flex gap-3">
                <a href="tel:587-568-8591" className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ backgroundColor: 'rgba(199, 167, 108, 0.1)', borderColor: 'rgba(199, 167, 108, 0.3)', color: '#C7A76C' }}>
                  <Phone className="w-5 h-5" />
                </a>
                <a href="mailto:contact@yamanyadav.com" className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ backgroundColor: 'rgba(199, 167, 108, 0.1)', borderColor: 'rgba(199, 167, 108, 0.3)', color: '#C7A76C' }}>
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4" style={{ color: '#FFFFFF' }}>Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('about')} className="transition bg-transparent border-0 cursor-pointer p-0" style={{ color: '#94A3B8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>About Me</button></li>
                <li><button onClick={() => scrollToSection('services')} className="transition bg-transparent border-0 cursor-pointer p-0" style={{ color: '#94A3B8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>Services</button></li>
                <li><button onClick={() => scrollToSection('service-area')} className="transition bg-transparent border-0 cursor-pointer p-0" style={{ color: '#94A3B8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>Service Areas</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="transition bg-transparent border-0 cursor-pointer p-0" style={{ color: '#94A3B8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>Book Consultation</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4" style={{ color: '#FFFFFF' }}>Contact Info</h4>
              <ul className="space-y-4" style={{ color: '#94A3B8' }}>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                  <a href="tel:587-568-8591" className="transition" style={{ color: '#94A3B8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>587-568-8591</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                  <a href="mailto:contact@yamanyadav.com" className="transition" style={{ color: '#94A3B8' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C7A76C'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>contact@yamanyadav.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C7A76C' }} />
                  <div>
                    <div className="mb-1" style={{ color: '#FFFFFF' }}>Service Areas:</div>
                    <div className="text-sm" style={{ color: '#94A3B8' }}>
                      Edmonton • Sherwood Park • Spruce Grove • St. Albert
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-6xl mx-auto pt-8 border-t text-center text-sm" style={{ borderColor: 'rgba(199, 167, 108, 0.2)', color: '#64748B' }}>
            <p>© 2025 Yaman Yadav - CENTURY 21 Smart Realty. All rights reserved.</p>
            <p className="mt-2">Licensed REALTOR® serving Edmonton & surrounding areas</p>
          </div>
        </div>
      </footer>















    </div>
  );
}
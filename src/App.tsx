import { useState, useEffect } from "react";
import {

  Loader2,  
} from "lucide-react";
import {
  Phone,
  Calendar,
  CheckCircle,
  Shield,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Badge } from "./components/ui/badge";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { BookConsultation } from "./components/BookConsultation";
import { PopupConsultationForm } from "./components/PopupConsultationForm";
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































    </div>
  );
}
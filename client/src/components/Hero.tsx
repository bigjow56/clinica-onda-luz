import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-dental-clinic.jpg";
import { AppointmentModal } from "@/components/AppointmentModal";
import { apiClient } from "@/lib/api";

const Hero = () => {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'DentalCare',
    heroTitle: 'Seu sorriso é nossa prioridade',
    heroDescription: 'Oferecemos cuidados odontológicos modernos e personalizados para toda a família. Tecnologia avançada e atendimento humanizado.',
    heroImageUrl: ''
  });

  useEffect(() => {
    loadSiteSettings();
  }, []);

  const loadSiteSettings = async () => {
    try {
      const data = await apiClient.getSiteSettings();
      
      if (data) {
        setSiteSettings({
          siteName: data.siteName || 'DentalCare',
          heroTitle: data.heroTitle || 'Seu sorriso é nossa prioridade',
          heroDescription: data.heroDescription || 'Oferecemos cuidados odontológicos modernos e personalizados para toda a família. Tecnologia avançada e atendimento humanizado.',
          heroImageUrl: data.heroImageUrl || ''
        });
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-soft-gradient">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {siteSettings.heroTitle.split(' ').slice(0, -1).join(' ')}{" "}
                <span className="bg-hero-gradient bg-clip-text text-transparent">
                  {siteSettings.heroTitle.split(' ').slice(-1)[0]}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {siteSettings.heroDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setAppointmentOpen(true)}
              >
                Agendar Consulta
              </Button>
              <Button variant="outline" size="lg">
                Conhecer Serviços
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-foreground font-medium">15+ Anos de Experiência</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-foreground font-medium">Tecnologia Avançada</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-foreground font-medium">Atendimento Humanizado</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-hero">
              <img
                src={siteSettings.hero_image_url || heroImage}
                alt={`Clínica ${siteSettings.site_name} - Ambiente moderno e acolhedor`}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-card p-6 border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Pacientes Atendidos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AppointmentModal 
        open={appointmentOpen} 
        onOpenChange={setAppointmentOpen} 
      />
    </section>
  );
};

export default Hero;
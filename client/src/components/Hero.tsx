import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Star, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-dental-reception.png";
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
          siteName: (data as any).site_name || 'DentalCare',
          heroTitle: (data as any).hero_title || 'Seu sorriso é nossa prioridade',
          heroDescription: (data as any).hero_description || 'Oferecemos cuidados odontológicos modernos e personalizados para toda a família. Tecnologia avançada e atendimento humanizado.',
          heroImageUrl: (data as any).hero_image_url || ''
        });
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-100 via-blue-50 to-green-100">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {siteSettings.heroTitle.split(' ').map((word, index) => 
                  word.toLowerCase() === 'sorriso' ? (
                    <span key={index} className="text-green-600">{word} </span>
                  ) : (
                    word + ' '
                  )
                )}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {siteSettings.heroDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setAppointmentOpen(true)}
                className="shadow-xl hover:shadow-2xl"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
              <Button variant="hero" size="lg" className="shadow-xl hover:shadow-2xl">
                <Eye className="w-5 h-5 mr-2" />
                Conhecer Serviços
              </Button>
            </div>

            {/* Badges de Confiança */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-green-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">15+</div>
                    <span className="text-xs md:text-sm text-gray-600">Anos de Experiência</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Star className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">98%</div>
                    <span className="text-xs md:text-sm text-gray-600">Satisfação</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">5000+</div>
                    <span className="text-xs md:text-sm text-gray-600">Pacientes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-hero">
              <img
                src={siteSettings.heroImageUrl || heroImage}
                alt={`Clínica ${siteSettings.siteName} - Ambiente moderno e acolhedor`}
                className="w-full h-auto object-cover"
              />
              {/* Overlay colorido suave */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20"></div>
            </div>
            
            {/* Floating stats card - hidden on mobile */}
            <div className="hidden md:block absolute -bottom-6 -right-6 bg-card rounded-xl shadow-card p-4 lg:p-6 border">
              <div className="grid grid-cols-2 gap-3 lg:gap-4 text-center">
                <div>
                  <div className="text-xl lg:text-2xl font-bold text-primary">5000+</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Pacientes Atendidos</div>
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-bold text-accent">98%</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Satisfação</div>
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
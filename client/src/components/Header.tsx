import { Button } from "@/components/ui/button";
import { Menu, Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "@/lib/api";
import { AppointmentModal } from "@/components/AppointmentModal";

function DynamicSiteName() {
  const [siteName, setSiteName] = useState('DentalCare');

  useEffect(() => {
    const loadSiteName = async () => {
      try {
        const data = await apiClient.getSiteSettings();
        if (data?.siteName) {
          setSiteName(data.siteName);
        }
      } catch (error) {
        console.error('Error loading site name:', error);
      }
    };

    loadSiteName();
  }, []);

  return (
    <span className="text-2xl font-bold text-primary">
      {siteName}
    </span>
  );
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-muted-foreground border-b">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Av. Paulista, 1000 - São Paulo</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Seg-Sex: 8h-18h | Sáb: 8h-12h</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <DynamicSiteName />
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-smooth">
              Início
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">
              Sobre
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-smooth">
              Serviços
            </a>
            <a href="#team" className="text-foreground hover:text-primary transition-smooth">
              Equipe
            </a>
            <Link to="/blog" className="text-foreground hover:text-primary transition-smooth">
              Blog
            </Link>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
              Contato
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="default" 
              className="hidden md:inline-flex"
              onClick={() => setAppointmentOpen(true)}
            >
              Agendar Consulta
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-foreground hover:text-primary transition-smooth">
                Início
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-smooth">
                Sobre
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-smooth">
                Serviços
              </a>
              <a href="#team" className="text-foreground hover:text-primary transition-smooth">
                Equipe
              </a>
              <Link to="/blog" className="text-foreground hover:text-primary transition-smooth">
                Blog
              </Link>
              <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
                Contato
              </a>
              <Button 
                variant="default" 
                className="w-full mt-2"
                onClick={() => setAppointmentOpen(true)}
              >
                Agendar Consulta
              </Button>
            </div>
          </div>
        )}
        
        <AppointmentModal 
          open={appointmentOpen} 
          onOpenChange={setAppointmentOpen} 
        />
      </div>
    </header>
  );
};

export default Header;
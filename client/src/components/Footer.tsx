import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              Clínica Excellence
            </h3>
            <p className="text-sm md:text-base text-background/80 leading-relaxed">
              Cuidando do seu sorriso há mais de 15 anos. 
              Tecnologia avançada e atendimento humanizado para toda a família.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold text-background">Serviços</h4>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-background/80">
              <li><a href="#services" className="hover:text-primary transition-smooth">Odontologia Geral</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Clareamento Dental</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Ortodontia</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Implantes</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Odontopediatria</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Tratamento de Canal</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold text-background">Links Rápidos</h4>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-background/80">
              <li><a href="#home" className="hover:text-primary transition-smooth">Início</a></li>
              <li><a href="#about" className="hover:text-primary transition-smooth">Sobre Nós</a></li>
              <li><a href="#team" className="hover:text-primary transition-smooth">Nossa Equipe</a></li>
              <li><a href="#contact" className="hover:text-primary transition-smooth">Contato</a></li>
              <li><Link to="/blog" className="hover:text-primary transition-smooth">Blog</Link></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold text-background">Contato</h4>
            <div className="space-y-2 md:space-y-3 text-sm md:text-base text-background/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p>Av. Paulista, 1000 - Conj. 42</p>
                  <p>Bela Vista, São Paulo - SP</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <p>(11) 99999-9999</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <p>contato@dentalcare.com.br</p>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p>Seg-Sex: 8h-18h</p>
                  <p>Sáb: 8h-12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
          <div className="text-center">
            <h4 className="text-base md:text-lg font-semibold text-background mb-2">
              Emergência Odontológica 24h
            </h4>
            <p className="text-sm md:text-base text-background/80 mb-3 md:mb-4">
              Dor de dente, trauma ou urgência? Estamos aqui para ajudar!
            </p>
            <Button variant="destructive" size="default" className="text-sm md:text-base">
              Ligar Agora: (11) 98888-8888
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-background/60 text-xs md:text-sm">
              © 2024 Clínica Excellence. Todos os direitos reservados.
            </p>
            <p className="text-background/60 text-xs md:text-sm flex items-center gap-2">
              Feito com <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" /> para seu sorriso
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
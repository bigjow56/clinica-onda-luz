import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-dental-clinic.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-soft-gradient">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Seu sorriso é nossa{" "}
                <span className="bg-hero-gradient bg-clip-text text-transparent">
                  prioridade
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Oferecemos cuidados odontológicos modernos e personalizados 
                para toda a família. Tecnologia avançada e atendimento humanizado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
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
                src={heroImage}
                alt="Clínica DentalCare - Ambiente moderno e acolhedor"
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
    </section>
  );
};

export default Hero;
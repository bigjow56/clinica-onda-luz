import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smile, 
  Sparkles, 
  Shield, 
  Stethoscope, 
  Baby, 
  Crown,
  ArrowRight 
} from "lucide-react";
import servicesImage from "@/assets/dental-services.jpg";

const Services = () => {
  const services = [
    {
      icon: Smile,
      title: "Odontologia Geral",
      description: "Consultas, limpezas, obturações e tratamentos preventivos para manter sua saúde bucal em dia.",
      price: "A partir de R$ 80"
    },
    {
      icon: Sparkles,
      title: "Clareamento Dental",
      description: "Técnicas modernas para clarear seus dentes de forma segura e eficaz.",
      price: "A partir de R$ 300"
    },
    {
      icon: Shield,
      title: "Tratamento de Canal",
      description: "Procedimentos endodônticos com tecnologia avançada e mínimo desconforto.",
      price: "A partir de R$ 400"
    },
    {
      icon: Crown,
      title: "Próteses e Implantes",
      description: "Soluções completas para reposição de dentes perdidos com materiais de alta qualidade.",
      price: "A partir de R$ 1.200"
    },
    {
      icon: Baby,
      title: "Odontopediatria",
      description: "Cuidados especializados para crianças em ambiente acolhedor e lúdico.",
      price: "A partir de R$ 90"
    },
    {
      icon: Stethoscope,
      title: "Ortodontia",
      description: "Aparelhos convencionais e alinhadores invisíveis para corrigir o posicionamento dos dentes.",
      price: "A partir de R$ 150/mês"
    }
  ];

  return (
    <section id="services" className="py-20 bg-soft-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nossos <span className="bg-hero-gradient bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma gama completa de tratamentos odontológicos 
            com tecnologia de ponta e profissionais especializados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-card transition-smooth border-border group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-smooth">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {service.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-accent">
                    {service.price}
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    Saiba mais
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Tecnologia Avançada
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Investimos constantemente em equipamentos de última geração para 
                oferecer tratamentos mais precisos, rápidos e confortáveis.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Radiografia digital com menor radiação</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Scanner intraoral 3D para maior precisão</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Laser odontológico para tratamentos menos invasivos</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Sistema CAD/CAM para próteses em sessão única</span>
                </li>
              </ul>
              <Button variant="accent" size="lg">
                Agendar Avaliação Gratuita
              </Button>
            </div>
            
            <div className="relative">
              <img
                src={servicesImage}
                alt="Equipamentos modernos da clínica odontológica"
                className="w-full h-auto rounded-xl shadow-card"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
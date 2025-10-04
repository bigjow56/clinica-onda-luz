import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Shield, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Cuidado Personalizado",
      description: "Cada paciente recebe um plano de tratamento único e personalizado"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Protocolos rigorosos de higiene e esterilização para sua proteção"
    },
    {
      icon: Award,
      title: "Excelência Reconhecida",
      description: "Profissionais especializados e certificados pelos melhores órgãos"
    },
    {
      icon: Users,
      title: "Para Toda Família",
      description: "Atendemos desde crianças até idosos com cuidado especializado"
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Sobre a Clínica Excellence
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Há mais de 15 anos transformando sorrisos e cuidando da saúde bucal 
            de milhares de famílias em São Paulo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-smooth border-border">
              <CardContent className="pt-6 pb-5 px-4">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-soft-gradient rounded-full">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-soft-gradient rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">
                Nossa Missão
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                Proporcionar cuidados odontológicos de excelência, combinando tecnologia 
                avançada com atendimento humanizado. Acreditamos que um sorriso saudável 
                transforma vidas e eleva a autoestima.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Nossa equipe multidisciplinar está sempre atualizada com as mais 
                modernas técnicas e tratamentos, garantindo que nossos pacientes 
                recebam o melhor cuidado possível.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">15+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Anos de Experiência</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4">
                <div className="text-2xl md:text-4xl font-bold text-accent mb-1 md:mb-2">5000+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Pacientes Atendidos</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">98%</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Taxa de Satisfação</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4">
                <div className="text-2xl md:text-4xl font-bold text-accent mb-1 md:mb-2">24h</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Suporte Emergencial</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
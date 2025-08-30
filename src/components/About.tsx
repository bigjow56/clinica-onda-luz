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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Sobre a <span className="bg-hero-gradient bg-clip-text text-transparent">DentalCare</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Há mais de 15 anos transformando sorrisos e cuidando da saúde bucal 
            de milhares de famílias em São Paulo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-smooth border-border">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-soft-gradient rounded-full">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-soft-gradient rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Nossa Missão
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Proporcionar cuidados odontológicos de excelência, combinando tecnologia 
                avançada com atendimento humanizado. Acreditamos que um sorriso saudável 
                transforma vidas e eleva a autoestima.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nossa equipe multidisciplinar está sempre atualizada com as mais 
                modernas técnicas e tratamentos, garantindo que nossos pacientes 
                recebam o melhor cuidado possível.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">5000+</div>
                <div className="text-muted-foreground">Pacientes Atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Taxa de Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">24h</div>
                <div className="text-muted-foreground">Suporte Emergencial</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
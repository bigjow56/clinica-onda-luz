import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dentistPortrait from "@/assets/dentist-portrait.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Dra. Ana Carolina Silva",
      specialty: "Ortodontia e Odontopediatria",
      experience: "12 anos de experiência",
      education: "CRO-SP 45.123 | Especialista USP",
      image: dentistPortrait,
      specialties: ["Ortodontia", "Odontopediatria", "Estética"]
    },
    {
      name: "Dr. Rafael Santos",
      specialty: "Implantodontia e Cirurgia",
      experience: "15 anos de experiência",
      education: "CRO-SP 38.456 | Mestrado UNICAMP",
      image: dentistPortrait,
      specialties: ["Implantes", "Cirurgia", "Próteses"]
    },
    {
      name: "Dra. Marina Costa",
      specialty: "Endodontia e Estética",
      experience: "10 anos de experiência",
      education: "CRO-SP 52.789 | Especialista PUC",
      image: dentistPortrait,
      specialties: ["Endodontia", "Estética", "Clareamento"]
    }
  ];

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nossa <span className="bg-hero-gradient bg-clip-text text-transparent">Equipe</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Profissionais altamente qualificados e experientes, 
            dedicados a proporcionar o melhor cuidado para você e sua família.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-card transition-smooth border-border group">
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-hero-gradient opacity-0 group-hover:opacity-10 transition-smooth"></div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.specialty}
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  {member.experience}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {member.education}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, specIndex) => (
                    <Badge 
                      key={specIndex} 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-soft-gradient rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Formação Continuada
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa equipe está sempre se atualizando com os mais recentes 
              avanços da odontologia através de cursos, congressos e especializações.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Cursos por Ano</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">8</div>
              <div className="text-muted-foreground">Especializações</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Anos de Experiência Média</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <div className="text-muted-foreground">Mestrados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
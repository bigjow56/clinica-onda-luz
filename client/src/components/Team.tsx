import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dentistPortrait from "@/assets/dentist-portrait.jpg";
import { apiClient } from "@/lib/api";

interface TeamMember {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  credentials: string;
  imageUrl?: string;
  specialties: string[];
  displayOrder: number;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const data = await apiClient.getTeamMembers();
      setTeamMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="team" className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Nossa Equipe
            </h2>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Nossa Equipe
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Profissionais altamente qualificados e experientes, 
            dedicados a proporcionar o melhor cuidado para você e sua família.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-card transition-smooth border-border group">
              <div className="relative overflow-hidden">
                <img
                  src={member.imageUrl || dentistPortrait}
                  alt={member.name}
                  className="w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-hero-gradient opacity-0 group-hover:opacity-10 transition-smooth"></div>
              </div>
              
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-primary font-medium mb-2 md:mb-3">
                  {member.specialty}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                  {member.experienceYears} anos de experiência
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  {member.credentials}
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
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Santos",
      age: "34 anos",
      treatment: "Implante Dentário",
      rating: 5,
      text: "Excelente atendimento! A Dra. Ana foi muito cuidadosa e o resultado do meu implante ficou perfeito. Recomendo muito a clínica.",
      date: "Janeiro 2024"
    },
    {
      name: "João Silva",
      age: "28 anos", 
      treatment: "Ortodontia",
      rating: 5,
      text: "Usei aparelho invisível por 18 meses e o resultado superou minhas expectativas. Equipe muito profissional e atenciosa.",
      date: "Dezembro 2023"
    },
    {
      name: "Carmen Rodriguez",
      age: "45 anos",
      treatment: "Clareamento",
      rating: 5,
      text: "Fiz clareamento dental e ficou incrível! O Dr. Rafael explicou todo o processo e o cuidado foi excepcional.",
      date: "Novembro 2023"
    },
    {
      name: "Pedro Costa",
      age: "52 anos",
      treatment: "Prótese Total",
      rating: 5,
      text: "Depois de anos com problemas dentários, finalmente encontrei uma clínica de confiança. Prótese perfeita e conforto total.",
      date: "Outubro 2023"
    },
    {
      name: "Ana Beatriz",
      age: "8 anos (mãe relatando)",
      treatment: "Odontopediatria",
      rating: 5,
      text: "Minha filha adorou a consulta! A Dra. Marina tem um jeito especial com crianças. Ana saiu sorrindo da clínica.",
      date: "Setembro 2023"
    },
    {
      name: "Carlos Mendes",
      age: "41 anos",
      treatment: "Tratamento de Canal",
      rating: 5,
      text: "Tinha muito medo de canal, mas a equipe me tranquilizou. Procedimento rápido, sem dor. Excelente trabalho!",
      date: "Agosto 2023"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            O que nossos <span className="bg-hero-gradient bg-clip-text text-transparent">pacientes</span> dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A satisfação dos nossos pacientes é nossa maior recompensa. 
            Veja alguns depoimentos de quem confia em nosso trabalho.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-card transition-smooth border-border relative">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-primary opacity-20" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.age}
                      </p>
                      <p className="text-sm text-primary font-medium">
                        {testimonial.treatment}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-soft-gradient rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Sua Opinião é Importante
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Após seu tratamento, adoraríamos ouvir sua experiência. 
            Seu feedback nos ajuda a melhorar continuamente nossos serviços.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Taxa de Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">4.9</div>
              <div className="text-muted-foreground">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1200+</div>
              <div className="text-muted-foreground">Avaliações Positivas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
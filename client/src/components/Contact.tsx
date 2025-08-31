import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppointmentModal } from "@/components/AppointmentModal";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  Car,
  Train,
  Bus
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado!",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 bg-soft-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Entre em <span className="bg-hero-gradient bg-clip-text text-transparent">Contato</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estamos prontos para cuidar do seu sorriso. 
            Agende sua consulta ou tire suas dúvidas conosco.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="shadow-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl text-foreground flex items-center gap-2 md:gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Agendar Consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 md:py-8">
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  Clique no botão abaixo para abrir o formulário completo de agendamento com seleção de data, horário e serviço.
                </p>
                <Button 
                  onClick={() => setAppointmentOpen(true)}
                  variant="hero" 
                  size="default"
                  className="w-full text-sm md:text-base"
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Agendar Consulta Online
                </Button>
              </div>
              
              <div className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Ou envie uma mensagem:</h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-foreground mb-1 md:mb-2">
                      Nome Completo
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-foreground mb-1 md:mb-2">
                      E-mail
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Serviço de Interesse
                    </label>
                    <Input
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="Ex: Limpeza, Clareamento..."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte-nos sobre suas necessidades ou dúvidas..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Endereço</h3>
                    <p className="text-muted-foreground">
                      Av. Paulista, 1000 - Conj. 42<br />
                      Bela Vista, São Paulo - SP<br />
                      CEP: 01310-100
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Telefones</h3>
                    <p className="text-muted-foreground">
                      <strong>Recepção:</strong> (11) 3456-7890<br />
                      <strong>WhatsApp:</strong> (11) 99999-9999<br />
                      <strong>Emergência:</strong> (11) 98888-8888
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Horário de Funcionamento</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p><strong>Segunda a Sexta:</strong> 8h às 18h</p>
                      <p><strong>Sábado:</strong> 8h às 12h</p>
                      <p><strong>Domingo:</strong> Fechado</p>
                      <p className="text-accent font-medium">Atendimento de emergência 24h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
                    <p className="text-muted-foreground">
                      <strong>Geral:</strong> contato@dentalcare.com.br<br />
                      <strong>Emergência:</strong> emergencia@dentalcare.com.br
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transportation */}
            <Card className="shadow-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Como Chegar</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Car className="w-6 h-6 text-primary" />
                    <span className="text-sm text-muted-foreground">Estacionamento próprio</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Train className="w-6 h-6 text-accent" />
                    <span className="text-sm text-muted-foreground">Metrô Trianon-MASP</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Bus className="w-6 h-6 text-primary" />
                    <span className="text-sm text-muted-foreground">Várias linhas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <AppointmentModal 
          open={appointmentOpen} 
          onOpenChange={setAppointmentOpen} 
        />
      </div>
    </section>
  );
};

export default Contact;
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock } from "lucide-react";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const services = [
  "Consulta de Rotina",
  "Limpeza Dental",
  "Ortodontia",
  "Implantes",
  "Clareamento",
  "Endodontia",
  "Cirurgia",
  "Odontopediatria",
  "Próteses",
  "Estética Dental"
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

export function AppointmentModal({ open, onOpenChange }: AppointmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    preferred_date: '',
    preferred_time: '',
    service_type: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Agendamento enviado!",
        description: "Entraremos em contato para confirmar sua consulta.",
      });

      setFormData({
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        preferred_date: '',
        preferred_time: '',
        service_type: '',
        message: ''
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro ao agendar",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-hero-gradient bg-clip-text text-transparent">
            Agendar Consulta
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.patient_name}
                onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                placeholder="Seu nome completo"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.patient_email}
                  onChange={(e) => setFormData({...formData, patient_email: e.target.value})}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.patient_phone}
                  onChange={(e) => setFormData({...formData, patient_phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service">Tipo de Serviço *</Label>
              <Select onValueChange={(value) => setFormData({...formData, service_type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Data Preferida *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.preferred_date}
                  onChange={(e) => setFormData({...formData, preferred_date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horário Preferido *
                </Label>
                <Select onValueChange={(value) => setFormData({...formData, preferred_time: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Observações</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Alguma informação adicional ou preferência específica..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="hero"
              disabled={loading || !formData.patient_name || !formData.patient_email || !formData.patient_phone || !formData.service_type || !formData.preferred_date || !formData.preferred_time}
              className="flex-1"
            >
              {loading ? "Enviando..." : "Agendar Consulta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
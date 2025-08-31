import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Mail, Phone, User, MessageCircle } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await apiClient.getAppointments();
      setAppointments((data || []) as Appointment[]);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast({
        title: "Erro ao carregar agendamentos",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await apiClient.updateAppointment(id, { status });

      toast({
        title: "Status atualizado!",
        description: "O agendamento foi atualizado com sucesso.",
      });

      loadAppointments();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const },
      confirmed: { label: 'Confirmado', variant: 'default' as const },
      cancelled: { label: 'Cancelado', variant: 'destructive' as const },
      completed: { label: 'Concluído', variant: 'outline' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Agendamentos</h3>
        <div className="text-sm text-muted-foreground">
          Total: {appointments.length}
        </div>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <span>{appointment.patientName}</span>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(appointment.status)}
                  <Select
                    value={appointment.status}
                    onValueChange={(value) => updateStatus(appointment.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{appointment.patientEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{appointment.patientPhone}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(appointment.preferredDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{appointment.preferredTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p><strong>Serviço:</strong> {appointment.serviceType}</p>
                  {appointment.message && (
                    <div className="flex items-start gap-2 mt-2">
                      <MessageCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{appointment.message}</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-muted-foreground pt-2 border-t">
                  Criado em: {formatDate(appointment.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {appointments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum agendamento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  credentials: string;
  image_url?: string;
  specialties: string[];
  display_order: number;
}

export function AdminTeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience_years: 0,
    credentials: '',
    image_url: '',
    specialties: '',
    display_order: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error loading team members:', error);
      toast({
        title: "Erro ao carregar equipe",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      specialty: member.specialty,
      experience_years: member.experience_years,
      credentials: member.credentials,
      image_url: member.image_url || '',
      specialties: member.specialties.join(', '),
      display_order: member.display_order
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      specialty: '',
      experience_years: 0,
      credentials: '',
      image_url: '',
      specialties: '',
      display_order: members.length + 1
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const memberData = {
        ...formData,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s)
      };

      if (editingMember) {
        // Update existing
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingMember.id);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('team_members')
          .insert([memberData]);
        
        if (error) throw error;
      }

      toast({
        title: editingMember ? "Membro atualizado!" : "Membro adicionado!",
        description: "As mudanças foram salvas com sucesso.",
      });

      setIsDialogOpen(false);
      loadMembers();
    } catch (error) {
      console.error('Error saving member:', error);
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este membro?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Membro removido!",
        description: "O membro foi removido da equipe.",
      });

      loadMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: "Erro ao remover",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
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
        <h3 className="text-lg font-semibold">Membros da Equipe</h3>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Membro
        </Button>
      </div>

      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-muted-foreground">{member.specialty}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {member.experience_years} anos de experiência • {member.credentials}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? 'Editar Membro' : 'Adicionar Membro'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nome completo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade Principal</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  placeholder="Ex: Ortodontia"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Anos de Experiência</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience_years}
                  onChange={(e) => setFormData({...formData, experience_years: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="display_order">Ordem de Exibição</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentials">Credenciais</Label>
              <Input
                id="credentials"
                value={formData.credentials}
                onChange={(e) => setFormData({...formData, credentials: e.target.value})}
                placeholder="Ex: CRO-SP 12345 | Especialista USP"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialties">Especialidades (separadas por vírgula)</Label>
              <Textarea
                id="specialties"
                value={formData.specialties}
                onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                placeholder="Ex: Ortodontia, Odontopediatria, Estética"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL da Imagem (opcional)</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://exemplo.com/foto.jpg"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1"
                variant="hero"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
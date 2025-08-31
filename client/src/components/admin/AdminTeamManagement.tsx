import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, User } from "lucide-react";

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

export function AdminTeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experienceYears: 0,
    credentials: '',
    imageUrl: '',
    specialties: [] as string[],
    displayOrder: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await apiClient.getTeamMembers();
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

  const handleSave = async () => {
    try {
      const memberData = {
        ...formData,
        specialties: formData.specialties.filter(s => s.trim() !== '')
      };

      if (editingMember) {
        // Update existing
        await apiClient.updateTeamMember(editingMember.id, memberData);
        toast({
          title: "Membro atualizado!",
          description: "As informações foram atualizadas com sucesso.",
        });
      } else {
        // Insert new
        await apiClient.createTeamMember(memberData);
        toast({
          title: "Membro adicionado!",
          description: "O novo membro foi adicionado à equipe.",
        });
      }

      loadMembers();
      setDialogOpen(false);
      resetForm();
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
      await apiClient.deleteTeamMember(id);

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

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      specialty: member.specialty,
      experienceYears: member.experienceYears,
      credentials: member.credentials,
      imageUrl: member.imageUrl || '',
      specialties: member.specialties || [],
      displayOrder: member.displayOrder
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      specialty: '',
      experienceYears: 0,
      credentials: '',
      imageUrl: '',
      specialties: [],
      displayOrder: 0
    });
  };

  const handleSpecialtiesChange = (value: string) => {
    const specialtiesArray = value.split(',').map(s => s.trim());
    setFormData({ ...formData, specialties: specialtiesArray });
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Editar Membro' : 'Adicionar Membro'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="specialty">Especialidade Principal</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="Ex: Ortodontia"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="experienceYears">Anos de Experiência</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                  placeholder="Ex: 10"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="credentials">Credenciais</Label>
                <Input
                  id="credentials"
                  value={formData.credentials}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  placeholder="Ex: CRO-SP 12345"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="specialties">Especialidades (separadas por vírgula)</Label>
                <Input
                  id="specialties"
                  value={formData.specialties.join(', ')}
                  onChange={(e) => handleSpecialtiesChange(e.target.value)}
                  placeholder="Ex: Ortodontia, Estética, Implantes"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imageUrl">URL da Foto (opcional)</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="displayOrder">Ordem de Exibição</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  placeholder="1, 2, 3..."
                />
              </div>

              <Button onClick={handleSave} className="w-full">
                {editingMember ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <span>{member.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <p><strong>Especialidade:</strong> {member.specialty}</p>
                <p><strong>Experiência:</strong> {member.experienceYears} anos</p>
                <p><strong>Credenciais:</strong> {member.credentials}</p>
                {member.specialties && member.specialties.length > 0 && (
                  <p><strong>Especialidades:</strong> {member.specialties.join(', ')}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
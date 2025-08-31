import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export function AdminSiteSettings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: '',
    heroTitle: '',
    heroDescription: '',
    heroImageUrl: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getSiteSettings();
      
      if (data) {
        setSettings({
          siteName: data.siteName || '',
          heroTitle: data.heroTitle || '',
          heroDescription: data.heroDescription || '',
          heroImageUrl: data.heroImageUrl || ''
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Erro ao carregar configurações",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.updateSiteSettings(settings);
      
      toast({
        title: "Configurações salvas!",
        description: "As alterações foram aplicadas com sucesso.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="siteName">Nome do Site</Label>
          <Input
            id="siteName"
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            placeholder="Ex: DentalCare"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroTitle">Título Principal</Label>
          <Input
            id="heroTitle"
            value={settings.heroTitle}
            onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
            placeholder="Ex: Seu sorriso é nossa prioridade"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroDescription">Descrição Principal</Label>
          <Textarea
            id="heroDescription"
            value={settings.heroDescription}
            onChange={(e) => setSettings({...settings, heroDescription: e.target.value})}
            placeholder="Descrição que aparece na página inicial"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroImageUrl">URL da Imagem Principal (opcional)</Label>
          <Input
            id="heroImageUrl"
            value={settings.heroImageUrl}
            onChange={(e) => setSettings({...settings, heroImageUrl: e.target.value})}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full"
        variant="hero"
      >
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Salvando..." : "Salvar Configurações"}
      </Button>
    </div>
  );
}
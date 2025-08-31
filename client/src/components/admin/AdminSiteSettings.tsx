import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export function AdminSiteSettings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    site_name: '',
    hero_title: '',
    hero_description: '',
    hero_image_url: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings({
          site_name: data.site_name || '',
          hero_title: data.hero_title || '',
          hero_description: data.hero_description || '',
          hero_image_url: data.hero_image_url || ''
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
      // Check if settings exist
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('site_settings')
          .update(settings)
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('site_settings')
          .insert([settings]);
        
        if (error) throw error;
      }

      toast({
        title: "Configurações salvas!",
        description: "As mudanças foram aplicadas com sucesso.",
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
          <Label htmlFor="site_name">Nome do Site</Label>
          <Input
            id="site_name"
            value={settings.site_name}
            onChange={(e) => setSettings({...settings, site_name: e.target.value})}
            placeholder="Ex: DentalCare"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero_title">Título Principal</Label>
          <Input
            id="hero_title"
            value={settings.hero_title}
            onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
            placeholder="Ex: Seu sorriso é nossa prioridade"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero_description">Descrição Principal</Label>
          <Textarea
            id="hero_description"
            value={settings.hero_description}
            onChange={(e) => setSettings({...settings, hero_description: e.target.value})}
            placeholder="Descrição que aparece na página inicial"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero_image_url">URL da Imagem Principal (opcional)</Label>
          <Input
            id="hero_image_url"
            value={settings.hero_image_url}
            onChange={(e) => setSettings({...settings, hero_image_url: e.target.value})}
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
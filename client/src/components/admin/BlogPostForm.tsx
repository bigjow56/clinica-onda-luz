import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Save } from 'lucide-react';

type BlogPostFormData = {
  title: string;
  content: string;
  excerpt: string;
  featuredImageUrl: string;
  category: 'evento' | 'promocao';
  status: 'draft' | 'published';
};

type BlogPostFormProps = {
  onSave: (data: BlogPostFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<BlogPostFormData>;
  loading?: boolean;
};

export default function BlogPostForm({ 
  onSave, 
  onCancel, 
  initialData = {}, 
  loading = false 
}: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: initialData.title || '',
    content: initialData.content || '',
    excerpt: initialData.excerpt || '',
    featuredImageUrl: initialData.featuredImageUrl || '',
    category: initialData.category || 'promocao',
    status: initialData.status || 'draft',
  });

  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (field: keyof BlogPostFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Por favor, preencha pelo menos o título e o conteúdo.');
      return;
    }

    await onSave(formData);
  };

  const handleImageUpload = (file: File) => {
    // Por enquanto, vamos usar um placeholder
    // Em um ambiente real, você faria upload para um serviço como AWS S3, Cloudinary, etc.
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      handleInputChange('featuredImageUrl', result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageUpload(imageFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    handleInputChange('featuredImageUrl', '');
  };

  // Auto-generate excerpt from content if not provided
  const generateExcerpt = () => {
    if (formData.content && !formData.excerpt) {
      const plainText = formData.content.replace(/<[^>]+>/g, ''); // Remove HTML tags
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      handleInputChange('excerpt', excerpt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Ex: Promoção de Clareamento Dental em Setembro"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value: 'evento' | 'promocao') => handleInputChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promocao">Promoção</SelectItem>
                <SelectItem value="evento">Evento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'draft' | 'published') => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Resumo</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => handleInputChange('excerpt', e.target.value)}
            placeholder="Breve resumo da publicação (será exibido na listagem)"
            rows={3}
          />
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateExcerpt}
              disabled={!formData.content}
            >
              Gerar automaticamente
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Imagem de Destaque</Label>
          {formData.featuredImageUrl ? (
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={formData.featuredImageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Arraste uma imagem aqui ou clique para selecionar
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Selecionar Imagem
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Escreva o conteúdo completo da publicação aqui..."
            rows={12}
            required
            className="min-h-[300px]"
          />
          <p className="text-xs text-muted-foreground">
            Você pode usar formatação básica. HTML simples é suportado.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Publicação
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
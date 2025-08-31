import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Calendar, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import BlogPostForm from './BlogPostForm';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImageUrl?: string;
  category: 'evento' | 'promocao';
  status: 'draft' | 'published' | 'archived';
  authorId?: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/blog-posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Erro ao buscar publicações');
      }
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/blog-posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        console.error('Erro ao excluir publicação');
      }
    } catch (error) {
      console.error('Erro ao excluir publicação:', error);
    }
  };

  const handleSavePost = async (formData: any) => {
    setFormLoading(true);
    try {
      const token = localStorage.getItem('token');
      const isEditing = !!editingPost;
      const url = isEditing 
        ? `/api/blog-posts/${editingPost.id}` 
        : '/api/blog-posts';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const savedPost = await response.json();
        
        if (isEditing) {
          setPosts(posts.map(post => 
            post.id === editingPost.id ? savedPost : post
          ));
          setEditingPost(null);
        } else {
          setPosts([savedPost, ...posts]);
          setShowNewPostDialog(false);
        }
      } else {
        console.error('Erro ao salvar publicação');
        alert('Erro ao salvar publicação. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar publicação:', error);
      alert('Erro ao salvar publicação. Tente novamente.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setShowNewPostDialog(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryLabel = (category: string) => {
    return category === 'evento' ? 'Evento' : 'Promoção';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'archived': return 'Arquivado';
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Publicações</h2>
        </div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Publicações</h2>
        <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Publicação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova Publicação</DialogTitle>
            </DialogHeader>
            <BlogPostForm
              onSave={handleSavePost}
              onCancel={handleCancelEdit}
              loading={formLoading}
            />
          </DialogContent>
        </Dialog>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Nenhuma publicação encontrada.</p>
            <Button onClick={() => setShowNewPostDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Criar primeira publicação
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusVariant(post.status) as any}>
                      {getStatusLabel(post.status)}
                    </Badge>
                    <Badge variant="outline">
                      {getCategoryLabel(post.category)}
                    </Badge>
                  </div>
                </div>

                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditPost(post)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir publicação</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir a publicação "{post.title}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePost(post.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Publicação</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <BlogPostForm
              onSave={handleSavePost}
              onCancel={handleCancelEdit}
              loading={formLoading}
              initialData={editingPost}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
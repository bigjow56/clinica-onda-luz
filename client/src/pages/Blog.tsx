import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'evento' | 'promocao'>('all');

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog-posts');
      
      if (response.ok) {
        const data = await response.json();
        // Filtrar apenas posts publicados
        const publishedPosts = data.filter((post: BlogPost) => post.status === 'published');
        setPosts(publishedPosts);
      } else {
        console.error('Erro ao buscar publicações');
      }
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    return category === 'evento' ? 'Evento' : 'Promoção';
  };

  const getCategoryColor = (category: string) => {
    return category === 'evento' ? 'bg-blue-500' : 'bg-green-500';
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const getExcerpt = (post: BlogPost) => {
    if (post.excerpt) return post.excerpt;
    
    // Remover HTML e limitar caracteres
    const plainText = post.content.replace(/<[^>]+>/g, '');
    return plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando publicações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Blog & Novidades
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro das nossas promoções, eventos e novidades sobre saúde bucal
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-card rounded-lg p-1 border">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="rounded-md"
            >
              Todas
            </Button>
            <Button
              variant={selectedCategory === 'promocao' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory('promocao')}
              className="rounded-md"
            >
              Promoções
            </Button>
            <Button
              variant={selectedCategory === 'evento' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory('evento')}
              className="rounded-md"
            >
              Eventos
            </Button>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma publicação encontrada</h3>
            <p className="text-muted-foreground">
              {selectedCategory === 'all' 
                ? 'Ainda não há publicações disponíveis.' 
                : `Não há ${selectedCategory === 'evento' ? 'eventos' : 'promoções'} no momento.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="group hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {post.featuredImageUrl ? (
                      <img
                        src={post.featuredImageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-primary/40" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(post.category)} text-white`}>
                        {getCategoryLabel(post.category)}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="mr-2 h-4 w-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {getExcerpt(post)}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                      Leia mais
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-16 pt-16 border-t">
            <h3 className="text-2xl font-bold mb-4">Tem alguma dúvida?</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe está sempre disponível para esclarecer suas questões sobre saúde bucal.
            </p>
            <Link to="/contato">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Fale Conosco
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
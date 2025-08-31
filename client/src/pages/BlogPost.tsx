import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, FileText, Phone } from 'lucide-react';

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

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (id) {
      fetchBlogPost(id);
      fetchRelatedPosts();
    }
  }, [id]);

  const fetchBlogPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/blog-posts/${postId}`);
      
      if (response.ok) {
        const data = await response.json();
        // Verificar se o post está publicado
        if (data.status !== 'published') {
          navigate('/blog');
          return;
        }
        setPost(data);
      } else if (response.status === 404) {
        navigate('/blog');
      } else {
        console.error('Erro ao buscar publicação');
      }
    } catch (error) {
      console.error('Erro ao buscar publicação:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const response = await fetch('/api/blog-posts');
      
      if (response.ok) {
        const data = await response.json();
        // Filtrar posts publicados e diferentes do atual
        const publishedPosts = data
          .filter((p: BlogPost) => p.status === 'published' && p.id !== id)
          .slice(0, 3); // Limitar a 3 posts relacionados
        setRelatedPosts(publishedPosts);
      }
    } catch (error) {
      console.error('Erro ao buscar posts relacionados:', error);
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

  const formatContent = (content: string) => {
    // Quebrar o conteúdo em parágrafos
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim()) {
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {paragraph.trim()}
          </p>
        );
      }
      return null;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando publicação...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Publicação não encontrada</h1>
            <p className="text-muted-foreground mb-6">
              A publicação que você está procurando não foi encontrada ou foi removida.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Blog
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge className={`${getCategoryColor(post.category)} text-white`}>
                {getCategoryLabel(post.category)}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(post.createdAt)}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {post.featuredImageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.featuredImageUrl}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-foreground">
              {formatContent(post.content)}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {post.category === 'promocao' 
                  ? 'Aproveite esta promoção!'
                  : 'Interessado neste evento?'
                }
              </h3>
              <p className="text-muted-foreground mb-6">
                {post.category === 'promocao'
                  ? 'Entre em contato conosco para aproveitar esta oferta especial.'
                  : 'Não perca esta oportunidade e agende sua participação.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contato">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Phone className="mr-2 h-4 w-4" />
                    Entrar em Contato
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Agendar Consulta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t">
            <h2 className="text-2xl font-bold mb-8">Publicações Relacionadas</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                  <Card className="group hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {relatedPost.featuredImageUrl ? (
                        <img
                          src={relatedPost.featuredImageUrl}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-primary/40" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2">
                        <Badge className={`${getCategoryColor(relatedPost.category)} text-white text-xs`}>
                          {getCategoryLabel(relatedPost.category)}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(relatedPost.createdAt)}
                      </div>
                      
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                        {relatedPost.title}
                      </h3>
                      
                      {relatedPost.excerpt && (
                        <p className="text-muted-foreground text-xs line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
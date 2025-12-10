import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { aiTools, categories } from '@/data/aiTools';

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'popularity'>('popularity');

  const filteredTools = useMemo(() => {
    let filtered = aiTools;

    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query) ||
        tool.features.some(f => f.toLowerCase().includes(query))
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.priceValue - b.priceValue;
      return b.popularity - a.popularity;
    });

    return sorted;
  }, [selectedCategory, searchQuery, sortBy, aiTools]);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">AI Hub</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => navigate('/compare')} className="text-sm font-medium hover:text-primary transition-colors">Сравнение</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Тарифы</button>
            </div>

            <Button onClick={() => navigate('/compare')} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Icon name="Scale" size={16} className="mr-2" />
              Сравнить
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-gradient-shift bg-[length:200%_200%]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30" variant="outline">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Более 500+ нейросетей в каталоге
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Найди идеальную <span className="gradient-text">нейросеть</span> для своих задач
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Крупнейший агрегатор AI-инструментов. Сравнивай, выбирай и используй лучшие нейросети для работы и творчества
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={() => scrollToSection('catalog')} size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                Исследовать каталог <Icon name="Search" size={20} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'Brain', label: '24 Нейросети', color: 'text-primary' },
              { icon: 'Users', label: '100K+ Пользователей', color: 'text-secondary' },
              { icon: 'Star', label: '4.9 Рейтинг', color: 'text-accent' },
              { icon: 'TrendingUp', label: '11 Категорий', color: 'text-primary' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card/50 backdrop-blur-sm mb-3 ${stat.color}`}>
                  <Icon name={stat.icon as any} size={28} />
                </div>
                <p className="font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30" variant="outline">Каталог</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Исследуй мир <span className="gradient-text">нейросетей</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Найди инструменты для любых задач: от генерации текста до создания видео
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="mb-8 max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Найти нейросеть по названию или возможностям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-card/50 backdrop-blur-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={18} />
                  </button>
                )}
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                <SelectTrigger className="w-full md:w-[200px] h-12 bg-card/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">По популярности</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="price">По цене</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(searchQuery || selectedCategory !== 'Все') && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>Найдено: <span className="font-semibold text-foreground">{filteredTools.length}</span> {filteredTools.length === 1 ? 'нейросеть' : filteredTools.length < 5 ? 'нейросети' : 'нейросетей'}</span>
                {(searchQuery || selectedCategory !== 'Все') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Все');
                    }}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Icon name="RotateCcw" size={14} />
                    Сбросить фильтры
                  </button>
                )}
              </div>
            )}
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                <Icon name="SearchX" size={40} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground mb-6">Попробуйте изменить запрос или категорию</p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Все');
              }} variant="outline">
                Показать все нейросети
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <Card 
                  key={tool.id} 
                  className="group hover:shadow-xl transition-all duration-300 animate-scale-in bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer" 
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => navigate(`/tool/${tool.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon name={tool.icon as any} size={24} className="text-white" />
                      </div>
                      <Badge variant="secondary">{tool.price}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 font-semibold">{tool.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.features.slice(0, 3).map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      Подробнее <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" variant="outline">Тарифы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Выбери свой <span className="gradient-text">план</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Гибкие тарифы для любых потребностей — от новичков до профессионалов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '0', period: 'навсегда', features: ['Доступ к 10 бесплатным ИИ', 'Базовые функции', 'Сообщество'], icon: 'Zap', popular: false },
              { name: 'Pro', price: '990', period: 'в месяц', features: ['Доступ ко всем ИИ', 'Приоритетная поддержка', 'Расширенное сравнение', 'API доступ'], icon: 'Rocket', popular: true },
              { name: 'Enterprise', price: '4990', period: 'в месяц', features: ['Все из Pro', 'Командные функции', 'Персональный менеджер', 'SLA гарантии'], icon: 'Building', popular: false }
            ].map((plan, index) => (
              <Card key={plan.name} className={`relative animate-fade-in-up ${plan.popular ? 'border-primary shadow-2xl scale-105' : 'bg-card/50 backdrop-blur-sm'}`} style={{ animationDelay: `${index * 150}ms` }}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${plan.popular ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-muted'} flex items-center justify-center mb-4`}>
                    <Icon name={plan.icon as any} size={28} className={plan.popular ? 'text-white' : 'text-foreground'} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">₽ {plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.price === '0' ? 'Начать бесплатно' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AI Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 AI Hub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const aiTools = [
    {
      id: 1,
      name: 'ChatGPT',
      category: 'Текст',
      description: 'Продвинутый языковой ИИ для генерации текста и диалогов',
      rating: 4.9,
      price: 'Freemium',
      features: ['Генерация текста', 'Диалоги', 'Код', 'Анализ'],
      icon: 'MessageSquare',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'Midjourney',
      category: 'Изображения',
      description: 'Создание уникальных изображений из текстовых описаний',
      rating: 4.8,
      price: 'Платно',
      features: ['Генерация изображений', 'Высокое качество', 'Стилизация'],
      icon: 'Image',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'ElevenLabs',
      category: 'Аудио',
      description: 'Реалистичный синтез голоса и клонирование',
      rating: 4.7,
      price: 'Freemium',
      features: ['Синтез речи', 'Клонирование голоса', 'Множество языков'],
      icon: 'Mic',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'Runway ML',
      category: 'Видео',
      description: 'Генерация и редактирование видео с помощью ИИ',
      rating: 4.6,
      price: 'Freemium',
      features: ['Генерация видео', 'Редактирование', 'Эффекты'],
      icon: 'Video',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'GitHub Copilot',
      category: 'Код',
      description: 'ИИ-помощник для написания кода',
      rating: 4.8,
      price: 'Платно',
      features: ['Автодополнение', 'Генерация функций', 'Рефакторинг'],
      icon: 'Code',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      name: 'Jasper AI',
      category: 'Маркетинг',
      description: 'Контент для маркетинга и копирайтинга',
      rating: 4.5,
      price: 'Платно',
      features: ['SEO-тексты', 'Рекламные копии', 'Email-рассылки'],
      icon: 'TrendingUp',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '0',
      period: 'навсегда',
      description: 'Для знакомства с нейросетями',
      features: [
        'Доступ к 10 бесплатным ИИ',
        'Базовые функции',
        'Сообщество',
        'Обновления каталога'
      ],
      icon: 'Zap',
      popular: false
    },
    {
      name: 'Pro',
      price: '990',
      period: 'в месяц',
      description: 'Для профессионалов',
      features: [
        'Доступ ко всем ИИ',
        'Приоритетная поддержка',
        'Расширенное сравнение',
        'Эксклюзивные гайды',
        'API доступ'
      ],
      icon: 'Rocket',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '4990',
      period: 'в месяц',
      description: 'Для команд и компаний',
      features: [
        'Все из Pro',
        'Командные функции',
        'Персональный менеджер',
        'Кастомные интеграции',
        'Обучение команды',
        'SLA гарантии'
      ],
      icon: 'Building',
      popular: false
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'ТОП-10 нейросетей для дизайнеров в 2024',
      excerpt: 'Обзор лучших ИИ-инструментов, которые изменят вашу работу с графикой',
      date: '15 декабря 2024',
      category: 'Дизайн',
      readTime: '5 мин',
      image: '🎨'
    },
    {
      id: 2,
      title: 'Как ChatGPT изменил мир за год',
      excerpt: 'Анализ влияния языковых моделей на различные индустрии',
      date: '10 декабря 2024',
      category: 'Аналитика',
      readTime: '8 мин',
      image: '🤖'
    },
    {
      id: 3,
      title: 'Этика использования ИИ: что нужно знать',
      excerpt: 'Важные аспекты ответственного применения нейросетей',
      date: '5 декабря 2024',
      category: 'Этика',
      readTime: '6 мин',
      image: '⚖️'
    }
  ];

  const categories = ['Все', 'Текст', 'Изображения', 'Видео', 'Аудио', 'Код', 'Маркетинг'];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredTools = selectedCategory === 'Все' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === selectedCategory);

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
              <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">
                Каталог
              </button>
              <button onClick={() => scrollToSection('compare')} className="text-sm font-medium hover:text-primary transition-colors">
                Сравнение
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-primary transition-colors">
                Тарифы
              </button>
              <button onClick={() => scrollToSection('blog')} className="text-sm font-medium hover:text-primary transition-colors">
                Блог
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </button>
            </div>

            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Начать <Icon name="ArrowRight" size={16} className="ml-2" />
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
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                Исследовать каталог <Icon name="Search" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Play" size={20} className="mr-2" /> Как это работает
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'Brain', label: '500+ Нейросетей', color: 'text-primary' },
              { icon: 'Users', label: '100K+ Пользователей', color: 'text-secondary' },
              { icon: 'Star', label: '4.9 Рейтинг', color: 'text-accent' },
              { icon: 'TrendingUp', label: '50+ Категорий', color: 'text-primary' }
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
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30" variant="outline">
              Каталог
            </Badge>
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

          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск нейросетей..."
                className="pl-12 h-12 bg-card/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 animate-scale-in bg-card/50 backdrop-blur-sm border-border/50" style={{ animationDelay: `${index * 100}ms` }}>
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
                    {tool.features.map(feature => (
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
        </div>
      </section>

      <section id="compare" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30" variant="outline">
              Сравнение
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Сравни и выбери <span className="gradient-text">лучшее</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Детальное сравнение возможностей, цен и функций нейросетей
            </p>
          </div>

          <Card className="max-w-5xl mx-auto bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Интерактивное сравнение</CardTitle>
              <CardDescription>Выбери до 3 нейросетей для детального анализа</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="features">Функции</TabsTrigger>
                  <TabsTrigger value="pricing">Цены</TabsTrigger>
                  <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiTools.slice(0, 3).map(tool => (
                      <Card key={tool.id} className="text-center">
                        <CardHeader>
                          <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-2`}>
                            <Icon name={tool.icon as any} size={20} className="text-white" />
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            {tool.features.map(feature => (
                              <div key={feature} className="flex items-center gap-2">
                                <Icon name="Check" size={16} className="text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="pricing" className="mt-6">
                  <div className="text-center text-muted-foreground py-8">
                    Детальное сравнение цен и тарифных планов
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <div className="text-center text-muted-foreground py-8">
                    Анализ отзывов пользователей и экспертов
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" variant="outline">
              Тарифы
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Выбери свой <span className="gradient-text">план</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Гибкие тарифы для любых потребностей — от новичков до профессионалов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative animate-fade-in-up ${plan.popular ? 'border-primary shadow-2xl scale-105' : 'bg-card/50 backdrop-blur-sm'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${plan.popular ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-muted'} flex items-center justify-center mb-4`}>
                    <Icon name={plan.icon as any} size={28} className={plan.popular ? 'text-white' : 'text-foreground'} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
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

      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30" variant="outline">
              Блог
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Последние <span className="gradient-text">новости AI</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Статьи, гайды и новости из мира искусственного интеллекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer animate-scale-in bg-card/50 backdrop-blur-sm" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {post.image}
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      Читать <Icon name="ArrowRight" size={16} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Все статьи <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30" variant="outline">
                Контакты
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Свяжись с <span className="gradient-text">нами</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Есть вопросы? Мы всегда рады помочь!
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Напиши нам</CardTitle>
                <CardDescription>Ответим в течение 24 часов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Имя</label>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тема</label>
                  <Input placeholder="О чем вы хотите спросить?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение</label>
                  <textarea 
                    className="w-full min-h-32 px-3 py-2 rounded-lg border border-input bg-background"
                    placeholder="Ваше сообщение..."
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Отправить <Icon name="Send" size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: 'Mail', title: 'Email', value: 'hello@aihub.ru' },
                { icon: 'Phone', title: 'Телефон', value: '+7 (999) 123-45-67' },
                { icon: 'MapPin', title: 'Офис', value: 'Москва, Россия' }
              ].map((contact, index) => (
                <Card key={index} className="text-center bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                      <Icon name={contact.icon as any} size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    <p className="text-sm text-muted-foreground">{contact.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent">
                  <Icon name="Sparkles" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">AI Hub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Крупнейший агрегатор нейросетей для работы и творчества
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Продукт</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сравнение</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ресурсы</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гайды</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Команда</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 AI Hub. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              {['Github', 'Twitter', 'Linkedin', 'Youtube'].map(social => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                >
                  <Icon name={social as any} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

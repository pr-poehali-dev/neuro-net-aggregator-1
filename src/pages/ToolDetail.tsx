import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AITool {
  id: number;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  rating: number;
  price: string;
  priceDetails: string;
  priceValue: number;
  features: string[];
  icon: string;
  gradient: string;
  popularity: number;
  website: string;
  useCases: string[];
  pros: string[];
  cons: string[];
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const aiTools: AITool[] = [
    { 
      id: 1, 
      name: 'ChatGPT', 
      category: 'Текст', 
      description: 'Продвинутый языковой ИИ для генерации текста и диалогов',
      fullDescription: 'ChatGPT — это передовая языковая модель от OpenAI, способная генерировать естественный текст, отвечать на вопросы, писать код и помогать в решении широкого спектра задач. Модель обучена на огромном массиве текстовых данных и может поддерживать контекстный диалог, адаптируясь под ваши запросы.',
      rating: 4.9, 
      price: 'Freemium', 
      priceDetails: 'Бесплатный тариф с ограничениями. Pro подписка — $20/мес с доступом к GPT-4, приоритетом и расширенными возможностями.',
      priceValue: 1, 
      features: ['Генерация текста', 'Диалоги', 'Написание кода', 'Анализ данных', 'Работа с файлами', 'Веб-поиск'], 
      icon: 'MessageSquare', 
      gradient: 'from-purple-500 to-pink-500', 
      popularity: 98,
      website: 'https://chat.openai.com',
      useCases: ['Написание статей и контента', 'Помощь в программировании', 'Анализ и суммаризация текстов', 'Обучение и объяснение сложных концепций', 'Генерация идей для бизнеса'],
      pros: ['Очень естественный диалог', 'Широкий спектр задач', 'Постоянные обновления', 'Большой контекст (128K токенов)', 'Работа с изображениями'],
      cons: ['Платная подписка для GPT-4', 'Может генерировать неточности', 'Ограничения бесплатной версии', 'Не всегда актуальные данные']
    },
    { 
      id: 2, 
      name: 'Midjourney', 
      category: 'Изображения', 
      description: 'Создание уникальных изображений из текстовых описаний',
      fullDescription: 'Midjourney — один из лучших AI-генераторов изображений, создающий потрясающие визуалы из текстовых промптов. Используется художниками, дизайнерами и креативщиками по всему миру для создания концепт-арта, иллюстраций и маркетинговых материалов.',
      rating: 4.8, 
      price: 'Платно', 
      priceDetails: 'От $10/мес за Basic план (200 изображений). Standard — $30/мес, Pro — $60/мес с неограниченной генерацией.',
      priceValue: 2, 
      features: ['Генерация изображений', 'Высокое качество (до 2K)', 'Стилизация', 'Вариации изображений', 'Ремикс и блэнд', 'Коммерческое использование'], 
      icon: 'Image', 
      gradient: 'from-blue-500 to-cyan-500', 
      popularity: 95,
      website: 'https://midjourney.com',
      useCases: ['Концепт-арт для игр и фильмов', 'Иллюстрации для книг', 'Маркетинговые визуалы', 'NFT и цифровое искусство', 'Дизайн продуктов'],
      pros: ['Лучшее качество изображений', 'Художественный стиль', 'Активное сообщество', 'Регулярные обновления', 'Простые промпты'],
      cons: ['Только через Discord', 'Нет бесплатного тарифа', 'Очереди в пиковые часы', 'Сложно контролировать детали']
    },
    { 
      id: 3, 
      name: 'ElevenLabs', 
      category: 'Аудио', 
      description: 'Реалистичный синтез голоса и клонирование',
      fullDescription: 'ElevenLabs предоставляет передовые технологии синтеза речи и клонирования голоса. Их AI создает невероятно естественные голоса на множестве языков, идеально подходящие для озвучки, подкастов и контента.',
      rating: 4.7, 
      price: 'Freemium', 
      priceDetails: 'Бесплатно — 10,000 символов/мес. Starter — $5/мес (30K), Creator — $22/мес (100K), Pro — $99/мес (500K).',
      priceValue: 1, 
      features: ['Синтез речи', 'Клонирование голоса', '29 языков', 'API доступ', 'Эмоции в голосе', 'Дубляж видео'], 
      icon: 'Mic', 
      gradient: 'from-green-500 to-emerald-500', 
      popularity: 88,
      website: 'https://elevenlabs.io',
      useCases: ['Озвучка видео и подкастов', 'Аудиокниги', 'Голосовые ассистенты', 'Локализация контента', 'Accessibility'],
      pros: ['Самый реалистичный голос', 'Поддержка эмоций', 'Быстрая генерация', 'Клонирование своего голоса', 'Множество языков'],
      cons: ['Ограничения бесплатного плана', 'Высокая цена для больших объемов', 'Иногда артефакты', 'Требует качественных промптов']
    },
    { 
      id: 4, 
      name: 'Runway ML', 
      category: 'Видео', 
      description: 'Генерация и редактирование видео с помощью ИИ',
      fullDescription: 'Runway ML — революционная платформа для создания и редактирования видео с помощью AI. От генерации видео из текста до продвинутых эффектов и удаления фона в реальном времени.',
      rating: 4.6, 
      price: 'Freemium', 
      priceDetails: 'Бесплатно — 125 кредитов. Standard — $12/мес (625 кредитов), Pro — $28/мес (2250 кредитов).',
      priceValue: 1, 
      features: ['Text-to-Video', 'Image-to-Video', 'Удаление фона', 'Motion tracking', 'Inpainting', '30+ AI инструментов'], 
      icon: 'Video', 
      gradient: 'from-orange-500 to-red-500', 
      popularity: 85,
      website: 'https://runwayml.com',
      useCases: ['Создание видеоконтента', 'Спецэффекты', 'Редактирование видео', 'Анимация', 'Рекламные ролики'],
      pros: ['Множество AI-инструментов', 'Простой интерфейс', 'Быстрая генерация', 'Gen-2 модель', 'Профессиональное качество'],
      cons: ['Ограниченная длина видео', 'Дорого для больших проектов', 'Очереди генерации', 'Водяной знак на бесплатном']
    },
    { 
      id: 5, 
      name: 'GitHub Copilot', 
      category: 'Код', 
      description: 'ИИ-помощник для написания кода',
      fullDescription: 'GitHub Copilot — AI-ассистент для программистов, работающий прямо в вашей IDE. Предлагает автодополнение кода, генерирует функции и помогает решать задачи программирования быстрее.',
      rating: 4.8, 
      price: 'Платно', 
      priceDetails: '$10/мес для индивидуальных пользователей, $19/мес для бизнеса. Бесплатно для студентов и open-source разработчиков.',
      priceValue: 2, 
      features: ['Автодополнение кода', 'Генерация функций', 'Рефакторинг', 'Объяснение кода', 'Множество языков', 'Чат в IDE'], 
      icon: 'Code', 
      gradient: 'from-indigo-500 to-purple-500', 
      popularity: 92,
      website: 'https://github.com/features/copilot',
      useCases: ['Ускорение разработки', 'Изучение новых языков', 'Исправление багов', 'Написание тестов', 'Документация кода'],
      pros: ['Отличное автодополнение', 'Поддержка всех языков', 'Интеграция с VS Code', 'Понимает контекст проекта', 'Copilot Chat'],
      cons: ['Платная подписка', 'Иногда неправильные предложения', 'Требует проверки кода', 'Может копировать паттерны']
    },
    { 
      id: 6, 
      name: 'Jasper AI', 
      category: 'Маркетинг', 
      description: 'Контент для маркетинга и копирайтинга',
      fullDescription: 'Jasper AI (ранее Jarvis) — платформа для создания маркетингового контента: от постов в соцсетях до лендингов и email-рассылок. Используется маркетологами и копирайтерами по всему миру.',
      rating: 4.5, 
      price: 'Платно', 
      priceDetails: 'Creator — $39/мес (1 пользователь), Teams — $99/мес (3+ пользователя), Business — индивидуально.',
      priceValue: 2, 
      features: ['SEO-оптимизация', 'Рекламные копии', 'Email-рассылки', 'Посты для соцсетей', '50+ шаблонов', 'Командная работа'], 
      icon: 'TrendingUp', 
      gradient: 'from-yellow-500 to-orange-500', 
      popularity: 82,
      website: 'https://jasper.ai',
      useCases: ['Маркетинговые кампании', 'Контент для блогов', 'Реклама в соцсетях', 'Email-маркетинг', 'Описания продуктов'],
      pros: ['Специализация на маркетинге', 'Множество шаблонов', 'SEO-помощник', 'Командные функции', 'Chrome расширение'],
      cons: ['Высокая цена', 'Нет бесплатного плана', 'Иногда общие тексты', 'Требует редактирования']
    }
  ];

  const tool = aiTools.find(t => t.id === Number(id));

  const reviews: Review[] = [
    {
      id: 1,
      author: 'Александр М.',
      rating: 5,
      date: '5 дек 2024',
      text: 'Использую уже полгода — лучший инструмент в своей категории! Сэкономил кучу времени и денег на задачах, которые раньше занимали часы.',
      helpful: 24
    },
    {
      id: 2,
      author: 'Мария К.',
      rating: 4,
      date: '28 ноя 2024',
      text: 'Очень мощный инструмент, но требует времени на освоение. После недели использования начала получать отличные результаты.',
      helpful: 18
    },
    {
      id: 3,
      author: 'Дмитрий П.',
      rating: 5,
      date: '15 ноя 2024',
      text: 'Превзошел все ожидания! Качество результатов на высоте, поддержка быстро отвечает. Рекомендую всем в моей сфере.',
      helpful: 31
    }
  ];

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Нейросеть не найдена</h1>
          <p className="text-muted-foreground mb-6">Попробуйте выбрать другой инструмент из каталога</p>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться в каталог
          </Button>
        </div>
      </div>
    );
  }

  const relatedTools = aiTools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 75 },
    { stars: 4, count: 38, percentage: 18 },
    { stars: 3, count: 10, percentage: 5 },
    { stars: 2, count: 3, percentage: 1 },
    { stars: 1, count: 2, percentage: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <Icon name="ArrowLeft" size={20} />
              <span className="hidden sm:inline">Назад в каталог</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">AI Hub</span>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Попробовать <Icon name="ExternalLink" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center flex-shrink-0`}>
                <Icon name={tool.icon as any} size={48} className="text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold">{tool.name}</h1>
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
                <p className="text-xl text-muted-foreground mb-6">{tool.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-2xl font-bold">{tool.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">(209 отзывов)</span>
                  </div>
                  
                  <div className="h-6 w-px bg-border" />
                  
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={20} className="text-muted-foreground" />
                    <span className="font-semibold">{tool.popularity}K+</span>
                    <span className="text-sm text-muted-foreground">пользователей</span>
                  </div>
                  
                  <div className="h-6 w-px bg-border" />
                  
                  <div className="flex items-center gap-2">
                    <Icon name="Tag" size={20} className="text-muted-foreground" />
                    <span className="font-semibold">{tool.price}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
                    <a href={tool.website} target="_blank" rel="noopener noreferrer">
                      Перейти на сайт <Icon name="ExternalLink" size={20} className="ml-2" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="Bookmark" size={20} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="Share2" size={20} className="mr-2" />
                    Поделиться
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="features">Функции</TabsTrigger>
                <TabsTrigger value="pricing">Цены</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>О {tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg leading-relaxed">{tool.fullDescription}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="CheckCircle" size={20} className="text-green-500" />
                          Преимущества
                        </h3>
                        <ul className="space-y-2">
                          {tool.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Icon name="Plus" size={16} className="text-green-500 mt-1 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="AlertCircle" size={20} className="text-orange-500" />
                          Недостатки
                        </h3>
                        <ul className="space-y-2">
                          {tool.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Icon name="Minus" size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Примеры использования</CardTitle>
                    <CardDescription>Для каких задач подходит {tool.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {tool.useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0" />
                          <span className="text-sm">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Все возможности</CardTitle>
                    <CardDescription>Полный список функций {tool.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center flex-shrink-0`}>
                            <Icon name="Check" size={20} className="text-white" />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Тарифы и цены</CardTitle>
                    <CardDescription>Стоимость использования {tool.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon name="Tag" size={24} className="text-primary" />
                          <span className="text-2xl font-bold">{tool.price}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{tool.priceDetails}</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-green-500" />
                          <div className="text-2xl font-bold mb-1">Отличное</div>
                          <div className="text-sm text-muted-foreground">Соотношение цена/качество</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <Icon name="Shield" size={32} className="mx-auto mb-2 text-blue-500" />
                          <div className="text-2xl font-bold mb-1">14 дней</div>
                          <div className="text-sm text-muted-foreground">Гарантия возврата</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <Icon name="CreditCard" size={32} className="mx-auto mb-2 text-purple-500" />
                          <div className="text-2xl font-bold mb-1">Гибко</div>
                          <div className="text-sm text-muted-foreground">Отмена в любой момент</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <CardTitle>Общий рейтинг</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="text-6xl font-bold mb-2">{tool.rating}</div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">На основе 209 отзывов</p>
                      </div>

                      <div className="space-y-3">
                        {ratingDistribution.map((dist) => (
                          <div key={dist.stars} className="flex items-center gap-3">
                            <span className="text-sm font-medium w-8">{dist.stars}★</span>
                            <Progress value={dist.percentage} className="flex-1" />
                            <span className="text-sm text-muted-foreground w-12 text-right">{dist.count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="md:col-span-2 space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{review.author.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">{review.author}</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Icon 
                                        key={i} 
                                        name="Star" 
                                        size={14} 
                                        className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                                      />
                                    ))}
                                  </div>
                                  <span>•</span>
                                  <span>{review.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed mb-4">{review.text}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                              <Icon name="ThumbsUp" size={16} />
                              <span>Полезно ({review.helpful})</span>
                            </button>
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                              <Icon name="MessageSquare" size={16} />
                              <span>Ответить</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button variant="outline" className="w-full">
                      Показать ещё отзывы
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {relatedTools.length > 0 && (
        <section className="py-12 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Похожие инструменты</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedTools.map((relTool) => (
                  <Card 
                    key={relTool.id} 
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/tool/${relTool.id}`)}
                  >
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${relTool.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon name={relTool.icon as any} size={24} className="text-white" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">{relTool.name}</CardTitle>
                      <CardDescription>{relTool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{relTool.rating}</span>
                        </div>
                        <Badge variant="secondary">{relTool.price}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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

export default ToolDetail;

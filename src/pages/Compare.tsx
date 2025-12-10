import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface AITool {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  price: string;
  priceValue: number;
  priceDetails: string;
  features: string[];
  icon: string;
  gradient: string;
  popularity: number;
  pros: string[];
  cons: string[];
}

const Compare = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const aiTools: AITool[] = [
    { id: 1, name: 'ChatGPT', category: 'Текст', description: 'Продвинутый языковой ИИ для генерации текста и диалогов', rating: 4.9, price: 'Freemium', priceValue: 1, priceDetails: 'Бесплатно + $20/мес Pro', features: ['Генерация текста', 'Диалоги', 'Написание кода', 'Анализ данных', 'Работа с файлами', 'Веб-поиск'], icon: 'MessageSquare', gradient: 'from-purple-500 to-pink-500', popularity: 98, pros: ['Естественный диалог', 'Широкий спектр задач', 'Большой контекст'], cons: ['Платная подписка для GPT-4', 'Может ошибаться'] },
    { id: 2, name: 'Midjourney', category: 'Изображения', description: 'Создание уникальных изображений из текстовых описаний', rating: 4.8, price: 'Платно', priceValue: 2, priceDetails: 'От $10/мес', features: ['Генерация изображений', 'Высокое качество (до 2K)', 'Стилизация', 'Вариации изображений', 'Ремикс и блэнд', 'Коммерческое использование'], icon: 'Image', gradient: 'from-blue-500 to-cyan-500', popularity: 95, pros: ['Лучшее качество', 'Художественный стиль', 'Активное сообщество'], cons: ['Только через Discord', 'Нет бесплатного тарифа'] },
    { id: 3, name: 'ElevenLabs', category: 'Аудио', description: 'Реалистичный синтез голоса и клонирование', rating: 4.7, price: 'Freemium', priceValue: 1, priceDetails: 'Бесплатно + от $5/мес', features: ['Синтез речи', 'Клонирование голоса', '29 языков', 'API доступ', 'Эмоции в голосе', 'Дубляж видео'], icon: 'Mic', gradient: 'from-green-500 to-emerald-500', popularity: 88, pros: ['Самый реалистичный голос', 'Много языков', 'Быстрая генерация'], cons: ['Ограничения бесплатного плана', 'Иногда артефакты'] },
    { id: 4, name: 'Runway ML', category: 'Видео', description: 'Генерация и редактирование видео с помощью ИИ', rating: 4.6, price: 'Freemium', priceValue: 1, priceDetails: 'Бесплатно + от $12/мес', features: ['Text-to-Video', 'Image-to-Video', 'Удаление фона', 'Motion tracking', 'Inpainting', '30+ AI инструментов'], icon: 'Video', gradient: 'from-orange-500 to-red-500', popularity: 85, pros: ['Множество AI-инструментов', 'Простой интерфейс', 'Gen-2 модель'], cons: ['Ограниченная длина видео', 'Очереди генерации'] },
    { id: 5, name: 'GitHub Copilot', category: 'Код', description: 'ИИ-помощник для написания кода', rating: 4.8, price: 'Платно', priceValue: 2, priceDetails: '$10/мес', features: ['Автодополнение кода', 'Генерация функций', 'Рефакторинг', 'Объяснение кода', 'Множество языков', 'Чат в IDE'], icon: 'Code', gradient: 'from-indigo-500 to-purple-500', popularity: 92, pros: ['Отличное автодополнение', 'Поддержка всех языков', 'Интеграция с VS Code'], cons: ['Платная подписка', 'Требует проверки кода'] },
    { id: 6, name: 'Jasper AI', category: 'Маркетинг', description: 'Контент для маркетинга и копирайтинга', rating: 4.5, price: 'Платно', priceValue: 2, priceDetails: 'От $39/мес', features: ['SEO-оптимизация', 'Рекламные копии', 'Email-рассылки', 'Посты для соцсетей', '50+ шаблонов', 'Командная работа'], icon: 'TrendingUp', gradient: 'from-yellow-500 to-orange-500', popularity: 82, pros: ['Специализация на маркетинге', 'Множество шаблонов', 'SEO-помощник'], cons: ['Высокая цена', 'Нет бесплатного плана'] },
    { id: 7, name: 'Claude AI', category: 'Текст', description: 'Умный ассистент для сложных задач и анализа', rating: 4.8, price: 'Freemium', priceValue: 1, priceDetails: 'Бесплатно + $20/мес Pro', features: ['Длинные контексты', 'Анализ документов', 'Безопасность', 'Генерация текста', 'Диалоги', 'Написание кода'], icon: 'Brain', gradient: 'from-violet-500 to-purple-500', popularity: 90, pros: ['Длинный контекст', 'Безопасность', 'Отличный анализ'], cons: ['Медленнее ChatGPT', 'Меньше плагинов'] },
    { id: 8, name: 'DALL-E 3', category: 'Изображения', description: 'Генерация изображений от OpenAI с высокой точностью', rating: 4.7, price: 'Freemium', priceValue: 1, priceDetails: 'Через ChatGPT Plus ($20/мес)', features: ['Точность промпта', 'Интеграция с ChatGPT', 'Редактирование', 'Генерация изображений', 'Высокое качество', 'Простые промпты'], icon: 'Palette', gradient: 'from-pink-500 to-rose-500', popularity: 87, pros: ['Точно следует промпту', 'Интеграция с ChatGPT', 'Простота использования'], cons: ['Дорого', 'Меньше стилей чем Midjourney'] },
    { id: 9, name: 'Stable Diffusion', category: 'Изображения', description: 'Открытая нейросеть для генерации изображений', rating: 4.6, price: 'Бесплатно', priceValue: 0, priceDetails: 'Open Source, бесплатно', features: ['Open Source', 'Кастомизация', 'Локальный запуск', 'Генерация изображений', 'Множество моделей', 'API доступ'], icon: 'Layers', gradient: 'from-cyan-500 to-blue-500', popularity: 84, pros: ['Бесплатно', 'Open Source', 'Полный контроль'], cons: ['Сложная установка', 'Требует мощный ПК'] },
    { id: 10, name: 'Perplexity AI', category: 'Поиск', description: 'Умный поисковик с источниками и анализом', rating: 4.7, price: 'Freemium', priceValue: 1, priceDetails: 'Бесплатно + $20/мес Pro', features: ['Поиск с источниками', 'Актуальные данные', 'Быстрый ответ', 'Цитирование', 'Множество моделей', 'Файлы и изображения'], icon: 'Search', gradient: 'from-blue-500 to-indigo-500', popularity: 79, pros: ['Актуальные данные', 'Источники', 'Быстрый поиск'], cons: ['Ограничения бесплатной версии', 'Меньше возможностей чем ChatGPT'] }
  ];

  const [selectedTools, setSelectedTools] = useState<number[]>([]);

  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      const toolIds = ids.split(',').map(Number).filter(id => aiTools.some(t => t.id === id));
      setSelectedTools(toolIds.slice(0, 3));
    }
  }, []);

  useEffect(() => {
    if (selectedTools.length > 0) {
      setSearchParams({ ids: selectedTools.join(',') });
    } else {
      setSearchParams({});
    }
  }, [selectedTools]);

  const addTool = (toolId: number) => {
    if (selectedTools.length < 3 && !selectedTools.includes(toolId)) {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const removeTool = (toolId: number) => {
    setSelectedTools(selectedTools.filter(id => id !== toolId));
  };

  const selectedAITools = selectedTools.map(id => aiTools.find(t => t.id === id)).filter(Boolean) as AITool[];
  const availableTools = aiTools.filter(t => !selectedTools.includes(t.id));

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
            <Button variant="ghost" className="gap-2" onClick={() => {
              const url = `${window.location.origin}/compare?ids=${selectedTools.join(',')}`;
              navigator.clipboard.writeText(url);
            }}>
              <Icon name="Share2" size={20} />
              <span className="hidden sm:inline">Поделиться</span>
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30" variant="outline">Сравнение</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Сравни <span className="gradient-text">нейросети</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Выбери до 3 инструментов для детального сравнения возможностей и цен
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[0, 1, 2].map((slot) => {
                const tool = selectedAITools[slot];
                
                if (!tool) {
                  return (
                    <Card key={slot} className="border-dashed border-2">
                      <CardContent className="flex flex-col items-center justify-center min-h-[200px] p-6">
                        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                          <Icon name="Plus" size={32} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 text-center">
                          Выбери инструмент #{slot + 1}
                        </p>
                        <Select onValueChange={(value) => addTool(Number(value))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выбрать нейросеть" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTools.map((t) => (
                              <SelectItem key={t.id} value={t.id.toString()}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>
                  );
                }

                return (
                  <Card key={tool.id} className="relative">
                    <button
                      onClick={() => removeTool(tool.id)}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors z-10"
                    >
                      <Icon name="X" size={16} />
                    </button>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-3`}>
                        <Icon name={tool.icon as any} size={32} className="text-white" />
                      </div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{tool.rating}</span>
                        </div>
                        <Badge variant="secondary">{tool.price}</Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate(`/tool/${tool.id}`)}
                      >
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {selectedAITools.length > 0 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BarChart3" size={24} />
                      Основные показатели
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 font-semibold">Параметр</th>
                            {selectedAITools.map((tool) => (
                              <th key={tool.id} className="text-center p-4 font-semibold">{tool.name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">Рейтинг</td>
                            {selectedAITools.map((tool) => (
                              <td key={tool.id} className="p-4 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                                  <span className="font-bold text-lg">{tool.rating}</span>
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">Категория</td>
                            {selectedAITools.map((tool) => (
                              <td key={tool.id} className="p-4 text-center">
                                <Badge variant="outline">{tool.category}</Badge>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">Цена</td>
                            {selectedAITools.map((tool) => (
                              <td key={tool.id} className="p-4 text-center">
                                <Badge variant={tool.priceValue === 0 ? 'default' : 'secondary'}>
                                  {tool.price}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">{tool.priceDetails}</p>
                              </td>
                            ))}
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-4 font-medium">Популярность</td>
                            {selectedAITools.map((tool) => (
                              <td key={tool.id} className="p-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <Icon name="Users" size={16} className="text-muted-foreground" />
                                  <span className="font-semibold">{tool.popularity}K+</span>
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CheckSquare" size={24} />
                      Функции и возможности
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 font-semibold">Функция</th>
                            {selectedAITools.map((tool) => (
                              <th key={tool.id} className="text-center p-4 font-semibold">{tool.name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from(new Set(selectedAITools.flatMap(t => t.features))).map((feature, idx) => (
                            <tr key={idx} className="border-b hover:bg-muted/50">
                              <td className="p-4 font-medium">{feature}</td>
                              {selectedAITools.map((tool) => (
                                <td key={tool.id} className="p-4 text-center">
                                  {tool.features.includes(feature) ? (
                                    <Icon name="Check" size={20} className="text-green-500 mx-auto" />
                                  ) : (
                                    <Icon name="X" size={20} className="text-muted-foreground mx-auto" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <Icon name="ThumbsUp" size={24} />
                        Преимущества
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedAITools.map((tool) => (
                          <div key={tool.id}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
                                <Icon name={tool.icon as any} size={16} className="text-white" />
                              </div>
                              <span className="font-semibold">{tool.name}</span>
                            </div>
                            <ul className="space-y-2 ml-10">
                              {tool.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Icon name="Plus" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-600">
                        <Icon name="ThumbsDown" size={24} />
                        Недостатки
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedAITools.map((tool) => (
                          <div key={tool.id}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
                                <Icon name={tool.icon as any} size={16} className="text-white" />
                              </div>
                              <span className="font-semibold">{tool.name}</span>
                            </div>
                            <ul className="space-y-2 ml-10">
                              {tool.cons.map((con, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Icon name="Minus" size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Готов выбрать?</h3>
                    <p className="text-muted-foreground mb-6">
                      Изучи детальные страницы инструментов или начни использовать прямо сейчас
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {selectedAITools.map((tool) => (
                        <Button 
                          key={tool.id}
                          className={`bg-gradient-to-r ${tool.gradient} hover:opacity-90`}
                          onClick={() => navigate(`/tool/${tool.id}`)}
                        >
                          <Icon name={tool.icon as any} size={16} className="mr-2" />
                          {tool.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedAITools.length === 0 && (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-12">
                  <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mb-6">
                    <Icon name="Scale" size={48} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Начни сравнение</h3>
                  <p className="text-muted-foreground mb-8 text-center max-w-md">
                    Выбери 2-3 нейросети выше, чтобы увидеть детальное сравнение их возможностей, цен и функций
                  </p>
                  <Button onClick={() => navigate('/')} variant="outline">
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Вернуться в каталог
                  </Button>
                </CardContent>
              </Card>
            )}
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

export default Compare;

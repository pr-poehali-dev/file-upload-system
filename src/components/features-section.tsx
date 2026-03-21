import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Обнаружение читов в реальном времени",
    description: "Мгновенный анализ процессов и памяти игры. Выявляем аимботы, валлхаки, спидхаки и другие нечестные инструменты.",
    icon: "target",
    badge: "Реальное время",
  },
  {
    title: "Глубокий системный анализ",
    description: "Сканирование на уровне ядра операционной системы — читы не могут спрятаться от MajesticGuard.",
    icon: "lock",
    badge: "Ядро ОС",
  },
  {
    title: "Точность 99.9%",
    description: "Минимум ложных срабатываний. Честные игроки не пострадают — банятся только реальные читеры.",
    icon: "zap",
    badge: "Точность",
  },
  {
    title: "Простая интеграция",
    description: "Подключается к игровому серверу за считанные минуты. Поддержка популярных игровых движков и платформ.",
    icon: "link",
    badge: "Простота",
  },
  {
    title: "Облачная база данных сигнатур",
    description: "Регулярные обновления базы известных читов. Новые угрозы нейтрализуются сразу после обнаружения.",
    icon: "globe",
    badge: "Обновления",
  },
  {
    title: "Детальные отчёты",
    description: "Полная информация о нарушениях: время, тип чита, скриншоты, логи — всё для справедливого решения.",
    icon: "brain",
    badge: "Аналитика",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Возможности MajesticGuard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Передовые технологии защиты игрового процесса от нечестных участников
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "&#128202;"}
                    {feature.icon === "lock" && "&#128274;"}
                    {feature.icon === "globe" && "&#9729;"}
                    {feature.icon === "zap" && "&#9889;"}
                    {feature.icon === "link" && "&#128279;"}
                    {feature.icon === "target" && "&#127919;"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Алексей К.",
    role: "Администратор CS2 сервера",
    avatar: "",
    content:
      "С MajesticGuard количество жалоб на читы снизилось на 90%. Отчёты настолько подробные, что оспорить бан практически невозможно.",
  },
  {
    name: "Дмитрий В.",
    role: "Организатор турниров по Valorant",
    avatar: "",
    content:
      "Проводим онлайн-турниры с призовыми. MajesticGuard — единственное решение, которому я доверяю обеспечение честной игры.",
  },
  {
    name: "Михаил Р.",
    role: "Владелец игрового сообщества",
    avatar: "",
    content:
      "Простая установка, стабильная работа, минимум ложных банов. Игроки довольны — честные не страдают, читеры не уходят безнаказанными.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Нам доверяют администраторы</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Что говорят организаторы турниров и владельцы серверов о MajesticGuard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-red-500 text-white font-bold">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

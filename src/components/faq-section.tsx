import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Какие игры поддерживает MajesticGuard?",
      answer:
        "MajesticGuard работает с большинством популярных онлайн-игр: CS2, Valorant, Rust, DayZ, Minecraft и другими. Список поддерживаемых игр постоянно расширяется с обновлениями.",
    },
    {
      question: "Влияет ли MajesticGuard на производительность игры?",
      answer:
        "Утилита оптимизирована для минимальной нагрузки — потребление CPU составляет менее 1%. Вы не заметите разницы в FPS или отклике.",
    },
    {
      question: "Может ли MajesticGuard ошибочно заблокировать честного игрока?",
      answer:
        "Вероятность ложного срабатывания крайне мала — менее 0.1%. Перед выдачей бана система проводит многоуровневую проверку. Администратор всегда получает полные доказательства для самостоятельного решения.",
    },
    {
      question: "Как часто обновляется база сигнатур читов?",
      answer:
        "База обновляется автоматически несколько раз в неделю. При обнаружении нового чита патч выходит в течение 24 часов.",
    },
    {
      question: "Как связаться с поддержкой?",
      answer:
        "Вы можете написать нам на majesticguard@gmail.com, в Telegram @majesticguard или в Discord: discord.gg/sB6EjBdn. Отвечаем быстро!",
    },
    {
      question: "Как загрузить обновлённую версию утилиты?",
      answer:
        "Актуальная версия всегда доступна на этом сайте в разделе «Скачать». Кнопка одна — нажали, скачали, готово.",
    },
  ]

  return (
    <section id="faq" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Всё, что вы хотели знать о MajesticGuard
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

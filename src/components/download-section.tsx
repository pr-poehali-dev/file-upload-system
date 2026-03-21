import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

const API_URL = "https://functions.poehali.dev/2242875f-f8dd-483d-a92f-7946831c6a7f"
const ADMIN_TOKEN = "majestic-admin-secret"

interface FileInfo {
  available: boolean
  filename: string | null
  download_url: string | null
  size?: number
  last_modified?: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function DownloadSection() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminMode, setAdminMode] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then(setFileInfo)
      .finally(() => setLoading(false))
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadMsg("")
    try {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const base64 = (ev.target?.result as string).split(",")[1]
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Admin-Token": ADMIN_TOKEN },
          body: JSON.stringify({ file_data: base64, filename: file.name }),
        })
        const data = await res.json()
        if (data.success) {
          setUploadMsg(`✅ Файл "${file.name}" (${formatSize(data.size)}) успешно загружен!`)
          setFileInfo({ available: true, filename: file.name, download_url: data.download_url, size: data.size })
        } else {
          setUploadMsg(`❌ Ошибка: ${data.error}`)
        }
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch {
      setUploadMsg("❌ Ошибка загрузки файла")
      setUploading(false)
    }
  }

  return (
    <section id="download" className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
            Скачать <span className="text-red-500">MajesticGuard</span>
          </h2>
          <p className="text-gray-300 text-lg font-space-mono">
            Актуальная версия утилиты — одно нажатие, и вы защищены
          </p>
        </div>

        {/* Download Card */}
        <Card className="bg-gray-900/60 border border-red-500/30 glow-border mb-8">
          <CardContent className="p-8">
            {loading ? (
              <div className="flex items-center justify-center gap-3 text-gray-400 py-4">
                <Icon name="Loader2" size={24} className="animate-spin" />
                <span className="font-space-mono">Загрузка информации...</span>
              </div>
            ) : fileInfo?.available ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/20 p-4 rounded-xl">
                    <Icon name="Shield" size={40} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl font-orbitron">{fileInfo.filename}</p>
                    {fileInfo.size && (
                      <p className="text-gray-400 font-space-mono text-sm">{formatSize(fileInfo.size)}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-space-mono">Готово к скачиванию</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white font-orbitron text-lg px-10 py-6 pulse-button"
                  onClick={() => window.open(fileInfo.download_url!, "_blank")}
                >
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 text-gray-500 py-4">
                <Icon name="CloudOff" size={32} />
                <div>
                  <p className="text-white font-semibold font-orbitron">Файл ещё не загружен</p>
                  <p className="text-gray-400 font-space-mono text-sm">Скоро появится — следите за обновлениями</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Community links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <a href="mailto:majesticguard@gmail.com" className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-colors bg-gray-900/40">
            <Icon name="Mail" size={20} className="text-red-500" />
            <span className="text-gray-300 font-space-mono text-sm">majesticguard@gmail.com</span>
          </a>
          <a href="https://t.me/majesticguard" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-colors bg-gray-900/40">
            <Icon name="Send" size={20} className="text-red-500" />
            <span className="text-gray-300 font-space-mono text-sm">@majesticguard</span>
          </a>
          <a href="https://discord.gg/sB6EjBdn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-colors bg-gray-900/40">
            <Icon name="MessageSquare" size={20} className="text-red-500" />
            <span className="text-gray-300 font-space-mono text-sm">Discord сервер</span>
          </a>
        </div>

        {/* Admin Panel */}
        <div className="text-center">
          <button
            onClick={() => setAdminMode(!adminMode)}
            className="text-gray-600 hover:text-gray-400 text-xs font-space-mono transition-colors"
          >
            {adminMode ? "Скрыть панель" : "• • •"}
          </button>
        </div>

        {adminMode && (
          <Card className="mt-4 bg-gray-900/80 border border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-white font-orbitron font-bold mb-4 flex items-center gap-2">
                <Icon name="Settings" size={18} className="text-red-500" />
                Панель администратора
              </h3>
              <p className="text-gray-400 font-space-mono text-sm mb-4">
                Загрузите новую версию утилиты — она сразу появится на сайте для скачивания.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleUpload}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-gray-700 hover:bg-gray-600 text-white font-geist border-0"
              >
                {uploading ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Загружаю...
                  </>
                ) : (
                  <>
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить файл утилиты
                  </>
                )}
              </Button>
              {uploadMsg && (
                <p className="mt-3 text-sm font-space-mono text-gray-300">{uploadMsg}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

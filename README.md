# 🧠 Hardware Brain for Local LLM

**Hardware Brain**, yerel yapay zeka modellerini (Local LLMs) çalıştırmak isteyen kullanıcılar için tasarlanmış kapsamlı bir **donanım mimarı ve hesaplayıcıdır.** Bu araç, seçtiğiniz GPU'nun seçtiğiniz modeli (Llama 3.1, Mistral, Qwen vb.) çalıştırıp çalıştıramayacağını analiz eder ve tahmini bir performans (tokens/second) sunar.

![Hardware Brain Preview](https://llm-hardware-brain.netlify.app)

## 🚀 Özellikler

-   **Geniş Donanım Kütüphanesi:** NVIDIA (RTX 50, 40, 30 serisi & Workstation), AMD (RX 7000, 6000 & Instinct) ve Apple Silicon (M1, M2, M3 Ultra/Max) dahil 60'tan fazla GPU.
-   **Güncel LLM Desteği:** Llama 3.1 (405B dahil), Mistral Large 2, DeepSeek V2.5 ve Grok-1 gibi 30'a yakın popüler model.
-   **Hassas VRAM Analizi:** 4-bit ve 8-bit sıkıştırma (quantization) seçeneklerine göre gerçekçi VRAM ihtiyacı hesaplama.
-   **Performans Tahmini:** Donanımın bant genişliğine (bandwidth) göre saniyelik token (t/s) üretim hızı tahmini.
-   **Topluluk Doğrulaması:** Başarılı konfigürasyonları Supabase veritabanına kaydederek diğer kullanıcılarla paylaşma.
-   **Tam Responsive Tasarım:** Masaüstü, tablet ve mobil cihazlar için optimize edilmiş modern arayüz.

## 🛠️ Kullanılan Teknolojiler

-   **Frontend:** [React.js](https://reactjs.org/) & [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
-   **Deployment:** [Netlify](https://www.netlify.com/)

## 🧠 Hesaplama Mantığı

Uygulama, model boyutunu parametre sayısı üzerinden hesaplar. VRAM ihtiyacı hesaplanırken; modelin ağırlıkları, seçilen bit derinliği (quantization) ve sistemin çalışma payı (overhead) dikkate alınır. Tahmini hız (t/s) ise GPU'nun bellek bant genişliğinin, modelin o anki bellek yüküne bölünmesiyle elde edilir.

**Designed & Developed by [Arda](https://linkedin.com/in/bandalic)**

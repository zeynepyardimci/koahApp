# 🫁 KOAH Sağlık Takip Uygulaması
> **KOAH** (Kronik Obstrüktif Akciğer Hastalığı) hastalarına yönelik geliştirilmiş, kan şekeri takibi, egzersiz günlüğü ve beslenme değerlendirmesi gibi özellikler sunan modern bir mobil sağlık uygulaması.
---
## 📸 Özellikler
| Ekran | Açıklama |
|-------|----------|
| 🏠 **Ana Sayfa** | Günlük adım ve aktif dakika halkaları, hızlı aktivite kaydı, haftalık özet |
| 📈 **Geçmiş** | SVG grafik ile haftalık kan şekeri trendi, renk kodlu kayıt listesi |
| ➕ **Kayıt Ekle** | İnteraktif slider ile kan şekeri girişi, öğün dönemi seçimi, belirti takibi |
| 💡 **İstatistikler** | Özet kartlar, eğilim analizi (Düşük / Normal / Yüksek), sağlık ipuçları |
| 👤 **Profil** | Kilo, su tüketimi, HbA1c hedef takibi, hesap ayarları |
---
## 🛠️ Teknoloji Yığını
- **Framework:** [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 55)
- **Navigasyon:** [Expo Router](https://expo.github.io/router/) (dosya tabanlı yönlendirme)
- **Grafikler:** [react-native-svg](https://github.com/software-mansion/react-native-svg) (SVG çizgi grafiği)
- **İkonlar:** [lucide-react-native](https://lucide.dev/)
- **Durum Yönetimi:** React Context API
- **Dil:** TypeScript
---
## 📁 Proje Yapısı
```
koahApp/
├── app/
│   ├── _layout.tsx          # Kök düzen & Tab navigasyon
│   ├── index.tsx            # Ana Sayfa (Dashboard)
│   ├── add-log.tsx          # Kayıt Ekleme ekranı
│   ├── history/
│   │   └── index.tsx        # Kan Şekeri Geçmişi
│   ├── insights/
│   │   └── index.tsx        # İstatistikler & Analiz
│   └── profile/
│       └── index.tsx        # Kullanıcı Profili
├── context/
│   └── AppContext.tsx        # Global durum yönetimi
├── constants/
│   └── Colors.ts             # Renk paleti (Light / Dark)
├── assets/                   # Görseller ve ikonlar
├── android/                  # Native Android proje dosyaları
├── app.json                  # Expo uygulama yapılandırması
├── eas.json                  # EAS Build yapılandırması
└── package.json
```
---
## 🚀 Kurulum & Çalıştırma
### Gereksinimler
- Node.js ≥ 18
- npm ≥ 9
- Android Studio (Android SDK dahil)
- Java JDK 17+
### Adımlar
```bash
# 1. Bağımlılıkları yükle
npm install
# 2. Expo ile uygulamayı başlat (Metro bundler)
npx expo start
# 3. Android'de çalıştır (emülatör veya cihaz)
npx expo start --android
```
---
## 📦 APK Oluşturma
### Yerel Build (Android Studio kurulu olması gerekir)
```bash
# 1. Native Android projesini oluştur
npx expo prebuild --platform android --no-install --clean
# 2. Gradle ile Release APK derle
cd android
./gradlew assembleRelease
```
APK çıktı konumu:
```
android/app/build/outputs/apk/release/app-release.apk
```
### EAS Cloud Build (Expo hesabı gerektirir)
```bash
# Expo'ya giriş yap
npx eas login
# Bulut üzerinde APK oluştur
npx eas build -p android --profile preview
```
---
## ⚙️ Ortam Değişkenleri
Windows için aşağıdaki ortam değişkenlerini ayarlayın:
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "C:\Users\<kullanıcı>\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
```
---
## 🩺 Uygulama İçi Özellikler
### Kan Şekeri Takibi
- Öğün bazlı ölçüm girişi (Kahvaltı Öncesi/Sonrası, Öğle vb.)
- Otomatik durum sınıflandırması:
  - 🟡 **DÜŞÜK** — `< 70 mg/dL`
  - 🟢 **NORMAL** — `70 – 130 mg/dL`
  - 🔴 **YÜKSEK** — `> 130 mg/dL`
- Belirti kayıt desteği (baş dönmesi, susuzluk, yorgunluk)
### Aktivite Takibi
- 5 aktivite türü: Yürüyüş, Bisiklet, Yoga, Yüzme, Ağırlık
- Süre (15–120 dk) ve yoğunluk (Düşük / Orta / Yüksek) seçimi
- Haftalık seri ve hedef takibi
### Sağlık Hedefleri (Profil Ekranı)
- Kilo hedefi ilerleme çubuğu
- Günlük su tüketimi
- HbA1c seviyesi takibi
---
## 🎨 Renk Paleti
| Renk | Hex | Kullanım |
|------|-----|----------|
| 🟠 Ana Renk (Coral) | `#E8562A` | Birincil aksiyonlar, yüksek değerler |
| 🩵 İkincil (Teal) | `#2AC4B3` | Normal değerler, olumlu göstergeler |
| 🟡 Uyarı | `#F4A522` | Düşük kan şekeri |
---
## 📱 Cihaza Yükleme
1. `app-release.apk` dosyasını telefonunuza kopyalayın.
2. **Ayarlar → Güvenlik → Bilinmeyen Kaynaklara İzin Ver** seçeneğini etkinleştirin.
3. Dosya yöneticisinden APK'ya dokunarak yükleyin.
---

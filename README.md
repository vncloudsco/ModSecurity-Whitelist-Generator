# ModSecurity Whitelist Generator

Ứng dụng web Next.js giúp tạo whitelist rules cho ModSecurity từ raw logs một cách dễ dàng và trực quan.

## ✨ Tính năng

- 📝 **Nhập Raw Log**: Paste ModSecurity error log trực tiếp vào giao diện
- 🔍 **Phân Tích Log**: Tự động phân tích và trích xuất thông tin quan trọng
- 🛡️ **Tạo Whitelist Rules**: Sinh ra nhiều mức độ whitelist rules khác nhau:
  - Global (disable toàn bộ rule)
  - Hostname-based (theo tên miền)
  - URI-based (theo đường dẫn)
  - Method-based (theo HTTP method)
  - IP-based (theo địa chỉ IP)
  - Combined rules (kết hợp nhiều điều kiện)
- 📋 **Copy Rule**: Copy rule với một click
- 🌐 **Song ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- 🎨 **Giao diện đẹp**: Sử dụng shadcn/ui components với Tailwind CSS
- ⚡ **Client-side Processing**: Tất cả xử lý diễn ra trên client, không cần server
- 🚀 **GitHub Pages Ready**: Tự động deploy với GitHub Actions

## 🚀 Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd modsec

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📖 Hướng dẫn sử dụng

1. **Nhập Log**: Paste raw log từ ModSecurity error log vào textarea hoặc sử dụng demo log
2. **Phân Tích**: Click "Phân Tích Log" để xem thông tin chi tiết
3. **Xem Rules**: Chuyển sang tab "Whitelist Rules" để xem các rule được tạo
4. **Copy Rule**: Click nút "Copy" để copy rule cần thiết
5. **Áp dụng**: Paste rule vào file cấu hình ModSecurity của bạn

### 🔢 Rule ID Range
Các whitelist rules được tạo ra sẽ có ID trong khoảng **88,000,000 - 89,999,999**. Khoảng ID này được chọn để:
- ✅ Tránh xung đột với OWASP CRS rules (900,000 - 999,999)
- ✅ Tránh xung đột với custom rules thông thường (< 1,000,000)
- ✅ Dễ nhận biết và quản lý whitelist rules
- ✅ Đủ lớn để chứa ~2 triệu rules khác nhau

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 📝 Ví dụ Log

```
2025/10/30 10:22:36 [error] 36552#36552: *121 [client 206.189.2.13] ModSecurity: Access denied with code 403 (phase 2). Matched "Operator Ge' with parameter 5' against variable TX:BLOCKING_INBOUND_ANOMALY_SCORE' (Value: 5' ) [file "/etc/nginx/modsec/coreruleset/rules/REQUEST-949-BLOCKING-EVALUATION.conf"] [line "222"] [id "949110"] [rev ""] [msg "Inbound Anomaly Score Exceeded (Total Score: 5)"] [data ""] [severity "0"] [ver "OWASP_CRS/4.20.0-dev"] [maturity "0"] [accuracy "0"] [tag "anomaly-evaluation"] [tag "OWASP_CRS"] [hostname "dev.nginxwaf.me"] [uri "/config.json"] [unique_id "176181975684.311840"] [ref ""], client: 206.189.2.13, server: dev.nginxwaf.me, request: "GET /config.json HTTP/1.1", host: "dev.nginxwaf.me"
```

## 🔧 Build & Deploy

### Local Development
```bash
# Build cho production
npm run build

# Chạy production server
npm start
```

### Deploy lên GitHub Pages

Ứng dụng này được cấu hình sẵn để deploy tự động lên GitHub Pages bằng GitHub Actions.

#### Quick Start:
1. Push code lên GitHub repository
2. Vào **Settings** > **Pages** > chọn **Source: GitHub Actions**
3. Push code lên branch `main` - website sẽ tự động deploy!

#### Chi tiết:
Xem file [DEPLOYMENT.md](./DEPLOYMENT.md) để biết hướng dẫn chi tiết về:
- Cấu hình GitHub Pages
- Deploy tự động với GitHub Actions
- Cấu hình custom domain
- Troubleshooting

### Deploy lên Vercel/Netlify
```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy
```

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues và feature requests đều được chào đón!

# 🚀 Quick Deploy Guide

## Bước 1: Push lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Bước 2: Cấu hình GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** (⚙️)
3. Click **Pages** (bên trái)
4. Trong **Source**, chọn **GitHub Actions**
5. Xong! 🎉

## Bước 3: Deploy

### Tự động (Recommended)
Mỗi khi push lên `main`, website tự động deploy:
```bash
git add .
git commit -m "Update"
git push
```

### Thủ công
1. Vào tab **Actions**
2. Click **Deploy to GitHub Pages**
3. Click **Run workflow**

## URL của bạn

- Nếu repo tên là `username.github.io`: 
  - URL: `https://username.github.io`
  
- Nếu repo tên khác (ví dụ: `modsec`):
  - URL: `https://username.github.io/modsec`
  - Cần set `NEXT_PUBLIC_BASE_PATH=/modsec` trong GitHub Secrets

## Kiểm tra

1. Vào tab **Actions**
2. Đợi workflow chạy xong (✅)
3. Mở URL của bạn

## Lỗi thường gặp

### ❌ Permission denied
**Fix**: Settings > Actions > General > Workflow permissions > chọn "Read and write"

### ❌ 404 Not Found
**Fix**: Kiểm tra `NEXT_PUBLIC_BASE_PATH` trong Settings > Secrets

### ❌ Build failed
**Fix**: Xem logs trong Actions, thường do lỗi code

## Cần trợ giúp?

Xem [DEPLOYMENT.md](../DEPLOYMENT.md) để biết chi tiết đầy đủ.

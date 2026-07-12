# Deploy lên Render

Repo có sẵn [`render.yaml`](render.yaml) — Blueprint tạo 2 service:

| Service | Loại | Root dir | Việc |
|---|---|---|---|
| `vho-an-backend` | Python web service | `An/backend` | Chạy `server.py`, gọi Gemini |
| `vho-an-frontend` | Static site | `An/frontend` | `npm run build` → serve `dist/` |

## Các bước

1. Vào [render.com](https://render.com) → **New** → **Blueprint** → connect repo
   `trluowng/VHO_VietNam-Health-Organization`. Render tự đọc `render.yaml` và đề xuất
   cả 2 service.
2. Trước/trong lúc tạo, set biến môi trường bí mật ở **vho-an-backend**:
   - `GEMINI_API_KEY` — lấy tại https://aistudio.google.com/apikey
   - (tuỳ chọn) `TRIAGE_MODEL` — mặc định đã đặt `gemini-2.5-flash` trong `render.yaml`,
     đổi nếu muốn dùng model khác.
3. Deploy. Sau khi `vho-an-backend` live, copy URL của nó, vd:
   `https://vho-an-backend.onrender.com`.
4. Ở **vho-an-frontend**, set biến môi trường:
   - `VITE_TRIAGE_API_URL` = `https://vho-an-backend.onrender.com/triage`

   Sau đó **redeploy thủ công** (Vite bake env var vào lúc build, đổi env var không tự
   áp dụng cho tới khi build lại frontend).
5. Mở URL frontend — giờ sẽ nói chuyện với Gemini thật thay vì rơi về rule-based engine.

Nếu `GEMINI_API_KEY` thiếu/sai, `/triage` trả lỗi và frontend **tự động fallback** về
rule-based engine có sẵn — demo không bao giờ chết hẳn, chỉ mất phần "AI thật".

## Kiểm tra nhanh sau khi deploy

```bash
curl https://vho-an-backend.onrender.com/health
# → {"ok": true, "provider": "gemini", "model": "gemini-2.5-flash", "port": ...}
```

## Lưu ý

- Free plan của Render **sleep sau ~15 phút không có traffic** — request đầu tiên sau khi
  ngủ sẽ chậm (cold start ~30-60s). Nếu demo trực tiếp, mở trang trước vài phút để "đánh thức".
- Không commit `.env` (đã gitignore) — chỉ set qua Render dashboard.
- Đổi model/provider qua env var, không cần sửa code (`TRIAGE_PROVIDER`, `TRIAGE_MODEL`).

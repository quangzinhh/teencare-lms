# TeenCare Mini LMS

Mini web app quản lý Học sinh – Phụ huynh, lịch Lớp học và gói Subscription.

## Tech stack
- Backend: NestJS + TypeORM + Postgres
- Frontend: React + Vite
- Docker Compose: Postgres + Backend + Frontend

## Cách chạy nhanh (Docker)
```bash
cd c:\Data\Projects\teencare

docker compose up --build
```

Mặc định:
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## API chính
- `POST /api/parents`
- `GET /api/parents/{id}`
- `POST /api/students`
- `GET /api/students/{id}`
- `POST /api/classes`
- `GET /api/classes?day=Monday`
- `POST /api/classes/{classId}/register`
- `DELETE /api/registrations/{id}`
- `POST /api/subscriptions`
- `PATCH /api/subscriptions/{id}/use`
- `GET /api/subscriptions/{id}`

## Chạy local (không Docker)
### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Thiết lập env cho backend nếu chạy local:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=teencare
DB_PASSWORD=teencare
DB_NAME=teencare
```

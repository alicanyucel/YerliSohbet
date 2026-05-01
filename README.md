# Angular 21 + PrimeNG + SignalR Chat (Docker)

Bu proje iki servisten olusur:

- `backend`: ASP.NET Core + SignalR Hub
- `frontend`: Angular 21 + PrimeNG (Nginx uzerinden sunulur)

## Gereksinimler

- Docker
- Docker Compose

## Calistirma

Proje kok klasorunde:

```bash
docker compose up --build
```

Uygulama:

- Frontend: http://localhost:8080
- Backend health: http://localhost:5000/health
- SignalR hub: `http://localhost:5000/hubs/chat`

## Gelistirme Modu (Opsiyonel)

### Backend

```bash
cd backend
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Bu durumda Angular proxy ayari sayesinde `ng serve` istekleri otomatik olarak `http://localhost:5000` uzerinden hub'a yonlenir.

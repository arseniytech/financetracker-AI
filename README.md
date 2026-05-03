# Трекер расходов

Веб-приложение для учёта личных расходов. Можно добавлять траты, фильтровать по категориям и удалять записи.

## Техническое задание

![Ссылка на ТЗ](tz.md)

## ER-диаграмма
![ER diagram](image.png)

## Макеты интерфейса

![Figma - макет](image-1.png)
![Figma - макет2](image-2.png)
![Figma - макет3](image-3.png)
![Figma - макет4](image-4.png)
![Figma - макет 5](image-5.png)
## Архитектура

Фронт на React общается с бэком через HTTP API. Бэк хранит данные в SQLite.
Frontend (React + Vite) -> HTTP -> Backend (Express) -> SQLite

## API

| Метод | Эндпоинт | Что делает |
|---|---|---|
| GET | /expenses | получить все расходы |
| POST | /expenses | добавить расход |
| DELETE | /expenses/:id | удалить расход |
| POST | /auth/register | регистрация | 
| POST | /auth/login | вход |

## postman
![postman-get](image-8.png)
![postman_get](image-9.png)
![postman-post](image-6.png)
![postman-post](image-7.png)
![postman-delete](image-10.png)
![postman-update](image-11.png)

## Запуск

Бекенд
cd backend
npm install
npm run dev

Фронтенд
npm install
npm run dev

Фронт: http://localhost:5173  
Бэк: http://localhost:3000
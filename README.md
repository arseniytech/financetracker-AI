# Трекер расходов

Веб-приложение для учета и анализа личных финансов. Можно добавлять траты, фильтровать по категориям и удалять записи.

## Техническое задание

![Ссылка на ТЗ](tz.md)

## ER-диаграмма
![ER diagram](img\image.png)

## Макеты интерфейса

![Figma - макет](img\image-1.png)
![Figma - макет2](img\image-2.png)
![Figma - макет3](img\image-3.png)
![Figma - макет4](img\image-4.png)
![Figma - макет 5](img\image-5.png)
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
![postman-get](img\image-8.png)
![postman_get](img\image-9.png)
![postman-post](img\image-6.png)
![postman-post](img\image-7.png)
![postman-delete](img\image-10.png)
![postman-update](img\image-11.png)

## Запуск.

Бекенд
```bash
cd backend
npm install
npm run dev
```
Фронтенд
```bash 
npm install
npm run dev
```
Фронт: http://localhost:5173  
Бэк: http://localhost:3000

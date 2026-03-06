# Avito-like API (Express + SQLite + Sequelize)

REST API: пользователи (JWT, роли), объявления (CRUD + фильтры), категории (CRUD только для админа), избранное, заказы со статусами и отклонением с комментарием.

## Установка и запуск

```bash
cd api/req
npm install
node migrations/migrate.js
node seeders/seed.js
npm start
```

Сервер: **http://localhost:3004** (или `PORT` из `.env`).

Опционально: скопируйте `.env.example` в `.env` и задайте порт и секреты JWT.

---

## Документация API

Заголовок авторизации для защищённых маршрутов: `Authorization: Bearer <accessToken>`.

Все ошибки: JSON `{ "error": "строка с описанием" }` и соответствующий HTTP-код (400, 401, 403, 404, 500).

---

### Auth

| Метод | URL | Описание |
|-------|-----|----------|
| POST | /auth/register | Регистрация |
| POST | /auth/login | Вход |
| POST | /auth/refresh | Обновление access-токена |
| POST | /auth/logout | Выход |

**POST /auth/register**  
- Ждёт: `Content-Type: application/json`, body `{ "email", "password", "name?", "phone?" }`.  
- Отдаёт: **201** — `{ "accessToken", "refreshToken", "user": { "id", "email", "name", "phone", "role" } }`.  
- Ошибки: 400 (нет email/password, email занят), 500.

**POST /auth/login**  
- Ждёт: body `{ "email", "password" }`.  
- Отдаёт: **200** — тот же формат, что и при регистрации.  
- Ошибки: 400 (нет данных), 401 (неверные учётные данные), 500.

**POST /auth/refresh**  
- Ждёт: body `{ "refreshToken" }`.  
- Отдаёт: **200** — `{ "accessToken" }`.  
- Ошибки: 400 (нет refreshToken), 401 (токен невалиден/истёк), 500.

**POST /auth/logout**  
- Ждёт: заголовок `Authorization: Bearer <accessToken>`.  
- Отдаёт: **200** — `{ "message": "Logged out successfully" }`.  
- Ошибки: 401 (нет/невалидный токен), 500.

---

### Пользователь (профиль)

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /users/me | Текущий пользователь |
| PATCH | /users/me | Редактирование профиля |

**GET /users/me**  
- Ждёт: авторизация.  
- Отдаёт: **200** — `{ "id", "email", "name", "phone", "role" }`.  
- Ошибки: 401, 500.

**PATCH /users/me**  
- Ждёт: авторизация, body `{ "name?", "phone?", "email?", "password?" }` (частичное обновление).  
- Отдаёт: **200** — объект пользователя (id, email, name, phone, role).  
- Ошибки: 400 (пустой email, email занят), 401, 500.

---

### Категории (только admin)

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /categories | Список категорий |
| GET | /categories/:id | Одна категория |
| POST | /categories | Создать |
| PUT | /categories/:id | Обновить |
| DELETE | /categories/:id | Удалить |

**GET /categories**  
- Ждёт: авторизация, роль admin.  
- Отдаёт: **200** — массив `[{ "id", "name", "createdAt", "updatedAt" }, ...]`.  
- Ошибки: 401, 403 (не admin), 500.

**GET /categories/:id**  
- Ждёт: авторизация, роль admin.  
- Отдаёт: **200** — объект категории. **404** — категория не найдена.  
- Ошибки: 401, 403, 404, 500.

**POST /categories**  
- Ждёт: авторизация, роль admin, body `{ "name" }`.  
- Отдаёт: **201** — созданная категория.  
- Ошибки: 400 (нет name), 401, 403, 500.

**PUT /categories/:id**  
- Ждёт: авторизация, роль admin, body `{ "name?" }`.  
- Отдаёт: **200** — обновлённая категория.  
- Ошибки: 400 (пустое name), 401, 403, 404, 500.

**DELETE /categories/:id**  
- Ждёт: авторизация, роль admin.  
- Отдаёт: **200** — `{ "message": "Deleted" }`.  
- Ошибки: 401, 403, 404, 500.

---

### Объявления

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /ads | Список с фильтрами |
| GET | /ads/:id | Одно объявление |
| POST | /ads | Создать (auth) |
| PUT | /ads/:id | Обновить (только автор) |
| DELETE | /ads/:id | Удалить (только автор) |

**GET /ads**  
- Ждёт: query (все опциональны) — `categoryId`, `minPrice`, `maxPrice`, `search` (по title/description), `authorId`.  
- Отдаёт: **200** — массив объявлений, в каждом есть `Category` (id, name) и `User` (id, email, name) автора.  
- Ошибки: 400 (невалидные числа в query), 500.

**GET /ads/:id**  
- Ждёт: id в URL.  
- Отдаёт: **200** — объявление с `Category` и `User`. **404** — не найдено.  
- Ошибки: 404, 500.

**POST /ads**  
- Ждёт: авторизация, body `{ "title", "description", "price", "categoryId", "imageUrl?" }`.  
- Отдаёт: **201** — созданное объявление с связями.  
- Ошибки: 400 (нет/пусто title, description, price, category; неверная категория), 401, 500.

**PUT /ads/:id**  
- Ждёт: авторизация (только автор объявления), body `{ "title?", "description?", "price?", "categoryId?", "imageUrl?" }`.  
- Отдаёт: **200** — обновлённое объявление.  
- Ошибки: 400 (валидация), 401, 403 (не своё объявление), 404, 500.

**DELETE /ads/:id**  
- Ждёт: авторизация (только автор).  
- Отдаёт: **200** — `{ "message": "Deleted" }`.  
- Ошибки: 401, 403, 404, 500.

---

### Избранное

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /favorites | Список объявлений в избранном |
| POST | /favorites | Добавить объявление |
| DELETE | /favorites/:adId | Удалить из избранного |

**GET /favorites**  
- Ждёт: авторизация.  
- Отдаёт: **200** — массив объявлений (с Category и User).  
- Ошибки: 401, 500.

**POST /favorites**  
- Ждёт: авторизация, body `{ "adId" }`.  
- Отдаёт: **201** — объявление (объект объявления с связями). Если уже в избранном — идемпотентно 201 и тот же объект.  
- Ошибки: 400 (нет adId), 401, 404 (объявление не найдено), 500.

**DELETE /favorites/:adId**  
- Ждёт: авторизация.  
- Отдаёт: **200** — `{ "message": "Deleted" }`. **404** — записи в избранном нет.  
- Ошибки: 400 (невалидный adId), 401, 404, 500.

---

### Заказы

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /orders | Мои заказы или заявки к моим объявлениям |
| POST | /orders | Оформить заказ |
| PATCH | /orders/:id/cancel | Отменить заказ (покупатель) |
| PATCH | /orders/:id/reject | Отклонить заявку (автор объявления) |

**GET /orders**  
- Ждёт: авторизация. Query: `asSeller=true` — заявки к моим объявлениям; иначе — мои заказы как покупатель.  
- Отдаёт: **200** — массив заказов. В каждом: заказ (id, userId, adId, status, rejectComment, timestamps), вложенные `Ad` (с Category и User-автором), `Buyer` (id, email, name).  
- Ошибки: 401, 500.

**POST /orders**  
- Ждёт: авторизация, body `{ "adId" }`.  
- Отдаёт: **201** — заказ со статусом `pending` и связями (Ad, Buyer).  
- Ошибки: 400 (нет adId, заказ на своё объявление), 401, 404 (объявление не найдено), 500.

**PATCH /orders/:id/cancel**  
- Ждёт: авторизация (только покупатель этого заказа).  
- Отдаёт: **200** — заказ со статусом `cancelled`. Менять можно только из статуса `pending`.  
- Ошибки: 400 (статус не pending), 401, 403 (не покупатель), 404, 500.

**PATCH /orders/:id/reject**  
- Ждёт: авторизация (только автор объявления этого заказа), body `{ "rejectComment?" }`.  
- Отдаёт: **200** — заказ со статусом `rejected` и сохранённым rejectComment. Менять можно только из статуса `pending`.  
- Ошибки: 400 (статус не pending), 401, 403 (не автор объявления), 404, 500.

---

### Сводная таблица эндпоинтов

| Метод | URL | Auth | Кто |
|-------|-----|------|-----|
| POST | /auth/register | нет | — |
| POST | /auth/login | нет | — |
| POST | /auth/refresh | нет | — |
| POST | /auth/logout | Bearer | любой |
| GET | /users/me | Bearer | любой |
| PATCH | /users/me | Bearer | любой |
| GET | /categories | Bearer | admin |
| GET | /categories/:id | Bearer | admin |
| POST | /categories | Bearer | admin |
| PUT | /categories/:id | Bearer | admin |
| DELETE | /categories/:id | Bearer | admin |
| GET | /ads | нет | — |
| GET | /ads/:id | нет | — |
| POST | /ads | Bearer | любой |
| PUT | /ads/:id | Bearer | автор объявления |
| DELETE | /ads/:id | Bearer | автор объявления |
| GET | /favorites | Bearer | любой |
| POST | /favorites | Bearer | любой |
| DELETE | /favorites/:adId | Bearer | любой |
| GET | /orders | Bearer | любой |
| POST | /orders | Bearer | любой |
| PATCH | /orders/:id/cancel | Bearer | покупатель заказа |
| PATCH | /orders/:id/reject | Bearer | автор объявления |

---

## Сидер

- Admin: **admin@example.com** / **admin123**
- User: **user@example.com** / **user123**
- Категории: Электроника, Одежда.

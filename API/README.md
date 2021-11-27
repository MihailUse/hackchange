# Back-end

## База данных

Код БД на PostgreSQL. [ERD-схема](./API/docs/database.png)

## Лайки и комментарии

Наша система лайков и комментов

## Регистрация и аутентификация

## Система уведомлений

Как ещё одна дополнительная фишка - это уведомления в профиле

## Настройка

Переименуйте template.env в .env
и измените параметры

```
NODE_ENV=development
PORT=3000

NODE_HOST=localhost
NODE_PORT=3000
NODE_PROTOCOL=http

SALT_ROUNDS=64270cbfa2a4
TOKEN_SECRET=c20102256aaacf13c87db76f7b4c901b026d778cc0802ff23064f7959a603c8b

DB_NAME=
DB_USER=
DB_PASS=
DB_DRIVER=postgres
DB_HOST=
DB_PORT=5432
```

## Эндпоинты

```
POST /user/singIn
{ email, password }

POST /user/singUp
{ avatar, name, email, password, shortLink }

POST /user/get
{ userId }

POST /user/edit
{ avatar, name, email, password, shortLink }

POST /user/delate
{  }
```

## Развертывание проекта

1. Создание базы данных:
```
cat scripts/schema.pg.sql | sudo -u postgres psql
```
2. Создание .env:
```
cp .env.example .env
```
3. Установка зависимостей:
```
pnpm install // or npm install
```
4. Запуск миграций:
```
prisma migrate dev
```
Если не выполнились сиды:
```
npx prisma db seed
```
Старт сервера в дев режиме
```
npm run dev
```
Страница входа: http://127.0.0.1:3000/projecttemplate/signin

Данные пользователя:
```
login: admin
password: 123123
```

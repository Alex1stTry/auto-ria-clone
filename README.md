 npm run start:docker:db 
- 
- запуск докера с локальными базами данных

npm run start:local 
-
- запуск апликации локально

npm run migration:run 
-
- накат миграций
# Auto-Ria Clone

Auto-Ria Clone - это веб-приложение для управления объявлениями о продаже автомобилей. В проекте используются NestJS для серверной части и TypeORM для работы с базой данных. Приложение позволяет пользователям просматривать, добавлять и управлять автомобилями, а также получать информацию о продавцах и их автомобилях.
Для быстрой связи между покупателм и продацом выводиться номер телефона и почта. (Вывод почты это я плохо придумал конечно) 

## Функциональность

- Управление пользователями и продавцами.
- Просмотр и добавление автомобилей.
- Получение информации о продавцах и их автомобилях.
- Поиск автомобилей по бренду и модели.
- Вывод статистики просмотров по каждому авто(словил ошибки если успею исправлю)

### Предварительные требования

- Node.js (версия 18 и выше)
- Docker (для работы с базой данных)
  Разработка
  Для разработки проекта используются следующие инструменты и библиотеки:

NestJS - фреймворк для создания серверных приложений.
TypeORM - ORM для работы с базой данных.
PostgreSQL - база данных (можно заменить на другую, совместимую с TypeORM).
Swagger - для документации API.
Redis - база данных для хранения access токенов.
MinIo - для использования локльного бакета.

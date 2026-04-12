Project Title: FoodieBook
Platform for sharing and discovering home recipes.

Project Overview
Это веб-приложение для любителей кулинарии. Проект находится в стадии активной разработки. На данный момент реализовано ядро системы: аутентификация и связь фронтенда с бэкендом.

Stack
Frontend: Angular 18+ (Standalone components, RxJS)

Backend: Django 5+ (Django REST Framework, SimpleJWT)

Database: SQLite (на этапе разработки)

Version Control: Git (Feature-branch workflow)
What’s Done (Current Progress for Pre-Defence)
На текущий момент реализованы следующие ключевые функции:

Backend API:

Регистрация пользователей через REST API.

Аутентификация с использованием JWT-токенов (Access/Refresh).

Настроены CORS-политики для работы с Angular.

Frontend Integration:

Registration: Форма сбора данных, отправка POST-запроса на Django, обработка успешного создания аккаунта.

Login: Реализован механизм входа, получение JWT-токена и его сохранение в localStorage.

Routing: Настроена навигация между страницами Home, Login и Register.

Installation & Setup
Инструкция для тех, кто будет проверять проект:

Backend
Перейдите в папку foodibook.

Установите зависимости (если есть requirements.txt): pip install -r requirements.txt.

Запустите сервер: python manage.py runserver.

Frontend
Перейдите в папку recipe-site.

Установите зависимости: npm install.

Запустите проект: ng serve.

Team Members:
Manapaly Zhanerke
Kyzyr Balzhan
Maratkyzy Laura

Имя подруги: UI/UX Design & Frontend Layout (Components architecture).
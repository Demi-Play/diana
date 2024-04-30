from .models import Car, CarModel, User
from .main import SessionLocal, engine, Base

def fill():
    # Создаем все таблицы
    Base.metadata.create_all(bind=engine)

    # Добавление моделей автомобилей
    model1 = CarModel(name='Civic', brand='Honda')
    model2 = CarModel(name='Accord', brand='Honda')
    model3 = CarModel(name='Corolla', brand='Toyota')

    # Добавление автомобилей
    car1 = Car(brand='Honda', year=2019, model=model1)
    car2 = Car(brand='Toyota', year=2020, model=model3)
    car3 = Car(brand='Honda', year=2021, model=model2)

    # Добавление в сессию и сохранение в базе данных
    session = SessionLocal()
    session.add_all([model1, model2, model3, car1, car2, car3])

    # Добавление пользователя
    new_user = User(
        username='john_doe',
        password='password123',
        email='john.doe@example.com',
        avatar=b'...',  # Добавьте бинарное представление аватара
        first_name='John',
        last_name='Doe',
        birth_date='1990-01-01',
        is_admin=False
    )
    session.add(new_user)

    # Добавление автомобиля
    new_car = Car(
        brand='Honda',
        model_id=1,
        year=2022,
        price=25000,
        mileage=10000,
        condition='Excellent',
        description='Great condition, low mileage.',
        photo=b'...'  # Добавьте бинарное представление фотографии автомобиля
    )
    session.add(new_car)

    session.commit()
    session.close()

# Вызов функции fill() при импорте
fill()

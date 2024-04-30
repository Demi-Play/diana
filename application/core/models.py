from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Boolean, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

# Создание подключения к базе данных SQLite
engine = create_engine('sqlite:///used_cars.db', echo=True)
Base = declarative_base()

# Определение модели CarModel
class CarModel(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    brand = Column(String)

    # Отношение к автомобилям (Car)
    cars = relationship("Car", back_populates="model")

# Обновление модели User
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)
    email = Column(String, unique=True)
    avatar = Column(String)  # Аватар пользователя
    first_name = Column(String)
    last_name = Column(String)
    birth_date = Column(Date)
    is_admin = Column(Boolean, default=False)

    # Отношение к избранным автомобилям
    favorite_cars = relationship("FavoriteCar", back_populates="user")

# Обновление модели Car
class Car(Base):
    __tablename__ = 'cars'
    id = Column(Integer, primary_key=True)
    brand = Column(String)
    model_id = Column(Integer, ForeignKey('models.id'))
    year = Column(Integer)
    price = Column(Integer)
    mileage = Column(Integer)
    condition = Column(String)
    description = Column(String)
    photo = Column(String)  # Фотография автомобиля

    # Отношение к модели CarModel
    model = relationship("CarModel", back_populates="cars")

    # Отношение к избранным пользователями
    favorited_by = relationship("FavoriteCar", back_populates="car")

# Определение модели FavoriteCar
class FavoriteCar(Base):
    __tablename__ = 'favorite_cars'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    car_id = Column(Integer, ForeignKey('cars.id'))

    # Отношение к пользователю
    user = relationship("User", back_populates="favorite_cars")

    # Отношение к автомобилю
    car = relationship("Car", back_populates="favorited_by")


# Создание таблиц в базе данных
Base.metadata.create_all(engine)

# Создание сессии для взаимодействия с базой данных
Session = sessionmaker(bind=engine)
session = Session()

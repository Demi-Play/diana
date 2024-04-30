import os
from flask import Flask, jsonify, request
from models import session, User, Car, CarModel, FavoriteCar
from flask_cors import CORS
import datetime as date
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Определяем путь к базе данных в корне проекта
db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'used_cars.db'))

# Блок настройки и конфигурации Flask, SQLAlchemy и CORS
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///used_cars.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Создаем экземпляр SQLAlchemy для работы с базой данных

# Helper функция для преобразования объектов SQLAlchemy в словари
def row2dict(row):
    return {col.name: getattr(row, col.name) for col in row.__table__.columns}

# Маршруты для работы с моделями автомобилей (CarModel)


# Метод serialize для класса Car
def car_serialize(car):
    return {
        'id': car.id,
        'brand': car.brand,
        'model_id': car.model_id,
        'year': car.year,
        'price': car.price,
        'mileage': car.mileage,
        'condition': car.condition,
        'description': car.description,
        'photo': car.photo
    }

# Метод serialize для класса CarModel
def car_model_serialize(car_model):
    return {
        'id': car_model.id,
        'name': car_model.name,
        'brand': car_model.brand,
        'cars': [car_serialize(car) for car in car_model.cars]
    }

# Маршруты для работы с моделями автомобилей (CarModel)

# Получить все модели автомобилей
@app.route('/api/models', methods=['GET'])
def get_car_models():
    models = session.query(CarModel).all()
    return jsonify([car_model_serialize(model) for model in models])

# Получить одну модель по ID
@app.route('/api/models/<int:model_id>', methods=['GET'])
def get_car_model(model_id):
    model = session.query(CarModel).filter_by(id=model_id).first()
    if model:
        return jsonify(car_model_serialize(model))
    else:
        return jsonify({'error': 'Model not found'}), 404

# Создать новую модель автомобиля
@app.route('/api/models', methods=['POST'])
def create_car_model():
    data = request.json
    new_model = CarModel(
        name=data['name'],
        brand=data['brand']
    )
    session.add(new_model)
    session.commit()
    return jsonify({'message': 'Car model created successfully'}), 201

# Обновить информацию о модели автомобиля
@app.route('/api/models/<int:model_id>', methods=['PUT'])
def update_car_model(model_id):
    model = session.query(CarModel).filter_by(id=model_id).first()
    if not model:
        return jsonify({'error': 'Model not found'}), 404

    data = request.json
    model.name = data.get('name', model.name)
    model.brand = data.get('brand', model.brand)

    session.commit()
    return jsonify({'message': 'Car model updated successfully'})

# Удалить модель автомобиля
@app.route('/api/models/<int:model_id>', methods=['DELETE'])
def delete_car_model(model_id):
    model = session.query(CarModel).filter_by(id=model_id).first()
    if not model:
        return jsonify({'error': 'Model not found'}), 404

    session.delete(model)
    session.commit()
    return jsonify({'message': 'Car model deleted successfully'})

# Маршруты для работы с автомобилями (Car)

# Получить все автомобили
@app.route('/api/cars', methods=['GET'])
def get_cars():
    cars = session.query(Car).all()
    return jsonify([car_serialize(car) for car in cars])

# Получить один автомобиль по ID
@app.route('/api/cars/<int:car_id>', methods=['GET'])
def get_car(car_id):
    car = session.query(Car).filter_by(id=car_id).first()
    if car:
        return jsonify(car_serialize(car))
    else:
        return jsonify({'error': 'Car not found'}), 404

# Создать новый автомобиль
@app.route('/api/cars', methods=['POST'])
def create_car():
    data = request.json
    new_car = Car(
        brand=data['brand'],
        model_id=data['model_id'],
        year=data['year'],
        price=data['price'],
        mileage=data['mileage'],
        condition=data['condition'],
        description=data['description'],
        photo=data['photo']
    )
    session.add(new_car)
    session.commit()
    return jsonify({'message': 'Car created successfully'}), 201

# Обновить информацию об автомобиле
@app.route('/api/cars/<int:car_id>', methods=['PUT'])
def update_car(car_id):
    car = session.query(Car).filter_by(id=car_id).first()
    if not car:
        return jsonify({'error': 'Car not found'}), 404

    data = request.json
    car.brand = data.get('brand', car.brand)
    car.model_id = data.get('model_id', car.model_id)
    car.year = data.get('year', car.year)
    car.price = data.get('price', car.price)
    car.mileage = data.get('mileage', car.mileage)
    car.condition = data.get('condition', car.condition)
    car.description = data.get('description', car.description)
    car.photo = data.get('photo', car.photo)

    session.commit()
    return jsonify({'message': 'Car updated successfully'})

# Удалить автомобиль
@app.route('/api/cars/<int:car_id>', methods=['DELETE'])
def delete_car(car_id):
    car = session.query(Car).filter_by(id=car_id).first()
    if not car:
        return jsonify({'error': 'Car not found'}), 404

    session.delete(car)
    session.commit()
    return jsonify({'message': 'Car deleted successfully'})



# Получение списка всех пользователей
@app.route('/users', methods=['GET'])
def get_users():
    users = session.query(User).all()
    user_list = [row2dict(user) for user in users]
    return jsonify(user_list)

# Создание нового пользователя
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(**data)
    session.add(new_user)
    session.commit()
    return jsonify({"message": "User created successfully"}), 201

# Регистрация нового пользователя
@app.route('/register', methods=['POST'])
def register_user():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        avatar = data.get('avatar')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        is_admin = data.get('is_admin')
        
        if username and password and email:
            # Проверка наличия пользователя с таким же email или username
            existing_user_email = session.query(User).filter_by(email=email).first()
            existing_user_username = session.query(User).filter_by(username=username).first()
            
            if existing_user_email or existing_user_username:
                return jsonify({"error": "User with this email or username already exists"}), 400
            
            new_user = User(username=username, password=password, email=email, avatar=avatar,
                            first_name=first_name, last_name=last_name, is_admin=is_admin)
            session.add(new_user)
            session.commit()
            
            user_dict = {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email,
                'avatar': new_user.avatar,
                'first_name': new_user.first_name,
                'last_name': new_user.last_name,
                'is_admin': new_user.is_admin
            }
            
            return jsonify(user_dict), 201
        else:
            return jsonify({"error": "Not all required fields are provided"}), 400
    else:
        return jsonify({"error": "Invalid method, only POST requests are allowed"}), 405
    
# Аутентификация пользователя
@app.route('/auth', methods=['POST'])
def auth_user():
    if request.method == 'POST':
        data = request.json
        print("Received data:", data)  # Добавим эту строку для вывода в консоль
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user_data = session.query(User).filter_by(username=username, password=password).first()
            if user_data is None:
                return jsonify({'message': 'User not found or incorrect credentials'}), 401
            
            user_dict = {
                'id': user_data.id,
                'username': user_data.username,
                'email': user_data.email,
                'avatar': user_data.avatar,
                'first_name': user_data.first_name,
                'last_name': user_data.last_name,
                'is_admin': user_data.is_admin
            }
            return jsonify(user_dict)
        else:
            return jsonify({'message': 'Invalid request, please provide username and password'}), 400
    else:
        return jsonify({'message': 'Invalid method, only POST requests are allowed'}), 405

# Получение профиля пользователя по ID
@app.route('/profile/<int:id>', methods=['GET'])
def get_profile(id):
    user = session.query(User).filter_by(id=id).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    user_dict = row2dict(user)
    return jsonify(user_dict)

def serialize(fav):
        return {
            # 'id': fav.id,
            'user_id': fav.user_id,
            'car_id': fav.car_id
        }

# Маршруты для работы с избранными автомобилями (FavoriteCar)

# Получить все избранные автомобили для пользователя
@app.route('/api/favorites/<int:userId>', methods=['GET'])
def get_user_favorites(userId):
    user = session.query(User).filter_by(id=userId).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Получить все избранные автомобили для пользователя
    favorite_cars = user.favorite_cars

    # Преобразовать каждый избранный автомобиль в словарь и добавить user_id
    favorite_cars_data = []
    for fav_car in favorite_cars:
        car = session.query(Car).filter_by(id=fav_car.car_id).first()
        if car:
            model_name = car.model.name if car.model else "Unknown Model"
            favorite_car_data = {
                'id': fav_car.id,
                'user_id': 1,  # Добавляем user_id
                'car_id': fav_car.car_id,  # Получаем car_id из избранных автомобилей
                'brand': car.brand,
                'model': model_name,
                'photo': car.photo
            }
            favorite_cars_data.append(favorite_car_data)

    return jsonify(favorite_cars_data)


# Добавить автомобиль в избранное пользователя
@app.route('/api/favorites/<int:user_id>/<int:car_id>', methods=['POST'])
def add_favorite_car(user_id, car_id):
    user = session.query(User).filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    car = session.query(Car).filter_by(id=car_id).first()
    if not car:
        return jsonify({'error': 'Car not found'}), 404

    # Проверяем, не добавлен ли уже этот автомобиль в избранное
    if session.query(FavoriteCar).filter_by(user_id=user_id, car_id=car_id).first():
        return jsonify({'message': 'Car already in favorites'})

    favorite_car = FavoriteCar(user_id=user_id, car_id=car_id)
    session.add(favorite_car)
    session.commit()
    return jsonify({'message': 'Car added to favorites successfully'})

# Удалить автомобиль из избранных пользователя
@app.route('/api/favorites/<int:user_id>/<int:car_id>', methods=['DELETE'])
def remove_favorite_car(user_id, car_id):
    favorite_car = session.query(FavoriteCar).filter_by(user_id=user_id, car_id=car_id).first()
    if not favorite_car:
        return jsonify({'error': 'Favorite car not found'}), 404

    session.delete(favorite_car)
    session.commit()
    return jsonify({'message': 'Car removed from favorites successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5005)

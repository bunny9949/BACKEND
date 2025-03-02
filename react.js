!pip install flask-ngrok
from flask import Flask, request, jsonify  
from flask_ngrok import run_with_ngrok  

app = Flask(__name__)  
run_with_ngrok(app)  # Start ngrok when the app is run  

@app.route('/vector_predict', methods=['POST'])  
def vector_predict():  
    """Predict best product offers based on category."""  
    data = request.json   
    category = data.get('category', '').lower()  # Handle case insensitivity  
    products = []  

    # Mock database response based on category  
    if category == 'smartphone':  
        products.append({'name': 'Latest Smartphone Model', 'offer': 15, 'price': 599})  
    elif category == 'laptop':  
        products.append({'name': 'Powerful Laptop', 'offer': 20, 'price': 799})  

    return jsonify({"products": products})  

@app.route('/chatgpt_recommendation', methods=['POST'])  
def chatgpt_recommendation():  
    """Return a recommendation for the best product based on given products."""  
    data = request.json  
    products = data.get('products', [])  
    
    if products:  
        product = products[0]  # Get the first product as a recommendation  
        recommendation = {  
            "name": product['name'],  
            "offer": product['offer'],  
            "price": product['price'],  
            "notes": "This is a great deal!"  # Mock recommendation note  
        }  
        return jsonify(recommendation)  
    else:  
        return jsonify({"error": "No products found"}), 400  # Use proper error code  

if __name__ == '__main__':  
    # Keep it simple for development; this runs in Colab  
    app.run()  
pip install gunicorn
gunicorn -w 4 your_filename:app  # Replace 'your_filename' with the name of your Python file without .py

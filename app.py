from flask_pymongo import PyMongo
from flask import Flask, render_template, redirect

app = Flask(__name__)
mongo = PyMongo(app,uri='mongodb://localhost:27017/project2_db')

@app.route('/')
def home():
    data = mongo.db.restaurantes.find_one()
    return render_template('index.html', restaurantes=data)

if __name__=='__main__':
    app.run(debug=True)
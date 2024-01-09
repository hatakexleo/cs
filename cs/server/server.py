from flask import Flask,request,jsonify
#imported flask modules.
import util
from flask_cors import CORS
#app is to launch the flask server when runned.

app=Flask(__name__)
CORS(app)

#the below code prints hi when the /hello used after 120.0.0.1:5000 

#the we changed the methods to get location.
#we will create util now.
@app.route('/get_pesticides_names')
def get_pesticides_names():
    response=jsonify({
        'pesticide':util.get_pesticides_names()
    })
    response.headers.add('Acess-Control-Allow-Origin',"*")

    return response

@app.route('/predict_crop_sucess',methods=['POST'])
def predict_crop_sucess():
    rainfall=float(request.form['rainfall'])
    crop=request.form['crop']
    soil_type=int(request.form['soil_type'])
    season=int(request.form['season'])
    pesticide=request.form['pesticide']
    response=jsonify({
        'crop_success': util.get_crop_sucess(rainfall,crop,soil_type,season,pesticide).tolist()
    })

    return response
if __name__=="__main__":
    print("starting python flask server for home price prediction")
    app.run()
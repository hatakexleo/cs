import json
import pickle
import numpy as np

import warnings
warnings.filterwarnings('ignore')

__pesticides=None
__data_columns=None
__model=None


def get_crop_sucess(rainfall,crop,soil_type,season,pesticide):
    load_saved_artifacts()
    try:
        loc_index=__data_columns.index(pesticide.lower())
    except:
        loc_index=-1


    x=np.zeros(len(__data_columns))
    x[0]=rainfall
    x[1]=crop
    x[2]=soil_type
    x[3]=season
    if loc_index >=0:
        x[loc_index]=1
    return np.round(__model.predict([x])[0],2)

def get_pesticides_names():
    load_saved_artifacts()
    return __pesticides

def load_saved_artifacts():
    print("loading saved artifacts..start")
    global __data_columns
    global __pesticides

    with open("./artifacts/columns.json",'r') as f:
        __data_columns=json.load(f)['data_columns']
        __pesticides=__data_columns[4:]

    global __model
    with open("./artifacts/crop_score.pickle",'rb') as f:
        __model=pickle.load(f)
    print("loading saved artifacts..done")


if __name__=='__main__':
    load_saved_artifacts()
    # print(get_location_names())
    # print(get_estimated_price('1st Phase JP Nagar',1000,3,3))
    # print(get_estimated_price('kalhalli',1000,2,3)) #other loc
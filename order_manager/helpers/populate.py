from order_manager.models import Crops
import json
import os

JSON_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)),'crops.json')

def populate_db():
    try:
        crops = Crops.objects.count()

        if crops == 0:
            with open(JSON_FILE) as fp:
                crops_data = json.load(fp)
                
            print(crops_data)
            
            for crop in crops_data:
                print("Adding %s to DB ..." % crop['name'])
                Crops(name=crop['name'], price=crop['price']).save()
            print("Server Ready ....")

    except Exception as e:
        raise e
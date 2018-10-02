from sense_hat import SenseHat
from time import time, sleep
import os
import sys
import random
from math import floor, ceil
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# constants
COLOR_BLUE = (0, 0, 255)
COLOR_BLACK = (0, 0, 0)

# get API key from json
serviceAccountKey = "./../../keys/arcadekey.json"
databaseURL = "https://arcade-python.firebaseio.com/"

try:
    # fetch the service account key JSON file contents
    firebase_cred = credentials.Certificate(serviceAccountKey)

    firebase_admin.initialize_app(firebase_cred, {
        "databaseURL": databaseURL
    })

    firebase_ref_arcade = db.reference("arcade-characters")
except:
    print('Unable to initialize Firebase: {}'.format(sys.exc_info()[0]))
    sys.exit(1)


def get_random_arcade_matrix(pattern):
    matrix = []
    for r in range(0, 8):
        temp_str = ''
        for c in range(0, 4):
            temp_str = temp_str + str(round(random.random()))

        temp_str = temp_str + temp_str[::-1]
        pattern = pattern + temp_str

    for p in range(0, 64):
        bit = int(pattern[p])
        color = COLOR_BLUE if bit == 1 else COLOR_BLACK
        matrix.append(color)

    return(matrix)


def fetch_pattern():
    print("Fetching from Firebase")
    patterns = firebase_ref_arcade.get()
    if patterns is not None:
        print("Found some stuff!")
    else:
        print("Found nothing...")


try:
    # SenseHat
    sense_hat = SenseHat()
    sense_hat.set_imu_config(False, False, False)
except:
    print('Unable to initialize the Sense Hat library: {}'.format(sys.exc_info()[0]))
    sys.exit(1)


def main():
    while True:
        fetch_pattern()


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Stopping program')
        sense_hat.clear()
        sys.exit(0)
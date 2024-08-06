from PIL import Image
import os, sys

path = ('C:\Users\MANUDEESH\Desktop\101D3300')

def resize():
  for item in os.listdir(path):
    if os.path.isfile(item):
        im = Image.open(item)
        f, e = os.path.splitext(item)
        imResize = im.resize((200,200), Image.ANTIALIAS)
        imResize.save(f + ' resized.jpg', 'JPEG', quality=90)

resize()
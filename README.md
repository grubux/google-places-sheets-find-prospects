# google-places-sheets-find-prospects
This is an App Scripts that can help find prospects using the google places API in sheets.
With this sheets function, you can see local stores which does not have a website, see their :
- name
- ID
- adress
- type of the store
- phone number
## Step 1 set it up
1. Go to google Sheets -> *extensions -> Apps Script*
2. Delete current code or save it elsewhere
3. copy/paste code in index.js
4. CTRL + S to save

## Step 2 use it 
1. Click and paste this code into a cell :
`=placesAPI("fromager","48.8530921589683","2.3701020233778407","3000","your_api_key",3)`
2. Edit function parameters :
    1. The first parameter is your searched keyword, insert 'butcher' or 'dentist'...
    2. insert latitude
    3. insert longitude
    4. insert search radius in meters. 3000 > 3KM
    5. insert numbers of pages wanted.
        ###MAX : 3.
        ###Results per page : 20. So 60 results max.

## Step 3.
Enjoy :)
<img width="953" alt="image" src="https://user-images.githubusercontent.com/67732178/213086379-f9451c3d-8f61-4d3d-9595-98912a0df7f7.png">

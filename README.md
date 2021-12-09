### Badges

[![Build
Status](https://travis-ci.com/swsnu/swpp2021-team12.svg?branch=master)](https://travis-ci.com/swsnu/swpp2021-team12)
[![Quality Gate
Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2021-team12&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2021-team12)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-team12/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2021-team12?branch=master)

### Project Abstraction
MeetHub is the place where people get together. Everyone in MeetHub can share their space to hang out, or gather people who have the same purpose.
First, you can share your room with your friends. Make or join a club, and register your room. It will appear on the map and club members can make a reservation for hanging out with you. At the same time, you can also find your friend’s room and do the same things.
Second, you can find your mates on MeetHub. For example, you may want to order a delivery food. If you live alone, the delivery fee and lowest-price for an order are very burdensome. Then you can gather your mates like you on MeetHub. Make a meeting and let other people around you find your meeting on the map. Not only for delivery, but also for whatever you wanna share together, you can make an ‘offer’ to gather your mates.

### Core Features

## Meeting
Create a Meeting. Gather People.    You can make meeting bubble on map. Anyone can join public meetings. Or you can make private meetings for your club members!
## Club
Create a Club. For your best buddies.    You can make clubs for your people. You can make meetings and rooms only for your club members.
## Room
Provide a Room. Best place for hanging out.   You can register your room. Anyone can make request to your room. Gather people to hang out!

### How to Run

```
Backend

cd backend/
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

```
Frontend

cd frontend/
yarn install
yarn start
```

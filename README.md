# Simple Rate Limiter 
A simple website that implements the naive rate-limiting algorithm
## Tech Stacks:
* NodeJS
* Express
* MongoDB
### Node Packages:
```
├── config@3.3.2
├── express@4.17.1
└── mongoose@5.10.15
```
## Configuration:
1. `git clone https://github.com/JohnCSW/simple-rate-limiter.git`
2. `npm i`
3.  Make sure you have your own [MongoDB](https://www.mongodb.com/) instance running.
4.  Edit `config/default.json`, change value of `sourceURL` to your own [connection string](https://docs.mongodb.com/manual/reference/connection-string/).
```
  "mongoDB": {
    "sourceURL": "mongodb://localhost/dcard"
  },
```
5. `node app.js` on <http://localhost:1234>
## License:
The MIT License (MIT)

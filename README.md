# Payments via Sound

Sending Setu’s UPI payment links via sound from merchant to customer.

[Demo](https://setu-upi-over-sound.herokuapp.com/)

This is a node server which uses [quiet.js](https://quiet.github.io/quiet-js/) to establish an audible transmitter and receiver.

Merchants can generate an UPI link with desired amount and Customers can receive is using the same application.

## How to

### Setup UPI Deeplink with Setu

Follow this [documentation](https://docs.setu.co/payments/upi-deeplinks/quickstart) to setup UPI Deeplinks with Setu. At the end of it, you would be able to get sandbox credentials, `product_instance_id`, `client_id` and `client_secret` for your product.

Replace the values in `.env` file

### Running the app

#### Install dependencies

`npm install`

#### Start server

`npm run start`

## Deploy to Heroku

This repo comes with a `Procfile` which you can use to deploy to Heroku following this [guide](https://medium.com/geekculture/deploy-node-applications-on-heroku-a89ed51e0a34).

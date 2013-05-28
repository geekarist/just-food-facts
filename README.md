# JUST FOOD FACTS

Show nutritional information about your food, using a simple and neat user interface.

## Prerequisites

- Node JS 0.10
- NPM 1.2

## Installation

Install grunt-cli and bower and setup local app:

	$ npm -g install grunt-cli bower
	$ npm install

## Usage

Build the application:

	$ grunt build optimize

Launch the application for production server:

	$ node ./server/server.js &> jff-prod.log &

## Develop

Launch development environment:

	$ grunt server

Launch frontend unit tests:

	$ grunt karma:unit

Launch backend unit tests:

	$ grunt test-back

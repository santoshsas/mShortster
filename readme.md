# URL Shortening App

This is a URL shortening app developed using Node.js, Express, and React. The app allows users to submit URLs and receive corresponding shortcodes, as well as access the original URLs using the shortcodes.

## Features

- Users can submit a URL to the `/submit` endpoint and receive a unique shortcode in response.
- Users can submit a URL with a desired shortcode, and if available, they will receive the chosen shortcode.
- Users can access a `/<shortcode>` endpoint to be redirected to the original URL associated with the shortcode.
- Users can access a `/<shortcode>/stats` gives the stats for shortcode.
- Shortcodes can contain digits, uppercase letters, and lowercase letters (case insensitive).
- Automatically allocated shortcodes are 6 or 6+ characters long, while user-submitted shortcodes must be at least 4 characters long.

## Technologies Used

- Node.js
- Express
- React

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine.


## Installing on local just need executing below command from root folder of project
npm install

## Running the App
npm start


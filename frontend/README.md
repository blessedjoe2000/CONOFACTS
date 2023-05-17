## DESCRIPTION

CONOFACTS is a web application designed to connect people who share similar interests. It allows users to create a profile, create posts, and view posts based on similar interests. the app enables both light and dark mode for preference. This repository contains the source code for the application.

## Features

    User authentication
    User profile creation and management
    Post creation and management.
    Ability to view posts according to similar interests

## Installation

To install and set up the application locally, follow these steps:

    Clone this repository to your local machine
    Install the necessary dependencies by running npm install
    Create a .env file in the root directory and get the following variables:

        DB_USERNAME (MongoDB username)
        DB_PASSWORD (MongoDB password)
        DB_HOST (URI to connect to MongoDB database)
        JWT_SECRET(a JWT secret string)

## Usage

To use the application, follow these steps:

    Create a profile by providing your personal information and choosing your interests.
    Create a post by selecting from the list of interests and a message description of the post.
    View other users posts on your timeline based on similar interests.

## Technologies Used

CONOFACTS was built using the following technologies:

    Node.js
    Express.js
    MongoDB
    Socket.io
    React.js
    Redux.js

## Contributing

If you would like to contribute to CONOFACTS, please follow these steps:

    Fork this repository
    Create a new branch
    Commit your changes and push the branch to your fork
    Create a pull request to this repository

## Future Development

In the future, we plan to add more features such as a real-time messaging system for connected users, the ability to search for other users with similar interests.

Thank you for using CONOFACTS! We hope you enjoy connecting with people who share your interests.

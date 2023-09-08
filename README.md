# What-is-tomorrow-for-dinner

## About the Project
The application is a project implemented as part of a diploma thesis.
A meal planning application serves as a tool to assist in organizing meals. It is a user-friendly tool designed to cater to both families and serve as a dietician's assistant. The website comprises two main components. The first is an individual cookbook along with an entire management system for it. The second component is a system for generating and arranging diets, taking user preferences into account. The meal selection mechanism aims to diversify the diet while minimizing the time spent on meal preparation.

## How to set up this app locally
### Backend

Follow these steps to ensure you can build and run the application locally:
- Make sure you have Java and Gradle installed on your computer. If you don't have them installed, you can download and install them.
- Navigate to the root folder of the project.
- Build the project:
./gradlew build
- Run the application:
./gradlew bootRun


### Frontend

To run the frontend part of the application, follow these steps:
- Make sure you have Node.js and the npm package manager installed on your computer. If you don't have them installed, you can download and install them.
- Install the project's dependencies by running the following command in the project's root directory:
npm install
- Navigate to the frontend/ directory from the project's root.
- Start the application:
    npm start
- The application will be available at http://localhost:3000.


### Database

Follow these steps to set up a Docker container for MongoDB:
- Make sure you have Docker installed on your computer. If you don't have it installed, you can download and install it.
- Run the following command to start a Docker container with MongoDB:
   docker run --env=MONGO\_INITDB\_ROOT\_PASSWORD=admin --env=MONGO\_INITDB\_ROOT\_USERNAME=admin -p 27017:27017 -d mongo


## Views

TODO


## Technologies

### Backend

- Java 17
- Spring Boot
- Spring Framework
- Spring Data
- Spring Security
- JSON Web Token
- JUnit5


### Frontend
- TypeScript
- React
- Material UI
- AntDesign
- Axios
- React Router
- ESLint


### Other

- MongoDB
- GIT, GitHub
- Docker
- Procreate,  Keep on Truckin' FW 
- Gradle
- Postman
- Google Cloud Platform - Compute Engine



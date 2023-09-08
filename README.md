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

![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/97a46c78-7085-4ce1-9448-79ad77156a61)

![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/fcd9c776-6275-45ae-baf6-321a5770debe)


###
![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/46622252-c722-4edf-9c2e-d85daacc17d1)

![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/5bf37f4e-f710-49cd-9571-e42fb18a875b)

###
![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/4cbdc944-249d-4d1f-8637-a48b66a1108d)

![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/28fbc6a4-c60f-4bb7-a3b2-f07f4de23861)
###
![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/4f0a84b5-5fea-4bf6-a694-b56a2f48cb8a)

###
![image](https://github.com/BM-ska/What-is-tomorrow-for-dinner/assets/58348985/1406e712-23cb-4065-8d56-3473eda04dae)




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



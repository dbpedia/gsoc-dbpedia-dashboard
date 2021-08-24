# User Centric Knowledge Engineering and Data Visualization

## Problem:
Last year, the dashboard project was about finding the general insights of the public endpoint's datacore. This year, it is the extension for querying the endpoints and creating multiple dashboards. The limitation of last year's project was that, there were no customized SPARQL queries that could return the different datasets and visualize them at the same time. All the queries were statically executed without any modifications. Additionally, users had no flexibility to create their own multiple dashboards for analysis.

## Solution:
In terms of solution, this project is about introducing user authentication just like DBpedia's databus where users can login and have their own data collections. The underlying user base for this project remains same as DBpedia Databus'. On the other hand, the frontend (ReactJS) of the application provides users an interface to create dashboards, specify different SPARQL endpoints, and visualize the response of SPARQL queries. Furthermore, the backend (Flask) includes APIs to perform database operations for the dashboards. Hence, the current status and scope of the project includes user authentication and APIs for frontend data visualization along with the backend database. With this foundation, the project holds potential to expand in terms of adding advanced visualizations and data transformation operations.

## Major Components:

1) The first major component of this project is the [keycloak](https://www.keycloak.org/) authentication. There is no need for users to register in order to use this platform because the credentials of DBpedia's [databus](https://databus.dbpedia.org/) are used in order to authenticate. For this, keycloak's frontend client is used as per the [documentation](https://www.keycloak.org/docs/latest/securing_apps/). Hence, this is the major entry point for the platform.

## Development:
- The project includes two portions, backend and frontend that are developed using ReactJS and Flask.

## Running on your local machine:
Tools and Frameworks used for developing this system:
1) [Flask](https://flask.palletsprojects.com/en/1.1.x/) framework (for backend operations and handling requests)
2) [ReactJS](https://reactjs.org/) framework (for frontend user interface to interact with the system)
3) [Docker](https://www.docker.com/) (for deployment)
4) [Plotly](https://plotly.com/)  (for visualizations)

For running the system on the local machine, clone the repository and make sure that [node.js](https://nodejs.org/en/) and [python](https://www.python.org/) are installed. Another way is to have [docker]() installed, since its much easier way to get the system up and running. Once the repository is cloned. Run ```npm install``` command in the ```frontend``` directory and create virtual environment in ```backend``` directory, followed by ```pip install requiremets.txt```. This will install dependencies for both frontend and backend of the system. The final step includes running node and flask servers with commands ```npm start``` and ```flask run``` in respective directories.

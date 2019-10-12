# MontReal
The goal of this website is to allow Montrealers to talk about the city which they love. 
Although it may not be a megapole like New York or other big cities, we still find pleasure in the unique things that cannot be found elsewhere.

### Project description ###
MontReal is a web discussion platform about the city of Montreal. It allows users to view and talk about different topical threads that can  be filtered from a search box. Furthermore, users can also create and manage their profile.

Features include:
  - Signup/Login system
  - Profile viewing and modifying own profile
  - Thread browsing
  - Thread creation
  - Comment/Reply system
  
### View Project ###
You can watch the demo via this link: https://youtu.be/bkN1knTOLVg
This project unfortunately cannot be deployed due to Mongo Database restrictions.

### Notable Technologies ###
This website uses Javascript as its main language, and React as the framework. 

#### Redux ####
Tracks website wide activities to display information accordingly.

Information tracked by the store
```
 {
    loggedIn: false,    //whether the user is logged in or not
    searchQuery: "",    //display what the user is searching
    userData: {},       //store user data for quicker rendering
    modifyProfile: false,   //display input boxes for user to change profile information
  }
```

#### Future Proofness####
Every information about users and threads is stored into the Mongo Database. Uploading or modifying those information directly pushes changes to the database. When displaying threads, a nested asynchronous fetch request matches the right author to the right thread through AuthorID, so that if the author modifies his name, it will still display his new name.

#### All technologies include ####
  - Front-end: React.js, Redux, React-Map-Gl, HTML, CSS
  - Backend: Node.js, Express, MongoDB
  - Other: Git, Github, NPM, Yarn



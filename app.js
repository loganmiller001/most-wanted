/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
debugger;

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    
    mainMenu(searchByName(people), people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions, dummy. :)");
    app(people);
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "name":
      filteredPeople = searchByName(people);
      break;
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let person = filteredPeople[0];

  mainMenu(person, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });

  return newArray;
}

function searchByHeight(people){
  let userInputheight = prompt("How height is the person in inches?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputheight) {
      return true;
    }
  });

  return newArray;
}

function searchByGender(people){
  let userInputGender = prompt("What is the person's gender?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender.toLowerCase()) {
      return true;
    }
  });

  return newArray;
}



function searchByOccupation(people){
  let userInputOccupation = prompt("What is this person's occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation.toLowerCase()) {
      return true;
    }
  });

  return newArray;
}



function searchByEyeColor(people){
  let userInputEyeColor = prompt("What color eyes does the person have?");

  let newArray = people.filter(function (el){
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
  });

  return newArray;
}


function searchByAge(people)   {
  let userInputAge = prompt("How old is the person?");
  let newArray = people.filter(function (el){
    let age = getAge(el);
      if(userInputAge == age){
        return true;
      }
  });
  return newArray;
}

function getAge(el) {
  let dobInfo = el.dob.split("/");
  let dob = dobInfo;
  let month = dob[0];
  let day = dob[1];
  let year = dob[2];
  let today = new Date();
  let age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)){
      age--;
    }
    return age;
  }





function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  

  switch(displayOption){
    case "info":
     let personInfo = displayPerson(person);
     alert(personInfo);
    // TODO: get person's info
    break;
    case "family":
    let family = findParents(person, people).concat(findSpouse(person, people));
    displayPeople(family);
    break;
    case "descendants":
    let descendants = findKids(person, people);
    displayPeople(descendants);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function findSpouse(foundPerson, people){ 
  let spouse = people.filter(function(person){ 
         
      if(person.currentSpouse == foundPerson.id) {       
        return true;     
      }   
      });
      return spouse;
    }

function findParents(foundPerson, people){
  let parents = people.filter(function(person){
 for (let i = 0; i < foundPerson.parents.length; i++){
    if(foundPerson.parents[0] == person.id || foundPerson.parents[1] == person.id){
      return true;
    }}
  });
  return parents;
}
  

  // function displayFullFamily(person, people){
  //   let spouse = findSpouse();
  //   let kids = findKids();
  //   let siblings = findSiblings();
  //   let parents = findParents();
  //   let fullFamily = ("Spouse: " + spouse + "Kids: " + kids + "Siblings: " + siblings + "Parents: " + parents)
  //     return fullFamily;
  // }



function searchByName(people){
  let userInputFirstName = promptFor("What is the person's first name?", chars);
  let userInputLastName = promptFor("What is the person's last name?", chars);
  let newArray = people.filter(function (el) {
    if(el.firstName.toLowerCase() === userInputFirstName.toLowerCase()) {
      if(el.lastName.toLowerCase() === userInputLastName.toLowerCase()) {


        return true;
      
      }
    }
  });

  return newArray[0];
}



function findKids(foundPerson, people){

let children = people.filter(function(person){
 for (let i = 0; i < person.parents.length; i++){
   if(person.parents[i] == foundPerson.id) {
     return true;
   }
 }
 });

 
 for (let i = 0; i < children.length; i++) {
 
   children = children.concat(findKids(children[i], people));    
 }
   return children;
}


function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Spouse: " + person.currentSpouse + "\n";
    return personInfo;
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
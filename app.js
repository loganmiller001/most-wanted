/*
Build all of your functions for displaying and gathering information below (GUI).
*/
debugger;
// app is the function called to start the entire application
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
  let userSearchChoice = prompt("What would you like to search by? 'tall', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "name":
      filteredPeople = searchByName(people)
      break;
    case "tall":
      filteredPeople = searchByTall(people);
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

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight === userInputWeight) {
      return true;
    }
  });

  return newArray;
}

function searchByTall(people){
  let userInputTall = prompt("How tall is the person in inches?");

  let newArray = people.filter(function (el) {
    if(el.tall === userInputTall) {
      return true;
    }
  });

  return newArray;
}

function searchByGender(people){
  let userInputGender = prompt("What is the person's gender?");

  let newArray = people.filter(function (el) {
    if(el.gender === userInputGender.toLowerCase()) {
      return true;
    }
  });

  return newArray;
}

function searchByAge(people, person){
  let userInputAge = prompt("How old is the person?");
    console.log(calculateAge());
  let newArray = people.filter(function (el) {
    if(el.age === userInputAge) {
      return true;
    }
  });

  return newArray;
}

function searchByOccupation(people){
  let userInputOccupation = prompt("What is this person's occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation === userInputOccupation.toLowerCase()) {
      return true;
    }
  });

  return newArray;
}

function searchByEyeColor(people){
  let userInputEyeColor = prompt("What color eyes does the person have?");

  let newArray = people.filter(function (el){
    if(el.eyeColor === userInputEyeColor) {
      return true;
    }
  });

  return newArray;
}

function calculateAge(person, currentDate){
  person.dob = new Date(person.dob);
  currentDate = new Date(currentDate);

  let years = (currentDate.getFullYear() - person.dob.getFullYear());
  if (currentDate.getMonth() < person.dob.getMonth() ||
    currentDate.getMonth() == person.dob.getMonth() && currentDate.getDate() < person.dob.getDate()){
    years --;
  }
  return years; 
}
// Menu function to call once you find who you are looking for
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
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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

function searchByName(people){
  var userInputFirstName = promptFor("What is the person's first name?", chars);
  var userInputLastName = promptFor("What is the person's last name?", chars);
  // let fullName = (firstName + lastName);
  let newArray = people.filter(function (el) {
    if(el.firstName.toLowerCase() === userInputFirstName.toLowerCase()) {
      if(el.lastName.toLowerCase() === userInputLastName.toLowerCase()) {


        return true;
      
      }
    }
  });

  return newArray[0];
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // tall, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "Tall: " + person.tall + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Spouse: " + person.currentSpouse + "\n";
    // return person.firstName + " ";
    // return person.lastName + " ";
    // return person.gender + " ";
    // return person.dob + " ";
    // return person.tall + " ";
    // return person.weight + " ";
    // return person.eyeColor + " ";
    // return person.occupation + " ";
    // return person.parents + " ";
    // return person.currentSpouse + " ";
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

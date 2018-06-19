"use strict";

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
  let filteredPeople = people;

  let searchTraits = promptFor("Do you know the gender of the person? Yes or no?", yesNo).toLowerCase();
    if (searchTraits == "yes") {
      filteredPeople = searchByGender(filteredPeople);
    }
    searchTraits = promptFor("Do you know the height of the person? Yes or no?", yesNo).toLowerCase();
    if (searchTraits == "yes") {
      filteredPeople = searchByHeight(filteredPeople);
    }
    searchTraits = promptFor("Do you know the weight of the person? Yes or no?", yesNo).toLowerCase();
    if (searchTraits == "yes") {
      filteredPeople = searchByWeight(filteredPeople);
    }
    searchTraits = promptFor("Do you know the eye color of the person? Yes or no?", yesNo).toLowerCase();
    if (searchTraits == "yes") {
      filteredPeople = searchByEyeColor(filteredPeople);
    }
    searchTraits = promptFor("Do you know the occupation of the person? Yes or no?", yesNo).toLowerCase();
    if (searchTraits == "yes") {
      filteredPeople = searchByOccupation(filteredPeople);
    }
    searchTraits = promptFor("Do you know the age of the person? Yes or no?", yesNo).toLowerCase();
    if (searchTraits == "yes") {
      filteredPeople = searchByAge(filteredPeople);
    } 

   let person = filteredPeople[0];
   if (filteredPeople.length > 1){
    console.log(displayPeople(filteredPeople));
   }
   else{
  mainMenu(person, people);
}
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let weightArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });

  return weightArray;
}

function searchByHeight(people){
  let userInputheight = prompt("How height is the person in inches?");

  let heightArray = people.filter(function (el) {
    if(el.height == userInputheight) {
      return true;
    }
  });

  return heightArray;
}

function searchByGender(people){
  let userInputGender = prompt("What is the person's gender?");

  let genderArray = people.filter(function (el) {
    if(el.gender == userInputGender.toLowerCase()) {
      return true;
    }
  });

  return genderArray;
}



function searchByOccupation(people){
  let userInputOccupation = prompt("What is this person's occupation?");

  let occupationArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation.toLowerCase()) {
      return true;
    }
  });

  return occupationArray;
}


function searchByEyeColor(people){
  let userInputEyeColor = prompt("What color eyes does the person have?");

  let eyeColorArray = people.filter(function (el){
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
  });

  return eyeColorArray;
}


function searchByAge(people)   {
  let userInputAge = prompt("How old is the person?");
  let ageArray = people.filter(function (el){
    let age = getAge(el);
      if(userInputAge == age){
        return true;
      }
  });
  return ageArray;
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

  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  

  switch(displayOption){
    case "info":
    let personInfo = displayPerson(person);
    console.log(personInfo);
    break;
    case "family":
    let family = findParents(person, people).concat(findSpouse(person, people).concat(findSiblings(person, people).concat(findKids(person, people))));
    displayPeople(family);
    break;
    case "descendants":
    let descendants = findAllDescendants(person, people);
    displayPeople(descendants);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

function findSpouse(foundPerson, people){
  let spouse = people.filter(function(person){
    if (person.currentSpouse === foundPerson.id){
      return true;
    }
  });
  return spouse;
}

function findParents(foundPerson, people){
  let parents = people.filter(function(person){
    for (let i = 0; i < foundPerson.parents.length; i ++){
    if (foundPerson.parents[0] == person.id || foundPerson.parents[1] == person.id){
      return true;
    }
  }
  });
  return parents;
}

function findSiblings(foundPerson, people){
  let siblings = people.filter(function(person){
    for (let i = 0; i < foundPerson.parents.length; i ++){
      if (person.parents[i] === foundPerson.parents[i] && person.id != foundPerson.id){
        return true;
      }
    }
  });
  return siblings;
}

function searchByName(people){
  let userInputFirstName = promptFor("What is the person's first name?", chars);
  let userInputLastName = promptFor("What is the person's last name?", chars);
  let nameArray = people.filter(function (el) {
    if(el.firstName.toLowerCase() === userInputFirstName.toLowerCase()) {
      if(el.lastName.toLowerCase() === userInputLastName.toLowerCase()) {


        return true;
      
      }
    }
  });

  return nameArray[0];
}

function findKids(foundPerson, people){
  let kids = people.filter(function(person) {
    for (let i = 0; i < person.parents.length; i++){
      if (person.parents[i] == foundPerson.id){
        return true;
      }
    }
  });
  return kids;
}

function findAllDescendants(foundPerson, people){
  let children = people.filter(function(person) {
    for (let i = 0; i < person.parents.length; i++){
      if (person.parents[i] == foundPerson.id){
        return true;
      }
    }
  });
}


function findAllDescendants(foundPerson, people){
  let children = people.filter(function(person) {
    for (let i = 0; i < person.parents.length; i++){
      if (person.parents[i] == foundPerson.id){
        return true;
      }
    }
  });
  for (let i = 0; i < children.length; i++){
    children = children.concat(findAllDescendants(children[i], people));
  }
  return children;
}

function displayPeople(people){
  let peopleInfo="";
  for(let i = 0; i<people.length; i++){
  peopleInfo += "First Name: " + people[i].firstName + "\n";
  peopleInfo += "Last Name: " + people[i].lastName + "\n";
  peopleInfo += "Gender: " + people[i].gender + "\n";
  peopleInfo += "Age: " + people[i].dob + "\n";
  peopleInfo += "height: " + people[i].height + "\n";
  peopleInfo += "Weight: " + people[i].weight + "\n";
  peopleInfo += "Eye Color: " + people[i].eyeColor + "\n";
  peopleInfo += "Occupation: " + people[i].occupation + "\n";
  peopleInfo += "Parents: " + people[i].parents + "\n";
  peopleInfo += "Spouse: " + people[i].currentSpouse + "\n\n";
  }
  console.log(peopleInfo);
}

function displayPerson(person){
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
<<<<<<< HEAD
  console.log(personInfo);

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}
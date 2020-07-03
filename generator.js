const inquirer = require("inquirer");
const fs = require("fs");

/* Title
Description
Table of Contents
Installation
Usage
License
Contributing
Tests
Questions */
getUserInput();
function getUserInput(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter your github username:",
            name:"github"
          },
          {
            type: "input",
            message: "Enter your email id:",
            name:"email"
          },
        {
          type: "input",
          message: "Enter the title of you project:",
          name:"title"
        },
        {
            type: "input",
            message: "Please describe your project:",
            name:"description"
          },
          {
            type: "input",
            message: "Please provide instructions for installing the project:",
            name:"installation"
          },
          {
            type: "input",
            message: "Please provide usage information:",
            name:"usage"
          },
          
        {
          type: "checkbox",
          message: "Choose from below the list of license you like to include to your project",
          name:"license",
          choices: [
            "Copyright",
            "Unlicense",
            "MIT",
            "Public Domain Dedication and License (PDDL)",
          ]
        }
      ]).then(function(answers) {
        console.log(answers);
      });
}
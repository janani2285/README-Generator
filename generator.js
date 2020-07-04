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
//console.log(renderContent(ans));
//writeToFile();

 async function getUserInput(){
    const answers = await inquirer.prompt([
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
          type: "list",
          message: "Choose from below the list of license you like to include to your project",
          name:"license",
          choices: [
            "Copyright",
            "Unlicense",
            "MIT",
            "Public Domain Dedication and License (PDDL)",
          ]
        }
      ]);
      
        console.log(renderContent(answers));
    
}

function renderContent(answer){
   // const answer = getUserInput();
    return `# ${answer.title}

    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    
    Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
   
    ## Description 
    
   ${answer.description}
    
    
    ## Table of Contents 
    
   
    
    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    * [Questions](#questions)
    
    ## Installation
    
   ${answer.installation}
    
    
    ## Usage 
    
   ${answer.usage}
    
     
    ## License
    
    The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)
    
    
    
    
    ## Questions
    
    Visit https://github.com/${answer.github} (github repo) for the code

    Reach me @ ${answer.email} for further questions
    
    `
}
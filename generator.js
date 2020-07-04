const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

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

async function getUserInput() {
    try {


        const answers = await inquirer.prompt([
            {
                type: "input",
                message: "Enter your github username:",
                name: "github"
            },
            {
                type: "input",
                message: "Enter your email id:",
                name: "email"
            },
            {
                type: "input",
                message: "Enter the title of you project:",
                name: "title"
            },
            {
                type: "input",
                message: "Please describe your project:",
                name: "description"
            },
            {
                type: "input",
                message: "Please provide instructions for installing the project:",
                name: "installation"
            },
            {
                type: "input",
                message: "Please provide usage information:",
                name: "usage"
            },

            {
                type: "list",
                message: "Choose from below the list of license you like to include to your project",
                name: "license",
                choices: [
                    "Copyright",
                    "Unlicense",
                    "MIT",
                    "PDDL",
                    "ISC"
                ]
            }
        ]);

        const content = renderContent(answers);
        await writeFileAsync("readme/README.md", content);

        console.log("readMe.md successfully generated!!!");

    } catch (err) {

        console.log("Error occured:" + err);
    }

}

function renderContent(answer) {
    // const answer = getUserInput();
    return `# ${answer.title.toUpperCase().trim()}

## Badges 
[![License: ${answer.license}](https://img.shields.io/badge/License-${answer.license}-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Description

${answer.description.trim()}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Questions](#questions)

## Installation

${answer.installation.trim()}

## Usage

${answer.usage.trim()}

## License
    
The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)
    
    
## Questions
    
Visit https://github.com/${answer.github.trim()} (github repo) for the code.<br>
Reach me @ ${answer.email.trim()} for further questions
`
}
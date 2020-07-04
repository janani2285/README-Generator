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

    const contentMIT = `MIT License

Copyright (c) [${new Date().getFullYear()}] ${answer.github}
    
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
    
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
    
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

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

${(answer.license === "MIT") ? contentMIT : "none"}
    
    
## Questions
    
Visit https://github.com/${answer.github.trim()} (github repo) for the code.<br>
Reach me @ ${answer.email.trim()} for further questions
`
}
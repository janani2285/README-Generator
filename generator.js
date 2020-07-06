//packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

getUserInput();

//function to get user input through command line interface
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
                type: "editor",
                message: "Please describe your project (once done, press esc, type :wq):",
                name: "description"
            },
            {
                type: "editor",
                message: "Please provide instructions for installing the project (once done, press esc, type :wq):",
                name: "installation"
            },
            {
                type: "editor",
                message: "Please provide usage information (once done, press esc, type :wq):",
                name: "usage"
            },
            {
                type: "editor",
                message: "Please provide guidelines for contribution (once done, press esc, type :wq):",
                name: "contribution"
            },
            {
                type: "editor",
                message: "Please enter some test cases for your application (once done, press esc, type :wq):",
                name: "test"
            },
            {
                type: "list",
                message: "Choose from below the list of license you like to include to your project",
                name: "license",
                choices: [
                    "Apache2.0",
                    "MIT",
                    "GNU",
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
function renderUrl(license) {
    let url = "";

    switch(license){
        case "MIT":{
            url = "https://opensource.org/licenses/MIT";
            break;
        }
        case "ISC":{
            url = "https://opensource.org/licenses/ISC";
            break;
        }
        case "Apache2.0":{
            url = "https://opensource.org/licenses/Apache-2.0";
            break;
        }
        case "GNU":{
            url = "https://www.gnu.org/licenses/gpl-3.0";
            break;
        }
    }
    return url;

}
//function to render the content of the markdown file depending on user input
function renderContent(answer) {
   
    const url = renderUrl(answer.license);

    const noticeMIT = `MIT License

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

    const noticeISC = `ISC License

Copyright (c) [${new Date().getFullYear()}], ${answer.github}

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`;

    const noticeApache = `Apache License
Version 2.0, January 2004

Copyright [${new Date().getFullYear()}] [${answer.github}]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;

    const noticeGNU = `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

Copyright (C) <${new Date().getFullYear()}> <${answer.github}>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`;



    return `# ${answer.title.toUpperCase().trim()}

## Badges 
[![License: ${answer.license}](https://img.shields.io/badge/License-${answer.license}-brightgreen.svg)](${url})

## Table of Contents

${(answer.description != ``) ? `* [Description](#description)` : ""}
${(answer.installation != ``) ? `* [Installation](#installation)` : ""}
${(answer.usage != ``) ? `* [Usage](#usage)` : ""}
${(answer.contribution != ``) ? `* [Contribution](#contribution)` : ""}
${(answer.test != ``) ? `* [Test](#test)` : ""}
* [License](#license)
* [Questions](#questions)



${(answer.description != ``) ? `## Description` : ""}
${(answer.description != ``) ? answer.description.trim() : ""}

${(answer.installation != ``) ? `## Installation` : ""}
${(answer.installation != ``) ? answer.installation.trim() : ""}

${(answer.usage != ``) ? `## Usage` : ""}
${(answer.usage != ``) ? answer.usage.trim() : ""}

${(answer.contribution != ``) ? `## Contribution` : ""}
${(answer.contribution != ``) ? answer.contribution.trim() : ""}

${(answer.test != ``) ? `## Test` : ""}
${(answer.test != ``) ? answer.test.trim() : ""}

## License

${(answer.license === "MIT") ? noticeMIT : (answer.license === "ISC") ? noticeISC : (answer.license === "Apache2.0") ? noticeApache : (answer.license === "GNU") ? noticeGNU : "None"}
    
    
## Questions
    
Visit https://github.com/${answer.github.trim()} (github repo) for the code.<br>
Reach me @ ${answer.email.trim()} for further questions.
`
}
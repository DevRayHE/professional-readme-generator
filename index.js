const inquirer = require('inquirer');
const fs = require('fs');
const today = new Date();
const year = today.getFullYear();

let featureData = [];
let generalData = [];

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Your full name:',
      name: 'developer',
    },
    {
      type: 'input',
      message: 'Project title:',
      name: 'projectTitle',
    },
    {
      type: 'input',
      message: 'Project description:',
      name: 'projectDescription',
    },
    {
      type: 'checkbox',
      message: 'What languages was used?',
      name: 'languageUsed',
      choices: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    },
    {
      type: 'input',
      message: 'Github repo URL:',
      name: 'repoUrl',
    },
  ])
  .then((data) => {
    // const {developer,projectTitle, projectDescription,repoUrl} = data;
    generalData = data;
    console.log(data);
    ask();

  })
  .catch((error) => {
    if (error.isTtyerror) {
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log('Error occured!' + error);
    }
  });

const questions = [
  {
    type: 'input',
    name: 'feature',
    message: "Project feature",
  },
  {
    type: 'confirm',
    name: 'moreFeature',
    message: 'Want to enter another project feature (just hit enter for YES)?',
    default: true,
  },
];

const ask = () => {
  inquirer.prompt(questions)
    .then((answers) => {
      featureData.push(answers.feature);
      if (answers.moreFeature) {
        ask();
      } else {
        console.log(typeof(featureData));
        console.log('Your project features:', featureData.join(', '));

        const {developer,projectTitle, projectDescription, languageUsed, repoUrl} = generalData

        const toWriteProjectTitle = 
`# 💻Project Title

## ${projectTitle}
<br/>

`
        const toWriteDescription = 
`## 📖Description

### ${projectDescription}, langugaes used ${languageUsed}.

<br/>

`

        const toWriteTOC = 
`## Table of Contents

- [Features](#🎇features)
- [Usage](#🖼️usage)
- [Installation](#📓installation)
- [Contribute](#🏗️contribute)
- [Credits](#🏆credits)
- [License](#📝license)

<br/>

`

        // Generate feature section content
        let toWriteFeatures = 
`## 🎇Features

`
        for (const feature of featureData) toWriteFeatures += '* ' + feature + '\n';

        toWriteFeatures += 
`<br/>

`

        const toWriteUsage = 
`## 🖼️Usage

<br/>

`

        const toWriteInstallation = 
`## 📓Installation

[Repo url](${repoUrl})

<br/>

### Follow the steps below to install:

1. Clone the github to your local storage.

2. Start up your favourite terminal, follow this guide here if you're not sure how to:
[A Quick Guide to Using Command Line - Terminal](https://towardsdatascience.com/a-quick-guide-to-using-command-line-terminal-96815b97b955).

3. Navigate to the repository local folder.

4. Run npm i

5. Run node index.js

6. Simply follow the prompt.

7. A professional readme is now generated for your project!

<br/>

`

        const toWriteCC =
`## 🏗️Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md)

<br/>

## 🏆Credits

<br/>

`

        const toWriteLicense = 
`## 📝License

### MIT License

Copyright (c) [${year}] [${developer}]

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
SOFTWARE.
`

        const dataToWrite = toWriteProjectTitle 
          + toWriteDescription
          + toWriteTOC
          + toWriteFeatures
          + toWriteUsage
          + toWriteInstallation
          + toWriteCC
          + toWriteLicense

        fs.writeFile('README.md', dataToWrite, (error) =>
          error ? console.error(error) : console.log(`Professional Readme file - 'README.md' successfully generated!!`)
        );
        }
    });
}

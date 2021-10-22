const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
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
      name: 'stack',
      choices: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    },
    {
      type: 'input',
      message: 'Github repo URL:',
      name: 'repoUrl',
    },
  ])
  .then((data) => {
    const {projectTitle, projectDescription,repoUrl} = data;

    console.log(data);

    const dataToWrite = 
    `# 💻 Project Title

## ${projectTitle}

## 📖 Description

### ${projectDescription}

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Contribue](#contribute)
- [Credits](#credits)
- [License](#license)

## 🎇 
## Features

## 🖼️
## Usage with function video

## 📓
## Installation

[Repo url](${repoUrl})

### Follow the steps below to install:

1. Clone the github to your local storage.

2. Start up your favourite terminal, follow this guide here if you're not sure how to:
[A Quick Guide to Using Command Line - Terminal](https://towardsdatascience.com/a-quick-guide-to-using-command-line-terminal-96815b97b955).

3. Navigate to the repository local folder.

4. Run npm i

5. Run node index.js

6. Simply follow the prompt.

7. A professional readme is now generated for your project!

## 🏗️
## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md)

## 🏆
## Credits


## 📝
## License
The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).
`

    fs.writeFile('README.md', dataToWrite, (error) =>
      error ? console.error(error) : console.log(`Professional Readme file - 'README.md' successfully generated!!`)
    );
  })
  .catch((error) => {
    if (error.isTtyerror) {
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log('Error occured!' + error);
    }
  });


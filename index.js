const inquirer = require('inquirer');
const fs = require('fs');
const today = new Date();
const year = today.getFullYear();

let generalData = [];
let featureData = [];
let creditData = [];

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
      choices: ['Markdown','HTML', 'CSS', 'JavaScript', 'Node.js', 'React'],
    },
    {
      type: 'input',
      message: 'Github repo URL:',
      name: 'repoUrl',
    },
    {
      type: 'list',
      message: 'Choose a license:',
      name: 'license',
      choices: ['BSD 2-Clause License', 'MIT License', 'The Unlicense'],

    },
  ])
  .then((data) => {
    generalData = data;
    console.log(data);
    // start another inquirer prompt by calling askFeature funciton when promised is full-filled on general data inquirer prompt
    askFeature();

  })
  .catch((error) => {
    if (error.isTtyerror) {
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log('Error occured!' + error);
    }
  });

const featureQuestions = [
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

const creditQuestions = [
  {
    type: 'input',
    name: 'creditDesc',
    message: "Credit description:",
  },
  {
    type: 'input',
    name: 'creditLink',
    message: "Credit hyperlink:",
  },
  {
    type: 'confirm',
    name: 'moreCredits',
    message: 'Want to enter another credit (just hit enter for YES)?',
    default: true,
  },
];

const askFeature = () => {
  inquirer.prompt(featureQuestions)
    .then((answers) => {
      featureData.push(answers.feature);
      if (answers.moreFeature) {
        askFeature();
      } else {
        console.log('Your project features:', featureData.join(', '));
        // start another inquirer prompt by calling askFeature funciton when promised is full-filled on feature data inquirer prompt
        askCredit();
      }
    });
}

const askCredit = () => {
  inquirer.prompt(creditQuestions)
    .then((answers) => {
      creditData.push(answers);
      // creditData.push(answers.credit);
      if (answers.moreCredits) {
        askCredit();
      } else {
        console.log('Credits:', creditData.join(', '));

        const {developer, projectTitle, projectDescription, languageUsed, repoUrl, license} = generalData;

        const languageData = [];

        if (languageUsed.includes('Markdown')) {
          languageData.push('![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)');
        }
        if (languageUsed.includes('HTML')) {
          languageData.push('![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)');
        }
        if (languageUsed.includes('CSS')) {
          languageData.push('![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)');
        }
        if (languageUsed.includes('Javascript')) {
          languageData.push('![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)');
        }
        if (languageUsed.includes('Node.js')) {
          languageData.push('![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)');
        }
        if (languageUsed.includes('React')) {
          languageData.push('![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)');
        }

        let languageDisplay = '';

        for (const language of languageData) {
          languageDisplay += (language + '\n\n');
        }

        const toWriteProjectTitle = 
`<br/>

# 💻Project Title

## ${projectTitle}
<br/>

`

        const toWriteDescription = 
`## 📖Description

### ${projectDescription}

### Langugaes used: 
${languageDisplay}

<br/>

`

        const toWriteTOC = 
`## Table of Contents

- [Features](#features🎇)
- [Usage](#usage🖼️)
- [Installation](#installation📓)
- [Contribute](#contribute🏗️)
- [Credits](#credits🏆)
- [License](#license📝)

<br/>

`

        // Generate feature section content
        let toWriteFeatures = 
`## Features🎇

`
        // Separate features from the Array and display on separate lines
        for (const feature of featureData) toWriteFeatures += '* ' + feature + '\n';

        toWriteFeatures += 
`<br/>

`

        const toWriteUsage = 
`## Usage🖼️

### Here is a video to demonstrate 

<br/>

`

        const toWriteInstallation = 
`## Installation📓

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

        const toWriteContribute =
`## Contribute🏗️

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md)

<br/>

`

        let toWriteCredits = 
`## Credits🏆

`
        // Separate credits from the Array and display credit descript and hyperlink on separate lines
        for (const credit of creditData) toWriteCredits +=
`### ${credit.creditDesc}
[Link to this credit: ](${credit.creditLink})

`

        let toWriteLicense = '';
        let licenseDisplay = '';

        // Based on user chosen option, generate License part of the Readme
        switch (license) {
          case 'BSD 2-Clause License':

            licenseDisplay = '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'

            toWriteLicense = `
<br/>

## License📝

### BSD 2-Clause License

Copyright (c) ${year}, ${developer} All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`;

          break;
          case 'MIT License':

            licenseDisplay = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';

            toWriteLicense =`
<br/>

## License📝

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
SOFTWARE.`;

          break;
          case 'The Unlicense':

            licenseDisplay = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';

            toWriteLicense = `
<br/>

## License📝

### The Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to https://unlicense.org`
          break;
        }

        const dataToWrite = licenseDisplay
          + toWriteProjectTitle 
          + toWriteDescription
          + toWriteTOC
          + toWriteFeatures
          + toWriteUsage
          + toWriteInstallation
          + toWriteContribute
          + toWriteCredits
          + toWriteLicense
          // + toWriteTests
          // + toWriteQuestions

        fs.writeFile('README.md', dataToWrite, (error) =>
          error ? console.error(error) : console.log(`Professional Readme file - 'README.md' successfully generated!!`)
        );
        }
    });
}

//Function to initialize app
function init() {
  // Importing dependencies
  const dedent = require('dedent');
  const inquirer = require('inquirer');
  const fs = require('fs');
  const { inherits } = require('util');
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
        choices: [
          'Markdown',
          'HTML', 
          'CSS', 
          'Javascript', 
          'Node.js', 
          'Express.js', 
          'MySQL', 
          'Sequelize', 
          'React',
          'MongoDB',
          'SASS'
        ],
      },
      {
        type: 'input',
        message: 'The Project Github repo URL:',
        name: 'repoUrl',
      },
      {
        type: 'input',
        message: 'The Project usage video/image link:',
        name: 'mediaLink',
      },
      {
        type: 'input',
        message: 'Your Github username:',
        name: 'gitUsername',
      },
      {
        type: 'input',
        message: 'Your professional email address:',
        name: 'email',
      },
      {
        type: 'editor',
        message: 'Installation instructions:',
        name: 'install',
      },
      {
        type: 'editor',
        message: 'Test instructions:',
        name: 'test',
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

  // Function to get feature input
  const askFeature = () => {
    inquirer.prompt(featureQuestions)
      .then((answers) => {
        featureData.push(answers.feature);
        if (answers.moreFeature) {
          askFeature();
        } else {
          // start another inquirer prompt by calling askFeature funciton when promised is full-filled on feature data inquirer prompt
          askCredit();
        }
      });
  }

  // Function to get credit input
  const askCredit = () => {
    inquirer.prompt(creditQuestions)
      .then((answers) => {
        creditData.push(answers);
        // creditData.push(answers.credit);
        if (answers.moreCredits) {
          askCredit();
        } else {
          // Destructure variable from object to be used below.
          const {developer, 
            projectTitle, 
            projectDescription, 
            languageUsed, 
            repoUrl,
            mediaLink,
            gitUsername,
            email,
            install,
            test,
            license} = generalData;

          const languageData = [];

          // Generate languages icon based on user selection
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
          if (languageUsed.includes('Express.js')) {
            languageData.push('![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)');
          }
          if (languageUsed.includes('MySQL')) {
            languageData.push('![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)');
          }
          if (languageUsed.includes('Sequelize')) {
            languageData.push('![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)');
          }
          if (languageUsed.includes('MongoDB')) {
            languageData.push('![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)');
          }
          if (languageUsed.includes('Node.js')) {
            languageData.push('![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)');
          }

          let languageDisplay = '';

          for (const language of languageData) {
            languageDisplay += (language + '\n\n');
          }

          // Using dedent here to strip indentation from template literal, so that can keep the code neat and tidy with proper indentation.
          const toWriteProjectTitle = dedent(`

          # Project Title
          
          ## ${projectTitle}

          `);


          const toWriteDescription = dedent(`
          ## 📖Description

          ### ${projectDescription}
          
          ### Langugaes used: 
          ${languageDisplay}
          `);

          const toWriteTOC = dedent(`\n
          ## Table of Contents

          - [Features](#features)
          - [Installation](#installation)
          - [Usage](#usage)
          - [Contribute](#contribute)
          - [Credits](#credits)
          - [Tests](#tests)
          - [License](#license)
          - [Questions](#questions)
          
          `);


          // Generate feature section content
          let toWriteFeatures = '## Features \n';

          // Separate features from the Array and display on separate lines
          for (const feature of featureData) toWriteFeatures += '* ' + feature + '\n';

          toWriteFeatures += '<br/>';

          const toWriteUsage = dedent(`## Usage

          ### Here is a video to demonstrate 
          
          ![Usage sample video.](${mediaLink})

          `);

          const toWriteInstallation = dedent(`## Installation

          [Link to this repo url](${repoUrl})
          
          ### Follow the steps below to install:
          
          `)
          + install;

          const toWriteContribute = dedent(`## Contribute

          When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

          Please note we have a code of conduct, please follow it in all your interactions with the project.

          [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md)
          
          `);


          let toWriteCredits = '## Credits \n'

          // Separate credits from the Array and display credit descript and hyperlink on separate lines
          for (const credit of creditData) toWriteCredits += dedent(`### ${credit.creditDesc}
          [Link to this credit: ](${credit.creditLink})
          
          `);


          let toWriteLicense = '';
          let licenseDisplay = '';

          // Based on user chosen option, generate License part of the Readme
          switch (license) {
            case 'BSD 2-Clause License':

              licenseDisplay = '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause) \n'

              toWriteLicense = dedent(`
              
              ### BSD 2-Clause License
              
              Copyright (c) ${year}, ${developer} All rights reserved.
              
              Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
              
              Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
              
              Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
              
              THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`);

            break;
            case 'MIT License':

              licenseDisplay = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) \n';

              toWriteLicense = dedent(`
              
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
              SOFTWARE.`);

            break;
            case 'The Unlicense':

              licenseDisplay = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/) \n';

              toWriteLicense = dedent(`
              
              ### The Unlicense
              
              This is free and unencumbered software released into the public domain.
              
              Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.
              
              In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.
              
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              
              For more information, please refer to https://unlicense.org`);
            break;
          }

          const toWriteTests = dedent(`## Tests

          
          `) + '\n' + test; 

          const toWriteQuestions = dedent(`
          ## Questions
          
          For any further questions or comments, feel free to contact me!
          
          [Link to my github profile](https://github.com/${gitUsername}/)
          
          [Drop me an email here](mailto:${email})
          
          `);

          const backTotop = dedent(`
          
          [Back to the top](#project-title)
          
          `);

          const lineBreak = '\n\n --- \n\n';

          const dataToWrite = licenseDisplay
            + toWriteProjectTitle 
            + lineBreak
            + toWriteDescription
            + lineBreak
            + toWriteTOC
            + lineBreak
            + toWriteFeatures
            + lineBreak
            + toWriteUsage
            + lineBreak
            + toWriteInstallation
            + lineBreak
            + toWriteContribute
            + lineBreak
            + toWriteCredits
            + lineBreak
            + licenseDisplay
            + toWriteLicense
            + lineBreak
            + toWriteTests
            + lineBreak
            + toWriteQuestions
            + lineBreak
            + backTotop

          fs.writeFile(`${projectTitle}.md`, dataToWrite, (error) =>
            error ? console.error(error) : console.log(`Professional Readme file - ${projectTitle}.md successfully generated!!`)
          );
          }
      });
  }

}

// Function call to initialize app
init();
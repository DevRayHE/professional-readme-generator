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
    const {projectTitle, repoUrl} = data;

    console.log(data);

    const dataToWrite = 
    `# 💻 Project Title

    ## ${projectTitle}

    ## 📖 Description

    ## Table of Contents (Optional)

    - [Installation](#installation)
    - [Usage](#usage)
    - [Credits](#credits)
    - [License](#license)

    ## 📓 Installation

    The link to the repo url:

    [Repo url](${repoUrl})

    ## 🖼️ Usage with function video

    ## 🏆 Credits


    ## License
    The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).
    ---
    🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

    ## Badges

    ## 🎇 Features

    ## 🏗️ How to Contribute

    If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant]
    [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

    ## Tests
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


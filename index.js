const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./src/Employee');
const Engineer = require('./src/Engineer');
const Intern = require('./src/Intern');
const Manager = require('./src/Manager');
const { exit } = require('process');
var employeeData = new Array();
let questions = [{
    type: 'input',
    message: 'Enter name',
    name: 'name'
},
{
    type: 'input',
    message: 'Enter employee id',
    name: 'id'
},
{
    type: 'input',
    message: 'Enter email',
    name: 'email'
}];
function employeePrompt(role,callback){
    inquirer
    .prompt(questions).then((data)=>{
        let employee = new Employee(data.name, data.id, data.email)
        employeeData.push(employee) 
        console.log('Employee info entered successfully!')
        callback()
    })
}
function internPrompt(role,callback){
    const iQuestions = [{
    type: 'input',
    message: 'Enter your school name',
    name: 'school'
    }]
    const internQuestions = questions.concat(iQuestions)
    inquirer 
    .prompt(internQuestions).then((data)=>{
        let internData = new Intern(data.name, data.id, data.email, data.school)
        employeeData.push(internData)
        console.log('Intern info entered successfully!')
        callback()
    })
}
function engineerPrompt(role,callback){
    const iQuestions = [{
        type: 'input',
        message: 'Enter your Github',
        name : 'github'
    }]
    const engineerQuestions = questions.concat(iQuestions)
    inquirer
    .prompt(engineerQuestions).then((data)=>{
        let engineerData = new Engineer(data.name, data.id, data.email, data.github)
        employeeData.push(engineerData)
        console.log('Engineer info entered successfully!')
        callback()
    })
}
function managerPrompt(role,callback){
    const iQuestions = [{
        type: 'input',
        message: 'Enter office number',
        name : 'office'
    }]
    const managerQuestions = questions.concat(iQuestions)
    inquirer
    .prompt(managerQuestions).then((data)=>{
        let managerData = new Manager(data.name, data.id, data.email, data.office)
        employeeData.push(managerData)
        console.log('Manager info entered successfully!')
        callback()
    })
}
function generateHTML(){
    let employeeList = '' 
    for (let i = 0; i < employeeData.length; i++) {
        employeeList += `<li><p>
            name:${employeeData[i].getName()}
            id:${employeeData[i].getId()}
            email:${employeeData[i].getEmail()}`
            if (employeeData[i].getRole()=='Intern'){
                employeeList += `School:${employeeData[i].getSchool()}`
            } else if (employeeData[i].getRole()=='Engineer'){
                employeeList += `Github:${employeeData[i].getGithub()}`
            } else if (employeeData[i].getRole()=='Manager'){
                employeeList += `Office:${employeeData[i].getOffice()}`
            };
            employeeList += '</p></li>'
      }
    let htmlText =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Employee Info</title>
          <link rel="stylesheet" href="style.css">
          <link rel="icon" href="./favicon.ico" type="image/x-icon">
        </head>
        <header><u>Employee List</u></header>
        <body>
              <ul id="textInput">${employeeList}</ul>
          <script src="index.js"></script>
        </body>
        </html>`;  
        fs.writeFile('index.html', htmlText, (err) =>
        err ? console.error(err) : console.log('Success!'));
    };

function questionInitializer (){
    const questionInIt = [
        {type: 'list',
        message: 'select your company role',
        choices: ['Employee', 'Engineer', 'Intern', 'Manager', 'Exit'],
        default: 'Employee',
        name: 'role',
        }];
        inquirer.prompt(questionInIt).then((initData)=>{ 
            if (initData.role == 'Employee'){
                employeePrompt(initData,questionInitializer);
            } else if (initData.role == 'Engineer'){
                engineerPrompt(initData,questionInitializer);
            } else if (initData.role == 'Intern'){
                internPrompt(initData,questionInitializer);
            } else if (initData.role == 'Manager'){
                managerPrompt(initData,questionInitializer);
            } else if (initData.role == 'Exit'){
                generateHTML(initData);
            } 
        })
    }

questionInitializer();


const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./src/Employee');
const Engineer = require('./src/Engineer');
const Intern = require('./src/Intern');
const Manager = require('./src/Manager');
const data = []
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
function employeePrompt(role){
    inquirer
    .prompt(questions).then((data)=>{
        let employeeData = new Employee(data.name, data.id, data.email)
        data.push = employeeData
        console.log('Employee info entered successfully!')
    })
}
function internPrompt(role){
    const iQuestions = [{
    type: 'input',
    message: 'Enter your school name',
    name: 'school'
    }]
    const internQuestions = questions.concat(iQuestions)
    inquirer 
    .prompt(internQuestions).then((data)=>{
        let internData = new Intern(data.name, data.id, data.email, data.school)
        data.push = internData
        console.log('Intern info entered successfully!')
    })
}
function engineerPrompt(role){
    const iQuestions = [{
        type: 'input',
        message: 'Enter your Github',
        name : 'github'
    }]
    const engineerQuestions = questions.concat(iQuestions)
    inquirer
    .prompt(engineerQuestions).then((data)=>{
        let engineerData = new Engineer(data.name, data.id, data.email, data.github)
        data.push = engineerData
        console.log('Engineer info entered successfully!')
    })
}
function managerPrompt(role){
    const iQuestions = [{
        type: 'input',
        message: 'Enter office number',
        name : 'office'
    }]
    const managerQuestions = questions.concat(iQuestions)
    inquirer
    .prompt(managerQuestions).then((data)=>{
        let managerData = new manager(data.name, data.id, data.email, data.office)
        data.push = managerData
        console.log('Manager info entered successfully!')
    })
}
function generateHTML(){
    let employeeList = '' 
    for (let i = 0; i < data.length; i++) {
        employeeList += `<li><p>
            name:${data[i].getName()}
            id:${data[i].getId()}
            email:${data[i].getEmail()}`
            if (data[i].getRole()=='Intern'){
                employeeList += `School:${data[i].getSchool()}`
            } else if (data[i].getRole()=='Engineer'){
                employeeList += `Github:${data[i].getGithub()}`
            } else if (data[i].getRole()=='Manager'){
                employeeList += `Office:${data[i].getOffice()}`
            };
            employeeList += '</p></li>'
      };
    document.getElementById('textInput').innerHTML
}

function questionInitializer (){
    const questionInIt = [
        {type: 'list',
        message: 'select your company role',
        choices: ['Employee', 'Engineer', 'Intern', 'Manager', 'Exit'],
        default: 'Employee',
        name: 'role',
        }];
    inquirer.prompt(questionInIt).then((initData)=>{
            data.push(initData);
            if (initData.role == 'Employee'){
                employeePrompt(initData);
            } else if (initData.role == 'Engineer'){
                engineerPrompt(initData);
            } else if (initData.role == 'Intern'){
                internPrompt(initData);
            } else if (initData.role == 'Manager'){
                managerPrompt(initData);
            } else if (initData.role == 'Exit'){
                generateHTML(initData);
            }
    })
}

questionInitializer();


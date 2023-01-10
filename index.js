const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./class-lib/Employee');
const Engineer = require('./class-lib/Engineer');
const Intern = require('./class-lib/Intern');
const Manager = require('./class-lib/Manager');
const createHTML = require('./src/htmlLayout');
const data = []
function questionInitializer (){
const questionInIt = [
    {type: 'list',
    message: 'select your company role',
    choices: ['employee', 'engineer', 'intern', 'manager'],
    default: 'employee',
    name: 'role',
    }];
    inquirer 
    .prompt(questionInIt).then((initData)=>{
        data.push(initData);
        if (initData.role = 'employee'){
            employeePrompt(initData);
        } else if (initData.role = 'Engineer'){
            engineerPrompt(initData);
        } else if (initData.role = 'Intern'){
            internPrompt(initData);
        } else if (initData.role = 'Manager')
            managerPrompt(initData);
})
}
questionInitializer();
const questions = [{
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
    .prompt(quesions).then((date)=>{

    })
}
function internPrompt(role){
    const iQuestions = [{
    type: 'input',
    message: 'Enter your school name',
    name: 'school'
    }]
    const internQuestions = concat(questions,iQuestions)
    inquirer
    .prompt(internQuestions).then((data)=>{

    })
}
function engineerPrompt(role){
    const iQuestions = [{
        type: 'input',
        message: 'Enter your Github',
        name : 'github'
    }]
    concat(questions,iQuestions)
    inquirer
    .prompt(engineerQuestions).then((data)=>{

    })
}
function managerPrompt(role){
    const iQuestions = [{
        type: 'input',
        message: 'Enter office number',
        name : 'office'
    }]
    concat(questions,iQuestions)
    inquirer
    .prompt(managerQuestions).then((data)=>{

    })
}



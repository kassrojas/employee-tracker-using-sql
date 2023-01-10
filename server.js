const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection(
    {
        user: 'root',
        database: 'employee_db',
    },
    console.log('connected to  employee_db')
);

const chooseOption = (type) => {

    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employees) => {
                if (err) {
                    console.error(error.message);
                }
                console.table(employees);
                init();
            });
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, deparments) => {
                if (err) {
                    console.error(error.message);
                }
                console.table(deparments);
                init();
            });
            break;
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, roles) => {
                if (err) {
                    console.error(error.message);
                }
                console.table(roles);
                init();
            });
            break;
        }
    }
}

const init = () => {

    prompt({
        type: 'rawlist',
        message: 'Choose one of the following',
        choices: [
            'VIEW ALL EMPLOYEES',
            'VIEW ALL DEPARTMENTS',
            'VIEW ALL ROLES',
            'ADD A DEPARTMENT',
            'ADD A ROLE',
            'ADD AN EMPLOYEE',
            'UPDATE AN EXISTING EMPLOYEE',
        ],
        name: 'type',
    })
        .then((answers) => {
            chooseOption(answers.type);
        });
};

init();
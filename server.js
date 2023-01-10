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
        case 'VIEW All Departments': {
            db.query('SELECT * FROM department', (err, deparments) => {
                if (err) {
                    console.error(err);
                }
                console.table(deparments);
                init();
            });
            break;
        }
        case 'VIEW All Roles': {
            db.query('SELECT * FROM role', (err, roles) => {
                if (err) {
                    console.error(err);
                }
                console.table(roles);
                init();
            });
            break;
        }
        case 'VIEW All Employees': {
            db.query('SELECT * FROM employee', (err, employees) => {
                if (err) {
                    console.error(err);
                }
                console.table(employees);
                init();
            });
            break;
        }
        case 'ADD A Department': {
                addDept();
                init();
                break;
        };
        case 'ADD A Role': {
                addRole();
                init();
                break;
        };
        case 'ADD An Employee': {
                addEmployee();
                init();
                break;
        };
        case 'UPDATE An existing Employee': {
                updateEmployee();
                init();
                break;
        };
        }
    }

const init = () => {

    prompt({
        type: 'rawlist',
        message: 'Choose one of the following',
        choices: [
            'VIEW All Departments',
            'VIEW All Roles',
            'VIEW All Employees',
            'ADD A Department',
            'ADD A Role',
            'ADD An Employee',
            'UPDATE An existing Employee',
        ],
        name: 'type',
    })
        .then((answers) => {
            chooseOption(answers.type);
        });
};

init();
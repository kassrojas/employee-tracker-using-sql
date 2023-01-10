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

// db.connection();
const selectAll = (table) => {
    db.query('SELECT * FROM department', (err, deparments) => {
        if (err) {
            console.error(err);
        }
        console.table(deparments);
        init();
    });
};

const insert = (table, data) => {
    db.query('INSERT INTO ?? SET ?',[ table, data ], (err) => {
        if (!err) console.log('\nSuccessfully created employee!');
    });
    init();
};

addEmployee = () => {
    const roles = selectAll('role');
    prompt([
        {
            name: 'first_name',
            message: 'Enter the employee\'s FIRST name.',
        },
        {
            name: 'last_name',
            message: 'Enter the employee\'s LAST name.',
        }

    ])
    .then ((answers) => {
        insert('employee', answers);
    })

};

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


// db.end();
// Closing the connection using end() makes sure all remaining queries are executed before sending a quit packet to the mysql server.

init();
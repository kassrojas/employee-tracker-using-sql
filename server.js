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

// () displays full selected table
const selectAll = async (table, showTable) => {
    const results = await db.promise().query('SELECT * FROM ' + table); 
    if (showTable){
        console.table(results[0]);
        return init();
    }
    return results;
};

const insert = (table, data) => {
    db.query('INSERT INTO ?? SET ?',[ table, data ], (err) => {
        if (!err) console.log('\nSuccessfully created employee!');
    });
    init();
};

addEmployee = async () => {
    const [ roleData ] = await selectAll('role');
    const roles = roleData.map( role => {
        return {
            name : role.title,
            value : role.id,
        }
    });
    const managers = roleData.map( role => {
        return {
            name : role.title,
            value : role.id,
        }
    });
    prompt([
        {
            name: 'first_name',
            message: 'Enter the employee\'s FIRST name.',
        },
        {
            name: 'last_name',
            message: 'Enter the employee\'s LAST name.',
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'Choose a role for this employee',
            choices: roles, 
        }

    ])
    .then ((answers) => {
        insert('employee', answers);
    })

};

const chooseOption = (type) => {

    switch (type) {
        case 'VIEW All Departments': {
            selectAll('department', true);
            break;
        }
        case 'VIEW All Roles': {
            selectAll('role', true);
            break;
        }
        case 'VIEW All Employees': {
            selectAll('employee', true);
            break;
        }
        case 'ADD A Department': {
                addDept();
                break;
        };
        case 'ADD A Role': {
                addRole();
                break;
        };
        case 'ADD An Employee': {
                addEmployee();
                break;
        };
        case 'UPDATE An existing Employee': {
                updateEmployee();
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
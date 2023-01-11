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

const insert = (table, data) => {
    db.query(`INSERT INTO ${table} SET ?`, [data], (err) => {
        if (err) return console.error(err);
        console.log('\nSuccessfully created employee!');
        init();
    });
};

const viewAllDepts = () => {
    db.query(`
    SELECT * FROM department
    `), (err, results) => {
        if (err) return console.error(err);
        console.table(results);
        init();
    }
};

const viewAllRoles = () => {
    db.query(`
    SELECT 
        role.title AS job_title, 
        role.id AS role_id, 
        department.name AS dept_name, 
        role.salary AS role_salary
    FROM role 
    LEFT JOIN department 
    ON role.department_id = department.id
    `, (err, results)  => {
        if (err) return console.error(err);
        console.table(results)
        init();
    })
};

const viewAllEmployees = () => {
    db.query(`
    SELECT 
        employee.id,
        employee.first_name,
        employee.last_name, 
        role.title AS job_title, 
        department.name AS dept_name,
        role.salary, 
        CONCAT (manager.first_name, ' ' , manager.last_name) AS manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `, (err, results)  => {
        if (err) return console.error(err);
        console.table(results)
        init();
    })
}



const addEmployee = async () => {
    
    const [roleData] = await selectAll('role');
    const roles = roleData.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    });

    const [employeeData] = await selectAll('employee');
    const managers = employeeData.map(employee => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id
        }
    })

    const newEmployee = await prompt([
        {
            name: 'first_name',
            message: 'Enter the employee\'s FIRST name',
        },
        {
            name: 'last_name',
            message: 'Enter the employee\'s LAST name',
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'Select the role for this employee',
            choices: roles,
        },
        {
            type: 'rawlist',
            name: 'manager_id',
            message: 'Select the manager for this employee',
            choices: managers,
        }

    ]);
    
    insert('employee', newEmployee);
        

};

const chooseOption = (type) => {

    switch (type) {
        case 'VIEW All Departments': {
            viewAllDepts();
            break;
        }
        case 'VIEW All Roles': {
            viewAllRoles();
            break;
        }
        case 'VIEW All Employees': {
            viewAllEmployees();
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
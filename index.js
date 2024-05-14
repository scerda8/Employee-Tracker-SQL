const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const pool = require('./config/connection');



// Start the application after the connection is ready
function initialPrompt() {

    // ASCII ART IS BEING ADDED WITH THE BELOW PACKAGE

    figlet('EMPLOYEE MANAGER', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.magenta(data))

        startApp()
    });
}

initialPrompt();

// Function to prompt the user for what they would like to do

function startApp () {

    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?\n (Use arrow keys)',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit'
        ]
    }).then((answers) => { // Switch case to handle the user selection
        switch (answers.choice) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Exit':
                pool.end();
                break;
        }
        });
    }

// Function to display department-related options
const addDepartment  = async () => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
    }).then(async(answers) => {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
        console.log(chalk.cyan('Added to the database!'));

        startApp();
    });
}

// Function to display role-related options

const addRole = async () => {
    const departments = await pool.query ('SELECT id as value, name as name FROM department')
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to? ',
            choices : departments.rows,
        },
    ]).then(async (answers) => {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) returning * ', [answers.title, answers.salary, answers.department]);
        console.log(chalk.yellow('Added to the database!'));

        startApp();
    });
}

// Function to display employee-related options

const addEmployee = async () => {
    const roles = await pool.query('SELECT id as value, title as name FROM role');
    const managers = await pool.query('SELECT id as value, first_name || \' \' || last_name as name FROM employee');
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee? (Use arrow keys)',
            choices : roles.rows,
            
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the manager of the employee? (Use arrow keys)',
            choices: managers.rows,

        },
    ]).then(async (answers) => {
       await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role, answers.manager]);
        console.log(chalk.green('Added to the database!'));

        startApp();
    });
}



const updateEmployeeRole = async () => {
    const roles = await pool.query('SELECT id as value, title as name FROM role');
    const employess = await pool.query('SELECT id as value, first_name || \' \' || last_name as name FROM employee');
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'What is the name of the employee?',
            choices : employess.rows,
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the new role of the employee? (Use arrow keys)',
            choices : roles.rows,
                
        },
    ]).then(async (answers) => {
      await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role, answers.employee]);
        console.log(chalk.white('Updated the database!'));

        startApp();
    });
}


// Function to display employee-related options

const viewEmployees = async () => {

    const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    const employees = await pool.query(sql);

    console.table(employees.rows);

    startApp();
}

const viewDepartments = async () => {
    const departments = await pool.query('SELECT * FROM department');
    console.table(departments.rows);

    startApp();
}

const viewRoles = async () => {
    const roles = await pool.query('SELECT role.title, role.salary, department.name as department FROM role LEFT JOIN department ON role.department_id = department.id');
    console.table(roles.rows);

    startApp();
}




            
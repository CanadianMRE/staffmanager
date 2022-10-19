const inquirer = require('inquirer');
const mysql = require('mysql2');

// MAKE SURE TO RUN 'db/schema.sql' BEFORE RUNNING SCRIPT

// Initialize the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'MyN3wP4ssw0rd',
      database: 'office_db'
    },
    console.log(`Connected to the office_db database.`)
);

let promptInProgress = false;

// Formats and displays the data we have been given from a table
function displayData(data) {
    console.table(data)
}

// add a department to db
function addDepartment() {
    inquirer
    .prompt([
    {
        type: "input",
        name: "name",
        message: "What is the name of the department?"
    }
    ])
    .then(val => {
        db.query(`INSERT INTO department (name) VALUES (?);`, val.name, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added ${val.name} to department table`);
            }
    
            promptInProgress = false;
        })
    });
}

// Get total budget in use by a department
function getDepartmentBudget() {
    inquirer
    .prompt([
    {
        type: "input",
        name: "id",
        message: "What is the id of the department?"
    }
    ])
    .then(val => {
        db.query(`SELECT SUM(salary) Budget FROM role WHERE department_id = "${val.id}"`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                displayData(result);
            }
    
            promptInProgress = false;
        })
    });
}

// Display all departments in db
function displayDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            displayData(result);
        }

        promptInProgress = false;
    })
}

// Add an employee to db
function addEmployee() {
    inquirer
    .prompt([
    {
        type: "input",
        name: "fname",
        message: "What is the first name of the employee?"
    },
    {
        type: "input",
        name: "lname",
        message: "What is the last name of the employee?"
    },
    {
        type: "input",
        name: "role",
        message: "What is the id of their role?"
    },
    {
        type: "input",
        name: "managerid",
        message: "What is the id of their manager?"
    }
    ])
    .then(val => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${val.fname}", "${val.lname}", ${val.role}, ${val.managerid})`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added ${val.fname} ${val.lname} to employee table`);
            }
    
            promptInProgress = false;
        })
    });
}

// Update employee manager prompt
function updateEmployeeManager() {
    inquirer
    .prompt([
    {
        type: "number",
        name: "id",
        message: "What is the id of the employee you would like to update?"
    },
    {
        type: "input",
        name: "managerid",
        message: "What is the id of the employee's new manager manager?"
    }
    ])
    .then(val => {
        db.query(`UPDATE employee SET manager_id = ${val.managerid} WHERE id = ${val.id}`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Employee with the id ${val.id} has had their manager set to id ${val.managerid}`);
            }
    
            promptInProgress = false;
        })
    });
}

// Update employee role prompt
function updateEmployeeRole() {
    inquirer
    .prompt([
    {
        type: "number",
        name: "id",
        message: "What is the id of the employee you would like to update?"
    },
    {
        type: "input",
        name: "role",
        message: "What is the id of the role you would like to set the employee to?"
    }
    ])
    .then(val => {
        db.query(`UPDATE employee SET role_id = ${val.role} WHERE id = ${val.id}`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Employee with the id ${val.id} has had their role set to id ${val.role}`);
            }
    
            promptInProgress = false;
        })
    });
}

// Open prompt to choose what to edit about employee
function updateEmployee() {
    inquirer
    .prompt([
    {
        type: "list",
        name: "choice",
        message: "What would you like to edit about this employee?",
        choices: [
            "Manager",
            "Role"
        ]
    }
    ])
    .then(val => {
        switch(val.choice) {
            case "Manager":{ 
                updateEmployeeManager()
            }
            case "Role" :{
                updateEmployeeRole()
            }
            default: {
                promptInProgress = false;
            }
        }
    });
}

// Display all employees
function displayEmployees() {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            displayData(result);
        }

        promptInProgress = false;
    })
}

// Display all employees with given manager id
function displayEmployeesByManager() {
    inquirer
    .prompt([
    {
        type: "input",
        name: "choice",
        message: "What manager id would you like to search by?",
    }
    ])
    .then(val => {
        db.query(`SELECT * FROM employee WHERE manager_id = "${val.choice}"`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                displayData(result);
            }

            promptInProgress = false;
        })
    });
}


// Add a role to the database
function addRole() {
    inquirer
    .prompt([
    {
        type: "input",
        name: "name",
        message: "What is the name of this role?"
    },
    {
        type: "number",
        name: "salary",
        message: "What is the salary of this role?"
    },
    {
        type: "number",
        name: "departmentid",
        message: "Which department does this role belong to?"
    }
    ])
    .then(val => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${val.name}", ${val.salary}, ${val.departmentid});`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added ${val.name} to role table`);
            }
    
            promptInProgress = false;
        })
    });
}

// Display all roles
function displayRoles() {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            displayData(result);
        }

        promptInProgress = false;
    })
}

let buildInterval;
buildInterval = setInterval(() => {
    if (!promptInProgress) {
        promptInProgress = true;

        inquirer
        .prompt([
        {
            type: "list",
            name: "choice",
            message: "What action would you like to do?",
            choices: [
                "View all departments",
                "Add a department",
                "View department budget use",
                "View all roles",
                "Add a role",
                "View all employees",
                "View employee by manager",
                "Add an employee",
                "Update an employee",
                "I'm Finished!"
            ]
        }
        ])
        .then(val => {
            switch(val.choice) {
                case "View all departments": {
                    displayDepartments();
                    break;
                }
                case "View all roles": {
                    displayRoles();
                    break;
                }
                case "View department budget use": {
                    getDepartmentBudget();
                    break;
                }
                case "View all employees": {
                    displayEmployees();
                    break;
                }
                case "View employee by manager": {
                    displayEmployeesByManager();
                    break;
                }
                case "Add a department": {
                    addDepartment();
                    break;
                }
                case "Add a role": {
                    addRole();
                    break;
                }
                case "Add an employee": {
                    addEmployee();
                    break;
                }
                case "Update an employee": {
                    updateEmployee();
                    break;
                }
                case "I'm Finished!": {
                    clearInterval(buildInterval);
                    console.log("Goodbye!");
                    db.end();
                    break;
                }
                default: {
                    console.log("You somehow failed to enter a valid option");
                    promptInProgress = true;
                }
            }
        });
    }
}, 1);
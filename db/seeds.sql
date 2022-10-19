INSERT INTO department (name)
VALUES 	("Customer Service"),
	   	("Accounting"),
	   	("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES 	("Ticket Handler", 60000, 1),
	 	("Call Center Handler", 60000, 1),
	   	("Accountant", 70000, 2),
	   	("Filer", 60000, 2),
	   	("CAD Modeler", 80000, 3),
	   	("Electrical Technician", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("John", "Doe", 1, 11),
		("Jaymen", "Laton", 2, 11),
		("Amy", "Wilford", 3, 11),
		("Nathan", "K", 4, 11),
		("Ben", "Liu", 5, 11),
		("Micheal", "Sinn", 6, 11);
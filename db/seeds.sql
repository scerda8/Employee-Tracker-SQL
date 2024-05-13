INSERT INTO department (id,name)
VALUES (1,'Sales'),
       (2,'Engineering'),
       (3,'Finance'),
       (4,'Legal');
SELECT * from department;

INSERT INTO role (id,title,department_id,salary)
VALUES (1,'Sales Lead',1, 100000),
        (2,'Salesperson',1, 80000),
        (3,'Lead Engineer',2, 150000),
        (4, 'Software Engineer',2, 120000),
        (5,'Account Manager',3, 160000),
        (6,'Accountant',3, 125000),
        (7,'Legal Team Lead',4, 250000),
        (8,'Lawyer',4,190000);
        SELECT * from role;


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ('John','Doe',1,NULL),
       ('Mike','Chan',2,1),
       ('Ashley','Rodriguez',3,NULL),
       ('Kevin','Tupik',4,3),
       ('Kunal','Singh',5,NULL),
       ('Malia','Brown',6,5),
       ('Sarah','Lourd',7,NULL),
       ('Tom','Allen',8,7);
       SELECT * from employee;

USE employee_db;

INSERT INTO department (name)
    VALUES 
    ('Nursing'),
    ('Transportation'),
    ('Office Administration');


INSERT INTO role ( title, salary, department_id )
    VALUES
    ('Nurse Practitioner', 100000, 1),
    ('Flight Nurse', 75000, 1),
    ('CNA', 50000, 1),
    ('Air Traffic Controller', 105000, 2),
    ('Dump Truck Driver', 40000, 2),
    ('Helicopter Pilot', 85000, 2),
    ('Accountant', 60000, 3),
    ('Office Assistant', 75000, 3),
    ('Scheduler', 70000, 3);


INSERT INTO employee ( first_name, last_name, role_id, manager_id )
    VALUES
    ('Sam', 'Smith', 1, null),
    ('Tim', 'Turner', 2, 1),
    ('Bob', 'Berry', 3, null),
    ('Mason', 'Moody', 4, 6),
    ('Viotto', 'Gargi', 5, 3),
    ('Mariana', 'Lopez', 6, null),
    ('Emma', 'Severin', 7, 1);
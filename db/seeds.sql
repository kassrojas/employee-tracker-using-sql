USE employee_db;

INSERT INTO department (name)
    VALUES 
    ('Engineering'),
    ('Human Resources');


INSERT INTO role ( title, salary, department_id )
    VALUES
    ('Lead Engineer', 100000, 1),
    ('Junior Engineer', 75000, 2),
    ('HR Advisor', 60000, 1),
    ('HR Chief Executive', 75000, 2);

INSERT INTO employee ( first_name, last_name, role_id, manager_id )
    VALUES
    ('Sam', 'Smith', 1, null),
    ('Tim', 'Turner', 2, 1),
    ('Bob', 'Berry', 3, null),
    ('Mason', 'Moody', 4, 2);
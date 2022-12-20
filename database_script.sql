CREATE TABLE PERSONS (
	ID int NOT NULL,
    LastName varchar(255),
    FirstName varchar(255),
    Age int,
    Occupation varchar(255),
    PRIMARY KEY (ID)
);

INSERT INTO PERSONS VALUES (0, "Milde", "Sven", 99, "Wissenschaftlicher Mitarbeiter");
INSERT INTO PERSONS VALUES (1, "Schroeder", "Nico", 24, "Student");
INSERT INTO PERSONS VALUES (2, "Mustermann", "Max", 21, "Student");
INSERT INTO PERSONS VALUES (3, "Duck", "Donald", 30, "Professor");
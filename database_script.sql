CREATE TABLE PERSONS (
	ID int AUTO_INCREMENT,
    LastName varchar(255),
    FirstName varchar(255),
    Age int,
    Occupation varchar(255),
    PRIMARY KEY (ID)
);

INSERT INTO PERSONS VALUES (1, "Milde", "Sven", 99, "Wissenschaftlicher Mitarbeiter");
INSERT INTO PERSONS VALUES (2, "Schroeder", "Nico", 24, "Student");
INSERT INTO PERSONS VALUES (3, "Mustermann", "Max", 21, "Student");
INSERT INTO PERSONS VALUES (4, "Duck", "Donald", 30, "Professor");
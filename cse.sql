-- Active: 1741335512495@@localhost@3306@cse
use cse;

CREATE TABLE  role(
    ROLE_ID INT PRIMARY KEY,
    ROLE VARCHAR (20) 
);

INSERT INTO role(ROLE_ID, `ROLE`)
VALUES(001,"admin"),
(002,'C-president'),
(003,'user');
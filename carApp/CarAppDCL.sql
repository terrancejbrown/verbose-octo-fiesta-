--Fresh start
drop user carapp cascade; 

-- create a user
create user carapp
identified by carpassword
default tablespace users
temporary tablespace temp
quota 10m on users;

grant connect to carapp;
grant resource to carapp;
grant create session to carapp;
grant create table to carapp;
grant create view to carapp;
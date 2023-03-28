DROP DATABASE IF EXISTS projecttemplate;
create database projecttemplate;
CREATE USER projecttemplate WITH PASSWORD 'projecttemplate';
GRANT ALL PRIVILEGES ON DATABASE projecttemplate to projecttemplate;
ALTER USER projecttemplate CREATEDB;

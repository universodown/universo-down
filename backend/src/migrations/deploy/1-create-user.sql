BEGIN;

    CREATE TABLE organization (
        id int NOT NULL AUTO_INCREMENT,
        name text NOT NULL,
        description text NOT NULL,
        domain text NOT NULL,
        CONSTRAINT organization_id PRIMARY KEY (id)
    );

    CREATE TABLE users (
        id int NOT NULL AUTO_INCREMENT,
        first_name text NOT NULL,
        last_name text NOT NULL,
        password text NOT NULL,
        email text NOT NULL,
        role ENUM('admin', 'member', 'owner') NOT NULL,
        organization_id int NOT NULL,
        CONSTRAINT user_id PRIMARY KEY (id)
    );

COMMIT;

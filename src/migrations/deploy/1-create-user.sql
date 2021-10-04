BEGIN;
    
    CREATE TABLE users (
        id int NOT NULL AUTO_INCREMENT,
        first_name text NOT NULL,
        last_name text NOT NULL,
        password text NOT NULL,
        email text NOT NULL,
        CONSTRAINT user_id PRIMARY KEY (id)
    );

COMMIT;
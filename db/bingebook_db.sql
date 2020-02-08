/*
JOSEPH P. PASAOA
Database Creation & Seed PSQL File | Bingebook (a full-stack binge-facilitating app)
*/


/* CREATE */
DROP DATABASE IF EXISTS bingebook_db;
CREATE DATABASE bingebook_db;
\c bingebook_db;

CREATE TABLE users
(
   id SERIAL PRIMARY KEY,
   username VARCHAR(22) UNIQUE NOT NULL,
   avatar_url TEXT DEFAULT ''
);

CREATE TABLE genres
(
   id SERIAL PRIMARY KEY,
   name VARCHAR(22) UNIQUE NOT NULL
);

CREATE TABLE shows
(
   id SERIAL PRIMARY KEY,
   title VARCHAR(90),
   imdb_id VARCHAR(22),
   img_url TEXT DEFAULT ''
);

CREATE TABLE show_genres
(
   id SERIAL PRIMARY KEY,
   show_id INT REFERENCES shows(id) ON DELETE CASCADE,
   genre_id INT REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE user_shows
(
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES users(id) ON DELETE CASCADE,
   show_id INT REFERENCES shows(id) ON DELETE CASCADE
);

CREATE TABLE comments
(
   id SERIAL PRIMARY KEY,
   usershow_id INT REFERENCES user_shows(id) ON DELETE CASCADE,
   time_modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   body TEXT NOT NULL
);


/* SEED DATA
INSERT INTO users
   (username, avatar_url)
VALUES
   (, )

INSERT INTO genres
   (name)
VALUES
   ()

INSERT INTO shows
   (title, imdb_id, img_url)
VALUES
   (, , )

INSERT INTO show_genres
   (show_id, genre_id)
VALUES
   (, )

INSERT INTO user_shows
   (user_id, show_id)
VALUES
   (, )

INSERT INTO comments
   (usershow_id, time_modified, body)
VALUES
   (, , )
*/


/* POST-SEED QUERIES CHECKS */
SELECT *
FROM users;

SELECT *
FROM genres;

SELECT *
FROM shows;

SELECT *
FROM show_genres;

SELECT *
FROM user_shows;

SELECT *
FROM comments;

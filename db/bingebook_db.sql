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
   imdb_id VARCHAR(22),
   title VARCHAR(90),
   year VARCHAR(22),
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
   show_id INT REFERENCES shows(id) ON DELETE CASCADE,
   watch_status VARCHAR(11) NOT NULL DEFAULT 'onRadar',
   is_top3 BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE comments
(
   id SERIAL PRIMARY KEY,
   commenter_id INT REFERENCES users(id) ON DELETE CASCADE,
   usershow_id INT REFERENCES user_shows(id) ON DELETE CASCADE,
   time_modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   body TEXT NOT NULL
);


/* SEED DATA */
INSERT INTO users
   (username, avatar_url)
VALUES
   ('AlwaysOnAHorse', 'http://localhost:11211/images/uploaded-avatars/avatar-horsewoman.svg'),
   ('mike1235711', 'http://localhost:11211/images/uploaded-avatars/avatar-karate.svg'),
   ('ericSego', 'http://localhost:11211/images/uploaded-avatars/avatar-cornrows.svg'),
   ('DanielleLA', 'http://localhost:11211/images/uploaded-avatars/avatar-orange-bun.svg'),
   ('No_harm_No_FOUL', 'http://localhost:11211/images/uploaded-avatars/avatar-referee.svg'),

   ('just judi', 'http://localhost:11211/images/uploaded-avatars/avatar-sporty-her.svg')
;

INSERT INTO genres
   (name)
VALUES
   ('action'),
   ('adventure'),
   ('animation'),
   ('comedy'),
   ('crime'),

   ('documentary'),
   ('drama'),
   ('fantasy'),
   ('history'),
   ('mystery'),

   ('romance'),
   ('sci-fi'),
   ('sport'),
   ('thriller')
;

INSERT INTO shows
   (imdb_id, title, year, img_url)
VALUES
   ('tt2442560', 'Peaky Blinders', '2013–', 'https://m.media-amazon.com/images/M/MV5BMTkzNjEzMDEzMF5BMl5BanBnXkFtZTgwMDI0MjE4MjE@._V1_SX300.jpg'),
   ('tt3006802', 'Outlander', '2014–', 'https://m.media-amazon.com/images/M/MV5BMTU1NDc3NzYxN15BMl5BanBnXkFtZTgwMTgyMjQyNjM@._V1_SX300.jpg'),
   ('tt1586680', 'Shameless', '2011–', 'https://m.media-amazon.com/images/M/MV5BYzFmODNkNDMtOTgzMy00NzQ1LWEwNDItNzU1MmYyYThhYzUwXkEyXkFqcGdeQXVyOTA3MTMyOTk@._V1_SX300.jpg'),
   ('tt2085059', 'Black Mirror', '2011–', 'https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'),
   ('tt5770786', 'GLOW', '2017–', 'https://m.media-amazon.com/images/M/MV5BY2RjYzFkZDUtYzNjNC00MzEyLWFmZmItODc2YWFlOWExOWI4XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'),

   ('tt2250192', 'Sword Art Online', '2012–', 'https://m.media-amazon.com/images/M/MV5BYjY4MDU2YjMtNzY1MC00ODg1LWIwMzYtMWE5YTA3YTI4ZjMxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'),
   ('tt0121955', 'South Park', '1997–', 'https://m.media-amazon.com/images/M/MV5BOGE2YWUzMDItNTg2Ny00NTUzLTlmZGYtNWMyNzVjMjQ3MThkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg'),
   ('tt3748528', 'Rogue One: A Star Wars Story', '2016', 'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg'),
   ('tt2575988', 'Silicon Valley', '2014–2019', 'https://m.media-amazon.com/images/M/MV5BOTcwNzU2MGEtMzUzNC00MzMwLWJhZGItNDY3NDllYjU5YzAyXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg'),
   ('tt11318602', 'Don''t F**k with Cats: Hunting an Internet Killer', '2019', 'https://m.media-amazon.com/images/M/MV5BNGU2OGJkZTItYmRmNi00YTI2LWFkNzEtNjY2MGZiZTRhMzRkXkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_SX300.jpg'),

   ('tt0795176', 'Planet Earth', '2006', 'https://m.media-amazon.com/images/M/MV5BNmZlYzIzMTItY2EzYS00YTEyLTg0ZjEtMDMzZjM3ODdhN2UzXkEyXkFqcGdeQXVyNjI0MDg2NzE@._V1_SX300.jpg')
;

INSERT INTO show_genres
   (show_id, genre_id)
VALUES
   (1, 5),
   (1, 7),
   (2, 7),
   (2, 8),
   (2, 11),
   (3, 4),
   (3, 7),
   (4, 7),
   (4, 12),
   (4, 14),
   (5, 4),
   (5, 7),
   (5, 13),

   (6, 1),
   (6, 2),
   (6, 3),
   (6, 4),
   (6, 7),
   (6, 8),
   (6, 11),
   (6, 12),
   (6, 14),
   (7, 3),
   (7, 4),
   (8, 1),
   (8, 2),
   (8, 12),
   (9, 4),
   (10, 6),
   (10, 5),
   (10, 10),

   (11, 6)
;

INSERT INTO user_shows
   (user_id, show_id, watch_status, is_top3)
VALUES
   (1, 1, 'now', false),
   (1, 2, 'onRadar', true),
   (1, 7, 'now', true),
   (1, 10, 'onRadar', false),
   (1, 11, 'watched', false),

   (2, 1, 'onRadar', false),
   (2, 2, 'now', true),
   (2, 4, 'now', false),
   (2, 6, 'now', true),
   (2, 7, 'watched', false),
   (2, 9, 'watched', true),
   (2, 11, 'watched', false),

   (3, 2, 'now', true),
   (3, 10, 'watched', true),
   (3, 11, 'watched', false),

   (4, 2, 'now', true),
   (4, 3, 'onRadar', false),
   (4, 5, 'now', true),
   (4, 8, 'onRadar', false),
   (4, 9, 'watched', false),
   (4, 11, 'watched', false),

   (5, 1, 'now', true),
   (5, 2, 'now', true),
   (5, 3, 'watched', false),
   (5, 5, 'now', false),
   (5, 7, 'watched', true),
   (5, 8, 'watched', false),
   (5, 9, 'onRadar', false),
   (5, 10, 'onRadar', false),

   (6, 1, 'now', false),
   (6, 2, 'now', true),
   (6, 3, 'now', false),
   (6, 4, 'now', false),
   (6, 5, 'now', false),
   (6, 6, 'now', true),
   (6, 8, 'watched', true),
   (6, 9, 'watched', false),
   (6, 10, 'onRadar', false)
;

INSERT INTO comments
   (commenter_id, usershow_id, body)
VALUES
   (1, 30, 'Love this!'),
   (1, 32, 'Yes!'),
   (1, 31, 'Outlander! Thanks for introducing me!'),
   (1, 35, 'Whoohoo!'),
   (6, 31, 'absolutely! my favorite!'),
   (2, 31, 'YASSSS'),
   (3, 7, 'Yes!'),
   (3, 18, 'Surely awesome'),
   (3, 19, 'O.o'),
   (3, 31, 'zug zug'),
   (4, 31, 'Where have I been? This show rocks!'),
   (5, 8, 'Yes! TWOICE'),
   (5, 11, 'omg the humor is ON POINT'),
   (5, 19, 'honestly, not a big fan :/. liked the original tril better'),
   (5, 22, 'Cillian''s got that dreammy swaggg ;D'),
   (5, 31, 'JAMIE JAMIE JAMI--RAWRRRR'),
   (6, 31, 'MOOD <3')
;


/* POST-SEED QUERIES CHECKS */
SELECT *
FROM users;

SELECT *
FROM genres;

SELECT *
FROM shows;

SELECT show_genres.id
   , shows.id AS show_id
   , title
   , genres.id AS genre_id
   , name AS genre
FROM show_genres
INNER JOIN shows ON (show_genres.show_id = shows.id)
INNER JOIN genres ON (show_genres.genre_id = genres.id);

SELECT user_shows.id
   , users.id AS user_id
   , username
   , shows.id AS show_id
   , title
   , watch_status
   , is_top3
FROM user_shows
INNER JOIN users ON (user_shows.user_id = users.id)
INNER JOIN shows ON (user_shows.show_id = shows.id);

SELECT *
FROM comments;


/* DATA STORE
'tt2442560', 'Peaky Blinders', '2013–', 'https://m.media-amazon.com/images/M/MV5BMTkzNjEzMDEzMF5BMl5BanBnXkFtZTgwMDI0MjE4MjE@._V1_SX300.jpg',
   crime, drama
'tt3006802', 'Outlander', '2014–', 'https://m.media-amazon.com/images/M/MV5BMTU1NDc3NzYxN15BMl5BanBnXkFtZTgwMTgyMjQyNjM@._V1_SX300.jpg',
   drama, fantasy, romance
'tt1586680', 'Shameless', '2011–', 'https://m.media-amazon.com/images/M/MV5BYzFmODNkNDMtOTgzMy00NzQ1LWEwNDItNzU1MmYyYThhYzUwXkEyXkFqcGdeQXVyOTA3MTMyOTk@._V1_SX300.jpg',
   comedy, drama
'tt2085059', 'Black Mirror', '2011–', 'https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
   drama, sci-fi, thriller
'tt5770786', 'GLOW', '2017–', 'https://m.media-amazon.com/images/M/MV5BY2RjYzFkZDUtYzNjNC00MzEyLWFmZmItODc2YWFlOWExOWI4XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg',
   comedy, drama, sport

'tt2250192', 'Sword Art Online', '2012–', 'https://m.media-amazon.com/images/M/MV5BYjY4MDU2YjMtNzY1MC00ODg1LWIwMzYtMWE5YTA3YTI4ZjMxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
   animation, action, adventure, comedy, drama, fantasy, romance, sci-fi, thriller
'tt0121955', 'South Park', '1997–', 'https://m.media-amazon.com/images/M/MV5BOGE2YWUzMDItNTg2Ny00NTUzLTlmZGYtNWMyNzVjMjQ3MThkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
   animation, comedy
'tt3748528', 'Rogue One: A Star Wars Story', '2016', 'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',
   action, adventure, sci-fi
'tt2575988', 'Silicon Valley', '2014–2019', 'https://m.media-amazon.com/images/M/MV5BOTcwNzU2MGEtMzUzNC00MzMwLWJhZGItNDY3NDllYjU5YzAyXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg',
   animation, drama, fantasy
'tt11318602', 'Don't F**k with Cats: Hunting an Internet Killer', '2019', 'https://m.media-amazon.com/images/M/MV5BNGU2OGJkZTItYmRmNi00YTI2LWFkNzEtNjY2MGZiZTRhMzRkXkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_SX300.jpg',
   documentary, crime, mystery

'tt0795176', 'Planet Earth', '2006', 'https://m.media-amazon.com/images/M/MV5BNmZlYzIzMTItY2EzYS00YTEyLTg0ZjEtMDMzZjM3ODdhN2UzXkEyXkFqcGdeQXVyNjI0MDg2NzE@._V1_SX300.jpg',
   documentary
*/
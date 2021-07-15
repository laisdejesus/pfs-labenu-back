CREATE TABLE IF NOT EXISTS lamusic_users(
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL,
         nickname VARCHAR(64) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(64) NOT NULL
);
CREATE TABLE IF NOT EXISTS lamusic_genres(
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS lamusic_album(
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS lamusic_music(
         id VARCHAR(255) PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         author_id VARCHAR(255) NOT NULL,
         date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         file_string VARCHAR(255) NOT NULL,
         album_id VARCHAR(255) NOT NULL,
         FOREIGN KEY (author_id) REFERENCES lamusic_users (id),
         FOREIGN KEY (album_id) REFERENCES lamusic_album (id)
);

CREATE TABLE IF NOT EXISTS lamusic_music_genres(
         music_id VARCHAR(255),
         genres_id VARCHAR(255),
         FOREIGN KEY (music_id) REFERENCES lamusic_music (id),
         FOREIGN KEY (genres_id) REFERENCES lamusic_genres (id)
);

SELECT * FROM lamusic_users;



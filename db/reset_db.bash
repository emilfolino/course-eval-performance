$(> db/courses.sqlite)
cat db/migrate.sql | sqlite3 db/courses.sqlite
cat db/seed.sql | sqlite3 db/courses.sqlite

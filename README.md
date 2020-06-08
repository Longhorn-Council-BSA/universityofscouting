# University of Scouting
A transcript and schedule reporting tool.

# Setup

Create a `.env` file containing a DATABASE_URL environment variable.  This is
a MongoDB connection string, such as you might get from mongodb.com's MongoDB
hosting service.  Also, create a SESSION_SECRET containing a random string.

    DATABASE_URL=mongodb+srv://<username>:<password>@<host>/<dbname>?retryWrites=true&w=majority
    SESSION_SECRET=abc123

# Author
- Cameron King <cameronking.me>
- See commmit log for additional contributors.

# Copying
This software is released under the MIT License. See LICENSE for details.

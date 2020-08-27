![Node.js CI](https://github.com/Longhorn-Council-BSA/universityofscouting/workflows/Node.js%20CI/badge.svg) ![Standard Version and JSDoc](https://github.com/Longhorn-Council-BSA/universityofscouting/workflows/Standard%20Version%20and%20JSDoc/badge.svg) [![Build Status](https://dev.azure.com/662-universityofscouting/University%20of%20Scouting/_apis/build/status/Longhorn-Council-BSA.universityofscouting?branchName=master)](https://dev.azure.com/662-universityofscouting/University%20of%20Scouting/_build/latest?definitionId=1&branchName=master)

# University of Scouting
A transcript and schedule reporting tool.

# Setup

Create a `.env` file containing a DATABASE_URL environment variable.  This is
a MongoDB connection string, such as you might get from mongodb.com's MongoDB
hosting service.  Also, create a SESSION_SECRET containing a random string.

    DATABASE_URL=mongodb+srv://<username>:<password>@<host>/<dbname>?retryWrites=true&w=majority
    SESSION_SECRET=abc123

# Documentation

View the [generated documentation](https://longhorn-council-bsa.github.io/universityofscouting/docs/).

# Author
- [Cameron King](https://cameronking.me)
- [Ben Spellmann](https://www.linkedin.com/in/benjamin-spellmann-7036a676/)
- See commmit log for additional contributors.

# Copying
This software is released under the MIT License. See LICENSE for details.

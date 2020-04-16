const db = require("../db/database.js");

const courses = {
    search: function(req, res) {
        const searchQuery = "%" + req.params.query + "%";

        db.all("SELECT * FROM courses WHERE course_code LIKE ? OR name LIKE ? ORDER BY course_code, year, study_period",
            searchQuery,
            searchQuery, (err, rows) => {
                if (err) {
                    return courses.errorResponse(res, "/search/:query", err);
                }

                return res.json( { data: rows } );
            });
    },

    errorResponse: function(res, path, err) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: path,
                title: "Database error",
                detail: err.message
            }
        });
    }
};

module.exports = courses;

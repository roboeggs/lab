
// The main.js file of your application
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index.html")
    });
    app.get("/search", function (req, res) {
        res.render("search.html");
    });
    app.get("/search-result", function (req, res) {
        //searching in the database
        res.send("This is the keyword you entered: " + req.query.keyword + "<br>" + "This is the result of the search: ");
    });

    app.get("/register", function (req, res) {
        res.render("register.html");
    });

    app.get("/list", function (req, res) {
        // query database to get all the books
        let sqlquery = "SELECT * FROM books";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("list.html", { availableBooks: result });
        });
    });

    app.post("/registered", function (req, res) {
        // saving data in database
        res.send("Hello " + req.body.first + " " + req.body.last + ", you are now registered!");
    });

    app.get("/addbook", function (req, res) {
        res.render("addbook.html");
    });

    app.post("/bookadded", function (req, res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send("This book is added to database, name: " + req.body.name + " price " + req.body.price);
            }
        });
    });

    app.get("/search-result-db", function (req, res) {
        let word = `%${req.query.keyword}%`;
        let sqlquery = "SELECT * FROM `books` WHERE name LIKE ?";
        db.query(sqlquery, [word], (err, results) => {
            if (err) {
                console.error("Error searching for books:", err);
                res.status(500).send("Error searching for books");
                return;
            }
            res.render('list.html', { availableBooks: results });
        });
    });
}
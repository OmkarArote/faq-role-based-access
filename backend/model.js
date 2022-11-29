const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto('faq_db', 'root', 'Omkar@2001', {
    host: "127.0.0.1",
    post : "3306",
    dialect: 'mysql'
})
auto.run(function (err) {
    if (err) throw err;
    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});
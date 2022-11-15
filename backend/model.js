const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto('sys', 'admin', 'Slashrtc1234', {
    host: "faq-db.cacmpgkjfu18.us-east-1.rds.amazonaws.com",
    dialect: 'mysql'
})
auto.run(function (err) {
    if (err) throw err;
    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});
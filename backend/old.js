// conn.sync({ force: false }).then(() => {
//     admin.findAll().then(admin_1 => {
//         console.log("Admin Values are:")
//         console.log(JSON.stringify({admin_1}));
//     });
// });

// <Old Method />

// const sequelize = new Sequelize('sys', 'admin', 'Slashrtc1234', {
//     host: "faq-db.cacmpgkjfu18.us-east-1.rds.amazonaws.com",
//     dialect: 'mysql'
// })

// const Admin = require(`${__dirname}/models/admin`)(sequelize)

// User.findAll().then((admin) => {
//     console.log(admin)
//     sequelize.close()
// })

// sequelize.authenticate().then(function () {
//     console.log("sucess");
// }).catch(function (error) {
//     console.log("error: " + error);
// });
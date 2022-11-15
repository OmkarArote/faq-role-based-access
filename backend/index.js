const express = require('express');
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const port = 7000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

const conn = new Sequelize("mysql://root:Omkar@2001@127.0.0.1:3306/faq_db", {
    define: {
        timestamps: false
    }
});

const admin = conn.import(__dirname + '/models/admin.js')
const viewer = conn.import(__dirname + '/models/viewer.js')
const super_admin = conn.import(__dirname + '/models/super_admin.js')
const faq = conn.import(__dirname + '/models/faq.js')

app.get("/", (req, res) => {
    res.send('SlashRTC Interns Welcome You!')
})

// Viewer Level API's
app.post("/viewer_reg", async (req, res) => {
    try {
        const data = req.body;
        const new_viewer = await viewer.create({ email: data.email, password: data.pass });
        res.status(201)
        res.json(new_viewer)
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

app.get("/faq_list", (req, res) => {
    try {
        conn.sync({ force: false })
            .then(() => {
                faq.findAll().then(faq => {
                    res.json(faq)
                });
            });
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

app.post("/user_login", async (req, res) => {
    try {
        const data = req.body;
        if (data.access_level === "admin") {
            const is_user = await admin.findOne({
                where: {
                    email: data.email,
                    password: data.pass
                }
            });
            check_user(is_user);
        } else if (data.access_level === "viewer") {
            const is_user = await viewer.findOne({
                where: {
                    email: data.email,
                    password: data.pass
                }
            });
            check_user(is_user);
        } else if (data.access_level === "super_admin") {
            const is_user = await super_admin.findOne({
                where: {
                    email: data.email,
                    password: data.pass
                }
            });
            check_user(is_user);
        } else {
            res.status(402)
            res.json({ "msg": "login Unsuccessful" })
        }
        function check_user(is_user) {
            if (!is_user) {
                res.status(402)
                res.json({ "msg": "login Unsuccessful" })
            } else {
                res.status(200)
                // let msg = { "msg": "login Successful" }
                // let user = { "user_id": is_user.id }
                res.json({ "user_id": is_user.id , "msg" : "login Successful", "access_level": data.access_level })
            }
        }
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

// Admin Level API's
app.post("/faq_add", async (req, res) => {
    try {
        const data = req.body;
        if (data.access_level === "admin") {
            const is_user = await admin.findOne({
                where: {
                    id: data.role_id
                }
            });
            check_user(is_user)
        } else if (data.access_level === "super_admin") {
            const is_user = await super_admin.findOne({
                where: {
                    id: data.role_id
                }
            });
            check_user(is_user)
        } else {
            res.status(402)
            res.json({ "msg": "Recheck your access level" })
        }
        async function check_user(is_user) {
            if (!is_user) {
                res.status(402)
                res.json({ "msg": "Recheck your access level" })
            } else {
                const new_faq = await faq.create({ faq_que: data.faq_question, faq_ans: data.faq_answer, role_id: data.role_id, role_type: data.access_level })
                res.status(200)
                res.json(new_faq)
            }
        }
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

app.post("/faq_my_list", async (req, res) => {
    try {
        const data = req.body;
        if (data.access_level === "admin") {
            const is_user = await admin.findOne({
                where: {
                    id: data.role_id
                }
            });
            check_user(is_user)
        } else if (data.access_level === "super_admin") {
            const is_user = await super_admin.findOne({
                where: {
                    id: data.role_id
                }
            });
            check_user(is_user)
        } else {
            res.status(402)
            res.json({ "msg": "You are not a admin/super admin" })
        }
        async function check_user(is_user) {
            if (!is_user) {
                res.status(402)
                res.json({ "msg": "Recheck your access level" })
            } else if (is_user && data.access_level === "super_admin") {
                res.status(200)
                conn.sync({ force: false })
                    .then(() => {
                        faq.findAll().then(faq => {
                            res.json(faq)
                        });
                    });
            } else if (is_user && data.access_level === "admin") {
                res.status(200)
                conn.sync({ force: false })
                    .then(() => {
                        faq.findAll({ where: { role_id: data.role_id, role_type: "admin" } }).then(faq => {
                            res.json(faq)
                        });
                    });
            }
        }
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

app.post("/faq_del", async (req, res) => {
    try {
        const data = req.body;
        if (data.access_level === "admin") {
            const is_user = await admin.findOne({
                where: {
                    id: data.role_id
                }
            });
            check_user(is_user)
        } else if (data.access_level === "super_admin") {
            const is_user = await super_admin.findOne({
                where: {
                    id: data.role_id
                }
            });
            check_user(is_user)
        } else {
            res.status(402)
            res.json({ "msg": "You are not a admin/super admin" })
        }
        async function check_user(is_user) {
            if (!is_user) {
                res.status(402)
                res.json({ "msg": "Recheck your access level" })
            } else if (is_user && data.access_level === "super_admin") {
                res.status(200)
                const del_faq = await faq.destroy({ where: { id: data.faq_id } })
                if (del_faq === 1){
                    res.json({ "msg": "Faq deleted successfully: " + data.faq_id })
                } else {
                    res.json({ "msg": "You are not authorized to delete the faq" })
                }
            } else if (is_user && data.access_level === "admin") {
                res.status(200)
                const del_faq = await faq.destroy({ where: { id: data.faq_id, role_id: data.role_id, role_type: data.access_level } })
                if (del_faq === 1){
                    res.json({ "msg": "Faq deleted successfully: " + data.faq_id })
                } else {
                    res.json({ "msg": "You are not authorized to delete the faq" })
                }
            }
        }
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

// Super Admin level API's
app.post("/admin_list", async (req, res) => {
    try {
        const data = req.body;
        const is_user = await super_admin.findOne({
            where: {
                id: data.role_id
            }
        });
        check_user(is_user);
        function check_user(is_user) {
            if (!is_user) {
                res.status(402)
                res.json({ "msg": "You are not a Super Admin" })
            } else {
                res.status(200)
                conn.sync({ force: false })
                    .then(() => {
                        admin.findAll().then(admin => {
                            res.json(admin)
                        });
                    });
            }
        }
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

app.post("/admin_add", async (req, res) => {
    try {
        const data = req.body;
        const is_user = await super_admin.findOne({
            where: {
                id: data.role_id
            }
        });
        check_user(is_user);
        async function check_user(is_user) {
            if (!is_user) {
                res.status(402)
                res.json({ "msg": "You are not a Super Admin" })
            } else {
                res.status(200)
                const new_admin = await admin.create({ email: data.email, password: data.pass })
                res.json(new_admin)
            }
        }
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

app.post("/admin_del", async (req, res) => {
    try {
        const data = req.body;
        const is_user = await super_admin.findOne({
            where: {
                id: data.role_id
            }
        });
        check_user(is_user);
        async function check_user(is_user) {
            if (!is_user) {
                res.status(402)
                res.json({ "msg": "You are not a Super Admin" })
            } else {
                res.status(200)
                const del_admin = await admin.destroy({ where: { id: data.admin_id } })
                if(del_admin === 1){
                    res.json({ "msg": "Admin deleted successfully: " + data.admin_id })
                } else {
                    res.json({ "msg": "You are not authorized to delete the admin" })
                }
            }
        }
    } catch (error) {
        res.status(500)
        res.send({ "msg": error.message })
    }
})

app.listen(port, () => {
    console.log("Server starts at port: " + port)
})
import { Sequelize } from "sequelize";

const db = new Sequelize('gerakanl_literatur_db', 'gerakanl_admin', 'AH;,IH#7D*I$', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
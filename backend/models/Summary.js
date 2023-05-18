import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";


const {DataTypes} = Sequelize;

const Summary = db.define('summary', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    summary:{
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    grade:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

Users.hasMany(Summary);
Summary.belongsTo(Users, {foreignKey: 'userId'});

export default Summary;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";


const {DataTypes} = Sequelize;

const UnverifiedFile = db.define('unverifiedfile', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    classification:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: "Menunggu Verifikasi",
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    file:{
        type: DataTypes.STRING,
        defaultValue: "Menunggu Verifikasi",
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

Users.hasMany(UnverifiedFile);
UnverifiedFile.belongsTo(Users, {foreignKey: 'userId'});

export default UnverifiedFile;
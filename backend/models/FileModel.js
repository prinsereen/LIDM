import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";


const {DataTypes} = Sequelize;

const File = db.define('file', {
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
        allowNull: false,
        defaultValue: "Menunggu Verifikasi"
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
/*     type:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, */
    file_pdf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    file_mp3: {
        type: DataTypes.STRING,
        allowNull: true
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

Users.hasMany(File);
File.belongsTo(Users, {foreignKey: 'userId'});

export default File;
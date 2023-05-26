import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Users = db.define('users', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    asal_instansi:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    jenjang:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tanggal_lahir:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    user_photo:{
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
})

export default Users;
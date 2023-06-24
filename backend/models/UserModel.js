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
    },
    seni:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sosial:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sains:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sastra:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    bahasa:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    score:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rekomendasi_kompetisi:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true
})

/* Users.belongsTo(Competition, { foreignKey: 'rekomendasi_kompetisi', targetKey: 'competition_id' });
Competition.hasOne(Users, { foreignKey: 'rekomendasi_kompetisi', sourceKey: 'competition_id' }); */

export default Users;
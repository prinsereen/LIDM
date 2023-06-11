import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";


const {DataTypes} = Sequelize;

const Competition = db.define('competition', {
    competition_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    competition_name:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tanggal_pelaksanaaan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tingkat:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    competition_logo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
})

/* Competition.belongsTo(Users, { foreignKey: 'competition_id', targetKey: 'rekomendasi_kompetisi' });
Users.hasOne(Competition, { foreignKey: 'rekomendasi_kompetisi', sourceKey: 'competition_id' }); */


export default Competition;
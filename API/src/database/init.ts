import sequelizeDB from "./sequelize";


const initDB = async () => {
    await sequelizeDB.sync({ alter:true });
}

initDB().then(x => {
    console.log("=========================================================")
}).catch(e => console.log(e));

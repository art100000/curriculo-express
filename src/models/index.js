import Sequelize from "sequelize";
import "dotenv/config";

import getUsuarioModel from "./usuario";
import getCurriculoModel from "./curriculo";
import getExperienciaModel from "./experiencia";
import getFormacaoModel from "./formacao";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: require("pg"),
});

const models = {
  Usuario: getUsuarioModel(sequelize, Sequelize),
  Curriculo: getCurriculoModel(sequelize, Sequelize),
  Experiencia: getExperienciaModel(sequelize, Sequelize),
  Formacao: getFormacaoModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
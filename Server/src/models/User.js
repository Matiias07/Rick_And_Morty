const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {
      id: {
         type: DataTypes.INTEGER,
         allownull: false,
         primaryKey: true
      },
      email: {
         type: DataTypes.STRING,
         allownull: false,
         isEmail: true
      },
      password: {
         type: DataTypes.STRING,
         allownull: false
      }
   }, { timestamps: false });
};

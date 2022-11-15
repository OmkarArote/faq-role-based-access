var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _faq = require("./faq");
var _super_admin = require("./super_admin");
var _sys_config = require("./sys_config");
var _viewer = require("./viewer");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var faq = _faq(sequelize, DataTypes);
  var super_admin = _super_admin(sequelize, DataTypes);
  var sys_config = _sys_config(sequelize, DataTypes);
  var viewer = _viewer(sequelize, DataTypes);


  return {
    admin,
    faq,
    super_admin,
    sys_config,
    viewer,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

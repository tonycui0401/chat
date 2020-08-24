require("dotenv").config();
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT || 5432;

module.exports = {

  // local_endpoint:'http://localhost:5000/chat',
  local_endpoint:'http://reecho-env.eba-bk9ugpha.eu-west-1.elasticbeanstalk.com/chat',
  // remote_endpoint:'http://reecho-env.eba-bk9ugpha.eu-west-1.elasticbeanstalk.com/chat',

  
};


// DB_NAME=postgres
// DB_USER=reechoadmin
// DB_PASSWORD=admin12345
// DB_HOST=aayj50cafa2cje.cjbdbesv54im.eu-west-1.rds.amazonaws.com
// DB_PORT=5432
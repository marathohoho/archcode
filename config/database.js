const Sequelize = require('sequelize');

//Connect to the database using Sequelize:
const connection = new Sequelize('archcode', 'root', '1306', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      } 
});



//declate models - A.K.A. tables in mySQL. Each table is realted to another with the main one
// bein arch_building: contains columns: id, title, arch_style_id (links to child-table), latitude,
// longitude, architect, description, status_id (links to child-table), state_id (links to child-table),
// period_id (links to child-table), type_id (links to child-table), city, address.
// There are few more building attributes which are ignored at this stage.


//in sequelize library (./node_modules/sequelize/lib/models.js) change the line 952 freezeTableName: from 
// false to true to keep the names unchangedasd

// archBuilding connects directly to the mySQL database and 
// retrives data from columns names of which are specified below
const archBuilding =  connection.define('arch_building', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    arch_style_id: { // here the name is taken from the name of the columns
                    // inside the db, thus, matters
        type: Sequelize.INTEGER
    },
    latitude: {
        type: Sequelize.FLOAT
    },
    longitude: {
        type: Sequelize.FLOAT
    },
    architect: {
        type: Sequelize.TEXT
    },
    description: {
        type: Sequelize.TEXT
    },
    status_id: {
        type: Sequelize.INTEGER
    },
    state_id: {
        type: Sequelize.INTEGER
    },
    period_id: {
        type: Sequelize.INTEGER
    },
    type_id: {
        type: Sequelize.INTEGER
    },
    city: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.TEXT
    }
});

const archStyle = connection.define('arch_style', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT
    }
});

const objectStatus = connection.define('object_status', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT
    },
    order: {
        type: Sequelize.INTEGER
    } 
});

const objectState = connection.define('object_state', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT
    },
    order: {
        type: Sequelize.INTEGER
    } 
});

const objectPeriod = connection.define('object_period', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT
    },
    order: {
        type: Sequelize.INTEGER
    }
});

const objectType = connection.define('object_type', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT
    },
    order: {
        type: Sequelize.INTEGER
    }
});




module.exports = connection;
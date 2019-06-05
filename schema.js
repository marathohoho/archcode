const graphql = require('graphql');
const db = require('./config/database');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLFloat
    } = graphql;

// Define the main table as a graphQL object
// return value names are the same as the column names inside the table
// arch_building table inside the db
const archBuildingType = new GraphQLObjectType({
    name: 'archBuildingType',
    description: 'This represents a building in archcode',
    fields: () => ({
        id: { type: GraphQLInt},
        title: { type: GraphQLString},
        style: { 
            type: archStyleType,
            resolve(parent, args){
                return db.models.arch_style.findByPk(parent.arch_style_id);
            }
        },
        latitude: { type: GraphQLFloat},
        longitude: { type: GraphQLFloat},
        architect: { type: GraphQLString},
        description: {type: GraphQLString},
        status: {
            type:  objectStatusType,
            resolve(parent, args){
                return db.models.object_status.findByPk(parent.status_id);
            }
        },
        state: {
            type: objectStateType,
            resolve(parent, args){
                return db.models.object_state.findByPk(parent.state_id);
            }
        },
        period: {
            type: objectPeriodType,
            resolve(parent, args){
                return db.models.object_period.findByPk(parent.period_id);
            }
        },
        type: {
            type: objectType,
            resolve(parent, args){
                return db.models.object_type.findByPk(parent.type_id);
            }
        },
        city: { type: GraphQLString},
        address: { type: GraphQLString}
    })
});

// define the remaining dependent tables as graphQL objects as well
//  
const archStyleType = new GraphQLObjectType({
    name: 'archStyle',
    description: 'This describes architecture style of the building',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString},
        buildings: {
            type: new GraphQLList(archBuildingType),
            resolve(parent, args){
                return db.models.arch_building.findAll({where: {arch_style_id:parent.id}});
            }
        }
    })
});

const objectStatusType = new GraphQLObjectType({
    name: 'objectStatus',
    description: 'This describes status of the building',
    fields: () => ({
        id: {type: GraphQLInt},
        title: { type: GraphQLString},
        order: { type: GraphQLInt},
        buildings: {
            type: new GraphQLList(archBuildingType),
            resolve(parent, args){
                return db.models.arch_building.findAll({where: {status_id:parent.id}});
            }
        }
    })
});

const objectStateType = new GraphQLObjectType({
    name: 'objectState',
    description: 'This describes status of the building',
    fields: () => ({
        id: { type: GraphQLInt},
        title: { type: GraphQLString},
        order: { type: GraphQLInt},
        buildings: {
            type: new GraphQLList(archBuildingType),
            resolve(parent, args){
                return db.models.arch_building.findAll({where: {state_id:parent.id}});
            }
        }
    })
}); 

const objectPeriodType = new GraphQLObjectType({
    name: 'objectPeriod',
    description: 'This describes status of the building',
    fields: () => {
        return {
            id : {
                type: GraphQLInt,
                resolve(objectPeriod, args){
                    return objectPeriod.id;
                }
            },
            title : {
                type: GraphQLString,
                resolve(objectPeriod, args){
                    return objectPeriod.title
                }
            },
            order: {
                type: GraphQLInt,
                resolve(objectPeriod, args){
                    return objectPeriod.id;
                }
            },
            buildings: {
                type: new GraphQLList(archBuildingType),
                resolve(parent, args){
                    return db.models.arch_building.findAll({where: {period_id:parent.id}});
                }
            }
        };
    }
}); 


const objectType = new GraphQLObjectType({
    name: 'objectType',
    description: 'This describes status of the building',
    fields: () => {
        return {
            id : {
                type: GraphQLInt,
                resolve(objectType, args){
                    return objectType.id;
                }
            },
            title : {
                type: GraphQLString,
                resolve(objectType, args){
                    return objectType.title
                }
            },
            order: {
                type: GraphQLInt,
                resolve(objectType, args){
                    return objectType.id;
                }
            },
            buildings: {
                type: new GraphQLList(archBuildingType),
                resolve(parent, args){
                    return db.models.arch_building.findAll({where: {type_id:parent.id}});
                }
            }
        };
    }
}); 


//This implements queries for the graphQL
const query = new GraphQLObjectType({
    name: 'query',
    description: 'this query connects the graphql elements',
    fields: {
        building: {
            type: archBuildingType,
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                return db.models.arch_building.findByPk(args.id);
            }

        },
        buildings: {
            type: new GraphQLList(archBuildingType),
            resolve(parent, args){
                return db.models.arch_building.findAll({});
            }
        },
        style: {
            type: archStyleType,
            args: { id: { type: GraphQLInt}}, 
            resolve(parent, args){
                return db.models.arch_style.findByPk(args.id);
            }
        },
        styles: {
            type: new GraphQLList(archStyleType),
            resolve(parent, args){
                return db.models.arch_style.findAll({});
            }
        },
        status: {
            type: objectStatusType,
            args: { id: { type: GraphQLInt}}, 
            resolve(parent, args){
                return db.models.object_status.findByPk(args.id);
            }
        },
        statuses: {
            type: new GraphQLList(objectStatusType),
            resolve(parent, args){
                return db.models.object_status.findAll({});
            }
        },
        state: {
            type: objectStateType,
            args: { id: { type: GraphQLInt}}, 
            resolve(parent, args){
                return db.models.object_state.findByPk(args.id);
            } 
        },
        states: {
            type: new GraphQLList(objectStateType),
            resolve(parent, args){
                return db.models.object_state.findAll({});
            }
        },
        period: {
            type: objectPeriodType,
            args: { id: { type: GraphQLInt}}, 
            resolve(parent, args){
                return db.models.object_period.findByPk(args.id);
            } 
        },
        periods: {
            type: new GraphQLList(objectPeriodType),
            resolve(parent, args){
                return db.models.object_period.findAll({});
            }
        },
        type: {
            type: objectType,
            args: { id: { type: GraphQLInt}}, 
            resolve(parent, args){
                return db.models.object_type.findByPk(args.id);
            } 
        },
        types: {
            type: new GraphQLList(objectType),
            resolve(parent, args){
                return db.models.object_type.findAll({});
            }
        }        
    }
});

module.exports = new GraphQLSchema({
    query: query
});
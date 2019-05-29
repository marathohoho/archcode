const graphql = require('graphql');
const db = require('./config/database');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
    } = graphql;

// Define the main table as a graphQL object
// return value names are the same as the column names inside the table
// arch_building table inside the db
const archBuilding = new GraphQLObjectType({
    name: 'archBuilding',
    description: 'This represents a building in archcode',
    fields: () => {
        return{
            id: { 
                type: GraphQLInt,
                resolve(building, args){
                    return building.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(building, args){
                    return building.title;
                }
            },
            archStyle: { 
                type: GraphQLString,
                resolve(building, args){
                    return building.arch_style_id;
                }
            },
            latitude: {
                type: GraphQLString,
                resolve(building, args){
                    return building.latitude;
                }
            },
            longitude: {
                type: GraphQLString,
                resolve(building, args){
                    return building.longitude;
                }
            },
            architect: {
                type: GraphQLString,
                resolve(building, args){
                    return building.architect;
                }
            },
            description: {
                type: GraphQLString,
                resolve(building, args){
                    return building.description;
                }
            },
            objectStatus: { 
                type: GraphQLInt,
                resolve(building, args){
                    return building.status_id;
                }
            },
            objectState: { 
                type: GraphQLInt,
                resolve(building, args){
                    return building.state_id;
                }
            },
            objectPeriod: { 
                type: GraphQLInt,
                resolve(building, args){
                    return building.period_id;
                }
            },
            objectType: {
                type: GraphQLInt,
                resolve(building, args){
                    return building.type_id;
                }
            },
            city: {
                type: GraphQLString,
                resolve(building, args){
                    return building.city;
                }
            },
            address: {
                type: GraphQLString,
                resolve(building, args){
                    return building.address;
                }
            }
        }
    }
});

// define the remaining dependent tables as graphQL objects as well
//  
const archStyle = new GraphQLObjectType({
    name: 'archStyle',
    description: 'This describes architecture style of the building',
    fields: () => {
        return {
            id : {
                type: GraphQLInt,
                resolve(arch_style, args){
                    return arch_style.id;
                }
            },
            title : {
                type: GraphQLString,
                resolve(arch_style, args){
                    return arch_style.title
                }
            },            
            arch_building: {
                type: new GraphQLList(archBuilding),
                resolve(arch_style, args){
                    return arch_style.getarchBuilding({where : args});
                }
            }
        };
    }
});

const objectStatus = new GraphQLObjectType({
    name: 'objectStatus',
    description: 'This describes status of the building',
    fields: () => {
        return {
            id : {
                type: GraphQLInt,
                resolve(objectStatus, args){
                    return objectStatus.id;
                }
            },
            title : {
                type: GraphQLString,
                resolve(objectStatus, args){
                    return objectStatus.title
                }
            },
            order : {
                type: GraphQLInt,
                resolve(objectStatus, args){
                    return objectStatus.order
                }
            }
        };
    }
});

const objectState = new GraphQLObjectType({
    name: 'objectState',
    description: 'This describes status of the building',
    fields: () => {
        return {
            id : {
                type: GraphQLInt,
                resolve(objectState, args){
                    return objectState.id;
                }
            },
            title : {
                type: GraphQLString,
                resolve(objectState, args){
                    return objectState.title
                }
            },
            order : {
                type: GraphQLInt,
                resolve(objectState, args){
                    return objectState.order
                }
            }
        };
    }
}); 

const objectPeriod = new GraphQLObjectType({
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
            }
        };
    }
}); 


//This implements queries for the graphQL
const query = new GraphQLObjectType({
    name: 'query',
    description: 'this query connects the graphql elements',
    fields: () => {
        return {
            archBuilding:{ // comes from the db
                type: new GraphQLList(archBuilding),
                args:{
                    id: { type: GraphQLInt }, title: { type: GraphQLString }, 
                    archStyle: { type: GraphQLString }, latitude: { type: GraphQLString },
                    longitude: { type: GraphQLString }, architect: { type: GraphQLString },
                    description: {type: GraphQLString }, objectStatus: { type: GraphQLInt },
                    objectState: { type: GraphQLInt }, objectPeriod: { type: GraphQLInt },
                    objectType: { type: GraphQLInt }, city: { type: GraphQLString },
                    address: { type: GraphQLString }
                },
                resolve(root, args){
                    return db.models.arch_building.findAll({where: args});
                }
            },
            
            archStyle: { // this name is reflected inside the query itself. Has nothing
                        // to do with the db

                type: new GraphQLList(archStyle),
                args: { id: { type: GraphQLInt }, title : { type: GraphQLString } },
                resolve(root, args){
                    return db.models.arch_style.findAll({where: args}); // this name comes from the db
                }                
            },
            objectStatus: {
                type: new GraphQLList(objectStatus),
                args: { id: { type: GraphQLInt }, title : { type: GraphQLString },
                order: { type: GraphQLInt } },
                resolve(root, args){
                    return db.models.object_status.findAll({where: args});
                }     
            },
            objectState: {
                type: new GraphQLList(objectState),
                args: { id: { type: GraphQLInt }, title : { type: GraphQLString },
                        order: { type: GraphQLInt } },
                resolve(root, args){
                    return db.models.object_state.findAll({where: args});
                }
            },
            objectPeriod: {
                type: new GraphQLList(objectPeriod),
                args: { id: { type: GraphQLInt }, title : { type: GraphQLString },
                        order: { type: GraphQLInt } },
                resolve(root, args){
                    return db.models.object_period.findAll({where: args});
                }
            },
            objectType: {
                type: new GraphQLList(objectType),
                args: { id: { type: GraphQLInt }, title : { type: GraphQLString },
                        order: { type: GraphQLInt } },
                resolve(root, args){
                    return db.models.object_type.findAll({where: args});
                }
            }


            //add more options here for accessing other characteristics
        };
    }
});

module.exports = new GraphQLSchema({
    query: query
});
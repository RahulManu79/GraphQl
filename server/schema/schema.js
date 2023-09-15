
const ProjectModel=require('../models/project')
const ClientModel=require('../models/client');


const { GraphQLID, GraphQLString, GraphQLSchema, GraphQLObjectType, GraphQLList } = require("graphql")

//client Type
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

//Project Type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve(parent,args){
                return clients.findById(parent.id)
            }
        
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parant, args) {
                return ClientModel.find()
            }

        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return ClientModel.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parant, args) {
                return ProjectModel.find()
            }

        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return ProjectModel.findById(args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})
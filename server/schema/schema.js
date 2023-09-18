
const ProjectModel = require('../models/project')
const ClientModel = require('../models/client');


const { GraphQLID, GraphQLString, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require("graphql")

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
            resolve(parent, args) {
                return ClientModel.findById({ _id: parent.clientId})
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


//Mutation
const mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addClient: {
            type: new GraphQLNonNull(ClientType),
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
            },
            resolve(_, args) {
                const Client = new ClientModel({
                    ...args
                })
                return Client.save()
            }
        },
        deleteClient: {
            type: ClientType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parant, args) {
                return ClientModel.findOneAndDelete({ "_id": args.id }).exec();
            }
        },
        //Add Project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            "new": { value: "Not Started" },
                            "progres": { value: "In Progress" },
                            "completed": { value: "Completed" },
                        }
                    }),
                    defaultValue: "Not Started"
                },
                clientId:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let project = new ProjectModel({
                    ...args
                }) 
                return project.save()
            }
        },
        deleteProject: {
            type: ProjectType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parant, args) {
                return ProjectModel.findOneAndDelete({ "_id": args.id }).exec();
            }
        },
        //update project
        updateProject: {
            type: ProjectType,
            args:{
                id:{type: GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString},
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            "new": { value: "Not Started" },
                            "progres": { value: "In Progress" },
                            "completed": { value: "Completed" },
                        }
                    }),
                    defaultValue: "Not Started"
                },
            },
            resolve(parant,args){
                return ProjectModel.findByIdAndUpdate(args.id,{
                    $set:{
                        name:args.name,
                        description:args.description,
                        status:args.status,
                    }
                },{new:true})
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
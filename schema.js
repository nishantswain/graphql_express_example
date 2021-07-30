//*different data types we shall we using.

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')
const axios = require('axios')
console.log(GraphQLString, " j")
//hardcoded data 

const customers = [
    { id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35 },
    { id: '2', name: 'Steve Smith', email: 'steve@gmail.com', age: 32 },
    { id: '3', name: 'Carlos Jacob', email: 'carlos@gmail.com', age: 40 },
    { id: '4', name: 'Sara Williams', email: 'sara@gmail.com', age: 35 }
]

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})


//*graphql schema should have root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                // for (let i = 0; i < customers.length; i++) {
                //     if (customers[i].id === args.id) {
                //         return customers[i];
                //     }
                // }
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data)
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data)
            }
        }
    }

})


module.exports = new GraphQLSchema({
    query: RootQuery
    // mutations: mutations
})
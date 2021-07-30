const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema.js')

const app = express();
//*graphQl awalys requires schema.
//*graphiql is a boolean value, and by making it true we ensure we want to use the IDE.

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen('4000', () => {
    console.log('Listening on 4000')
})


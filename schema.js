const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Test data
const customers = [
  {
    id: '1',
    name: 'KJ Mitchell',
    email: 'kj@gmail.com',
    age: 23
  },
  {
    id: '2',
    name: 'Denzel Washington',
    email: 'd.washington@gmail.com',
    age: 44
  },
  {
    id: '3',
    name: 'Cam Newton',
    email: 'camnewton@gmail.com',
    age: 26
  }
];

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

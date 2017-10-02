
const { find } = require('lodash');
const graphQL = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType
} = graphQL;

const Users = [{
  id: 11,
  name: 'foo'
}];

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: graphQL.GraphQLInt
    },
    name: {
      type: graphQL.GraphQLString
    }
  }
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          name: 'id',
          type: new graphQL.GraphQLNonNull(graphQL.GraphQLID)
        }
      },
      resolve(root, params, options) {
        return find(Users, (user) => user.id === params.id);
      }
    },
  }
});

// TODO implement mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation });

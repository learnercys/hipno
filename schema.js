
const { find } = require('lodash');
const graphQL = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType
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

const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    name: {
      type: graphQL.GraphQLString
    }
  }
});

// TODO implement mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: {
        input: {
          name: 'input',
          type: userInputType
        }
      },
      resolve(root, params, options) {
        const user = {id: Math.floor(Math.random()), name: params.input.name};

        return user;
      }
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation });

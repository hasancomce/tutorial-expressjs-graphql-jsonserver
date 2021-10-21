const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        price: { type: GraphQLInt },
        unitsInStock: { type: GraphQLInt },
    })
});

const BrandType = new GraphQLObjectType({
    name: 'Brand',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        homeland: { type: new GraphQLNonNull(GraphQLString) },
    })
});


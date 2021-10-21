const axios = require('axios');
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        product: {
            type: ProductType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLID) } 
            },
            resolve(parent, args) {
                return axios.get('http://localhost:3000/products/' + args.id).then(res => res.data)
            }
        },
        products: {
            type: GraphQLList(ProductType),
            resolve() {
                return axios.get('http://localhost:3000/products').then(res => res.data)
            }
        },
        brand: {
            type: BrandType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLID) } 
            },
            resolve(parent, args) {
                return axios.get('http://localhost:3000/brands/' + args.id).then(res => res.data)
            }
        },
        brands: {
            type: GraphQLList(BrandType),
            resolve() {
                return axios.get('http://localhost:3000/brands').then(res => res.data)
            }
        },
    }
})

const MyGraphQLSchema = new GraphQLSchema({
    query: RootQuery,
})
module.exports = MyGraphQLSchema
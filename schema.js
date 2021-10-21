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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        productAdd: {
            type: ProductType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                unitsInStock: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return axios.post('http://localhost:3000/products', {
                    id: args.id,
                    title: args.title,
                    price: args.price,
                    unitsInStock: args.unitsInStock,
                }).then(res => res.data)
            }
        },
        productUpdate: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                price: { type: GraphQLInt },
                unitsInStock: { type: GraphQLInt },
            },
            resolve(parent, args) {
                return axios.patch('http://localhost:3000/products/' + args.id, args).then(res => res.data)
            }
        },
        productDelete: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return axios.delete('http://localhost:3000/products/' + args.id).then(res => res.data)
            }
        },
        brandAdd: {
            type: BrandType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                homeland: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return axios.post('http://localhost:3000/brands', {
                    id: args.id,
                    title: args.title,
                    homeland: args.homeland,
                }).then(res => res.data)
            }
        },
        brandUpdate: {
            type: BrandType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                homeland: { type: GraphQLString },
            },
            resolve(parent, args) {
                return axios.patch('http://localhost:3000/brands/' + args.id, args).then(res => res.data)
            }
        },
        brandDelete: {
            type: BrandType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return axios.delete('http://localhost:3000/brands/' + args.id).then(res => res.data)
            }
        }
    }
})

const MyGraphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})

module.exports = MyGraphQLSchema
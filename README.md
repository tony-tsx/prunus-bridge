# @prunus/bridge

A library for fast implementation of a rest api integrated with typeorm, express, commander and some front end tools like webpack. It bridges the gap between client and server in a practical way using the standard typeorm repository api so you can use the find, save, remove syntax on the front end and a highly customizable entity manager.

---

## Install
```sh
yarn add @prunus/bridge express axios;
yarn add -D @types/express;
# or
npm install --save @prunus/bridge express axios;
npm install --save-dev @types/express;
```

### Using webpack
```sh
yarn add @prunus/bridge-webpack-plugin
# or
npm install --save @prunus/bridge-webpack-plugin
```

```ts
import { BridgeWebpackPlugin } '@prunus/bridge-webpack-plugin'

const webpackConfiguration = {
  //  ...webpackConfiguration,
  plugins: [
    // ...webpackConfiguration.plugins,
    new BridgeWebpackPlugin()
  ]
}
```

## Usage
```ts
// User.entity.ts
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export @Entity()
class User {
  @PrimaryGeneratedColumn( 'uuid' ) id: string

  @Column() name: string
  @Column() email: string

  @CreateDateColumn( { type: 'timestamp with time zone' } ) createdAt: Date
  @UpdateDateColumn( { type: 'timestamp with time zone' } ) updatedAt: Date
  @DeleteDateColumn( { type: 'timestamp with time zone' } ) deletedAt: Date
}
```
```ts
// User.bridge.ts
import Bridge from '@prunus/bridge'

const User = Bridge.create( {
  name: 'User',
  uri: 'users',
  getTypeORMEntity: () => import( './User.entity' ).then( module => module.User ),
  getAxiosInstance: () => import( './api.service' ).then( module => module.api )
} )

export default User
```
```ts
// api.service
import Axios from 'axios'

const api = Axios.create()

export { api }
```
```ts
// server.ts
import Express from 'express'
import Bridge from '@prunus/bridge'
import User from './User.bridge'

const app = Express()
app.use( Bridge.handler( User ) )
```

```tsx
// web.tsx
import React, { useEffect, useState } from 'react'
import User from './User.bridge'
const App = () => {
  const [ users, setUsers ] = useState( [] )
  const [ loading, setLoading ] = useState( false )
  const [ error, setError ] = useState( null )
  useEffect( () => {
    setLoading( true )
    User.find()
      .then( setUsers )
      .catch( setError )
      .finally( setLoading.bind( null, false ) )
  }, [] )

  if ( loading ) return <h1>Loading...</h1>
  if ( !users.length ) return <h1>Nothing</h1>

  return (
    <ul>
      {users.map( user => (
        <li key={user.id}>{user.name}</li>
      ) )}
    </ul>
  )
}
```

```ts
// webpack.config.ts
import { BridgeWebpackPlugin } from '@prunus/bridge-webpack-plugin'

const configuration = {
  // ...configuration
  plugins: [
    // ...configuration.plugins
    new BridgeWebpackPlugin()
  ]
}
```

### Typeorm
see [documentation](https://typeorm.io/)

### Bridge Options
|property                                    |type                |required |
|--------------------------------------------|--------------------|---------|
|[name](#option.name)                        |`string`            |yes      |
|[getTypeORMEntity](#option.getTypeORMEntity)|`async function`    |yes      |
|[getAxiosInstance](#option.getAxiosInstance)|`async function`    |no       |
|[uri](#option.uri)                          |`string` \| `object`|no       |
|[connection](#option.connection)            |`string`            |no       |
|[deleteToSoft](#option.deleteToSoft)        |`boolean`           |no       |
|[identifier](#option.identifier)            |`string` \| `symbol`|no       |
|[prototype](#option.prototype)              |`object`            |no       |
|[static](#option.static)                    |`object`            |no       |
|[schema](#option.schema)                    |`object`            |no       |
|[routeOptions](#option.routeOptions)        |`object`            |no       |


#### <a name="option.name"></a>**name**
It is used only for aesthetics of the bridge model, but it is required we want you to understand which bridge is appearing in your log.
#### <a name="option.getTypeORMEntity"></a>**getTypeORMEntity**
We need to know which entity you are using on the back end and this is the right way that you are using the correct entity, it has to be an asynchrona call for the entity of preference always do the import of the entity within that call, so we will be sure that the extensions that make the bridge work on the front end are doing the job right.
#### <a name="option.getAxiosInstance"></a>**getAxiosInstance**
We need to make the request somehow and axios was chosen! So we have this option for us to understand how the requests will work, that is, if you want to use a vhost feel free, but don't forget to pass the axios service to us.
#### <a name="option.uri"></a>**uri**
Uri's are really cheating, but not! You can pass the uri as a string so it will be used in two ways :
```ts
// bridge server side method

route.get( option.uri, ...handlers ) // <- here

// bridge client side method

axios.get( option.uri ) // <- here
```
"But hey I'm going to use it on a sub route"

Don't worry we think about it, so the uri option can also be an object with two mandatory properties `handler` and `request`. As the name says, each one will be used in a different part of the bridge:
```ts
// bridge server side method

route.get( option.uri.handler, ...handlers )

// bridge client side method

axios.get( option.uri.request )
```

**I almost forgot, if you don't declare this property we will use the property name.**

#### <a name="option.connection"></a>**connection**
Obviously the name of the connection that we will take to make the typeorm work, if the entity is not in that connection you can expect the same errors that you would expect if it happened in the typeorm itself (final will happen in it). 

#### <a name="option.deleteToSoft"></a>**deleteToSoft**
A magical property, as we will take care of your basic CRUD may be that you do not want the front end to be able to delete real data, so any delete or remove will be converted to softDelete and softRemove respectively.
#### <a name="option.identifier"></a>**identifier**
With this property you will be able to take your bridge wherever you are, including the options created with it.

If you pass an identifier that already exists you will receive an error, if this property is not passed you will only be able to get this information with the bridge itself.
#### <a name="option.prototype"></a>**prototype**
Let's not even need to wrap it up. Every instance born with a `new AnyBridge()` will receive this prototype as well as classes in javascript, remembering also that the return of a bridge creation is exactly a class in javascript so you can change the prototype in flight time.
#### <a name="option.static"></a>**static**
This property will only add static properties to the class.
#### <a name="option.schema"></a>**schema**
Validation is always important especially when it comes to api, so we chose yup for that. In this property you will be able to pass an ObjectSchema that you consider to be best suited to the needs of your entity. If you don't pass this, we will generate one with the typeorm metadata, something very basic. It is very important that you pass an ObjectSchema if you have some very specific scenarios in your database as validation of national documents, if you do not pass this schema we will return a database error, and this is certainly not what anyone wants.
#### <a name="option.routeOptions"></a>**routeOptions**
Finally an option that you will be able to set options on the generator handlers across the bridge.

  - defaultOptions
 
    There are all the options of all the methods of the repository, such as save, update, delete, remove, find, etc ... They will be united with the route options passed by query params, they will be united with the tool @cookiex/deep.

  - handlers

    Routes that will be joined with the bridge route, they can only be end-of-response routes because if you have a next one without an error it will just fall into one without the preparation for the bridge, or it will not be that you are creative . The objects are separated in http methods and then immediately separated by paths with the value being a `Express.RequestHandler`

  - handlersMiddlewares

    They are middleware between the beginning of the specified request and the end of the response, you will be on the path between them as soon as you define any method here, and you can even replace the original. At this point, query params did not go through the parser that transforms bridge operators into typeorm operators. Then you can call them any way you like.

    To access the bridge you can of course call it statically or you can find it in the request, `req.bridge`.
    ```ts
    const handler = ( req, res, next ) => {
      req.bridge // your favorite bridge 
    }
    ```
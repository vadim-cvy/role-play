import mongoose = require( 'mongoose' )

// Connect to MongoDB
mongoose.connect( 'mongodb://localhost:27017/myapp' )

const connection = mongoose.connection

connection.on( 'error', console.error.bind( console, 'connection error:' ) )

connection.once( 'open', () => console.log( 'Connected to MongoDB' ) )

export default connection
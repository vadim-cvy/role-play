import mongoose = require( 'mongoose' )

// Connect to MongoDB
mongoose.connect( 'mongodb://localhost:27017/myapp' )

const db = mongoose.connection

db.on( 'error', console.error.bind( console, 'connection error:' ) )

db.once( 'open', () => console.log( 'Connected to MongoDB' ) )

export default db
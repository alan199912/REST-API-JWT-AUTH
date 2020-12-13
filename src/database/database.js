import mongoose from 'mongoose'

try {
    mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    console.log('db is connected')
} catch (error) {
    console.log(error.message)
}
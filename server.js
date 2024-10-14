import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'

const app = express()
app.use(express.json())

app.use('/usuarios', publicRoutes) //verifica 
app.use('/usuarios', privateRoutes)


app.listen(3000, () => console.log("Servidor Atuando 🚀"))
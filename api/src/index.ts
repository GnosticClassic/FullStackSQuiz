//import { json } from 'express'
import express, {json,urlencoded} from 'express'
import quizRoutes from './routes/quizRoutes'
import authRoutes from './routes/authRoutes'


const port = 3000
const app = express()

app.use(urlencoded({extended:false}))
app.use(json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Initialize Routes
app.use("/quizzes", quizRoutes);
app.use('/auth',authRoutes)

//server listening port
app.listen(port, () => {
    console.log(`Server is running at htttp://localhost:${port}`)
})
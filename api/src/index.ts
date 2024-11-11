import express from 'express'
import quizRoutes from './routes/quizRoutes'


const port = 3000
const app = express()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/quizzes", quizRoutes);
app.listen(port, () => {
    console.log(`Server is running at htttp://localhost:${port}`)
})
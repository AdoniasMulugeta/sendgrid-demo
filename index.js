import express from 'express'
import dotenv from 'dotenv'

import Email from './src/Email'
import * as sendGrid from './src/sendGrid'

const app = express()
const port = 3000
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * send account verification email to user
 * This isn't a very ideal example, but it should do for the purposes of the demo
 */
app.post('/sendEmailVerification', async (request, response, next) => {
    // auth middleware will be used to authenticate request
    // data validation will be done here
    try {
        const emailClient = new Email(sendGrid)
        response.json(await emailClient.send(request.body))
    } catch (error) {
        next(error)
    }
})

/**
 * Handle errors sent to next()
 */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
});
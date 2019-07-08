import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { configAccessHeader, config } from './src/config'
import MailScheduleJobs from './src/jobs'

const app = express()
const apiRoutes = express.Router()

app.use(configAccessHeader)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

new MailScheduleJobs().RunJobs()

app.listen(config.port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`Mail server of schedule of lending branch listen on port ${config.port}`)
    }
})
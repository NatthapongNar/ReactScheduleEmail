import nodemailer from 'nodemailer'
import moment from 'moment'
import { config } from '../config'
import { CronJob } from 'cron'
import { checkPeriodTime } from '../hook'
import { getDefendList, setDefendLogs } from '../api'
import _ from 'lodash'

const { mailer, schedule } = config

module.exports = class MailScheduleJobs {
    constructor() {}

    RunJobs() {
        try {

            let job_s1 = new CronJob({
                cronTime: `${schedule.job[0]} ${schedule.workingDay}`,
                onTick: function (e) {
                    console.log(`The schedule is working start on ${moment().format('DD/MM/YYYY')} 10:00`)
                    getDefendList().then((resp) => { loadDefendDate(resp.recordset) })
                },
                start: false,
                timeZone: schedule.timeZone
            });

            job_s1.start()

            let job_s2 = new CronJob({
                cronTime: `${schedule.job[1]} ${schedule.workingDay}`,
                onTick: function (e) {
                    console.log(`The schedule is working start on ${moment().format('DD/MM/YYYY')} 14:00`)
                    getDefendList().then((resp) => { loadDefendDate(resp.recordset) })
                },
                start: false,
                timeZone: schedule.timeZone
            });

            job_s2.start()

            let job_s3 = new CronJob({
                cronTime: `${schedule.job[2]} ${schedule.workingDay}`,
                onTick: function (e) {
                    console.log(`The schedule is working start on ${moment().format('DD/MM/YYYY')} 16:00`)
                    getDefendList().then((resp) => { loadDefendDate(resp.recordset) })
                },
                start: false,
                timeZone: schedule.timeZone
            });

            job_s3.start()

        } catch (ex) {
            console.log(`Exception: cron pattern not valid \n\r Catch exception was ${ex}`)
        }

        const loadDefendDate = (result) => {
            if (result && result.length) {
                let content = '';
                _.each(result, (data, index) => {

                    let No = (data.No) ? data.No : ''
                    let AppNo = (data.ApplicationNo) ? data.ApplicationNo : ''
                    let IDCard = (data.IDCard) ? data.IDCard : ''
                    let BorrowerName = (data.BorrowerName) ? data.BorrowerName : ''
                    let Regional = (data.RegionName) ? data.RegionName : ''
                    let BranchDigit = (data.BranchDigit) ? data.BranchDigit : ''
                    let BranchName = (data.BranchName) ? data.BranchName : ''
                    let RMName = (data.RMName) ? data.RMName : ''
                    let RMMobile = (data.RMMobile) ? data.RMMobile : ''
                    let CreateDate = (data.CreateDate) ? moment(data.CreateDate).format('DD/MM/YYYY') : ''

                    content += `
                        <tr>
                            <td style="color: #666;">${No}</td>
                            <td style="color: #666;">${AppNo}</td>
                            <td style="color: #666;">${IDCard}</td>
                            <td style="color: #666;">${BorrowerName}</td>			
                            <td style="color: #666;">${Regional}</td>
                            <td style="color: #666;">${BranchDigit}</td>
                            <td style="color: #666;">${BranchName}</td>
                            <td style="color: #666;">${RMName}</td>
                            <td style="color: #666;">${RMMobile}</td>				
                            <td style="color: #666;">${CreateDate}</td>
                        </tr>
                    `
                })

                let html_content = getTemplate(content)
                if (html_content && html_content !== '') {
                    sentEmailHandler(html_content)
                }

            } else {
                console.log('Not found items.')
            }
        }

        const getTemplate = (content) => {
            if (content) {
                moment.locale('th');
                let today = moment().format('ll')
                var html = `
                    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
                        <html xmlns="http://www.w3.org/1999/xhtml">
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                            <style>
                            html,body,table,th,td,p,div,span {font-family: Gill Sans,sans-serif;font-variant: normal;font-style: normal;}
                            table{border: 1px solid #D1D1D1;}
                            th,td{padding:5px; font-size:100%;border: 1px solid #D1D1D1;}
                            </style>
                        </head>
                        <body>
                            <p>เรียน CA Team</p>
                            <p>ขออนุญาตแจ้งรายชื่อลูกค้าที่ขอ Defend Application ของทีม Lending Branch ประจำวันที่ ${moment().format('DD/MM/YYYY HH')}:00</p>
                            <h3 style="font-style: oblique;">Report: Defend List</h3>
                            <table id="grid_table" border="1" cellpadding="0" cellspacing="0" height="100%" width="auto">
                                <thead style="background-color: #286090;">
                                    <tr>
                                        <th style="color: #FFF;">No</th>
                                        <th style="color: #FFF;">Application No</th>
                                        <th style="color: #FFF;">ID Card</th>
                                        <th style="color: #FFF;">Borrower Name</th>		          
                                        <th style="color: #FFF;">Region Name</th>
                                        <th style="color: #FFF;">Branch Digit</th>
                                        <th style="color: #FFF;">Branch Name</th>
                                        <th style="color: #FFF;">RM Name</th>
                                        <th style="color: #FFF;">RM Mobile</th>          
                                        <th style="color: #FFF;">Create Date</th>
                                    </tr>
                                </thead>
                                <tbody id="grid_table_body">
                                    ${content}
                                </tbody>
                            </table>   
                            <br/>
                            <br/>
                            <br/>
                            <p style="color: gray; font-size: 1.2em;">PCIS</p>
                            <p style="color: gray; font-size: 1em;">Thank you.</p>
                        </body>
                    </html>
                `

                return html

            } else {
                return content
            }
        }

        const sentEmailHandler = (content) => {
            let transporter = nodemailer.createTransport(mailer.smtp, mailer.header)
            let mailOptions = {
                from: mailer.config.from,
                to: mailer.config.to,
                cc: mailer.config.cc,
                subject: `PCIS : (LB) ส่งข้อมูลรายการขอ Defend App ประจำวันที่ ${moment().format('DD/MM/YYYY HH')}:00`,
                html: content
            }

            transporter.verify((error, success) => {
                if (error) console.log(error)
                else {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error.message)
                            return process.exit(1)
                        }

                        console.log('Message sent successfully')

                        setDefendLogs().then((resp) => { console.log('Proccess completed, the schedule standby for next time...') })

                        transporter.close()
                    })
                }
            })
        }
    }
}
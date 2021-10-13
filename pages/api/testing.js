import { CronJob } from 'cron'

export default async function (req, res) {
    // const CronJob = require('../lib/cron.js').CronJob;

    console.log('Before job instantiation');
    // let d = '2021-10-12T13:44'
    let d = req.body.time;
    let date = new Date(d);
    console.log(date)
    // date.setMinutes(date.getMinutes()+2);
    console.log(date)
    const job = new CronJob(date, function () {
        const d = new Date();
        console.log('Specific date:', date, ', onTick at:', d);
        const link = `${process.env.host}/question/${saveQuestion?._id}`;
        const data = { subject: `New Question added`, text: link, email: `ankit628792@gmail.com`, html: `Click <a href="${link}" target="_blank">View Question</a>` };
        const result = await sendEMail(data);
    
    });
    console.log('After job instantiation');
    job.start();
    res.status(203).send({ msg: 'pending ..' })
}
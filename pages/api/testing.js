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
    });
    console.log('After job instantiation');
    job.start();
    res.status(203).send({ msg: 'pending ..' })
}
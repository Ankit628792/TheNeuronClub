import {CronJob} from 'cron'

export default async function(){
    // const CronJob = require('../lib/cron.js').CronJob;

    console.log('Before job instantiation');
    let date = new Date();
    date.setMinutes(date.getMinutes()+2);
    const job = new CronJob(date, function() {
        const d = new Date();
        console.log('Specific date:', date, ', onTick at:', d);
    });
    console.log('After job instantiation');
    job.start();

}
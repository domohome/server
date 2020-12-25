import {scheduleJob, Job} from 'node-schedule';

export namespace SchedulerService {
    let heatJob: Job;
        

    export function addHeatJob(startHour: number ) {
        deleteHeatJob();
        heatJob = scheduleJob('42 * * * *', function(){
            console.log('The answer to life, the universe, and everything!');
          });
          console.log(heatJob.name);
    }

    export function deleteHeatJob() {
        if(heatJob) {
            heatJob.cancel();
        }
    }

    export function getJob() {
        if(heatJob) {
            
        }
    }
}
import {scheduleJob, Job} from 'node-schedule';
import { AirtonDriver } from '../Drivers/AirtonDriver';


export namespace SchedulerService {
    let heatJob: Job;
        

    export function addHeatJob(startHour: number ) {
        deleteHeatJob();
        heatJob = scheduleJob(`0 ${startHour} * * *`, ()=>{
            AirtonDriver.setOn24Hot();
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

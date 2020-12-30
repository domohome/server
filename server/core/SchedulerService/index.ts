import {scheduleJob, Job} from 'node-schedule';
import { AirtonDriver } from '../Drivers/AirtonDriver';
import {Logger} from 'tslog';


export namespace SchedulerService {
  const log = new Logger();
  let heatJob: Job;
  let hour:number | undefined;         

  export function addHeatJob(startHour: number ) {
    deleteHeatJob();
    hour = startHour;
    heatJob = scheduleJob(`0 ${startHour} * * *`, ()=>{
      log.debug("Sending on24Hot command to Airton salon"); 
      AirtonDriver.setOnhotSleep();
    });
  }

  export function deleteHeatJob() {
    if(heatJob) {
      heatJob.cancel();
      hour = undefined;
    }
  }

  export function getJob() {
    if(heatJob) {
      return {hour: hour, enable:true };
    } else {
      return {hour: undefined, enable: false};
    }

  }
}

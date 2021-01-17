import {scheduleJob, Job} from 'node-schedule';
import { AirtonDriver } from '../Drivers/AirtonDriver';
import {Logger} from 'tslog';

export class DailyJob {
  private scheduleJob: Job;

  constructor(
    hour: number | undefined,
    enable: boolean,
    callback: Function) {

    this.scheduleJob = scheduleJob(`0 ${hour} * * *`, () => {
      callback();
    });
  }

  public cancel() {
    this.scheduleJob.cancel();
  }

  public set hour(hour: number | undefined) {
    //TODO
  }
  public get hour(): number | undefined {
    //TODO
  }

  public set enable(enable: boolean) {
    //TODO
  }

  public get enable() : boolean {
    //TODO
  }

}

export namespace SchedulerService {
  const log = new Logger();
  let heatJob: Job;
  let job: DailyJob;

  export function addHeatJob(startHour: number ) {
    deleteHeatJob();
    job = new DailyJob(startHour, true, () => {
      log.info('Heat service starting daily job');
      AirtonDriver.setOnhotSleep();
    });
  }

  export function deleteHeatJob() {
    if(heatJob) {
      heatJob.cancel();
      job.hour = undefined;
    }
  }

  export function getJob(): {hour: number | undefined, enable: boolean} {
    return {hour: job.hour, enable: job.enable };
  }
}

import {readFileSync, existsSync, writeFileSync} from "fs";
import {DailyJob} from "../SchedulerService";

export class Configuration {

  private file: string;

  private _data = {
    scheduleService: {
      heat: undefined
    },
    devices: []
  };

  public static INSTANCE: Configuration;

  constructor(configDirectory: string) {
    this.file = configDirectory + 'database.json';
    if( existsSync(this.file)) {
      const data =  JSON.parse(
	readFileSync(configDirectory).toString()
      );
      this._data = data;
    } else {
      this.save();
    }

    Configuration.INSTANCE = this;
  }

  private save() {
    const data = JSON.stringify(this._data);
    writeFileSync(this.file, data);
  }

  public get data() {
    return this._data;
  }

  public scheduleHeat(ss: DailyJob ) {
	this._data.scheduleService.heat = ss;
    	this.save();
  }
}

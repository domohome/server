import { controller, httpGet, httpPost, interfaces } from 'inversify-express-utils';
import { Response, Request } from 'express';
import { AirtonDriver } from '../../core/Drivers/AirtonDriver';
import { SchedulerService } from '../../core/SchedulerService';

interface jobsOrder {
    enable: boolean;
    hours: number;
}


@controller('/')
export class SiteController implements interfaces.Controller {

    @httpGet('/')
    public async get(req: Request, res: Response) {
        res.status(200).send(html);
    }
}



const html = `
<html>

<body>
    <div>
        <input id="on" onclick="on()" type="button" value="ON">
        <input id="off" onclick="off()" type="button" value="OFF">
        <input id="hour" type="number">
        <input id="job" onclick="updateJob()" type="button" value="set JOB">
        <input id="password" type="password">
    </div>
</body>
<script>
function on() {
    post("/home/heat", {enable: true});
}
function off() {
    post("/home/heat", {enable: false});
}

function updateJob() {
    console.log("sending job");
    const hours = document.getElementById("hour");
    post('/home/job', {enable: true, hours: hours.value});
}

function post(url, data) {
    const password = document.getElementById("password");
    data["password"] = password;
    const d = JSON.stringify(data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Length", d.length.toString());

    fetch(url, {
      method: "POST",
      body: d,
      headers: myHeaders,
    });
}

</script>

</html>

`
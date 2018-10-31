/*var data = new Date();
var Hh, Mm, Ss, mm;
Hh = data.getHours() + ":";
Mm = data.getMinutes() + ":";
Ss = data.getSeconds() + ":";
mm = data.getMilliseconds() + ":";*/

function subscribe() {

    query = "PREFIX wot: <http://mml.unibo.arces.it/wot#>  SELECT * FROM wot:shm WHERE{?sensor wot:accZ ?accZ}";
    const sepa = Sepajs.client;

    sepa.subscribe(query, {
            next(val) {
                console.log("Data received: " + val);
                msg = JSON.parse(val);

                /*setInterval(function () {
                    graph.push([{time: new Date().getTime(), y: 1000},{time: 200044800, y: 5000}]);
                    graph2.push( [{time: new Date().getTime(), y: 1500}]);
                }, 1000)
*/

                date = new Date();
                if (msg["notification"] !== undefined) {
                    len = msg["notification"]["addedResults"]["results"]["bindings"].length - 1;
                    for (index = 0; index <= len; index++) {
                        binding = msg.notification.addedResults.results.bindings[index];

                        sens = binding.sensor.value;
                        acc = binding.accZ.value;

                        if(sens === "http://mml.unibo.arces.it/wot#shm8"){
                            graph8.push([{time: date.getTime(), y: acc}]);
                        }else if(sens === "http://mml.unibo.arces.it/wot#shm9") {
                            graph9.push([{time: date.getTime(), y: acc}]);
                        }

                    }

                } else {
                    console.log(msg);
                }
            },
            error(err) {
                console.log("Received an error: " + err)
            },
            complete() {
                console.log("Server closed connection ")
            },
        },

        {host: "mml.arces.unibo.it"});
}


Object.defineProperty(exports, "__esModule", {value: true});
let express = require('express');
const fs = require("fs");
const path = require("path");

let app = express();
let router = express.Router();

// app.use(logger('dev'));
app.use(function (req, res, next) {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/api', router);


function getData() {
    let api = [];
    const baseDir = __dirname + "/../public/result/";
    const jsonsInDir = fs.readdirSync(baseDir).filter(file => path.extname(file) === '.json');
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(path.join(baseDir, file));
        const json = JSON.parse(fileData.toString());
        api.push(json)
    });
    return api.filter(v => v.step.type === "http");
}

function filterData(api) {
    let filteredData = {raw: api, data : []};
    api.forEach(element => {
        let testSuite = filteredData[element.variables['venom.testsuite']];
        testSuite.set(element.step.url, {
                [element.step.method]:
                    {
                        result: element.result, name: element.variables["venom.testcase"],
                        info: element.step.info || ""
                    }
            })
        filteredData[element.variables['venom.testsuite']] = testSuite;
    })
    return filteredData;
}

router.get('/venom/results', async function (req, res, next) {
    try {
        const api = getData();
        res.status(200).json({api: filterData(api)});
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e.message});
        return;
    }
});

app.listen(process.env.PORT || 3002, '0.0.0.0', function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3002))
});
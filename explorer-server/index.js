Object.defineProperty(exports, '__esModule', {value: true});
let express = require('express');
const fs = require('fs');
const path = require('path');

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

const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
    }, {}); // empty object is the initial value for result object
};

function getData() {
    let api = [];
    const baseDir = __dirname + '/public/result/';
    const jsonsInDir = fs.readdirSync(baseDir).filter((file) => path.extname(file) === '.json');
    jsonsInDir.forEach((file) => {
        const fileData = fs.readFileSync(path.join(baseDir, file));
        const json = JSON.parse(fileData.toString());
        api.push(json);
    });
    return api.filter((v) => v.step.type === 'http');
}

function filterData(api) {
    // Filter data
    let filteredData = {};
    api.forEach((element) => {
        let groupName = element.variables['venom.testcase'].indexOf("-") >= 0 ? element.variables['venom.testcase'].split("-")[0] : element.variables['venom.testsuite'];
        let key = element.step.tag !== undefined ? element.step.tag : groupName;
        let testSuite = filteredData[key] || [];
        let rawURL = element.step.url.replace(/^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '')


        testSuite.push({
            url: rawURL.split("?")[0],
            params: rawURL.split("?")[1] !== undefined ? rawURL.split("?")[1].split("&") : [],
            method: element.step.method,
            isAuth: element.step.headers !== undefined && element.step.headers.Authentication !== undefined,
            code: element.result.statuscode,
            result: element.result,
            name: element.variables['venom.testcase'],
            info: element.step.info || '',
        });
        filteredData[key] = testSuite;
    });

    /// Group data by URLS
    let groupedData = {};
    Object.entries(filteredData).forEach((element) => {
        let testSuite = groupedData[element[0]] || [];
        testSuite.push(groupBy(filteredData[element[0]], 'url'));
        groupedData[element[0]] = testSuite;
    });

    // Group data by Methods and status code, it's bad code...
    Object.entries(groupedData).forEach((element) => {
        let testSuite = groupedData[element[0]] || [];
        Object.entries(testSuite[0]).forEach((element2) => {
            let groupedByMethod = groupBy(testSuite[0][element2[0]], 'method');
            Object.entries(groupedByMethod).forEach((element3) => {
                groupedByMethod[element3[0]] = groupBy(groupedByMethod[element3[0]], 'code');
            });
            testSuite[0][element2[0]] = groupedByMethod;
        });
        groupedData[element[0]] = testSuite;
    });

    let result = {raw: api, data: groupedData};
    return result;
}

router.get('/venom/results', async function (req, res, next) {
    try {
        const api = getData();
        res.status(200).json({api: filterData(api)});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
        return;
    }
});

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 3002, '0.0.0.0', function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3002));
});

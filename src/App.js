import {LinkIcon, ExclamationCircleIcon} from '@heroicons/react/20/solid';
import {config} from "./configs/config";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function App() {
    const notify = (message) => toast(message);

    const [API, setAPI] = useState([]);
    const [baseURI, setBaseURI] = useState('localhost');
    const [apiVer, setApiVer] = useState('v1');
    const loadResults = async () => {
        try {
            const res = await fetch("http://localhost:3002/api/venom/results");
            const api = (await res.json()).api;
            setAPI(api);
        } catch (e) {
            console.error(e)
            notify(`Something went wrong`)
        }

    }
    useEffect(() => {
        loadResults().then(() => {
            setBaseURI(API.raw[0].variables.URL || "localhost");
            setApiVer(API.raw[0].variables.API_VER || "v1");
        });
        console.log(API)
    }, []);


    return (
        <div className="container mx-auto max-w-6xl p-8 2xl:px-0 text-white">
            <div className="lg:flex lg:items-center lg:justify-between mb-10">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                        {config.projectName}
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <ExclamationCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            {config.projectDescription}
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4">
					<span className="ml-3 hidden sm:block">
						<a
                            type="button"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            href="https://github.com/ovh/venom"
                        >
							<LinkIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                                aria-hidden="true"
                            />
							Venom CLI package
						</a>
					</span>
                </div>
            </div>

            <div className="bg-green-400 rounded mb-10">
                <div className="mx-auto max-w-1xl py-1 px-1 sm:px-6 lg:px-1"></div>
            </div>


            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Constants</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">BASE URI</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{baseURI}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">API Version</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{apiVer}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="bg-green-500 rounded mt-10 mb-10">
                <div className="mx-auto max-w-1xl py-4 px-4 sm:px-6 lg:px-1">

                </div>
            </div>

        </div>
    );
}

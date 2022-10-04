import {
	LinkIcon,
	ExclamationCircleIcon,
	ArrowDownCircleIcon,
	CheckCircleIcon,
	ArrowRightCircleIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	SunIcon,
	MoonIcon,
} from '@heroicons/react/20/solid';
import { config } from './configs/config';
import { useEffect, useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Tab, Disclosure } from '@headlessui/react';
import './App.css';
import { JSONTree } from 'react-json-tree';

export default function App() {
	const notify = (message) => toast(message);

	const [API, setAPI] = useState([]);
	const [baseURI, setBaseURI] = useState('localhost');
	const [apiVer, setApiVer] = useState('v1');
	const [groups, setGroups] = useState([]);
	const [isDay, setIsDay] = useState(false);

	const codeBg = {
		200: 'bg-green-500',
		500: 'bg-red-500',
		400: 'bg-gray-500',
		201: 'bg-green-300',
	};

	const loadResults = async () => {
		try {
			const res = await fetch('/api/venom/results');
			const api = (await res.json()).api;
			setBaseURI(api.raw[0].variables.URL || 'localhost');
			setApiVer(api.raw[0].variables.API_VER || 'v1');
			setAPI(api);
			setGroups(Object.keys(api.data));
		} catch (e) {
			console.error(e);
			notify(`Something went wrong`);
		}
	};
	useEffect(() => {
		loadResults().then();
		console.log(API);
	}, []);

	const filterData = (event) => {
		const searchValue = event.target.value;
		if (String(searchValue).length === 0) {
			loadResults().then();
			return;
		}
		const api = API;
		Object.entries(api.data).map((e) => {
			api.data[e[0]][0] = Object.fromEntries(
				Object.entries(api.data[e[0]][0]).filter(([key]) => key.includes(searchValue)),
			);
		});
		setAPI(api);
		setGroups(Object.keys(api.data));
	};

	return (
		<div className="container mx-auto max-w-6xl p-8 2xl:px-0">
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
							<LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
							Venom CLI package
						</a>
					</span>
				</div>
				<div className="mt-5 flex lg:mt-0 lg:ml-4">
					<span className="ml-3 hidden sm:block">
						<button
							type="button"
							className="inline-flex items-center rounded-3xl border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							onClick={() => {
								setIsDay(!isDay);
								document
									.querySelector('html')
									.setAttribute('data-theme', isDay ? 'dark' : 'pastel');
							}}
						>
							{!isDay ? (
								<SunIcon
									className="inline animate-pulse right-0 h-6 w-6 text-gray-400"
									aria-hidden="true"
								/>
							) : (
								<MoonIcon
									className="inline animate-pulse right-0 h-6 w-6 text-gray-400"
									aria-hidden="true"
								/>
							)}
						</button>
					</span>
				</div>
			</div>

			<div className="bg-green-500 rounded mt-1 mb-1">
				<div className="mx-auto py-1 px-1">
					<input
						className="bg-green-600 appearance-none border-1 border-green-600 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:border-green-500 focus:border-green-400 placeholder-green-500 text-center"
						type="text"
						placeholder="API URL"
						onChange={filterData}
					/>
				</div>
			</div>

			<div className="bg-green-400 rounded mb-1">
				<div className="mx-auto max-w-1xl py-1 px-1 sm:px-6 lg:px-1"></div>
			</div>

			<div className="overflow-hidden bg-green-400 shadow sm:rounded-lg mb-8">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg font-medium leading-6 text-gray-900">Constants</h3>
				</div>
				<div className="border-t border-gray-200">
					<dl>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">BASE URI</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{baseURI || config.baseUrl}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">API Version</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{apiVer || config.APIVer}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			{groups.length > 0 ? (
				groups.map((value) => (
					<div className="overflow-hidden bg-white shadow sm:rounded-lg mb-8">
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg font-medium leading-6 text-gray-900">{value}</h3>
						</div>
						<div className="border-t border-gray-200">
							<dl>
								{Object.keys(API.data[value][0]).map((url) => (
									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-5 border-b border-gray-200">
										<Disclosure>
											{({ open }) => (
												<>
													<Disclosure.Button className="text-2xl text-left w-full bg-gray-300 rounded px-2 py-2 text-gray-400 sm:col-span-3">
														<dt className="flex justify-between">
															<ArrowRightCircleIcon
																className="inline h-8 w-8 text-gray-400"
																aria-hidden="true"
															/>{' '}
															<span>
																/{url}{' '}
																<span className="font-thin ml-2">
																	{Object.values(Object.values(API.data[value][0][url])[0])[0][0][
																		'name'
																	] || ''}
																</span>
															</span>
															{open ? (
																<ChevronUpIcon
																	className="inline animate-pulse right-0 h-8 w-8 text-gray-400"
																	aria-hidden="true"
																/>
															) : (
																<ChevronDownIcon
																	className="inline animate-pulse text-right h-8 w-8 text-gray-400"
																	aria-hidden="true"
																/>
															)}
														</dt>
													</Disclosure.Button>
													<Disclosure.Panel className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
														<dd className="">
															{Object.keys(API.data[value][0][url]).map((method) => (
																<div className="border-t border-gray-200">
																	<dl>
																		<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																			<dt className="text-sm font-medium text-gray-500">METHOD</dt>
																			<dd className="mt-1 text-lg font-medium text-red-400 sm:col-span-2 sm:mt-0">
																				{method}
																			</dd>
																		</div>
																		<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																			<dt className="text-sm font-medium text-gray-500">Name</dt>
																			<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
																				{Object.values(API.data[value][0][url][method])[0][0]
																					.name || ''}
																			</dd>
																		</div>
																		<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																			<dt className="text-sm font-medium text-gray-500">
																				Description
																			</dt>
																			<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
																				{Object.values(API.data[value][0][url][method])[0][0]
																					.info || ''}
																				}
																			</dd>
																		</div>
																		<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																			<dt className="text-sm font-medium text-gray-500">Queries</dt>
																			<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
																				<Tab.Group>
																					<Tab.List>
																						<span className="font-thin">Result status: </span>
																						{Object.keys(API.data[value][0][url][method]).map(
																							(code) => (
																								<Tab
																									as={Fragment}
																									className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-2`}
																								>
																									{({ selected }) => (
																										<span>
																											{selected ? (
																												<CheckCircleIcon
																													className="h-5 w-5 flex-shrink-2 text-gray-400 mr-3"
																													aria-hidden="true"
																												/>
																											) : (
																												''
																											)}{' '}
																											{code}
																										</span>
																									)}
																								</Tab>
																							),
																						)}
																					</Tab.List>
																					<Tab.Panels>
																						{Object.keys(API.data[value][0][url][method]).map(
																							(code) => (
																								<Tab.Panel
																									className={`items-center justify-center rounded-md ${
																										codeBg[code] || 'bg-indigo-500'
																									} text-white px-4 py-2`}
																								>
																									{API.data[value][0][url][method][code].map(
																										(res, index) => (
																											<Disclosure>
																												<Disclosure.Button className="block justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mb-2 mt-2 rounded items-center">
																													Query [{index}]
																												</Disclosure.Button>
																												<Disclosure.Panel className="text-white">
																													<div className="mb-2 border-t border-dashed">
																														<dl>
																															<div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																																<dt className="text-sm font-medium text-white">
																																	Request:
																																</dt>
																																<dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
																																	<span className="block text-sm font-medium border-b border-gray-200 mb-2">
																																		[{res.result.request.method}]{' '}
																																		{res.result.request.url} -{' '}
																																		{res.result.timeseconds}s{' '}
																																	</span>
																																	<span className="block text-sm font-medium mb-2">
																																		HEADERS:
																																	</span>
																																	<pre>
																																		<code className="block pre bg-gray-600 px-6 py-2 rounded">
																																			{JSON.stringify(
																																				res.result.request.headers,
																																			)}
																																		</code>
																																	</pre>
																																	JSON Tree:
																																	<JSONTree
																																		data={
																																			res.result.request.headers ||
																																			{}
																																		}
																																	/>
																																	<span className="block text-sm font-medium mb-2">
																																		BODY:
																																	</span>
																																	<pre>
																																		<code className="block pre bg-gray-700 px-6 py-2 rounded">
																																			{res.result.request.body ||
																																				'None'}
																																		</code>
																																	</pre>
																																	JSON Tree:
																																	<JSONTree
																																		data={JSON.parse(
																																			res.result.request.body ||
																																				'{}',
																																		)}
																																	/>
																																</dd>
																															</div>
																															<div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-2 sm:px-6">
																																<dd className="flex justify-center mt-1 text-sm text-white">
																																	<ArrowDownCircleIcon
																																		className="h-8 w-8 flex-shrink-2 text-gray-400"
																																		aria-hidden="true"
																																	/>
																																</dd>
																															</div>

																															<div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																																<dt className="text-sm font-medium text-white">
																																	Response:
																																</dt>
																																<dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
																																	<span className="block text-sm font-medium mb-2">
																																		{' '}
																																		CODE: {
																																			res.result.statuscode
																																		}{' '}
																																	</span>
																																	<span className="block text-sm font-medium mb-2">
																																		HEADERS:
																																	</span>
																																	<pre>
																																		<code className="block pre bg-gray-600 px-6 py-2 rounded">
																																			{JSON.stringify(
																																				res.result.headers,
																																			)}
																																		</code>
																																	</pre>
																																	JSON Tree:
																																	<JSONTree
																																		data={res.result.headers || {}}
																																	/>
																																	<span className="block text-sm font-medium mb-2">
																																		BODY:
																																	</span>
																																	<pre>
																																		{' '}
																																		<code className="block pre bg-gray-700 px-6 py-2 rounded">
																																			{res.result.body || 'None'}
																																		</code>
																																	</pre>
																																	JSON Tree:
																																	<JSONTree
																																		data={res.result.bodyjson || {}}
																																	/>
																																</dd>
																															</div>
																														</dl>
																													</div>
																												</Disclosure.Panel>
																											</Disclosure>
																										),
																									)}
																								</Tab.Panel>
																							),
																						)}
																					</Tab.Panels>
																				</Tab.Group>
																			</dd>
																		</div>
																	</dl>
																</div>
															))}
														</dd>
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									</div>
								))}
							</dl>
						</div>
					</div>
				))
			) : (
				<span className="block text-center mb-8">
					<span className="animate-pulse text-4xl font-thin text-gray-500 ">ROUTES NOT FOUND</span>
				</span>
			)}

			<div className="bg-green-400 rounded mb-1">
				<div className="mx-auto max-w-1xl py-1 px-1 sm:px-6 lg:px-1"></div>
			</div>
		</div>
	);
}

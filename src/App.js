import {
    LinkIcon,
    ExclamationCircleIcon
} from '@heroicons/react/20/solid'

export default function App() {
    return (
        <div className="container mx-auto max-w-6xl p-8 2xl:px-0 text-white">
            <div className="lg:flex lg:items-center lg:justify-between mb-10">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                        Back End Developer
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <ExclamationCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                                Description
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4">

                    <span className="ml-3 hidden sm:block">
          <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" href="https://github.com/ovh/venom"/>
            Venom CLI package
          </button>
        </span>
                </div>
            </div>

            <div className="bg-green-400 rounded">
                <div className="mx-auto max-w-1xl py-1 px-1 sm:px-6 lg:px-1"></div>
            </div>




        </div>
    )
}

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import axios from 'axios';
import ReactJson from 'react-json-view'
import { BsFillBrightnessHighFill, BsFillMoonStarsFill, BsFillPlusSquareFill, BsDashSquareFill, BsCaretRightFill, BsCaretDownFill } from "react-icons/bs";

// loader
const Loader = () => {
    return (
        <div className='w-full h-full lg:w-96 lg:h-96 lg:mx-auto flex flex-col justify-center items-center'>
            {/* <AiOutlineReload className='text-4xl font-bold dark:text-white font-ubuntu animate-spin normal-transition mt-2' /> */}
            <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-gray-200 fill-[#4b5563]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
    )

}

// dark mode toggler
const DarkModeToggler = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        if (typeof window !== undefined) {
            if ((localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
            ) {
                document.documentElement.classList.add('dark');
                setTheme('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
                setTheme('light');
                document.documentElement.classList.remove('dark');
            }
        }
    }, [theme]);

    return (
        <span
            onClick={() => {
                if (theme === 'dark') {
                    localStorage.setItem('theme', 'light');
                    setTheme('light');
                } else {
                    localStorage.setItem('theme', 'dark');
                    setTheme('dark');
                }
                // setTheme(theme === 'dark' ? 'light' : 'dark');
                // localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');

            }}
            className="cursor-pointer dark:text-gray-500 text-gray-600 hover:text-black dark:hover:text-white transition-all ease-in-out"
        >
            {theme === 'dark'
                ?
                <BsFillBrightnessHighFill className="bi bi-brightness-high-fill active:animate-ping text-xl dark:text-gray-500 text-gray-600 hover:text-black dark:hover:text-white normal-transition" />
                :
                <BsFillMoonStarsFill className="bi bi-moon-stars-fill active:animate-ping text-xl dark:text-gray-500 text-gray-600 hover:text-black dark:hover:text-white normal-transition" />
            }
        </span>
    );
};


// single api render
const SingleApi = ({ api, index }) => {

    const [open, setOpen] = useState(false)
    const [currentOption, setCurrentOption] = useState('body')
    const [inputData, setInputData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [fontSize, setFontSize] = useState(14);
    const [queryObject, setQueryObject] = useState({});
    const [headersObject, setHeadersObject] = useState({});
    const [pathVariablesObject, setPathVariablesObject] = useState({});
    const [resultStatus, setResultStatus] = useState({
        status: '',
        statusText: '',
        time: '0 ms'
    });


    let apiOptions = [
        {
            name: 'headers',
            label: 'Headers',
        },
        {
            name: 'body',
            label: 'Body',
        },
        {
            name: 'query',
            label: 'Query',
        },
        {
            name: 'pathVariables',
            label: 'Path Variables'
        }
    ]

    let editorStyle = {
        overflowWrap: 'break-word',
        wordBreak: 'break-all',
        width: '100%',
        fontSize,
        padding: '1.5rem 1rem',
        maxHeight: '600px',
        overflowY: 'auto',
    }

    let setAllData = useMemo(() => {
        setInputData(api.body.params)
        setQueryObject(api.query.params)
        setHeadersObject(api.headers.params)
        setPathVariablesObject(api.url.variables)
    }, [api.body.params, api.headers.params, api.query.params, api.url.variables])

    setAllData;

    let setAPIresponse = useCallback((data) => {
        setResult(data)
    }, [result, fontSize])

    useEffect(() => {
        if (api.headers.isRequired) {
            setCurrentOption('headers')
        }
        else if (api.body.isRequired) {
            setCurrentOption('body')
        }
        else if (api.query.isRequired) {
            setCurrentOption('query')
        }
        else {
            setCurrentOption('')
        }
    }, [api.body.isRequired, api.headers.isRequired, api.query.isRequired])


    const makeAPIRequest = async () => {

        setIsLoading(true);

        try {

            axios.interceptors.request.use(config => {
                const newConfig = { ...config }
                newConfig.metadata = { startTime: new Date() }
                return newConfig
            }, error => {
                return Promise.reject(error)
            });

            axios.interceptors.response.use(response => {
                const newRes = { ...response }
                newRes.config.metadata.endTime = new Date()
                newRes.duration = newRes.config.metadata.endTime - newRes.config.metadata.startTime
                return newRes
            }, error => {
                const newError = { ...error }
                newError.config.metadata.endTime = new Date()
                newError.duration = newError.config.metadata.endTime - newError.config.metadata.startTime
                return Promise.reject(newError)
            });

            let response = await axios({
                method: api.method,
                baseURL: api.url.baseURL,
                url: api.url.path + (Object.keys(pathVariablesObject).length !== 0 ? `/${Object.values(pathVariablesObject)}` : ''),
                headers: headersObject,
                params: queryObject,
                data: api.body.isRequired && Object.keys(inputData).length > 0 ? inputData : api.body.params,
                timeout: 4000
            })


            setAPIresponse(response.data)

            setResultStatus({
                status: response.status,
                statusText: response.statusText,
                time: response.duration + ' ms'
            })

            setIsLoading(false);

        } catch (error) {

            setAPIresponse(error.response.data)

            setResultStatus({
                status: error.response.status,
                statusText: error.response.statusText,
                time: error.duration + ' ms'
            })

            setIsLoading(false);
        }

    }

    const description = () => {
        return { __html: api.description ? api.description : '' };
    }

    return (
        <div className='my-4'>
            <button onClick={() => { setOpen(!open); Object.keys(result).length !== 0 && result.length >= 50 ? setAPIresponse({}) : null }} className={`w-full cursor-pointer ${open ? 'rounded-tl-2xl rounded-tr-2xl rounded-b-none' : 'rounded-full'} bg-white dark:bg-gray-900 border-transparent dark:border dark:border-gray-600 px-1 py-1 flex items-center `}>
                <span
                    className={`px-2.5 py-1 flex justify-center items-center ${open ? 'dark:bg-green-600 bg-green-700 text-white' : 'dark:bg-gray-600 bg-gray-300'} dark:text-white font-medium rounded-full  mr-1`}
                >
                    {index + 1}
                </span>
                {open ?
                    <BsCaretDownFill className='normal-transition dark:text-white text-base lg:text-lg font-ubuntu font-medium' /> :
                    <BsCaretRightFill className='normal-transition dark:text-white text-base lg:text-lg font-ubuntu font-medium' />
                }
                <h1 className='dark:text-white text-base lg:text-lg font-ubuntu font-medium ml-3'>{api.name}</h1>
            </button>
            {open &&
                <div className='py-3 px-5 bg-white dark:bg-gray-900 border-0 dark:border border-t-none animate__animated animate__fadeIn border-gray-400 dark:border-gray-600 rounded-t-none rounded-bl-2xl rounded-br-2xl'>
                    <h1 className='text-lg my-3 font-ubuntu dark:text-white'>
                        <span className={` ${api.method === 'GET' ? 'text-green-700 dark:text-green-500' : api.method === 'POST' ? 'text-[#FF6C37]' : api.method === 'PUT' ? 'text-blue-700 dark:text-blue-500' : 'text-red-700 dark:text-red-500'}  font-semibold`}>{api.method}</span> : <span className='dark:text-gray-300 ml-2 font-medium'>
                            {api.url.baseURL + api.url.path} {Object.keys(pathVariablesObject).length !== 0 ? `/${Object.values(pathVariablesObject)}` : ''}
                        </span>
                    </h1>
                    <h1 className='text-lg my-3 font-semibold font-ubuntu dark:text-white'>Description:</h1>
                    <div className='dark:text-white mb-5 text-lg rounded-md font-ubuntu font-normal bg-gray-100 dark:bg-gray-800 p-5' dangerouslySetInnerHTML={description()}></div>

                    <div className='flex items-center w-full'>
                        {apiOptions.map(option => (
                            <div onClick={() => setCurrentOption(option.name)} key={option.name} className={`${currentOption === option.name ? ' border-b-2 dark:border-[#FF6C37] border-gray-700' : 'border-b-2 border-transparent'} mr-5 dark:text-white font-ubuntu font-medium text-lg cursor-pointer`}>
                                {option.label}
                            </div>
                        ))}
                        <button onClick={makeAPIRequest} className='justify-self-end items-end font-base lg:font-lg font-ubuntu font-medium active:scale-95 normal-transition hover:shadow-lg border-gray-600 px-3 py-.5 dark:border-gray-600 dark:text-white border rounded-md'>Send</button>
                    </div>

                    <div className='my-4'>
                        {api.body.isRequired && currentOption === 'body' ?
                            <>
                                <ReactJson
                                    src={inputData}
                                    name={false}
                                    onEdit={(e) => setInputData(e.updated_src)}
                                    iconStyle="square"
                                    style={editorStyle}
                                    theme="bright"
                                    displayDataTypes={true}
                                    displayObjectSize={true}
                                />
                            </> : null}
                    </div>

                    <div className='my-4'>
                        {api.query.isRequired && currentOption === 'query' ?
                            <>
                                <ReactJson
                                    src={queryObject}
                                    name={false}
                                    onEdit={(e) => setQueryObject(e.updated_src)}
                                    iconStyle="square"
                                    style={editorStyle}
                                    theme="bright"
                                    displayDataTypes={true}
                                    displayObjectSize={true}
                                />
                            </> : null}
                    </div>

                    <div className='my-4'>
                        {api.headers.isRequired && currentOption === 'headers' ?
                            <>
                                <ReactJson
                                    src={headersObject}
                                    name={false}
                                    onEdit={(e) => setHeadersObject(e.updated_src)}
                                    iconStyle="square"
                                    style={editorStyle}
                                    theme="bright"
                                    displayDataTypes={true}
                                    displayObjectSize={true}
                                />
                            </> : null}
                    </div>

                    <div className='my-4'>
                        {Object.keys(api.url.variables).length !== 0 && currentOption === 'pathVariables' ?
                            <>
                                <ReactJson
                                    src={pathVariablesObject}
                                    name={false}
                                    onEdit={(e) => setPathVariablesObject(e.updated_src)}
                                    iconStyle="square"
                                    style={editorStyle}
                                    theme="bright"
                                    displayDataTypes={true}
                                    displayObjectSize={true}
                                />
                            </> : null}
                    </div>

                    {!isLoading && Object.keys(result).length !== 0 ?
                        <div className='mt-5'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center mb-3'>
                                    <h1 className='text-base lg:text-lg dark:text-white font-ubuntu font-medium'>Request Result</h1>
                                    <button onClick={() => setAPIresponse({})} className='justify-self-end items-end font-base lg:font-lg font-ubuntu font-medium active:scale-95 normal-transition hover:shadow-lg border-gray-600 px-3 py-.5 dark:border-gray-600 dark:text-white border rounded-md ml-5'>Reset</button>

                                </div>
                                <div className='flex items-center'>
                                    <div className='flex justify-between items-center mr-4'>
                                        <button onClick={() => fontSize > 14 && setFontSize(prev => prev - 1)} className={'justify-self-end items-end font-base lg:text-lg text-gray-600 font-ubuntu font-medium active:scale-95 hover:shadow-lg border-gray-600 px-1 py-px dark:border-gray-600 dark:text-white' + (fontSize <= 14 ? ' cursor-not-allowed' : '')}>
                                            <BsDashSquareFill />
                                        </button>
                                        <p className='text-base lg:text-lg dark:text-white font-ubuntu font-normal mx-2'>
                                            {fontSize}
                                        </p>
                                        <button onClick={() => fontSize < 36 && setFontSize(prev => prev + 1)} className={'justify-self-end items-end font-base lg:text-lg text-gray-600 font-ubuntu font-medium active:scale-95 hover:shadow-lg border-gray-600 px-1 py-px dark:border-gray-600 dark:text-white' + (fontSize >= 36 ? ' cursor-not-allowed' : '')}>
                                            <BsFillPlusSquareFill />
                                        </button>
                                    </div>
                                    <p className='text-base mr-4 font-ubuntu dark:font-normal font-semibold dark:text-white'>Status:
                                        <span className={resultStatus.status?.toString().startsWith('2', 0) ? 'text-green-600 ml-1 font-medium dark:font-normal dark:text-green-400' : 'text-red-500 ml-1 font-medium dark:font-normal'}>{resultStatus.status} {resultStatus.statusText}</span>
                                    </p>

                                    <p className='text-base mr-4 font-ubuntu dark:font-normal font-semibold dark:text-white'>Time:
                                        <span className={'text-green-600 ml-1 font-normal dark:font-normal dark:text-green-400'}>{resultStatus.time}</span>
                                    </p>

                                </div>
                            </div>

                            <ReactJson
                                src={result}
                                name={false}
                                iconStyle="square"
                                style={editorStyle}
                                theme="bright"
                                displayDataTypes={false}
                                displayObjectSize={true}
                            />
                        </div> : isLoading ? <Loader /> : null
                    }
                </div>}

        </div>
    )

}


//main component
const Documentation = ({ src, title, className }) => {

    return (
        <div className={'dark:bg-gray-900 bg-gray-200 normal-transition min-h-screen ' + (className ? className : '')}>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center py-3'>
                    <h1 className='text-3xl dark:text-white font-medium font-ubuntu'>{title} <span className='text-base font-ubuntu'>({src.length})</span></h1>
                    <DarkModeToggler />
                </div>

                {src.length && src.map((api, index) => (
                    <SingleApi key={api.apiName + "-" + index} api={api} index={index} />
                ))}
            </div>
        </div>
    )
}

export default Documentation
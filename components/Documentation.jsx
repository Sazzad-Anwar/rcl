/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import ReactJson from "react-json-view";
import {
    BsFillBrightnessHighFill,
    BsFillMoonStarsFill,
    BsFillPlusSquareFill,
    BsDashSquareFill,
    BsCaretRightFill,
    BsCaretDownFill,
} from "react-icons/bs";

// loader
const Loader = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center lg:mx-auto lg:h-96 lg:w-96">
            <svg
                role="status"
                className="mr-2 h-8 w-8 animate-spin fill-[#4b5563] text-gray-200 dark:fill-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
        </div>
    );
};

// dark mode toggler
const DarkModeToggler = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
                document.documentElement.classList.add("dark");
                setTheme("dark");
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
                setTheme("light");
                document.documentElement.classList.remove("dark");
            }
        }
    }, [theme]);

    return (
        <span
            onClick={() => {
                if (theme === "dark") {
                    localStorage.setItem("theme", "light");
                    setTheme("light");
                } else {
                    localStorage.setItem("theme", "dark");
                    setTheme("dark");
                }
                // setTheme(theme === 'dark' ? 'light' : 'dark');
                // localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
            }}
            className="cursor-pointer text-gray-600 transition-all ease-in-out hover:text-black dark:text-gray-500 dark:hover:text-white"
        >
            {theme === "dark" ? (
                <BsFillBrightnessHighFill className="bi bi-brightness-high-fill normal-transition text-xl text-gray-600 hover:text-black active:animate-ping dark:text-gray-500 dark:hover:text-white" />
            ) : (
                <BsFillMoonStarsFill className="bi bi-moon-stars-fill normal-transition text-xl text-gray-600 hover:text-black active:animate-ping dark:text-gray-500 dark:hover:text-white" />
            )}
        </span>
    );
};

// single api render
const SingleApi = ({ api, index }) => {
    const [open, setOpen] = useState(false);
    const [currentOption, setCurrentOption] = useState("body");
    const [inputData, setInputData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [fontSize, setFontSize] = useState(14);
    const [queryObject, setQueryObject] = useState({});
    const [headersObject, setHeadersObject] = useState({});
    const [pathVariablesObject, setPathVariablesObject] = useState({});
    const [resultStatus, setResultStatus] = useState({
        status: "",
        statusText: "",
        time: "0 ms",
    });

    let apiOptions = [
        {
            name: "headers",
            label: "Headers",
        },
        {
            name: "body",
            label: "Body",
        },
        {
            name: "query",
            label: "Query",
        },
        {
            name: "pathVariables",
            label: "Path Variables",
        },
    ];

    let editorStyle = {
        overflowWrap: "break-word",
        wordBreak: "break-all",
        width: "100%",
        fontSize,
        padding: "1.5rem 1rem",
        maxHeight: "600px",
        overflowY: "auto",
    };

    let setAllData = useMemo(() => {
        setInputData(api.body.params);
        setQueryObject(api.query.params);
        setHeadersObject(api.headers.params);
        setPathVariablesObject(api.url.variables);
    }, [
        api.body.params,
        api.headers.params,
        api.query.params,
        api.url.variables,
    ]);

    setAllData;

    let setAPIresponse = useCallback(
        (data) => {
            setResult(data);
        },
        []
    );

    useEffect(() => {
        if (api.headers.isRequired) {
            setCurrentOption("headers");
        } else if (api.body.isRequired) {
            setCurrentOption("body");
        } else if (api.query.isRequired) {
            setCurrentOption("query");
        } else {
            setCurrentOption("");
        }
    }, [api.body.isRequired, api.headers.isRequired, api.query.isRequired]);

    const makeAPIRequest = async () => {
        setIsLoading(true);

        try {
            axios.interceptors.request.use(
                (config) => {
                    const newConfig = { ...config };
                    newConfig.metadata = { startTime: new Date() };
                    return newConfig;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            axios.interceptors.response.use(
                (response) => {
                    const newRes = { ...response };
                    newRes.config.metadata.endTime = new Date();
                    newRes.duration =
                        newRes.config.metadata.endTime - newRes.config.metadata.startTime;
                    return newRes;
                },
                (error) => {
                    const newError = { ...error };
                    newError.config.metadata.endTime = new Date();
                    newError.duration =
                        newError.config.metadata.endTime -
                        newError.config.metadata.startTime;
                    return Promise.reject(newError);
                }
            );

            let response = await axios({
                method: api.method,
                baseURL: api.url.baseURL,
                url:
                    api.url.path +
                    (Object.keys(pathVariablesObject).length !== 0
                        ? `/${Object.values(pathVariablesObject)}`
                        : ""),
                headers: headersObject,
                params: queryObject,
                data:
                    api.body.isRequired && Object.keys(inputData).length > 0
                        ? inputData
                        : api.body.params,
                timeout: 4000,
            });

            setAPIresponse(response.data);

            setResultStatus({
                status: response.status,
                statusText: response.statusText,
                time: response.duration + " ms",
            });

            setIsLoading(false);
        } catch (error) {
            setAPIresponse(error.response.data);

            setResultStatus({
                status: error.response.status,
                statusText: error.response.statusText,
                time: error.duration + " ms",
            });

            setIsLoading(false);
        }
    };

    const description = () => {
        return { __html: api.description ? api.description : "" };
    };

    let URL = {
        method: api.method,
        url: api.url.baseURL + api.url.path + (Object.keys(pathVariablesObject).length !== 0
            ? `/${Object.values(pathVariablesObject)}`
            : "")
    }

    return (
        <div className="my-4">
            <button
                onClick={() => {
                    setOpen(!open);
                    Object.keys(result).length !== 0 && result.length >= 50
                        ? setAPIresponse({})
                        : null;
                }}
                className={`w-full cursor-pointer ${open ? "rounded-b-none rounded-tl-2xl rounded-tr-2xl" : "rounded-full"
                    } flex items-center border-transparent bg-white px-1 py-1 dark:border dark:border-gray-600 dark:bg-gray-900 `}
            >
                <span
                    className={`flex items-center justify-center px-2.5 py-1 ${open
                        ? "bg-green-700 text-white dark:bg-green-600"
                        : "bg-gray-300 dark:bg-gray-600"
                        } mr-1 rounded-full font-medium  dark:text-white`}
                >
                    {index + 1}
                </span>
                {open ? (
                    <BsCaretDownFill className="normal-transition font-ubuntu text-base font-medium dark:text-white lg:text-lg" />
                ) : (
                    <BsCaretRightFill className="normal-transition font-ubuntu text-base font-medium dark:text-white lg:text-lg" />
                )}
                <h1 className="font-ubuntu ml-3 text-base font-medium dark:text-white lg:text-lg">
                    {api.name}
                </h1>
            </button>
            {open && (
                <div className="border-t-none animate__animated animate__fadeIn rounded-t-none rounded-bl-2xl rounded-br-2xl border-0 border-gray-400 bg-white py-3 px-5 dark:border dark:border-gray-600 dark:bg-gray-900">
                    <h1 className="font-ubuntu my-3 text-lg dark:text-white flex">
                        <span
                            className={` ${api.method === "GET"
                                ? "text-green-700 dark:text-green-500"
                                : api.method === "POST"
                                    ? "text-[#FF6C37]"
                                    : api.method === "PUT"
                                        ? "text-blue-700 dark:text-blue-500"
                                        : "text-red-700 dark:text-red-500"
                                }  font-semibold`}
                        >
                            {api.method}
                        </span>
                        :
                        <span className="ml-2 font-medium dark:text-gray-300">
                            {URL.url}
                        </span>
                    </h1>
                    <ReactJson
                        src={URL}
                        name={false}
                        onEdit={(e) => setInputData(e.updated_src)}
                        iconStyle="square"
                        style={editorStyle}
                        theme="bright"
                        displayDataTypes={true}
                        displayObjectSize={true}
                    />
                    <h1 className="font-ubuntu my-3 text-lg font-semibold dark:text-white">
                        Description:
                    </h1>
                    <div
                        className="font-ubuntu mb-5 rounded-md bg-gray-100 p-5 text-lg font-normal dark:bg-gray-800 dark:text-white"
                        dangerouslySetInnerHTML={description()}
                    ></div>

                    <div className="flex w-full items-center">
                        {apiOptions.map((option) => (
                            <div
                                onClick={() => setCurrentOption(option.name)}
                                key={option.name}
                                className={`${currentOption === option.name
                                    ? " border-b-2 border-gray-700 dark:border-[#FF6C37]"
                                    : "border-b-2 border-transparent"
                                    } font-ubuntu mr-5 cursor-pointer text-lg font-medium dark:text-white`}
                            >
                                {option.label}
                            </div>
                        ))}
                        <button
                            onClick={makeAPIRequest}
                            className="font-base lg:font-lg font-ubuntu normal-transition py-.5 items-end justify-self-end rounded-md border border-gray-600 px-3 font-medium hover:shadow-lg active:scale-95 dark:border-gray-600 dark:text-white"
                        >
                            Send
                        </button>
                    </div>

                    <div className="my-4">
                        {api.body.isRequired && currentOption === "body" ? (
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
                            </>
                        ) : null}
                    </div>

                    <div className="my-4">
                        {api.query.isRequired && currentOption === "query" ? (
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
                            </>
                        ) : null}
                    </div>

                    <div className="my-4">
                        {api.headers.isRequired && currentOption === "headers" ? (
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
                            </>
                        ) : null}
                    </div>

                    <div className="my-4">
                        {Object.keys(api.url.variables).length !== 0 &&
                            currentOption === "pathVariables" ? (
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
                            </>
                        ) : null}
                    </div>

                    {!isLoading && Object.keys(result).length !== 0 ? (
                        <div className="mt-5">
                            <div className="flex items-center justify-between">
                                <div className="mb-3 flex items-center">
                                    <h1 className="font-ubuntu text-base font-medium dark:text-white lg:text-lg">
                                        Request Result
                                    </h1>
                                    <button
                                        onClick={() => setAPIresponse({})}
                                        className="font-base lg:font-lg font-ubuntu normal-transition py-.5 ml-5 items-end justify-self-end rounded-md border border-gray-600 px-3 font-medium hover:shadow-lg active:scale-95 dark:border-gray-600 dark:text-white"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-4 flex items-center justify-between">
                                        <button
                                            onClick={() =>
                                                fontSize > 14 && setFontSize((prev) => prev - 1)
                                            }
                                            className={
                                                "font-base font-ubuntu items-end justify-self-end border-gray-600 px-1 py-px font-medium text-gray-600 hover:shadow-lg active:scale-95 dark:border-gray-600 dark:text-white lg:text-lg" +
                                                (fontSize <= 14 ? " cursor-not-allowed" : "")
                                            }
                                        >
                                            <BsDashSquareFill />
                                        </button>
                                        <p className="font-ubuntu mx-2 text-base font-normal dark:text-white lg:text-lg">
                                            {fontSize}
                                        </p>
                                        <button
                                            onClick={() =>
                                                fontSize < 36 && setFontSize((prev) => prev + 1)
                                            }
                                            className={
                                                "font-base font-ubuntu items-end justify-self-end border-gray-600 px-1 py-px font-medium text-gray-600 hover:shadow-lg active:scale-95 dark:border-gray-600 dark:text-white lg:text-lg" +
                                                (fontSize >= 36 ? " cursor-not-allowed" : "")
                                            }
                                        >
                                            <BsFillPlusSquareFill />
                                        </button>
                                    </div>
                                    <p className="font-ubuntu mr-4 text-base font-semibold dark:font-normal dark:text-white">
                                        Status:
                                        <span
                                            className={
                                                resultStatus.status?.toString().startsWith("2", 0)
                                                    ? "ml-1 font-medium text-green-600 dark:font-normal dark:text-green-400"
                                                    : "ml-1 font-medium text-red-500 dark:font-normal"
                                            }
                                        >
                                            {resultStatus.status} {resultStatus.statusText}
                                        </span>
                                    </p>

                                    <p className="font-ubuntu mr-4 text-base font-semibold dark:font-normal dark:text-white">
                                        Time:
                                        <span
                                            className={
                                                "ml-1 font-normal text-green-600 dark:font-normal dark:text-green-400"
                                            }
                                        >
                                            {resultStatus.time}
                                        </span>
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
                        </div>
                    ) : isLoading ? (
                        <Loader />
                    ) : null}
                </div>
            )}
        </div>
    );
};

//main component
const Documentation = ({ src, title, className }) => {
    return (
        <div
            className={
                "normal-transition min-h-screen bg-gray-200 dark:bg-gray-900 " +
                (className ? className : "")
            }
        >
            <div className="container mx-auto py-5">
                <div className="flex items-center justify-between py-3">
                    <h1 className="font-ubuntu text-3xl font-medium dark:text-white">
                        {title}{" "}
                        <span className="font-ubuntu text-base">({src.length})</span>
                    </h1>
                    <DarkModeToggler />
                </div>

                {src.length &&
                    src.map((api, index) => (
                        <SingleApi
                            key={api.apiName + "-" + index}
                            api={api}
                            index={index}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Documentation;

import React from 'react'
import Documentation from '../../components/Documentation'

export default function ExampleCode() {

    let apiJSON = [
        {
            "name": "Get a post by ID",
            "description": "<p>This is demo of get a post by ID using <b><i>josonplaceholder</i></b> API</p>",
            "url": {
                "baseURL": "https://jsonplaceholder.typicode.com",
                "path": "/posts",
                "variables": {
                    "id": 1
                }
            },
            "method": "GET",
            "body": {
                "isRequired": false,
                "params": {}
            },
            "headers": {
                "isRequired": false
            },
            "query": {
                "isRequired": false
            }
        },

        {
            "name": "Get all posts",
            "description": "<p>This is demo of get all posts using <b><i>josonplaceholder</i></b> API</p>",
            "url": {
                "baseURL": "https://jsonplaceholder.typicode.com",
                "path": "/posts",
                "variables": {}
            },
            "method": "GET",
            "body": {
                "isRequired": false,
                "params": {}
            },
            "headers": {
                "isRequired": false
            },
            "query": {
                "isRequired": false
            }
        },

        {
            "name": "Creating a post",
            "description": "<p>This is demo of creating a post using <b><i>josonplaceholder</i></b> API</p>",
            "url": {
                "baseURL": "https://jsonplaceholder.typicode.com",
                "path": "/posts",
                "variables": {}
            },
            "method": "POST",
            "body": {
                "isRequired": true,
                "params": {
                    "title": "foo",
                    "body": "bar",
                    "userId": 1
                }
            },
            "headers": {
                "isRequired": true,
                "params": {
                    "Content-type": "application/json; charset=UTF-8"
                }
            },
            "query": {
                "isRequired": false
            }
        },

        {
            "name": "Updating a post",
            "description": "<p>This is demo of updating a post using <b><i>josonplaceholder</i></b> API</p>",
            "url": {
                "baseURL": "https://jsonplaceholder.typicode.com",
                "path": "/posts",
                "variables": {
                    "id": 1
                }
            },
            "method": "PUT",
            "body": {
                "isRequired": true,
                "params": {
                    "id": 1,
                    "title": "foo",
                    "body": "bar",
                    "userId": 1
                }
            },
            "headers": {
                "isRequired": true,
                "params": {
                    "Content-type": "application/json; charset=UTF-8"
                }
            },
            "query": {
                "isRequired": false
            }
        },
        {
            "name": "Patching a post",
            "description": "<p>This is demo of patching a post using <b><i>josonplaceholder</i></b> API</p>",
            "url": {
                "baseURL": "https://jsonplaceholder.typicode.com",
                "path": "/posts",
                "variables": {
                    "id": 1
                }
            },
            "method": "PATCH",
            "body": {
                "isRequired": true,
                "params": {
                    "title": "foo"
                }
            },
            "headers": {
                "isRequired": true,
                "params": {
                    "Content-type": "application/json; charset=UTF-8"
                }
            },
            "query": {
                "isRequired": false
            }
        },
        {
            "name": "Deleting a post",
            "description": "<p>This is demo of deleting a post using <b><i>josonplaceholder</i></b> API</p>",
            "url": {
                "baseURL": "https://jsonplaceholder.typicode.com",
                "path": "/posts",
                "variables": {
                    "id": 1
                }
            },
            "method": "DELETE",
            "body": {
                "isRequired": false,
                "params": {}
            },
            "headers": {
                "isRequired": false,
                "params": {}
            },
            "query": {
                "isRequired": false
            }
        },
        {
            "name": "Filtering a post",
            "description": "<p>This is demo of filtering a post using <b><i>josonplaceholder</i></b> API</p>",
            "url": {
                "baseURL": "https://jsonplaceholder.typicode.com",
                "path": "/posts",
                "variables": {}
            },
            "method": "GET",
            "body": {
                "isRequired": false,
                "params": {}
            },
            "headers": {
                "isRequired": false,
                "params": {}
            },
            "query": {
                "isRequired": true,
                "params": {
                    "userId": 1
                }
            }
        }
    ]


    return <Documentation src={apiJSON} title="API documentation using Documentation component" />
}

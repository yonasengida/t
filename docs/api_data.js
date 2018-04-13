define({ "api": [
  {
    "type": "get",
    "url": "/admins",
    "title": "Get Admins Profile",
    "version": "1.0.0",
    "name": "GetAdmins",
    "group": "Admin",
    "description": "<p>Get Admins Profile</p>",
    "filename": "routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admins/:id",
    "title": "Update Admin Profile",
    "version": "1.0.0",
    "name": "UpdateAdmin",
    "group": "Admin",
    "description": "<p>Update Admin Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Admin ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/clients/language",
    "title": "Change Language",
    "version": "1.0.0",
    "name": "ChangeLanaguage",
    "group": "Client",
    "description": "<p>Change Language</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/:id/follow",
    "title": "Follow Client",
    "version": "1.0.0",
    "name": "FollowClient",
    "group": "Client",
    "description": "<p>Follow Client</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "get",
    "url": "/clients",
    "title": "Get Clients",
    "version": "1.0.0",
    "name": "GetClients",
    "group": "Client",
    "description": "<p>Get Clients</p>",
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/profile",
    "title": "Get Profile",
    "name": "GetProfile",
    "group": "Client",
    "description": "<p>Get Profile</p>",
    "version": "0.0.0",
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/profile",
    "title": "Manage Profile",
    "name": "ManageProfile",
    "group": "Client",
    "description": "<p>Manage Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "service",
            "description": "<p>Service</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parameter",
            "description": "<p>Parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "value",
            "description": "<p>Value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\t\"service\":\"5a277463a7e793d35baedaf5\",\n\t\"parameter\":\"5a3b9a54661d44783e8492c5\",\n\t\"value\":[\"263\"]\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "     HTTP/1.1 200 OK\n{\n    \"_id\": \"5a4a4e0971c3ee583f6c066d\",\n    \"service\": \"5a277463a7e793d35baedaf5\",\n    \"parameter\": \"5a3b9a54661d44783e8492c5\",\n    \"value\": [\"263\"],\n    \"client\": \"5a4a4c2faa6ac17932810a3a\",\n    \"updated_at\": null,\n    \"archived_at\": null,\n    \"archived\": false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "post",
    "url": "/clients/search/service",
    "title": "Search Service & Products",
    "name": "SearchProductandServce",
    "group": "Client",
    "description": "<p>Search Service &amp; Products</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n    \"service\":\"5a277463a7e793d35baedaf5\",\t\n\n            \"parameters\":[\n                {\n                    \"param\":\"5a3b9a54661d44783e8492c5\",\n                    \"value\":[\"1\",\"2\"]\n                },\n                {\n                    \"param\":\"5a3b9a54661d44783e8492c5\",\n                    \"value\":[\"1\",\"2\"]\n                },\n                {\n                    \"param\":\"5a3b9a54661d44783e8492c5\",\n                    \"value\":[\"1\",\"2\"]\n                }\n            ]\t\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "delete",
    "url": "/clients/:id/unfollow",
    "title": "UnFollow Client",
    "version": "1.0.0",
    "name": "UnFollowClient",
    "group": "Client",
    "description": "<p>UnFollow Client</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/:id",
    "title": "Update Client Profile",
    "version": "1.0.0",
    "name": "UpdateClient",
    "group": "Client",
    "description": "<p>Update Client Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>client ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data to Update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/profilePic",
    "title": "Uplaod Profile Picture",
    "version": "1.0.0",
    "name": "UploadProfilePicture",
    "group": "Client",
    "description": "<p>Upload Profile Picture</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Client Image</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "     HTTP/1.1 200 OK\n {\n    \"error\": false,\n    \"upload\": \"Success\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "post",
    "url": "/groups",
    "title": "Create Group",
    "name": "CreateGroup",
    "group": "Group",
    "description": "<p>Create Group</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "  {\n\t\"name\":\"Automobiles\",\n\t\"parameters\":[{\n\t\t\"param_name\":\"color\",\n\t\t\"options\":[{\n\t\t\t\"opt_name\":\"green\"\n\t\t\n\t\t},\n\t\t{\n\t\t\t\"opt_name\":\"blue\"\n\t\t\n\t\t},\n\t\t{\n\t\t\t\"opt_name\":\"black\"\n\t\t\n\t\t}]\n\t},\n\t{\n\t\t\"param_name\":\"year\",\n\t\t\"options\":[{\n\t\t\t\"opt_name\":\"1990\"\n\t\t\n\t\t},\n\t\t{\n\t\t\t\"opt_name\":\"1999\"\n\t\t\n\t\t},\n\t\t{\n\t\t\t\"opt_name\":\"1997\"\n\t\t\n\t\t},\n\t\t{\n\t\t\t\"opt_name\":\"2018\"\n\t\t\n\t\t}\n\t\t]\n\t},\n\t{\n\t\t\"param_name\":\"Brand\",\n\t\t\"options\":[{\n\t\t\t\"opt_name\":\"toyota\"\n\t\t\n\t\t},\n\t\t{\n\t\t\t\"opt_name\":\"Nissan\"\n\t\t\n\t\t}]\n\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"_id\": \"5a8c98fefa995ced29338a53\",\n    \"name\": \"Automobiles\",\n    \"updated_at\": null,\n    \"created_at\": \"2018-02-20T21:48:04.319Z\",\n    \"archived_at\": null,\n    \"archived\": false,\n    \"parameters\": [\n        {\n            \"param_name\": \"color\",\n            \"_id\": \"5a8c98fefa995ced29338a5c\",\n            \"options\": [\n                {\n                    \"opt_name\": \"green\",\n                    \"_id\": \"5a8c98fefa995ced29338a5f\"\n                },\n                {\n                    \"opt_name\": \"blue\",\n                    \"_id\": \"5a8c98fefa995ced29338a5e\"\n                },\n                {\n                    \"opt_name\": \"black\",\n                    \"_id\": \"5a8c98fefa995ced29338a5d\"\n                }\n            ]\n        },\n        {\n            \"param_name\": \"year\",\n            \"_id\": \"5a8c98fefa995ced29338a57\",\n            \"options\": [\n                {\n                    \"opt_name\": \"1990\",\n                    \"_id\": \"5a8c98fefa995ced29338a5b\"\n                },\n                {\n                    \"opt_name\": \"1999\",\n                    \"_id\": \"5a8c98fefa995ced29338a5a\"\n                },\n                {\n                    \"opt_name\": \"1997\",\n                    \"_id\": \"5a8c98fefa995ced29338a59\"\n                },\n                {\n                    \"opt_name\": \"2018\",\n                    \"_id\": \"5a8c98fefa995ced29338a58\"\n                }\n            ]\n        },\n        {\n            \"param_name\": \"Brand\",\n            \"_id\": \"5a8c98fefa995ced29338a54\",\n            \"options\": [\n                {\n                    \"opt_name\": \"toyota\",\n                    \"_id\": \"5a8c98fefa995ced29338a56\"\n                },\n                {\n                    \"opt_name\": \"Nissan\",\n                    \"_id\": \"5a8c98fefa995ced29338a55\"\n                }\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/group.js",
    "groupTitle": "Group"
  },
  {
    "type": "get",
    "url": "/groups",
    "title": "Get Groups",
    "name": "GetGroups",
    "group": "Group",
    "description": "<p>Get Groups</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "[\n    {\n        \"_id\": \"5a8c98fefa995ced29338a53\",\n        \"name\": \"Automobiles\",\n        \"updated_at\": null,\n        \"created_at\": \"2018-02-20T21:48:04.319Z\",\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parameters\": [\n            {\n                \"param_name\": \"color\",\n                \"_id\": \"5a8c98fefa995ced29338a5c\",\n                \"options\": [\n                    {\n                        \"opt_name\": \"green\",\n                        \"_id\": \"5a8c98fefa995ced29338a5f\"\n                    },\n                    {\n                        \"opt_name\": \"blue\",\n                        \"_id\": \"5a8c98fefa995ced29338a5e\"\n                    },\n                    {\n                        \"opt_name\": \"black\",\n                        \"_id\": \"5a8c98fefa995ced29338a5d\"\n                    }\n                ]\n            },\n            {\n                \"param_name\": \"year\",\n                \"_id\": \"5a8c98fefa995ced29338a57\",\n                \"options\": [\n                    {\n                        \"opt_name\": \"1990\",\n                        \"_id\": \"5a8c98fefa995ced29338a5b\"\n                    },\n                    {\n                        \"opt_name\": \"1999\",\n                        \"_id\": \"5a8c98fefa995ced29338a5a\"\n                    },\n                    {\n                        \"opt_name\": \"1997\",\n                        \"_id\": \"5a8c98fefa995ced29338a59\"\n                    },\n                    {\n                        \"opt_name\": \"2018\",\n                        \"_id\": \"5a8c98fefa995ced29338a58\"\n                    }\n                ]\n            },\n            {\n                \"param_name\": \"Brand\",\n                \"_id\": \"5a8c98fefa995ced29338a54\",\n                \"options\": [\n                    {\n                        \"opt_name\": \"toyota\",\n                        \"_id\": \"5a8c98fefa995ced29338a56\"\n                    },\n                    {\n                        \"opt_name\": \"Nissan\",\n                        \"_id\": \"5a8c98fefa995ced29338a55\"\n                    }\n                ]\n            }\n        ]\n    },\n    {\n        \"_id\": \"5a8c99d7fa995ced29338a60\",\n        \"name\": \"House\",\n        \"updated_at\": null,\n        \"created_at\": \"2018-02-20T21:48:04.319Z\",\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parameters\": [\n            {\n                \"param_name\": \"Location\",\n                \"_id\": \"5a8c99d7fa995ced29338a65\",\n                \"options\": [\n                    {\n                        \"opt_name\": \"Bole\",\n                        \"_id\": \"5a8c99d7fa995ced29338a68\"\n                    },\n                    {\n                        \"opt_name\": \"Arada\",\n                        \"_id\": \"5a8c99d7fa995ced29338a67\"\n                    },\n                    {\n                        \"opt_name\": \"Kirkos\",\n                        \"_id\": \"5a8c99d7fa995ced29338a66\"\n                    }\n                ]\n            },\n            {\n                \"param_name\": \"Door\",\n                \"_id\": \"5a8c99d7fa995ced29338a61\",\n                \"options\": [\n                    {\n                        \"opt_name\": \"wood\",\n                        \"_id\": \"5a8c99d7fa995ced29338a64\"\n                    },\n                    {\n                        \"opt_name\": \"aluminium\",\n                        \"_id\": \"5a8c99d7fa995ced29338a63\"\n                    },\n                    {\n                        \"opt_name\": \"Metal\",\n                        \"_id\": \"5a8c99d7fa995ced29338a62\"\n                    }\n                ]\n            }\n        ]\n    }\n]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/group.js",
    "groupTitle": "Group"
  },
  {
    "type": "put",
    "url": "/products/:id/parameters",
    "title": "Add Product Parameter",
    "name": "AddParameter",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>ProductID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n      \"parameters\":[{\"param_name\":\"testParam6\"},{\"param_name\":\"testParam3\"},{\"param_name\":\"testParam5\"}]\n      \n  }",
          "type": "json"
        }
      ]
    },
    "description": "<p>Add Parameter</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"erro\": false,\n    \"msg\": \"Succesfully Added\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "put",
    "url": "/products/:id/parameter/options",
    "title": "Add Product Parameter Options",
    "name": "AddParameterOptions",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>ProductID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "   {\n\t\"parameter\":\"testParam3\",\n\t\"options\":[{\"opt_name\":\"option1\"},{\"opt_name\":\"option1\"},{\"opt_name\":\"option1\"},{\"opt_name\":\"option1\"}]\n\t\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Add Parameter Options</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"erro\": false,\n    \"msg\": \"Succesfully Added\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/products",
    "title": "Create Product",
    "name": "CreateProduct",
    "group": "Product",
    "description": "<p>Create Product</p>",
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/products/:id/prices",
    "title": "Get Price Forcast",
    "name": "GetPriceForecast",
    "group": "Product",
    "description": "<p>Add Parameter</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>ProductID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": " {\n  \"parametrs\":[\n\t{\n\t\"parameter\":\"5a9a7a7101b95b6442ec744b\",\n\t\"options\":[{\"opt_name\":\"option1\"},{\"opt_name\":\"option4\"}]\n    } \n ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"product\": {\n        \"_id\": \"5a9a7a6801b95b6442ec744a\",\n        \"name\": \"Product1\",\n        \"sector\": \"5a9533dea5084a312a7fa620\",\n        \"service\": \"5a9523c9a8461544472dbc56\",\n        \"updated_at\": null,\n        \"created_at\": \"2018-03-03T10:34:55.389Z\",\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parameters\": [\n            {\n                \"_id\": \"5a9a7a7101b95b6442ec744b\",\n                \"name\": \"testParam6\",\n                \"updated_at\": null,\n                \"archived_at\": null,\n                \"archived\": false\n            },\n            {\n                \"_id\": \"5a9a7a7101b95b6442ec744c\",\n                \"name\": \"testParam3\",\n                \"updated_at\": null,\n                \"archived_at\": null,\n                \"archived\": false\n            },\n            {\n                \"_id\": \"5a9a7a7101b95b6442ec744d\",\n                \"name\": \"testParam5\",\n                \"updated_at\": null,\n                \"archived_at\": null,\n                \"archived\": false\n            },\n            {\n                \"_id\": \"5a9a7a7101b95b6442ec744e\",\n                \"name\": \"testParam5100\",\n                \"updated_at\": null,\n                \"archived_at\": null,\n                \"archived\": false\n            }\n        ]\n    },\n    \"price\": 300\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/:id",
    "title": "Get Product",
    "name": "GetProduct",
    "group": "Product",
    "description": "<p>Get Product</p>",
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products",
    "title": "Get Products",
    "name": "GetProducts",
    "group": "Product",
    "description": "<p>Get Products</p>",
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/search",
    "title": "Search Products",
    "name": "SearchProducts",
    "group": "Product",
    "description": "<p>Serch Products</p>",
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/sectors",
    "title": "Create Sectors",
    "name": "CreateSector",
    "group": "Sector",
    "description": "<p>Create Sector</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "  {\n\t\t\"name\":\"Sector\"\n     }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"_id\": \"5a9523c9a8461544472dbc56\",\n    \"name\": \"Sector\",\n    \"created_at\": \"2018-02-27T09:24:25.731Z\",\n    \"updated_at\": null,\n    \"archived_at\": null,\n    \"archived\": false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "get",
    "url": "/sectors",
    "title": "Get Sectors",
    "name": "GetSectors",
    "group": "Sector",
    "description": "<p>Get Sectors</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " [\n    {\n        \"_id\": \"5a9533dea5084a312a7fa620\",\n        \"name\": \"Sector1\",\n        \"created_at\": \"2018-02-27T10:33:02.374Z\",\n        \"created_by\": \"5a8c98edfa995ced29338a50\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false\n    },\n    {\n        \"_id\": \"5a9533dea5084a312a7fa620\",\n        \"name\": \"Sector2\",\n        \"created_at\": \"2018-02-27T10:33:02.374Z\",\n        \"created_by\": \"5a8c98edfa995ced29338a50\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "post",
    "url": "/services",
    "title": "Create Services",
    "name": "CreateService",
    "group": "Service",
    "description": "<p>Create Service</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "  {\n\t\t\"name\":\"Fee Service\"\n     }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"_id\": \"5a9523c9a8461544472dbc56\",\n    \"name\": \"Fee Service\",\n    \"created_at\": \"2018-02-27T09:24:25.731Z\",\n    \"updated_at\": null,\n    \"archived_at\": null,\n    \"archived\": false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/service.js",
    "groupTitle": "Service"
  },
  {
    "type": "get",
    "url": "/services",
    "title": "Get Services",
    "name": "GetServices",
    "group": "Service",
    "description": "<p>Get Services</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " [\n    {\n        \"_id\": \"5a952394a8461544472dbc55\",\n        \"name\": \"Sales Service\",\n        \"created_at\": \"2018-02-27T09:23:32.064Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false\n    },\n    {\n        \"_id\": \"5a9523c9a8461544472dbc56\",\n        \"name\": \"Fee Service\",\n        \"created_at\": \"2018-02-27T09:24:25.731Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/service.js",
    "groupTitle": "Service"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "version": "1.0.0",
    "name": "Delete",
    "group": "User",
    "description": "<p>Delete a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id/Archive",
    "title": "Delete User",
    "version": "1.0.0",
    "name": "Delete",
    "group": "User",
    "description": "<p>Archive a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get users collection",
    "version": "1.0.0",
    "name": "FetchAll",
    "group": "User",
    "description": "<p>Get a collection of users.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "[{\n    \"_id\" : \"556e1174a8952c9521286a60\",\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/paginate?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Get paginated users collection",
    "version": "1.0.0",
    "name": "FetchPaginated",
    "group": "User",
    "description": "<p>Get a collection of users. The endpoint has pagination out of the box. Use these params to query with pagination: <code>page=&lt;RESULTS_PAGE</code> and <code>per_page=&lt;RESULTS_PER_PAGE&gt;</code>.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"total_pages\": 1,\n  \"total_docs_count\": 0,\n  \"docs\": [{\n    \"_id\" : \"556e1174a8952c9521286a60\",\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "version": "1.0.0",
    "name": "Get",
    "group": "User",
    "description": "<p>Get a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login a user",
    "version": "1.0.0",
    "name": "Login",
    "group": "User",
    "description": "<p>Log in a user. The request returns a token used to authentication of the user on subsequent requests. The token is placed as an HTTP header ie <code>Authorization: Bearer &lt;Token-here&gt;</code> otherwise requests are rejected.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"username\":\"tasuser\"\n  \"password\": \"pass@123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>auth token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"token\": \"I6KehNVejGDx\",\n    \"user\": {\n        \"_id\": \"5a28b6a7ff13b08b6f09acf4\",\n        \"username\": \"masireclient@gmail.com\",\n        \"role\": \"client\",\n        \"realm\": \"client\",\n        \"client\": {\n            \"_id\": \"5a28b6a7ff13b08b6f09acf5\",\n            \"created_at\": \"2017-12-07T03:33:59.333Z\",\n            \"user\": \"5a28b6a7ff13b08b6f09acf4\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false,\n            \"follower\": [],\n            \"following\": []\n        },\n        \"last_login\": \"2017-12-07T03:34:31.889Z\",\n        \"archived_at\": null,\n        \"archived\": false,\n        \"status\": \"active\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/logout",
    "title": "Logout a user",
    "version": "1.0.0",
    "name": "Logout",
    "group": "User",
    "description": "<p>Invalidate a users token</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "logged_out",
            "description": "<p>message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"logged_out\" : true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/password/forgot",
    "title": "Reset Password",
    "version": "1.0.0",
    "name": "ResetPassword",
    "group": "User",
    "description": "<p>Reset password of a given user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n      \"email\":\"2email1@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 OK\n   {\n       \"error\": false,\n       \"msg\": \"Suceesfully Reset, Please check your email \"\n       \"status\": 200\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Signup User",
    "version": "1.0.0",
    "name": "Signup",
    "group": "User",
    "description": "<p>Signup  user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_type",
            "description": "<p>User Type Like client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fax",
            "description": "<p>Fax</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "first_name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "middle_name",
            "description": "<p>Middle Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "last_name",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mobile",
            "description": "<p>Users Mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "facebook_link",
            "description": "<p>Facebook Link</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "twitter_link",
            "description": "<p>Twiter Link</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "linkedin_link",
            "description": "<p>Linkedin Link</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date_of_birth",
            "description": "<p>DOB</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "country",
            "description": "<p>Country</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Adress</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>Bio</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n \"username\":\"goldgy@gmail.com\",\n\t\"password\":\"123445555\",\n\t\"user_type\":\"client\",\n\t\"name\":\"GoldG\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example for Client/Service Provide Signup:",
          "content": "\n{\n    \"_id\": \"5a4a3b802f9db05f75c33639\",\n    \"username\": \"dm2@gmail.com\",\n    \"role\": \"client\",\n    \"realm\": \"client\",\n    \"client\": {\n        \"_id\": \"5a4a3b802f9db05f75c3363a\",\n        \"created_at\": \"2018-01-01T13:45:36.014Z\",\n        \"user\": \"5a4a3b802f9db05f75c33639\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"follower\": [],\n        \"following\": [],\n        \"services\": []\n    },\n    \"archived_at\": null,\n    \"archived\": false,\n    \"status\": \"active\"\n}",
          "type": "json"
        },
        {
          "title": "Response Example for Client Signup:",
          "content": "{\n    \"_id\": \"5a4a3baa9dde105b763c3dbf\",\n    \"username\": \"add@gmail.com\",\n    \"role\": \"admin\",\n    \"realm\": \"admin\",\n    \"admin\": {\n        \"_id\": \"5a4a3baa9dde105b763c3dc0\",\n        \"created_at\": \"2018-01-01T13:46:18.784Z\",\n        \"user\": \"5a4a3baa9dde105b763c3dbf\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": null\n    },\n    \"archived_at\": null,\n    \"archived\": false,\n    \"status\": \"active\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update User",
    "version": "1.0.0",
    "name": "Update",
    "group": "User",
    "description": "<p>Update a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/password/update",
    "title": "Update user password",
    "version": "1.0.0",
    "name": "UpdatePassword",
    "group": "User",
    "description": "<p>Update password of a given user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "security_question_answer",
            "description": "<p>security question answer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>new password/pin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n      \"username\":\"2email1@gmail.com\",\n      \"old_password\":\"pass@123\",\n      \"new_password\":\"test@123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sucessfully changed.\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  }
] });

# Login

used to enter the application

**URL** : `/auth/signin`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "username": "[valid username address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "email": "fafa",
    "password": "12345"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBsaWIuY29tIiwicm9sZSI6InVz"
}
```

## Error Response

**Condition** : If 'username' not found.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success": false,
    "message": "Not found username"
}
```

**Condition** : If 'password' is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success": false,
    "message": "Password not match"
}

```

# List User

Show all user


**URL** : `/user`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : NO

## Success Responses

**Condition** : All list user.

**Code** : `200 OK`

**Parameters** :

sarjana = true

```json
{
    "success": true,
    "message": "List All user",
    "data": [
         {
            "username": "andi",
            "course": "CSS",
            "mentor": "Cania",
            "title": "S.Kom"
        },
        {
            "username": "Budi",
            "course": "HTML",
            "mentor": "Cania",
            "title": "S.Kom"
        },
    ],
    "pageInfo": {
        "page": 1,
        "totalPage": 1,
        "perPage": 5,
        "totalData": 1,
        "nextLink": null,
        "prevLink": null
    }
}
```
## Data Empty Responses

**Condition** : if not have data.

**Code** : `200 OK`

```json
{
    "success": true,
    "message": "List user",
    "data": [],
    "pageInfo": {
        "page": 1,
        "totalPage": 1,
        "perPage": 5,
        "totalData": 0,
        "nextLink": null,
        "prevLink": null
    }
}
```
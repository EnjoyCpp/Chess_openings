# Chess_openings
## Building project
```git clone https://github.com/EnjoyCpp/Chess_openings.git```

```cd Chess_openings```

```docker-compose build```

and then

```docker-compose up```

## CRUD

## Usage
Test the API with [Postman](https://www.postman.com/).

### Example JSON

```JSON
{
  "author": "James Mason",
  "title": "London System",
  "year": "1922"
}
```

### CREATE

Using POSTMAN and example JSON from above and sending POST request to <br>
http://localhost:5000/Chess_openings/


### READ

To get all records

http://localhost:5000/Chess_openings/
```JSON
        {
            "id": 1,
            "author": "Greco",
            "title": "Italian Game",
            "year": 1620
        },
        {
            "id": 2,
            "author": "Ruy López de Segura",
            "title": "Ruy López",
            "year": 1490
        },
```
<br>
TO READ entry by id
<br>
http://localhost:5000/Chess_openings/:id

Example: GET http://localhost:5000/Chess_openings/3

```JSON
{
    "id": 3,
    "author": "Horatio Caro and Marcus Kann",
    "title": "Caro–Kann Defence",
    "year": 1886
}
```

### UPDATE

Using POSTMAN and sending PUT request
<br>
```JSON
{
  "id": 4
  "author": "Esben Lund and Andreas Skytte Hagen",
  "title": "King's Indian Defence",
  "year": "1954"
}
```


### PATCH

Using POSTMAN and sending PATCH request to request to change record one value

```JSON

{
  "id": 4
  "author": "James Mason",
}

```

### DELETE

USING POSTMAN and sending DELETE request

http://localhost:5000/Chess_openings/:id

Example: DELETE http://localhost:5000/Chess_openings/3
<br>
If request is succestful response is :

```JSON

{
    "deletedID": "3"
}
```

### DATABASE

Chess.db database which contains 5 openings was created using <br>
./database/setup-db.js script

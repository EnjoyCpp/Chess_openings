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
to read entry by id
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
  "author": "James Mason",
  "title": "London System",
  "year": "1922"
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


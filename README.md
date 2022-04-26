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

### READ

http://localhost:5000/Chess_openings/
<br>
to read entry by id
<br>
http://localhost:5000/Chess_openings/:id

### UPDATE

USING POSTMAN and sending PUT request
<br>
```JSON
{
  "id": 4
  "author": "James Mason",
  "title": "London System",
  "year": "1922"

}
```

### DELETE

USING POSTMAN and sending DELETE request

http://localhost:5000/Chess_openings/:id


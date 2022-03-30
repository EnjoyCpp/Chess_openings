# Chess_openings
## Building project
```git clone https://github.com/EnjoyCpp/Chess_openings.git```

```cd Chess_openings```

```docker-compose build```

and then

```docker-compose up```

## CRUD

### CREATE

```http://localhost:5000/add/(id number)/(name)/(opening)/(year)```
to create new entry with id, name, opening, year

### READ

```http://localhost:5000/view/id```
to read entry by id

### UPDATE

```http://localhost:5000/update/(id number)/(new author)/(new opening)/new(year)```
to update entry by id

### DELETE

```http://localhost:5000/del/(id number)```
to delete entry with id


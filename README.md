## Description

- This repo is to build a parser for the Bible text format.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Docker

### Build the image
- `docker build -t nestjs-dev-image .`

## Demo
- Create a `data` folder in `src` folder. Then use this rule to create some next few folders like this:
```
src
+-- data
+------ source
+---------- <bible's language (en, vi)>
+-------------- <translationId (asv, kjv, 1934, ...)>
```
- Then start the server, it will generate a new directory in `data` folder named `target`. And it will contain the JSON parsed files.
- For example: We have a file named: `eng-asv_002_GEN_01_read.txt`. And its content will be:
  ```
    The First Book of Moses, Commonly Called Genesis.
    Chapter 1.
    In the beginning God created the heavens and the earth. 
    And the earth was waste and void; and darkness was upon the face of the deep: and the Spirit of God moved upon the face of the waters. 
    And God said, Let there be light: and there was light. 
    And God saw the light, that it was good: and God divided the light from the darkness. 
  ```
- And the result should be:
  ```
    [
      {
        "language": "en",
        "chapter": 1,
        "verse": 1,
        "content": "In the beginning God created the heavens and the earth.",
        "translation_id": "asv",
        "book_id": "GEN",
        "book_name": "The First Book of Moses, Commonly Called Genesis."
      },
      {
        "language": "en",
        "chapter": 1,
        "verse": 2,
        "content": "And the earth was waste and void; and darkness was upon the face of the deep: and the Spirit of God moved upon the face of the waters.",
        "translation_id": "asv",
        "book_id": "GEN",
        "book_name": "The First Book of Moses, Commonly Called Genesis."
      },
      {
        "language": "en",
        "chapter": 1,
        "verse": 3,
        "content": "And God said, Let there be light: and there was light.",
        "translation_id": "asv",
        "book_id": "GEN",
        "book_name": "The First Book of Moses, Commonly Called Genesis."
      },
      ...
    ]
  ```
## Stay in touch

- Email: ngonhuthanhtrung1409@gmail.com

## License

Nest is [MIT licensed](LICENSE).

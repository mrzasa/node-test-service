# Jak odpalić

 - potrzebny będzie [node.js](http://nodejs.org/download/) oraz [mongodb](http://www.mongodb.org/downloads)
 - zciągamy repozytorium
 - odpalamy mongodb z domyślnymi ustawieniami
 - otwieramy konsole i w pobranym folderze wykonujemy komndy:
  - `npm install` - zainstaluje wszystkie wymagane zależności
	- `npm install -g mocha` - zainstaluje środowisko testowe globalnie
	- `mocha` - odpala testy
	- `node server` - odpala nasz serwerek na porcie 4000

# zadanka
## 2. zasób entry cd.
 - usuwanie elementu (request delete pod `/entry/<id>`)
 - nadpisanie elementu (request put pod `/entry/<id>`)
 - paginacja/virtual scrolling - w tym momencie serwer zwraca pierwsze 10 wpisów jeżeli nie podamy zakresu. Aby określić zakres wysyłamy nagłówek `Range` o wartości `rows=<od>-<do>`

## 1. zasób entry
 - listowanie elementów (request get pod `/entry/`)
 - dodawanie elementów (request post pod `/entry/`)
 - pobranie szczegółów (request get pod `/entry/<id>`)

serwer nie ma ograniczeń na to co możemy wrzucic aczkolwiek dobrze będzie zachować poniższą strukturę aby ułatwić sobie wykonywanie kolejnych zadań

	{
		"Title": "tytuł",
		"Body": "treść",
		"Teaser": "treść skrócona"
	}
mail: yaren042@mail.ru
yandex: goshanyaren@yandex.ru

для запуска приложения запустите по очереди

```
docker compose build
docker compose up
```

В логике приложения взять в работу можно только новое(status: new) либо отмененное(status: denied) обращение.
Завершить обращение(finished) можно только то, которое в находится работе(processed)

1.для создания обращения нужно отправить POST запрос

```
http://localhost:3000/appeal

Body:{
    "theme": string,
    "payload": string
 }
```

2.чтобы взять обращение в работу нужно отправить PATCH запрос

```
http://localhost:3000/appeal/takeAppealToWork/<appeal_id>
```

<appeal_id> - айдишник обращения, которое берем в работу

3.чтобы успешно завершить обращение нужно отправить PATCH запрос

```
http://localhost:3000/appeal/finishAppealById/<appeal_id>
```

<appeal_id> - айдишник обращения, которое завершаем

4.чтобы отменить сообщение, нужно отправить PATCH запрос

```
http://localhost:3000/appeal/denyAppealById/<appeal_id>
Body:{
    "other": string
 }
```

other - дополнительная иформация об отмене.
<appeal_id> - айдишник обращения, которое отменяем

5.чтобы отменить все сообщения, нужно отправить PATCH запрос

```
http://localhost:3000/appeal/denyAllAppeals
```

6.получение всех обращений + фильтрация обращений по дате
6.1 для фильтрации по дате в период, нужно отправить GET запрос

```
http://localhost:3000/appeal?from=yyyy-mm-dd&to=yyyy-mm-dd
```

например:

```
http://localhost:3000/appeal?from=2025-01-22&to=2025-03-22
```

6.2 для получения обращений в конкретную дату, нужно отправить GET запрос

```
http://localhost:3000/appeal?date=yyyy-mm-dd
```

6.3 для получения ВСЕХ обращений нужно отправить запрос

```
http://localhost:3000/appeal
```

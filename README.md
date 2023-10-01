# Небольшое предисловие

Для тестов советую попробовать эту ссылочку 
https://bwg-test-theta.vercel.app/?order=asc&pageSize=5&search=react&sort=relevance
Многие вопросы с низкой релевантностью не находятся апишкой, из-за чего при переходе на страницу вопроса возвращается ошибка "Вопрос не найден". 
В этом случае с серва прилетает пустой массив, почему - не знаю :). По этой причине и советую данную сыллку, там топ вопросы открываются без проблем.

Сделал сортировку полностью синхронизированную с url, так что можно копировать ссылку и вставлять - фильтры применятся, так же можно гулять по истории браузера
стрелочками и так далее.

Чтобы я не тратил много времени на стили, но при этом глазки проверяющих сильно не болели при просмотре моей работы, я использовал библиотеку AntDesign :)

## Замечания
- В пагинации нет возможности зайти дальше 25 страицы - нужны доп права
- Релевантность не настраивается через asc и desc, тоже особенность апишки
- Поиск не начнется, пока пуста строка текста вопроса

Чистая ссылка на сайт, без настроек сортировки (только те что по умолчанию)
https://bwg-test-theta.vercel.app/ 

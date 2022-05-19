# Алгоритм реализации задачи
1. Создаем чистую функцию filterCourses, которая принимает три аргумента:  range: [null || number], courses: [el.prices: [null || number]] и ascendingSortOrder: boolean (по умолчанию - true).
2. Делаем проверку входящих параметров на соответствие типам с помощью функции validateInput. В случае несоответствия вызывается alert("Неверный формат переданных данных") и функция прекращается.
3. Осуществляем преобразование rangeMin и coursePriceMin в 0, rangeMax и coursePriceMax в Infinity с помощью функции convertNullToNumber. 
4. Через цикл осуществляем фильтрацию, добавляя элементы, удовлетворяющие фильтрации, в результирующий массив result. Условие фильтрации: (coursePriceMin <= rangeMax) && (coursePriceMax >= rangeMin).
5. Возвращаем вызов функции sortCourses, передав в нее результирующий массив result и ascendingSortOrder.

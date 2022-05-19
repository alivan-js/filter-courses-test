// Список курсов

let courses = [
    {name: "Courses in England", prices: [0, 100]},
    {name: "Courses in Germany", prices: [500, null]},
    {name: "Courses in Italy", prices: [100, 200]},
    {name: "Courses in Russia", prices: [null, 400]},
    {name: "Courses in China", prices: [50, 250]},
    {name: "Courses in USA", prices: [200, null]},
    {name: "Courses in Kazakhstan", prices: [56, 324]},
    {name: "Courses in France", prices: [null, null]},
];

// Варианты цен (фильтры), которые ищет пользователь

let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

// Функция возвращает список курсов, которые соответствуют заданному диапазону цен. По умолчанию цены курсов отсортированы по возрастанию.
// Фильтрация осуществлена при следующем предположении: пользователь желает увидеть курсы, чьи цены, в том числе, равны значению диапозона фильтра.

function filterCourses(range, courses, ascendingSortOrder = true) {

    // Валидация передаваемых в функцию значений

    function validateInput() {

        let isValidate = true

        if (typeof ascendingSortOrder !== "boolean") {
            isValidate = false
        }

        const isNumberOrNull = (el) => {
            return ((el === null) || (typeof el === "number"));
        }

        if (range.length !== 2) {
            isValidate = false
        }

        range.forEach(el => {
            if (!isNumberOrNull(el)) {
                isValidate = false
            }
        })

        courses.forEach(el => {
            if (el.prices.length !== 2) {
                isValidate = false
            }
            if (!(isNumberOrNull(el.prices[0]) && isNumberOrNull(el.prices[1]))) {
                isValidate = false
            }
        })

        return isValidate

    }

    if (!validateInput()) {
        alert("Неверный формат вводных данных")
        return;
    }

    // Логика фильтрации курсов

    let result = []

    const rangeMin = convertNullToNumber(range[0], true)
    const rangeMax = convertNullToNumber(range[1], false)

    for (let i = 0; i < courses.length; i++) {
        const coursePriceMin = convertNullToNumber(courses[i].prices[0], true)
        const coursePriceMax = convertNullToNumber(courses[i].prices[1], false)
        if ((coursePriceMin <= rangeMax) && (coursePriceMax >= rangeMin)) {
            result.push(courses[i])
        }
    }

    return sortCourses(result, ascendingSortOrder)

}

// Функция для сортировки курсов по цене

function sortCourses(courses, ascendingSortOrder) {

    let sortedCourses = courses

    const compareNum = (firstNum, secondNum) => {

        if (ascendingSortOrder ? firstNum > secondNum : firstNum < secondNum) {
            return 1
        } else if (ascendingSortOrder ? secondNum > firstNum : secondNum < firstNum) {
            return -1
        } else {
            return 0
        }

    }

    sortedCourses.sort((a, b) => {

            const minNumA = convertNullToNumber(a.prices[0], true)
            const maxNumA = convertNullToNumber(a.prices[1], false)
            const minNumB = convertNullToNumber(b.prices[0], true)
            const maxNumB = convertNullToNumber(b.prices[1], false)

            if (compareNum(minNumA, minNumB) === 0) {
                return compareNum(maxNumA, maxNumB)
            } else {
                return compareNum(minNumA, minNumB)
            }

        }
    )

    return sortedCourses

}

// Функция для конвертации null в Infinity или 0 в зависимости от его положения в диапозоне

const convertNullToNumber = (value, isMin) => {

    if (isMin) {
        return value === null ? 0 : value
    }

    return value === null ? Infinity : value

}

// Результат выполнения filterCourses

console.log(filterCourses(requiredRange1, courses))
console.log(filterCourses(requiredRange2, courses))
console.log(filterCourses(requiredRange3, courses))
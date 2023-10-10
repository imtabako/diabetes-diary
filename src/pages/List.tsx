import ListEntry from "../components/ListEntry.tsx";

import './List.css'

// date format: ddmmyy
function compareDates(a, b) {
  const y = Number(a.year) - Number(b.year);
  const m = Number(a.month) - Number(b.month);
  const d = Number(a.day) - Number(b.day);

  if (y == 0) {
    if (m == 0) {
      return d;
    }
    return m;
  }
  return y;
}

function compareTimes(a: string, b: string) {
  const h = Number(a.substring(0,2)) - Number(b.substring(0, 2));
  const m = Number(a.substring(3,5)) - Number(b.substring(3, 5));

  if (h == 0) {
    return m;
  }
  return h;
}

function List({
  measures, setMeasures,
  minSugar, maxSugar
              }) {
  function renderDate(date) {
    const today = new Date();

    const year = '20' + date.substring(4, 6);
    const m = date.substring(2,4);
    let day = '';
    if (date.charAt(0) == '0') {
      day = date.substring(1,2);
    } else {
      day = date.substring(0,2);
    }

    if (Number(year) == today.getFullYear() &&
      Number(m) - 1 == today.getMonth() &&
      Number(day) == today.getDate()) {
      return 'Today';
    }

    let month = '';
    switch (m) {
      case '01':
        month = 'Jan';
        break;
      case '02':
        month = 'Feb';
        break;
      case '03':
        month = 'Mar';
        break;
      case '04':
        month = 'Apr';
        break;
      case '05':
        month = 'May';
        break;
      case '06':
        month = 'Jun';
        break;
      case '07':
        month = 'Jul';
        break;
      case '08':
        month = 'Aug';
        break;
      case '09':
        month = 'Sep';
        break;
      case '10':
        month = 'Oct';
        break;
      case '11':
        month = 'Nov';
        break;
      case '12':
        month = 'Dec';
        break;
    }

    return day + ' ' + month;
  }

  const result = measures.reduce((memo, x) => {
    if (!memo[x['date']]) {
      memo[x['date']] = [];
    }
    memo[x['date']].push(x);
    return memo;
  }, {});

  // result.sort((a, b) => compareDates(Object.keys(a)[0], Object.keys(b)[0]))

  for (const dateM in result) {
    result[dateM].sort((a, b) => compareTimes(a.time, b.time))
  }
  console.log(result)

  return (
    <>
      {Object.keys(result).map((key, index) => {
        return (
          <div key={key} className="list-day">
            <span className="list-day-date">{renderDate(key)}</span>
            <div className="list-day-entries"></div>
            {result[key].map((m) =>  (
              <ListEntry minSugar={minSugar} maxSugar={maxSugar} key={m.id} sugar={m.sugar} time={m.time} mood={m.mood} mealType={m.mealType} comment={m.comment} />
            ))}
          </div>
        )
      })

      }
    </>
  );
}

export default List;
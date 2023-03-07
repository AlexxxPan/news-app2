// лінк на гугл іконки в index.html
// <link
//   rel="stylesheet"
//   href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
// />

// В файл mostPopular, виклик ставила на 21 рядок
// import { paginationByPopular } from './pagination';
// paginationByPopular();

// В файл searchNews, виклик ставила на 70 рядок
// import { paginationBySearch } from './pagination';
// paginationBySearch

// В файл filters, виклик ставила на 70 рядок
// import { paginationByFilter } from './pagination';
// paginationByFilter();

import { fetchNews } from './FetchNews';
import {
  saveSearchData,
  addClassesForCoincidencesMarkupAndStorage,
  renderNewsCards,
  deleteNewsCards,
} from './CommonFunctions';

const gallery = document.querySelector('.gallery-container');
const prevCon = document.querySelector('.prev_container');
const nextCon = document.querySelector('.next_container');
const itemCont = document.querySelector('.item_container');

nextCon.addEventListener('click', handleNextPage);
prevCon.addEventListener('click', handlePreviousPage);
itemCont.addEventListener('click', handlePageByNumber);

export async function paginationByPopular() {
  console.log('Пагінація новин "Популярні"');

  // const response = await fetchNews.fetchNewsByPopular();
  // console.log(response);
  // console.log(fetchNews.getHits());
  const totalHits = fetchNews.getHits();
  const totalPages = Math.ceil(totalHits / 8);
  console.log(totalHits);

  // pag(totalPages);
  element(totalPages, 1);
}

export async function paginationBySearch() {
  console.log('Пагінація новин по пошуку');

  // const response = await fetchNews.fetchNewsBySearch();

  // console.log(response);
  console.log('.getHits()', fetchNews.getHits());
  // console.log(response.meta.hits);
  const totalHits = fetchNews.getHits();
  // console.log('response.meta.hits', totalHits);

  const totalPages = Math.ceil(totalHits / 8);
  //   pag(totalPages);
  element(totalPages, 1);
}

export async function paginationByFilter() {
  console.log('Пагінація новин пофільтрам');

  // const response = await fetchNews.fetchNewsBySearch();

  // console.log(response);
  console.log('.getHits()', fetchNews.getHits());
  // console.log(response.meta.hits);
  const totalHits = fetchNews.getHits();
  // console.log('response.meta.hits', totalHits);

  const totalPages = Math.ceil(totalHits / 8);

  element(totalPages, 1);
  // pag(totalPages);
}

// export async function paginationByDate() {
//   console.log('Пагінація новин по даті');

//   // const response = await fetchNews.fetchNewsByDate();
//   // дані
//   // console.log(fetchNews.getFiltredStorageData());

//   const totalHits = fetchNews.getHits();
//   const totalPages = Math.ceil(totalHits / 8);
//   console.log(totalHits);

//   // pag(totalPages);
//   element(totalPages, 1);
// }

// ------------------------------------------------------------------------------------------------

async function handleNextPage() {
  fetchNews.incrementPage();
  deleteNewsCards();

  if (fetchNews.getUrl().includes('articlesearch')) {
    fetchNews.resetData();
    fetchNews.resetStorageData();

    try {
      const response = await fetchNews.fetchPagination();

      if (!response.data.response.docs.length) {
        console.log('закінчились новини');
        return;
      }

      const {
        data: {
          response: { docs },
        },
      } = response;

      saveSearchData(docs);
      renderNewsCards();
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(true);
      addClassesForCoincidencesMarkupAndStorage();
    } catch (error) {
      console.log(error);
    }
  } else {
    if (!fetchNews.isUrlRequest) {
      const data = fetchNews.getFiltredStorageData();
      renderPerPageNewsCardByData(data);
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(false);
      addClassesForCoincidencesMarkupAndStorage();
    } else {
      const data = fetchNews.getStorageData();
      renderPerPageNewsCardByData(data);
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(true);
      addClassesForCoincidencesMarkupAndStorage();
    }
  }
}

async function handlePreviousPage() {
  fetchNews.decrementPage();
  deleteNewsCards();

  if (fetchNews.getUrl().includes('articlesearch')) {
    fetchNews.resetData();
    fetchNews.resetStorageData();

    try {
      const response = await fetchNews.fetchPagination();

      if (!response.data.response.docs.length) {
        console.log('закінчились новини');
        return;
      }

      const {
        data: {
          response: { docs },
        },
      } = response;

      saveSearchData(docs);
      renderNewsCards();
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(true);
      addClassesForCoincidencesMarkupAndStorage();
    } catch (error) {
      console.log(error);
    }
  } else {
    if (!fetchNews.isUrlRequest) {
      const data = fetchNews.getFiltredStorageData();
      renderPerPageNewsCardByData(data);
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(false);
      addClassesForCoincidencesMarkupAndStorage();
    } else {
      const data = fetchNews.getStorageData();
      renderPerPageNewsCardByData(data);
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(true);
      addClassesForCoincidencesMarkupAndStorage();
    }
  }
}

async function handlePageByNumber(e) {
  fetchNews.setPage(Number(e.target.textContent) - 1);
  deleteNewsCards();

  if (fetchNews.getUrl().includes('articlesearch')) {
    fetchNews.resetData();
    fetchNews.resetStorageData();

    try {
      const response = await fetchNews.fetchPagination();

      if (!response.data.response.docs.length) {
        console.log('закінчились новини');
        return;
      }

      const {
        data: {
          response: { docs },
        },
      } = response;

      saveSearchData(docs);
      renderNewsCards();
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(true);
      addClassesForCoincidencesMarkupAndStorage();
    } catch (error) {
      console.log(error);
    }
  } else {
    if (!fetchNews.isUrlRequest) {
      const data = fetchNews.getFiltredStorageData();
      renderPerPageNewsCardByData(data);
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(false);
      addClassesForCoincidencesMarkupAndStorage();
    } else {
      const data = fetchNews.getStorageData();
      renderPerPageNewsCardByData(data);
      fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
      fetchNews.setIsUrlRequest(true);
      addClassesForCoincidencesMarkupAndStorage();
    }
  }
}

function renderPerPageNewsCardByData(data) {
  const array = [...data];
  const subArray = breakUp(array);
  const renderData = [];
  // перебираємо маси та перші 8 елементів пушимо в renderData
  for (let i = 0; i < array.length; i++) {
    if (!subArray[fetchNews.getPage()][i]) {
      continue;
    }
    renderData.push(subArray[fetchNews.getPage()][i]);
  }
  // створюємо строку розмітки
  const markUp = renderData.reduce((acc, el) => {
    acc += `<div class="news-card" news-id="${el.id}">
        <div class="news-card__img">
          <p class="news-card__theme">${el.category}</p>
          <img
            class="news-card__item"
            src="${el.imgUrl}"
            alt="${el.imgDescr ? el.imgDescr : 'photo'}"
            loading="lazy"
            width="395"
          />
          <div class="news-card__favorite">
            <label for="favorite" id="${
              el.id
            }" class="label-favorite">Add to favorite</label>
            <input type="checkbox" class="input-favorite" id="favorite"/>
          </div>
        </div>
        <h2 class="news-card__info-title">${el.title}</h2>
        <p class="news-card__info-text">${
          el.description.length > 180
            ? el.description.slice(0, 180) + '...'
            : el.description
        }</p>
        <div class="news-card__additional">
          <p class="news-card__date">${el.pubDate}</p>
          <a class="news-card__more" href="${el.url}" id="${
      el.id
    }"target="_blank" rel="noreferrer noopener">Read more</a>
        </div>
      </div>`;
    return acc;
  }, ``);
  // додоємо створену розмітку в DOM

  gallery.insertAdjacentHTML('beforeend', markUp);
}

function breakUp(array) {
  const arr = [];
  for (let i = 0; i < array.length; i += 8) {
    arr.push(array.slice(i, i + 8));
  }
  return arr;
}

function element(totalPage, page) {
  let totalPages = totalPage;

  let liTag = '';
  let prevTag = '';
  let nextTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;

  if (totalPage > 50) {
    totalPages = 50;
  }
  if (totalPage === 1) {
    return;
  }
  // додаваня кнопки прев
  prevTag += `<li class="pagination_btn prev">
            <span class="material-symbols-outlined"> chevron_left</span>
            <span>Prev</span>
          </li>`;
  prevCon.innerHTML = prevTag;

  // коли відгортаєш далеко від початку, залишається видимою сторінка 1 і додаються "..." з початку
  if (page > 3) {
    liTag += `<li class="numb"><span>1</span></li> <li class="dots"><span>...</span></li>`;
  }

  // відображення сторінок якщо ти на самому початку
  if (page === totalPages) {
    beforePages = beforePages - 1;
  } else if (page === totalPages - 1) {
    // beforePages = beforePages - 1;
  }

  // відображення сторінок якщо ти на самому кінці
  if (page === 1) {
    afterPages = afterPages + 2;
  } else if (page === 2) {
    afterPages = afterPages + 1;
  }

  // відображення трьох сторінок посередині
  for (
    let pageLength = beforePages;
    pageLength <= afterPages;
    pageLength += 1
  ) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength === 0) {
      pageLength = pageLength + 1;
    }

    // підкреслює активну сторінку
    if (page === pageLength) {
      activeLi = 'active';
    } else {
      activeLi = '';
    }
    liTag += `<li class="numb ${activeLi}"><span class="pageLength">${pageLength}</span></li>`;
  }

  // додає "..." з кінця
  if (page < totalPages - 3) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="numb"><span>${totalPages}</span></li>`;
  }

  // Додаваня кнопки некст
  nextTag += `<li class="pagination_btn next">
            <span>Next</span
            ><span class="material-symbols-outlined"> chevron_right </span>
          </li>`;
  nextCon.innerHTML = nextTag;
  itemCont.innerHTML = liTag;

  // Події кліку для перемикання сторінок по кнопці прев
  const prevBtn = document.querySelector('.prev');
  prevBtn.addEventListener('click', () => {
    if (page > 1) {
      element(totalPages, page - 1);
      return;
    }
  });

  // Події кліку для перемикання сторінок по кнопці некст
  const nextBtn = document.querySelector('.next');
  nextBtn.addEventListener('click', () => {
    if (page < totalPages) {
      element(totalPages, page + 1);
    }
  });

  // Події кліку для перемикання сторінок по самим цифрам
  const pageNumbers = document.querySelectorAll('.numb');
  const pageNumbersArray = Array.from(pageNumbers);

  for (const pageNumber of pageNumbersArray) {
    pageNumber.addEventListener('click', e => {
      const pageNumberValue = Number(e.target.textContent);
      element(totalPages, pageNumberValue);
    });
  }

  // логіка для неактивних кнопок
  if (page === 1) {
    prevBtn.classList.add('inactive');
    return;
  }
  if (page === totalPages) {
    nextBtn.classList.add('inactive');
    nextCon.classList.add('inactiveCon');

    return;
  }
  nextCon.classList.remove('inactiveCon');
}

// async function pag(a) {
//   const mediaQuery = window.matchMedia('(min-width: 768px)');
//   const totalPage = a;
//   function handleScreenSizeChange(e) {
//     if (!e.matches) {
//       // console.log('tab size', totalPage);
//       // element(totalPage, 1);
//       console.log('mob size');
//       elementMob(totalPage, 1);
//       return;
//     }
//     // console.log('mob size');
//     // element(totalPage + 1);
//   }

//   mediaQuery.addListener(handleScreenSizeChange);
// }

//

// function elementMob(totalPag, page) {
//   let liTag = '';
//   let prevTag = '';
//   let nextTag = '';
//   let activeLi;
//   // let beforePages = page - 1;
//   // let afterPages = page + 1;
//   let beforePages = page;
//   let afterPages = page;
//   let totalPages = totalPag;

//   if (totalPages > 50) {
//     totalPages = 50;
//   }
//   // додаваня кнопки прев
//   prevTag += `<li class="pagination_btn prev">
//             <span class="material-symbols-outlined"> chevron_left</span>
//             <span>Prev</span>
//           </li>`;
//   prevCon.innerHTML = prevTag;

//   // // коли відгортаєш далеко від початку, залишається видимою сторінка 1 і додаються "..." з початку
//   // if (page > 3) {
//   //   liTag += `<li class="numb"><span>1</span></li> <li class="dots"><span>...</span></li>`;
//   // }
//   // коли відгортаєш далеко від початку, залишається видимою сторінка 1 і додаються "..." з початку
//   if (page > 1) {
//     liTag += `<li class="numb"><span>1</span></li> <li class="dots"><span>...</span></li>`;
//   }

//   // // відображення сторінок якщо ти на самому початку
//   // if (page === totalPages) {
//   //   beforePages = beforePages - 2;
//   // } else if (page === totalPages - 1) {
//   //   beforePages = beforePages - 1;
//   // }

//   // // відображення сторінок якщо ти на самому кінці
//   // if (page === 1) {
//   //   afterPages = afterPages + 2;
//   // } else if (page === 2) {
//   //   afterPages = afterPages + 1;
//   // }

//   // відображення трьох сторінок посередині
//   for (
//     let pageLength = beforePages;
//     pageLength <= afterPages;
//     pageLength += 1
//   ) {
//     if (pageLength > totalPages) {
//       continue;
//     }
//     if (pageLength === 0) {
//       pageLength = pageLength + 1;
//     }

//     // підкреслює активну сторінку
//     if (page === pageLength) {
//       activeLi = 'active';
//     } else {
//       activeLi = '';
//     }
//     liTag += `<li class="numb ${activeLi}"><span class="pageLength">${pageLength}</span></li>`;
//   }

//   // // додає "..." з кінця
//   // if (page < totalPages - 2) {
//   //   if (page < totalPages - 2) {
//   //     liTag += `<li class="dots"><span>...</span></li>`;
//   //   }
//   //   liTag += `<li class="numb"><span>${totalPages}</span></li>`;
//   // }
//   // додає "..." з кінця
//   if (page < totalPages) {
//     liTag += `<li class="dots"><span>...</span></li>`;

//     liTag += `<li class="numb"><span>${totalPages}</span></li>`;
//   }

//   // Додаваня кнопки некст
//   nextTag += `<li class="pagination_btn next">
//             <span>Next</span
//             ><span class="material-symbols-outlined"> chevron_right </span>
//           </li>`;
//   nextCon.innerHTML = nextTag;
//   itemCont.innerHTML = liTag;

//   // Події кліку для перемикання сторінок по кнопці прев
//   const prevBtn = document.querySelector('.prev');
//   prevBtn.addEventListener('click', () => {
//     if (page > 1) {
//       element(totalPages, page - 1);
//       return;
//     }
//   });

//   // Події кліку для перемикання сторінок по кнопці некст
//   const nextBtn = document.querySelector('.next');
//   nextBtn.addEventListener('click', () => {
//     if (page < totalPages) {
//       element(totalPages, page + 1);
//     }
//   });

//   // Події кліку для перемикання сторінок по самим цифрам
//   const pageNumbers = document.querySelectorAll('.numb');
//   const pageNumbersArray = Array.from(pageNumbers);

//   for (const pageNumber of pageNumbersArray) {
//     pageNumber.addEventListener('click', e => {
//       const pageNumberValue = Number(e.target.textContent);
//       element(totalPages, pageNumberValue);
//     });
//   }

//   // логіка для неактивних кнопок
//   if (page === 1) {
//     prevBtn.classList.add('inactive');
//     return;
//   }
//   if (page === totalPages) {
//     nextBtn.classList.add('inactive');
//     nextCon.classList.add('inactiveCon');

//     return;
//   }
//   nextCon.classList.remove('inactiveCon');
// }

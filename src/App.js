import React from 'react';
import { Collection } from './Collection';
import './index.css';

const category = [
  { "name": "Всё" },
  { "name": "Пейзажи" },
  { "name": "Море" },
  { "name": "Культура" },
  { "name": "Авто" },
  { "name": "Разное" }
]

function App() {
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)

  const pages = categoryId ? `category=${categoryId}` : '';
  const [pagesItem, setPagesItem] = React.useState(2)



  React.useEffect(() => {
    setIsLoading(true)
    fetch(`https://633ffba7e44b83bc73c5e86e.mockapi.io/collage?page=${page}&limit=8&${pages}`)
      .then(res => res.json())
      .then(json => {
        setCollections(json);
      })
      .catch((err) => {
        alert('Ошибка получения данных')
      }).finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {category.map((obj, i) => <li onClick={() => { setPage(1); setCategoryId(i) }} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)}
        </ul>
        <input value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (<h2>Идёт загрузка ...</h2>) :
          (
            collections
              .filter((obj) => obj.name.toLowerCase()
                .includes(searchValue.toLowerCase()))
              .map((obj, index) => (
                <Collection key={index} name={obj.name} images={obj.photos} />
              ))
          )}

      </div>
      <ul className="pagination">
        {[...Array(pagesItem)].map((obj, i) => <li onClick={() => { setPage(i + 1) }} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>)}
      </ul>
    </div>
  );
}

export default App;

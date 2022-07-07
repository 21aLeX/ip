import { useEffect, useState } from 'react';
import Api from './Api';
import './App.css';

function App() {

  const [city, getCity] = useState('город не определен')
  const [ip, getIp] = useState('ip не определен')
  const [street, getStreet] = useState('')
  async function SetData() {
    getCity(await Api.GetCity())
    getIp(await Api.GetIp())
  }
  async function Enter() {
    if (street) {
      document.getElementById('select').innerHTML = ''
      let arrStret = await Api.GetStreet(street, city)
      if (arrStret.length != 0) {
        arrStret.map(str => {
          let options = document.createElement('option')
          options.value = str
          options.text = str
          document.getElementById('select').append(options)
        })
      } else {
        let options = document.createElement('option')
        options.value = 'Нет данных'
        options.text = 'Нет данных'
        document.getElementById('select').append(options)

      }
    }

  }
  useEffect(() => {
    SetData()
  }, [])

  return (
    <div className="App">
      <label>Ваш город:
        <input
          value={city}
          readOnly
        >
        </input>
      </label>
      <label>Ваш ip:
        <input
          value={ip}
          readOnly
        >
        </input>
      </label>
      <label>Введите название улицы:
        <input
          value={street}
          onChange={e => getStreet(e.target.value.replace(/[^a-z A-Z А-Я а-я Ё ё ]/g, ''))}
          onKeyDown={e => { if (e.keyCode == 13) Enter() }}
          onBlur={e => Enter()}
        >
        </input>
      </label>
      <label>Список улиц:
        <select id='select'>
          <option defaultValue='Нет данных'>Нет данных</option>
        </select>
      </label>
    </div>
  );
}

export default App;

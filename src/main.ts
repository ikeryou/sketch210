import { Conf } from './core/conf';
import { Kv } from './parts/Kv';
import './style.css'


// 複製
const num = Conf.instance.NUM;
const temp:HTMLElement = document.querySelector('.l-main-item') as HTMLElement;
for(let i = 0; i < num; i++) {
  document.querySelector('.l-main')?.append(temp.cloneNode(true));
}

new Kv({
  el:(document.querySelector('.l-main') as HTMLElement)
})
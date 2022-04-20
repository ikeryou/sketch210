
import { MyDisplay } from "../core/myDisplay";
import { Color } from "three/src/math/Color";
import { Util } from "../libs/util";
import { Item } from "./item";
import { Point } from "../libs/point";
import { HSL } from "../libs/hsl";
import { Mouse } from "../core/mouse";

// -----------------------------------------
//
// -----------------------------------------
export class Kv extends MyDisplay {

  private _item:Array<Item> = [];
  private _selectClassNames:Array<string> = [];
  private _pos:Point = new Point();

  constructor(opt:{el:HTMLElement}) {
    super(opt)

    // 選択用のクラス作っておく
    const num = 100;
    for(let l = 0; l < num; l++) {
      const hsl = new HSL();
      hsl.s = 1;
      hsl.l = 0.5;
      hsl.h = Util.instance.map(Math.sin(Util.instance.radian(Util.instance.map(l, 0, 360, 0, num - 1))), 0, 1, -1, 1);

      const col = new Color()
      col.setHSL(hsl.h, hsl.s, hsl.l);
      let styleCol:String = col.getStyle();

      const sheets = document.styleSheets
      const sheet = sheets[sheets.length - 1];
      const name = 'col-' + l
      sheet.insertRule(
        // '.' + name + '::selection { background: ' + styleCol + '; }',
        '.' + name + '::selection { background: ' + styleCol + '; color: ' + '#000' + '; }',
        sheet.cssRules.length
      );

      this._selectClassNames.push(name);
    }

    this.qsAll('.l-main-item').forEach((val,i) => {
      const item = new Item({
        el:val as HTMLElement,
        id:i,
        selectClassNameList:this._selectClassNames
      });
      this._item.push(item);
    });
  }


  protected _update(): void {
    super._update();

    const mx = Mouse.instance.x
    const my = Mouse.instance.y
    this._pos.x = mx
    this._pos.y = my

    this._item.forEach((val) => {
      const dx = this._pos.x - val.pos.x;
      const dy = this._pos.y - val.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if(dist < 100) {
        val.startHover();
      }
    })
  }
}
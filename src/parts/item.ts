
import { MyDisplay } from "../core/myDisplay";
import { Conf } from "../core/conf";
import { Point } from "../libs/point";
import { Tween } from "../core/tween";
import { Func } from "../core/func";
import { Util } from "../libs/util";
import { Val } from "../libs/val";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _id:number;
  private _selectClassNameList:Array<string> = [];

  private _isAttachedClass:boolean = false;
  public get isAttachedClass():boolean {
    return this._isAttachedClass;
  }
  public set isAttachedClass(value:boolean) {
    this._isAttachedClass = value;
  }

  private _nowSelectClassName:string = '';
  public get nowSelectClassName():string {
    return this._nowSelectClassName;
  }
  public set nowSelectClassName(value:string) {
    this._nowSelectClassName = value;
  }

  private _pos:Point = new Point();
  public get pos():Point {
    return this._pos;
  }

  private _hoverRate:Val = new Val(0);

  constructor(opt:{el:HTMLElement; id:number, selectClassNameList:Array<string>}) {
    super(opt)

    this._id = opt.id;
    this._selectClassNameList = opt.selectClassNameList;

    const txt = Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
    this.getEl().innerHTML = txt;

    if(this._id % Conf.instance.LINE == 0) {
      this.getEl().innerHTML = '<br>';
    }

    setTimeout(() => {
      this._resize();
    }, this._id * 1)
  }


  public startHover(): void {
    this._hoverRate.val = 1
  }


  public addSelectClass(name:string): void {
    this.getEl().classList.add(name);
  }


  public removeSelectClass(name:string): void {
    this.getEl().classList.remove(name);
  }


  protected _update(): void {
    super._update();

    this._hoverRate.val += (0 - this._hoverRate.val) * 0.2
    if(Math.abs(0 - this._hoverRate.val) < 0.01) this._hoverRate.val = 0;

    let useKey = Util.instance.map(this._hoverRate.val, 0, this._selectClassNameList.length - 1, 0, 1);
    useKey = ~~(useKey);

    if(this._nowSelectClassName != '') this.getEl().classList.remove(this._nowSelectClassName);
    if(useKey > 0) {
      useKey = (useKey + this._id + this._c) % (this._selectClassNameList.length - 1);
      this._nowSelectClassName = this._selectClassNameList[useKey]
      this.getEl().classList.add(this._nowSelectClassName);
    }
  }


  protected  _resize(): void {
    super._resize();

    const size = Func.instance.sw() / Conf.instance.LINE
    const fontSize = size * 0.5

    const ix = this._id % Conf.instance.LINE;
    const iy = ~~(this._id / Conf.instance.LINE);

    this._pos.x = ix * size - fontSize * 0.5;
    this._pos.y = iy * size - fontSize * 0.5;

    Tween.instance.set(this.getEl(), {
      x:this._pos.x,
      y:this._pos.y,
      z:0.1,
      fontSize: fontSize
    })

  }
}
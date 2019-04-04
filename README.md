# vue-rollover
ロールオーバーのカスタムディレクティブ  

- ロールオーバー、アウトのアニメーションが完了するのを待つ
- [Vue transition](https://jp.vuejs.org/v2/guide/transitions.html)の私用に合わせてロールオーバー、アウトの状態に応じてclassを適用する

[DEMO](https://ohagip.github.io/vue-rollover/)

## Install
```
npm install git+https://github.com/ohagip/vue-rollover.git
```
or  
`./src/vue-rollover.js`をコピペ

## Usage
```js
import VueRollover from 'vue-rollover'
Vue.use(VueRollover)
```

```vue
<button v-rollover>rollover</button>
<button v-rollover="options">rollover</button>
```

```js
options = { name: 'is' };
options = { name: 'is', duration: 500 };
options = { name: 'is', duration: { enter: 500, leave: 200 } };
```

## Documentation
### options
| Property | Type | Description | Default |
|:--------:|:----:|-------------|---------|
| name | string | 適用するclass名の接頭辞を変更 | v |
| duration | number &#124; object | アニメーションの時間を明示的に指定<br>未設定の場合transition, animationの時間（duration + delayの最大値）から取得 |  |
| duration.enter | number | ロールオーバーの時間 |  |
| duration.leave | number | ロールアウトの時間 |  |

### 適用されるclass
```css
.${name}-enter {}
.${name}-enter-active {}
.${name}-enter-to {}
.${name}-leave {}
.${name}-leave-active {}
.${name}-leave-to {}

/* Default */
.v-enter {}
```
適応されるタイミングは[Vueトランジションクラス](https://jp.vuejs.org/v2/guide/transitions.html#%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B8%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)を参照

---
## Vue CLI npm script

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
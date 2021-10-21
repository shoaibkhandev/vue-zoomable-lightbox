# vue-zoomable-lightbox
A zoomable image responsive lightbox component for based on [pexea12](https://github.com/pexea12/vue-image-lightbox)

## Preview for Desktop

![vue-zoomable-lightbox-web](https://user-images.githubusercontent.com/28407876/138347254-a89faf83-656e-4fce-ae47-f64e2bb5c7dd.gif)

## Preview for Mobile

![vue-zoomable-lightbox-mobile](https://user-images.githubusercontent.com/28407876/138347274-b5bfee6e-4125-4398-b9dc-7363e2ebb4fd.gif)


## Development (NPM / Yarn)
```
npm run dev
yarn dev
```

## Install

#### NPM / Yarn

Install the package:

```
npm install vue-zoomable-lightbox vue-lazyload
yarn add vue-zoomable-lightbox vue-lazyload
```

Globally in your project (main.js)
```javascript
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import LightBox from 'vue-zoomable-lightbox'

Vue.use(VueLazyLoad)
Vue.use(LightBox)
```

Inside component
```javascript
import LightBox from 'vue-zoomable-lightbox'

export default {
  components: {
    LightBox
  },
}
```

plugins/vue-zoomable-lightbox.js for Nuxt Js
```javascript
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import LightBox from 'vue-zoomable-lightbox'
require('vue-zoomable-lightbox/dist/vue-zoomable-lightbox.min.css')

Vue.use(VueLazyLoad)
Vue.use(LightBox)
```

Inside nuxt.config.js add the plugin
```javascript
{ src: '~/plugins/vue-zoomable-lightbox.js', mode: 'client'},
```

Import CSS style
```javascript
require('vue-zoomable-lightbox/dist/vue-zoomable-lightbox.min.css')
// Use only when you are using Webpack
```
How to use:
```html
<light-box :media="media"></light-box>
```

How to use for Nuxt Js:
```html
<client-only>
  <light-box :media="media"></light-box>
</client-only>
```

`media` has the structure:
```javascript
[
  { // For image
    thumb: 'http://example.com/thumb-image1.jpg',
    src: 'http://example.com/image1.jpg',
    caption: 'caption to display. receive <html> <b>tag</b>', // Optional
    srcset: '...' // Optional for displaying responsive images
  },
  { // For image
    thumb: 'http://example.com/thumb-image2.jpg',
    src: 'http://example.com/image2.jpg',
    caption: 'caption to display. receive <html> <b>tag</b>', // Optional
    srcset: '...' // Optional for displaying responsive images
  },
]
```

## Options

### Properties
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>type</th>
      <th>default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>language</td>
      <td>String</td>
      <td>optional</td>
      <td>en|ar</td>
    </tr>
    <tr>
      <td>zoomScale</td>
      <td>Integar</td>
      <td>optional</td>
      <td>1 to 10</td>
    </tr>
    <tr>
      <td>media</td>
      <td>Array</td>
      <td>required</td>
      <td>Media array to display</td>
    </tr>
    <tr>
      <td>showLightBox</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show lightbox or not at the beginning</td>
    </tr>
    <tr>
      <td>startAt</td>
      <td>Number</td>
      <td>0</td>
      <td>Index of the image that you want to start at</td>
    </tr>
    <tr>
      <td>nThumbs</td>
      <td>Number</td>
      <td>7</td>
      <td>Number of thumbnail images</td>
    </tr>
    <tr>
      <td>showThumbs</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show thumbnails or not</td>
    </tr>
    <tr>
      <td>siteLoading</td>
      <td></td>
      <td>String</td>
      <td>default image when your image is error or loading</td>
    </tr>
    <tr>
      <td>showCaption</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to show caption or not</td>
    </tr>
    <tr>
      <td>disableScroll</td>
      <td>Boolean</td>
      <td>true</td>
      <td>set to `true` to avoid scrolling views behind lightbox</td>
    </tr>
     <td>disableZoom</td>
      <td>Boolean</td>
      <td>true</td>
      <td>set to `true` to avoid zooming lightbox</td>
    </tr>
    <tr>
      <td>lengthToLoadMore</td>
      <td>Number</td>
      <td>0</td>
      <td>Minimum length unto end to emit load more event</td>
    </tr>
    <tr>
      <td>closable</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Display the close button at the right top corner or not. ESC clicking-close will also be disabled if closable is set to false.</td>
    </tr>
    <tr>
      <td>closeText</td>
      <td>String</td>
      <td>Close (Esc)</td>
      <td>Text for the close button</td>
    </tr>
    <tr>
      <td>previousText</td>
      <td>String</td>
      <td>Previous</td>
      <td>Text for the previous image button</td>
    </tr>
    <tr>
      <td>nextText</td>
      <td>String</td>
      <td>Next</td>
      <td>Text for the next image button</td>
    </tr>
    <tr>
      <td>previousThumbText</td>
      <td>String</td>
      <td>Previous</td>
      <td>Text for the previous thumb image button</td>
    </tr>
    <tr>
      <td>nextThumbText</td>
      <td>String</td>
      <td>Next</td>
      <td>Text for the next thumb image button</td>
    </tr>
    <tr>
      <td>showFooterCount</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Show footer count</td>
    </tr>
  </tbody>
</table>

### Methods
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>arguments</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>nextImage</td>
      <td>()</td>
      <th>Move to next image</th>
    </tr>
    <tr>
      <td>previousImage</td>
      <td>()</td>
      <td>Move to previous image</td>
    </tr>
    <tr>
      <td>closeLightBox</td>
      <td>()</td>
      <td>Close lightbox</td>
    </tr>
    <tr>
      <td>showImage</td>
      <td>(index)</td>
      <td>Show the image at index</td>
    </tr>
  </tbody>
</table>

### Slots

#### close
The content of the close button.

#### footer
The content of the footer under the image.

##### slot-scopes
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>type</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>current</td>
      <td>integer</td>
      <td>Number of the current image displayed</td>
    </tr>
    <tr>
      <td>total</td>
      <td>integer</td>
      <td>Numbers of the images</td>
    </tr>
  </tbody>
</table>

#### previous
The previous button on the main image.

#### next
The next button on the main image.

#### previousThumb
The previous button on the thumbs list.

#### nextThumb
The next button on the thumbs list.

#### customCaption
The caption of the current image.

#### videoIcon
The Icon used for videos

### Events

- `onOpened`: emit when the lightbox is opened.
- `onClosed`: emit when the lightbox is closed.
- `onLastIndex`: Emit when the current image is the last one of the list.
- `onFirstIndex`: Emit when the current image is the first one of the list.
- `onStartIndex`: Emit when the current image is at the `startAt` index (specified in the properties).
- `onLoad`: Emit when there are `lengthToLoadMore` images left in the array (specified in the properties). For example, if `lengthToLoadMore = 2` and there are 7 images in your array, when you reach index 4 (which means there are 2 images left which are not discovered yet), this event will be emitted. After that, if the image array are updated and there are totally 15 images, the event will be emitted at index 12.
- `onImageChanged`: Emit when the image is changed.

## CREDITS

Most of the code belongs to [pexea12](https://github.com/pexea12/vue-image-lightbox)

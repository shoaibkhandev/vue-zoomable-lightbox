<template>
  <div @click.stop="closeLightBox">
    <transition
      mode="out-in"
      name="vue-lb-content-transition"
      @afterEnter="enableImageTransition"
      @beforeLeave="disableImageTransition"
    >
      <div
        v-if="media"
        v-show="lightBoxOn"
        ref="container"
        class="vue-lb-container"
      >
        <div v-if="isMobile & gesture" class="gesture-helper">
          <img
            class="icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEuklEQVR4nO2aW4hVVRjH/58Zo0NM9yuGJGgX0iKDLoTlUC8+BT3UhBFoBN1wulmBUaBdHsqwh3rqQpAUBToNPWSpBEFEqaQUMjUzOhZGFBM66qg5vx72d2ZWxzlzzj5n7X2OsH9wWHutffa3vu9b31p7rbWXVFBQUFBQUJAnwN3AXc3WoykAa5jgqmbrkytlxu8Bzmi2TpkAPAwcAB4KykLj9wJzmqljpgCb3dDNnq9oPGDAcqDHf8sAa572EQC2urFbazC+h5PZeEo7IXDAaGDUUHnYe8uHY8KeIL+sWfo3TOCAisb7/3oC49uAGR4lABvz0HVaHpVIulRSP3AEeCQo7/B00MyOmtmopAEvOzMPxbJywHCF8hmSOjOqsy6mZyR3haTtksrf8wclvZdRnXVRlwOAaySdX1Y8JmmHmQ2b2T5JaxpVLg9SOwDokrS+wu3dkq5sSKOciT0GXBFR1nVAL7CCVpsyAwuA25mY8Y2TUs74hGmSspB+YF58S+qMADPbKelWZTuiD0va69dzJPUCM2NXUpcDgNWSVnl2SNIH0TSa4EclhpcG03mS7o1dSWoHTGL8YkmDMZUqYWZjkl6QtN+LlgKLgPZYdaRywGTGm9mApF1etjOWYiXcCb949jZJX0vaDzyd64IJWBUMSiet54H5wFkpZU41CFYbGAFea9SuNBHwrKdhy49jZrvM7J9GFarCNkn3SOrz/BPA9Y0ITDMRek7SIkkrzWzKPg+cK6lL0nxJxyX9JGmDmf1Rr6LOQTP7GPhOyaSrTdJSST80KDcewCzg90nC9bB3o2nBf9N2gbDs+0D2IeBz4Ia0+maxGuyWdIlf/6VkASRJMyWtlvR+pMFrJLhul7RE0jckU/WaycIBpcFxt6QLzKxD0k2Sdnj5fZIeneL5pyTd4WktDChZYR5V0qXfBWanVToawFoPy2PAxUF5B9AXhOxFk4V2BZlVuwXQCYx5Wc0r0SwioLRSPF1BS5vZAUkPerZdyaBaK9skfeXppJjZFkk/e/baFLLjA3zrLTEKXF52b1Nwr6+8ZVPUUdNgWY2stsQek3RCyWvq7bJ7z3vaJmmuX/+bkR7NA1gXvKYWl937jP/zYh3yF5IsyRcGZakjIDOA84ARV2hT2b3LgO0k84V1QFukOlvHAZIEvBG08o051NcyY0CJ1yUd8+uVGddVF5k6wMx+08RmyZ3A1VnWVw95fBl6Vckob2rBKMjcAWbWL+lTz3bRYucC8vo2+IoklMzVn8mpzprIxQG+i9zr2fuBWRlVdZqnY7U+kFcESNJLnrap9pVeWkofUEam/FezAL7w9/Qh4MIM5P/q8j+s9Zk8I0CSXva0XdKTMQUD05WcQ5CkfTFlRyWYrUWNAmBuMOtcHktudEg+bJRYG1HuA4HchnaKMwf40hU9TLBr1KDMDS7zT4KN15YEuDlorXciyJsNHI8lLxeCFjvR6EoRWO+yxoAFsXTMFN8TOOKKD9bbFYDuIJo+ia1npgCPB8oPAEv8dVbtubOBW4CPgueHgHPy0DsqwFs0Th9lm6+nDCTnhbtJTpenZQR4s5GWb5kDyW5Ep5I9/Wrd4G8lX4S2mFmlQ5kFBQUFBQVV+A9avlEeUWB4NQAAAABJRU5ErkJggg=="
          />
          <div class="label">{{ translations[language].pinch_to_zoom }}</div>
        </div>
        <div v-if="!isMobile & gesture" class="gesture-helper">
          <img
            class="icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADR0lEQVRoge2Zu08UURjFv6tgJ5IYF8IjBrGTzkIgiLZqoYlgeJj4J5j4iIQEpQP+AWsbE0IohDUkdoKvGFu1pzKChUjEAIs/i/kGrpuZWe48WJQ9yeZuZvec852d+5q7IhVUkAlMEjJQLyKXReSCiLSJyEkRqdGPV0RkUUQ+ichLEZkzxnxN4pc6gG4gD2yye2wCs8D5ctcvQCswZxVXAOaBO8A5IAdU6ysHtAN3gQX9ro/nwKlyhRgEVrWQn8AYcMKBnwPGgTXV+AH0Z1lzUBEPrV9zEmhMoNUETFl6I2nWGmU8qoa/9X2iCcLSvQ1s7UkY7U6oYU8G+r1WmL609X2TVmtMPMjExPMZssZMSxYG/uw0mbr43z7GGjP5tMW7VXgNaHbkAuDIadSZEKDLrdpo4byKjsXgOgdR3rhSZ1y5YYL1eKtwAYd1wuLHDZJTzw0g58o/FHDtiohUichrY8yyq2BcGGOWROSdiFSLyCVXflCQbm1nE9QVF363uuhKDArSpu2b2OXEx1ttzyRWAr5pN3ceH8qPNUaUW6f0JVduVcC1o9quRBiWLDTqO8aYsG3Od21rQj4PRVDX2g/YcCUE3ZFVETkuIsdEJHDWivhFt+9E1HciUKutc9cKuiOL2rbGKCQpTmv7xZUYFOSjtp2xy4mPDm0/uxKDgsxrey12OfHhe75IrKRToL9Fcd4qpLBF2QRqSzN2Jzqr9YzH4MYNMqHUKVdulGiHiv4qwzb+rFu1pcX9rfwUKT2nh/gYYFq9nmVh0IL3+AkwlLrBjs+weiwDDVmZ9KvJFtCbgf4Ndg4frqatX2w2YoUZSqObaXcatkJsAYNp1FvK2A/jj5mmBFrN1piwUQAG0qw7rIA+a8ys4T1j73qdwVsnJnQmRLUKAWGyP0bVCSBfZLwA3AM68RbTI/qq02v3gVdFRU8CDcBA2cJooC5gBre/FdaBp0B7kVZYmGxOHkMC5YBbwBPgA94Uuo63uC0C74HHeN0y9IkTb3Ysb5i0gHcOXHyHC8DNctfmjIgw2U/NaeN/C9NzEMJkv2imDQ2zcaDC7NdzrW0YY6ZFZFBECtblw7Jz4vJvAbhu3ZlH5a4nEbSb7c3f2RVU4OEPZNIcafBWg3gAAAAASUVORK5CYII="
          />
          <div class="label">{{ translations[language].click_to_zoom }}</div>
        </div>
        <div class="vue-lb-content">
          <div class="vue-lb-header">
            <span />
            <button
              v-if="closable"
              type="button"
              :title="closeText"
              class="vue-lb-button-close"
            >
              <slot name="close">
                <CloseIcon />
              </slot>
            </button>
            <!-- .vue-lb-button-close -->
          </div>
          <!-- .vue-lb-header -->
          <div class="vue-lb-figure" @click.stop>
            <transition mode="out-in" :name="modalImageTransitionName">
              <inner-image-zoom
                v-if="!isMobile"
                :zoomScale="zoomScale"
                :hide-hint="true"
                :src="media[select].src || ''"
                :zoomSrc="media[select].src || ''"
              />
              <pinch-zoom v-if="isMobile">
                <img
                  :key="media[select].src"
                  v-lazy="{
                    src: media[select].src,
                    loading: media[select].src,
                    error: media[select].src,
                  }"
                  :srcset="media[select].srcset || ''"
                  class="vue-lb-modal-image"
                />
              </pinch-zoom>
            </transition>

            <div class="vue-lb-footer">
              <div class="vue-lb-footer-info" />
              <div v-show="showFooterCount" class="vue-lb-footer-count">
                <slot name="footer" :current="select + 1" :total="media.length">
                  {{ select + 1 }} / {{ media.length }}
                </slot>
              </div>
            </div>
          </div>
        </div>
        <!-- .vue-lb-content -->
        <div class="vue-lb-thumbnail-wrapper">
          <div v-if="showThumbs" class="vue-lb-thumbnail">
            <button
              v-if="media.length > 1"
              type="button"
              class="vue-lb-thumbnail-arrow vue-lb-thumbnail-left"
              :title="previousThumbText"
              @click.stop="previousImage()"
            >
              <slot name="previousThumb">
                <LeftArrowIcon />
              </slot>
            </button>

            <div
              v-for="(image, index) in imagesThumb"
              v-show="index >= thumbIndex.begin && index <= thumbIndex.end"
              :key="
                typeof image.src === 'string' ? `${image.src}${index}` : index
              "
              v-lazy:background-image="image"
              :class="
                'vue-lb-modal-thumbnail' + (select === index ? '-active' : '')
              "
              @click.stop="showImage(index)"
            >
              <slot v-if="image.type" name="videoIcon">
                <VideoIcon />
              </slot>
            </div>

            <button
              v-if="media.length > 1"
              type="button"
              class="vue-lb-thumbnail-arrow vue-lb-thumbnail-right"
              :title="nextThumbText"
              @click.stop="nextImage()"
            >
              <slot name="nextThumb">
                <RightArrowIcon />
              </slot>
            </button>
          </div>
          <!-- .vue-lb-thumbnail -->
        </div>
        <button
          v-if="media.length > 1"
          type="button"
          class="vue-lb-arrow vue-lb-left"
          :title="previousText"
          @click.stop="previousImage()"
        >
          <slot name="previous">
            <LeftArrowIcon />
          </slot>
        </button>

        <button
          v-if="media.length > 1"
          type="button"
          class="vue-lb-arrow vue-lb-right"
          :title="nextText"
          @click.stop="nextImage()"
        >
          <slot name="next">
            <RightArrowIcon />
          </slot>
        </button>
      </div>
      <!-- .vue-lb-container -->
    </transition>
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import LeftArrowIcon from "./LeftArrowIcon";
import RightArrowIcon from "./RightArrowIcon";
import CloseIcon from "./CloseIcon";
import VideoIcon from "./VideoIcon";

let Hammer;

if (typeof window !== "undefined") {
  Hammer = require("hammerjs");
}

export default {
  components: {
    LeftArrowIcon,
    RightArrowIcon,
    CloseIcon,
    VideoIcon,
  },

  props: {
    media: {
      type: Array,
      required: true,
    },

    zoomScale: {
      type: Number,
      default: .75
    },

    disableScroll: {
      type: Boolean,
      default: true,
    },

    disableZoom: {
      type: Boolean,
      default: true,
    },

    showLightBox: {
      type: Boolean,
      default: true,
    },

    closable: {
      type: Boolean,
      default: true,
    },

    startAt: {
      type: Number,
      default: 0,
    },

    nThumbs: {
      type: Number,
      default: 7,
    },

    showThumbs: {
      type: Boolean,
      default: true,
    },

    showFooterCount: {
      type: Boolean,
      default: true,
    },

    // Mode
    autoPlay: {
      type: Boolean,
      default: false,
    },

    autoPlayTime: {
      type: Number,
      default: 3000,
    },

    siteLoading: {
      type: String,
      default: "",
    },

    lengthToLoadMore: {
      type: Number,
      default: 0,
    },

    closeText: {
      type: String,
      default: "Close (Esc)",
    },

    previousText: {
      type: String,
      default: "Previous",
    },

    nextText: {
      type: String,
      default: "Next",
    },

    previousThumbText: {
      type: String,
      default: "Previous",
    },

    nextThumbText: {
      type: String,
      default: "Next",
    },

    language: {
      type: String,
      default: "en"
    }
  },

  data() {
    return {
      select: this.startAt,
      lightBoxOn: this.showLightBox,
      timer: null,
      modalImageTransitionName: "vue-lb-modal-image-no-transition",
      isMobile: isMobile,
      gesture: true,
      translations: {
        en: {
          "pinch_to_zoom": "pinch to zoom",
          "click_to_zoom": "click to zoom"
        },
        ar: {
          "pinch_to_zoom": "قرصة للتكبير",
          "click_to_zoom": "انقر للتكبير"
        }
      }
    };
  },

  computed: {
    thumbIndex() {
      const halfDown = Math.floor(this.nThumbs / 2);

      if (this.select >= halfDown && this.select < this.media.length - halfDown)
        return {
          begin: this.select - halfDown + (1 - (this.nThumbs % 2)),
          end: this.select + halfDown,
        };

      if (this.select < halfDown)
        return {
          begin: 0,
          end: this.nThumbs - 1,
        };

      return {
        begin: this.media.length - this.nThumbs,
        end: this.media.length - 1,
      };
    },

    imagesThumb() {
      if (this.siteLoading) {
        return this.media.map(({ thumb, type }) => ({
          src: thumb,
          type,
          loading: this.siteLoading,
          error: this.siteLoading,
        }));
      }

      return this.media.map(({ thumb, type }) => ({
        src: thumb,
        type,
      }));
    },
  },

  watch: {
    lightBoxOn(value) {
      if (document != null) {
        this.onToggleLightBox(value);
      }
    },

    select() {
      this.$emit("onImageChanged", this.select);

      if (this.select >= this.media.length - this.lengthToLoadMore - 1)
        this.$emit("onLoad");

      if (this.select === this.media.length - 1) this.$emit("onLastIndex");

      if (this.select === 0) this.$emit("onFirstIndex");

      if (this.select === this.startAt) this.$emit("onStartIndex");
    },
  },

  mounted() {
    if (this.autoPlay) {
      this.timer = setInterval(() => {
        this.nextImage();
      }, this.autoPlayTime);
    }

    this.onToggleLightBox(this.lightBoxOn);

    if (this.$refs.container) {
      const options = {};
      if (!this.disableZoom) {
        options.touchAction = "pan-x, pan-y";
      }

      const hammer = new Hammer(this.$refs.container, options);
      hammer.on("swiperight", () => {
        this.previousImage();
      });

      hammer.on("swipeleft", () => {
        this.nextImage();
      });
    }
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.addKeyEvent);

    if (this.autoPlay) {
      clearInterval(this.timer);
    }
  },

  methods: {
    onLightBoxOpen() {
      this.$emit("onOpened");

      if (this.disableScroll) {
        document.querySelector("html").classList.add("no-scroll");
      }
      document.querySelector("body").classList.add("vue-lb-open");
      document.addEventListener("keydown", this.addKeyEvent);

      if (this.$refs.video && this.$refs.video.autoplay) {
        this.$refs.video.play();
      }
    },

    onLightBoxClose() {
      this.$emit("onClosed");

      if (this.disableScroll) {
        document.querySelector("html").classList.remove("no-scroll");
      }

      document.querySelector("body").classList.remove("vue-lb-open");
      document.removeEventListener("keydown", this.addKeyEvent);

      if (this.$refs.video) {
        this.$refs.video.pause();
        this.$refs.video.currentTime = 0;
      }
    },

    onToggleLightBox(value) {
      if (value) {
        this.gesture = true;
        setTimeout(() => {
          this.gesture = false;
        }, 2000);
        this.onLightBoxOpen();
      } else {
        this.onLightBoxClose();
      }
    },

    showImage(index) {
      this.$set(this, "select", index);
      this.$set(this, "lightBoxOn", true);
    },

    addKeyEvent(event) {
      if (event.keyCode === 37) this.previousImage(); // left arrow
      if (event.keyCode === 39) this.nextImage(); // right arrow
      if (event.keyCode === 27) this.closeLightBox(); // esc
    },

    closeLightBox() {
      if (!this.closable) return;
      this.$set(this, "lightBoxOn", false);
    },

    nextImage() {
      this.$set(this, "select", (this.select + 1) % this.media.length);
    },

    previousImage() {
      this.$set(
        this,
        "select",
        (this.select + this.media.length - 1) % this.media.length
      );
    },

    enableImageTransition() {
      this.$set(
        this,
        "modalImageTransitionName",
        "vue-lb-modal-image-transition"
      );
    },

    disableImageTransition() {
      this.$set(
        this,
        "modalImageTransitionName",
        "vue-lb-modal-image-no-transition"
      );
    },
  },
};
</script>

<style src="./style.css"></style>

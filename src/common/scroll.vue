<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    mounted() {
      this.$nextTick(() => {
          this._initScroll();
        })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    }
  }
</script>

<style>

</style>

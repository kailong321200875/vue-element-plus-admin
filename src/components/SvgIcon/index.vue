<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

interface Props {
  iconClass: string,
  className: string
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: () => ''
    }
  },
  setup(props: Props) {
    const iconName = (computed((): string => `#icon-${props.iconClass}`))
    const svgClass = (computed((): string => {
      if (props.className) {
        return 'svg-icon ' + props.className
      } else {
        return 'svg-icon'
      }
    }))

    return {
      iconName,
      svgClass
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

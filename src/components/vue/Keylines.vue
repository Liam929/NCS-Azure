//
//     Vue components KeyLines v7.1.0-4340923457
//
//     Copyright © 2011-2023 Cambridge Intelligence Limited.
//     All rights reserved.
//

<template>
  <div ref="container" :class="containerClass" :style="styleObject"></div>
</template>

<script>
import KeyLines from 'keylines/esm';

export default {
  name: "KlComponent",
  props: {
    id: {
      type: String,
      required: true
    },
    container: Object,
    containerClass: String,
    styleObject: Object,
    options: Object,
    data: Object,
    animateOnLoad: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    KeyLines.create({
      id: this.id,
      options: this.options,
      container: this.$refs ? this.$refs.container : null,
      type: this.type
    }).then(component => {
      this.klcreate(component);
    }).catch(console.err);
  },
  beforeUnmount() {
    if (this.component) {
      this.component.destroy();
    }
  },
  methods: {
    onEvent(props) {
      const name = 'kl-' + props.name;
      this.$emit('kl-all', props);
      this.$emit(name, props.event);
    },
    klcreate(component) {
      this.component = component;
      this.component.on('all', this.onEvent);
      this.component.load(this.data)
        .then(() => this.onLoad({ animate: !!this.animateOnLoad }))
        .then(() => {
          component.selection(this.selection);
          this.$emit('kl-ready', component);
        });
    },
  }
};
</script>

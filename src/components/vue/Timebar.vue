//
//     Vue components KeyLines v7.1.0-4340923457
//
//     Copyright © 2011-2023 Cambridge Intelligence Limited.
//     All rights reserved.
//

<script>
import KlComponent from './Keylines.vue';
export default {
  name: 'KlTimebar',
  extends: KlComponent,
  data: () => ({
    type: 'timebar'
  }),
  methods: {
    onLoad() {
      return this.component.zoom('fit');
    }
  }
};
</script>

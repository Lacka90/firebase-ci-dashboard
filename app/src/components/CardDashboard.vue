

<template>
  <div>
    <div v-for="project in projects" :key="project.id">
      <CardRow :project="project" />
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CardRow from './CardRow.vue';

@Component({
  components: { CardRow },
  })
export default class CardDashboard extends Vue {
  @Prop() public projects: any;
}
</script>

<style scoped lang="scss">

</style>

<template>
  <div>
    <div v-for="project in projects" :key="project.id">
      <CardRow :project="project"/>
      <hr>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CardRow from './CardRow.vue';
import { DashboardData } from '../../../functions/src/interfaces/dashboard-data';

@Component({
  components: { CardRow },
})
export default class CardDashboard extends Vue {
  @Prop() public projects!: DashboardData[];
}
</script>

<style scoped lang="scss">
</style>

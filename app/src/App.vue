<template>
  <div id="app">
    <Header />
    <CardDashboard :projects="projects" />
  </div>
</template>

<script lang="ts">
import * as firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import CardDashboard from './components/CardDashboard.vue';

let config = {
  apiKey: "AIzaSyDDAqC8GtMJxCDuY7fxyz-0en1IFC7ccYs",
    authDomain: "ci-dashboard-db276.firebaseapp.com",
    databaseURL: "https://ci-dashboard-db276.firebaseio.com",
    projectId: "ci-dashboard-db276",
};
firebase.initializeApp(config);

const db = firebase.database();

@Component({
  components: {
    Header,
    CardDashboard,
  },
})
export default class App extends Vue {
  public projects: any[] = [];
  public mounted() {
    db.ref('projects').on('value', (snapshot) => {
      if (snapshot) {
        const values = snapshot.val();
        this.projects = Object.keys(values).map(name => ({ name, data: Object.keys(values[name]).map(_key => ({ _key, ...values[name][_key]})) }));
      }
    }, (error: any) => {
      console.error(error);
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

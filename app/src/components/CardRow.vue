<template>
  <div class="row">
    <div class="col-sm-12 col-md-3">
      <div class="card fluid title-card">
        <div>
          <b>{{ project.name }}</b>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-9">
      <div class="container">
        <div class="row">
          <div class="card" v-for="build in project.data" :key="build.id">
            <div class="build-card" :style="{ borderColor: build.status === 'success' ? 'green' : 'red' }">
              <div class="triangle" :style="{ borderRightColor: build.status === 'success' ? 'green' : 'red' }">
                <i class="fas" :class="[build.status === 'success' ? 'fa-check' : 'fa-times']"></i>
              </div>
              <div class="col-sm-12">
                <h3 class="status">
                  <a :href="build.build_url">Build {{build.status}}</a>
                </h3>
              </div>
              <div class="row">
                <div class="col-sm-12 name">
                  <div>Started by {{build.user.name}}</div>
                </div>

                <div class="col-sm-12 date">
                  {{ new Date(build.committer_date) | dateFormat('YYYY-MM-DD HH:mm')}}
                </div>

                <div class="avatar">
                  <img class="" height="30" :src="build.user.avatar_url" />
                </div>
              </div>
              <!-- <p>on {{build.committer_date}}</p> -->
              <!-- <p class="doc">{{ build }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CardRow extends Vue {
  @Prop() public project: any;
}
</script>

<style scoped lang="scss">
  .triangle {
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 60px 60px 0;
    border-color: transparent white transparent transparent;

    & i {
      position: absolute;
      top: 10px;
      right: -48px;
    }
  }
  .title-card {
    margin: 0 !important;
    border: 0 !important;
    height: 100%;
    justify-content: center;
  }
  .build-card {
    position: relative;
    padding: 15px;
    border-width: 2px !important;
    border-style: solid;
  }
  .status {
    display: flex;
    margin-left: 0;
    margin-right: 0;
  }
  .name {
    display: flex;
    align-items: center;
  }
  .avatar {
    position: absolute;
    right: 10px;
    bottom: 10px;

    & img {
      display: block;
      height: 40px !important;
      border-radius: 50%;
    }
  }
  .date {
    display: flex;
  }
</style>

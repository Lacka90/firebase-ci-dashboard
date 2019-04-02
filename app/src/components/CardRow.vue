<template>
  <div class="row" v-if="project">
    <div class="col-sm-12 col-md-3">
      <div class="card fluid title-card">
        <div>
          <a :href="project.repoUrl" target="_blank">
            <b>{{ project.name }}</b>
          </a>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-9">
      <div class="container">
        <div class="row">
          <div class="card" v-for="build in project.data" :key="build.id">
            <div class="build-card" :style="{ borderColor: getStatus(build) }">
              <div class="triangle" :style="{ borderRightColor: getStatus(build) }">
                <i class="fas" :class="[build.buildStatus === 'success' ? 'fa-check' : 'fa-times']"></i>
              </div>
              <div class="col-sm-12">
                <h3 class="status">
                  <a :href="build.buildUrl">#{{build.buildNumber}} Build {{build.buildStatus}}</a>
                  <div class="subtitle-container">
                    <small class="subtitle">{{ build.commit }}</small>
                  </div>
                </h3>
              </div>

              <div class="col-sm-12 name">
                <div>Started by {{build.startedBy}}</div>
              </div>

              <div
                class="col-sm-12 date"
              >{{ new Date(build.startedAt) | dateFormat('YYYY-MM-DD HH:mm')}} ({{ Math.ceil(build.duration / 1000) }}s)</div>

              <div class="avatar">
                <img class height="30" :src="build.starterAvatar">
              </div>
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
  @Prop() public project!: any;

  public getStatus(build: any) {
    if (!build) {
      return '';
    }

    const { buildStatus } = build;
    switch (buildStatus) {
      case 'success':
        return 'green';
      case 'failed':
        return 'red';
      case 'cancelled':
        return 'grey';
      default:
        return 'black';
    }
  }
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
.subtitle.container {
  width: 100%;
  &.subtitle {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.card {
  align-self: stretch;
}
.build-card {
  height: 100%;
  position: relative;
  padding: 15px;
  border-width: 2px !important;
  border-style: solid;
}
.status {
  display: flex;
  flex-direction: column;
  align-items: baseline;
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

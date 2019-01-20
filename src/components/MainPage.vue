<template>
  <div class="layout">
    <Layout>
      <Header>SEARCH HOUSES</Header>
      <Layout>
        <Content>
          <LeafletMap v-if="mapdata" :mapdata="mapdata"></LeafletMap>
        </Content>
        <Sider hide-trigger>
          <!-- 搜索面板 -->
          <search-panel @search-params="searchHouse"></search-panel>
        </Sider>
      </Layout>
      <Footer>&copy; victorcheney</Footer>
    </Layout>
  </div>
</template>


<script>
import LeafletMap from "./LeafletMap.vue";
import SearchPanel from "./SearchPanel.vue";

export default {
  name: "MainPage",
  /*  props: {
    mapdata: Array
  }, */
  data() {
    return {
      mapdata: null,
      value1: false
    };
  },
  mounted() {
    this.$fetch("https://woyaozufang.live/v2/houses", {
      city: "北京",
      intervalDay: "14",
      source: "douban_wechat"
    }).then(resp => {
      if (resp && resp.data) {
        this.mapdata = resp.data;
      }
      // console.log(this.mapdata);
    });
  },
  components: {
    LeafletMap,
    SearchPanel
  },
  methods: {
    searchHouse(params) {
      this.$fetch("https://woyaozufang.live/v2/houses", params).then(resp => {
        if (resp && resp.data) {
          this.mapdata = resp.data;
        }
        // console.log(this.mapdata);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  height: 100%;
}
.ivu-layout {
  height: 100%;
}
.ivu-layout-sider {
  height: 100%;
}
.ivu-layout-sider {
  background: #17233d;
  width: 300px !important;
  min-width: 300px !important;
  min-width: 300px !important;
}
</style>

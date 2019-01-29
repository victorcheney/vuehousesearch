<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import "leaflet.chinatmsproviders";
// import _ from "lodash";

// import "../../node_modules/leaflet/dist/leaflet.css";

const MAP_IMAGE_PATH = "//cdn.bootcss.com/leaflet/1.0.0-rc.2/images/";

export default {
  name: "LeafletMap",
  props: {
    mapdata: Array
  },
  data() {
    return {
      map: null,
      mapConfig: {
        zoom: 4,
        center: [39.913686, 116.403636], //34.275075, 108.952929
        minZoom: 3,
        maxZoom: 18,
        attribution: ""
      },
      markerLayerGroup: null
    };
  },

  // 编译好的html挂载到页面完成后执行的事件钩子
  // 函数中一般会做一些ajax请求获取数据进行初始化操作
  // mounted 在整个实例中只执行一次
  mounted() {
    this.initMap();
    // this.addMapLayer();
    // console.log('---:', this.mapdata);

    // this.$watch("mapdata", (nv, ov) => {
    this.initMarkerLayer(this.mapdata);
    // });
  },

  watch: {
    mapdata: function() {
      this.initMarkerLayer(this.mapdata);
    }
  },

  methods: {
    initMap() {
      L.Icon.Default.imagePath = MAP_IMAGE_PATH;

      this.map = L.map("map").setView(this.mapConfig.center, 12);

      L.tileLayer
        .chinaProvider("TianDiTu.Satellite.Map", {
          attribution: ""
        })
        .addTo(this.map);
      L.tileLayer
        .chinaProvider("TianDiTu.Satellite.Annotion", {
          attribution: ""
        })
        .addTo(this.map);
    },

    addMapLayer() {
      L.tileLayer
        .chinaProvider("Geoq.Normal.Map", {
          attribution: this.map_config.attribution
        })
        .addTo(this.map);
    },

    // 添加标记点
    initMarker(lat, lng, template, tooltipTpl) {
      return L.marker([lng, lat])
        .bindPopup(template)
        .bindTooltip(tooltipTpl);
    },

    // 初始化所有标记点
    initMarkerLayer(mapdata = []) {
      // 清空所有标记点
      this.markerLayerGroup && this.markerLayerGroup.clearLayers();

      this.markerLayerGroup = L.layerGroup();
      this.markerLayerGroup.addTo(this.map);

      /* let markers =  */mapdata.map((element, index) => {
        let html = "";
        if (element.labels) {
          let labels = element.labels.split("|");
          labels.forEach(item => {
            html += `<span style="margin: 0 3px; padding: 0 2px; background: #ddd">${item}</span>`;
          });
        }

        /*  element.pictures.forEach(item => {
          imgTpl += `<img src="${item}" width="50px" height="50px" style="margin: 0 3px; />`
        }); */

        const template = `
        <h3>【${element.city}】${element.title}</h3>
        <div><strong>地址：</strong>${element.location}-${element.price}元-${
          element.tags
        }</div>
        <div><strong>配套：</strong>${html}</div>
        <div><strong>详情：</strong>${element.text}</div>
        <div><strong>来源：</strong><a href="${
          element.onlineURL
        }" target="_blank">${element.source}</a></div>
      `;

        // tooltip 模板
        const tooltipTpl = `【${element.city}】${element.title}`;

        let tempMarker = this.initMarker(
          element.longitude,
          element.latitude,
          template,
          tooltipTpl
        );

        let timer = setTimeout(() => {
          this.markerLayerGroup.addLayer(tempMarker)
          clearTimeout(timer);
        }, index * 10);

        /* return this.initMarker(
          element.longitude,
          element.latitude,
          template,
          tooltipTpl
        ); */
      });

      /* this.markerLayerGroup = L.layerGroup(markers);
      this.markerLayerGroup.addTo(this.map); */
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 877px;
}
</style>



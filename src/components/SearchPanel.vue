<template>
  <div class="search-panel">
    <Form :model="formItem" :label-width="80">
      <FormItem label="选择城市">
        <Select v-model="formItem.selectCity">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择房源">
        <Select v-model="formItem.selectSource">
          <Option v-for="item in sources" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择价格">
        <Select v-model="formItem.priceRange">
          <Option v-for="item in priceRange" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem>
            <Button type="primary" @click="search()">搜索</Button>
            <Button style="margin-left: 10px">取消</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "search-panel",
  data() {
    return {
      cityList: [
        {
          value: "北京",
          label: "北京"
        },
        {
          value: "上海",
          label: "上海"
        },
        {
          value: "深圳",
          label: "深圳"
        }
      ],
      sources: [
        {
          value: "douban_wechat",
          label: "豆瓣"
        }
      ],
      priceRange: [
        //不限1000元以下1000-2000元2000-3000元3000-5000元5000-8000元8000-10000元10000元以上
        {
          label: "不限",
          value: ""
        },
        {
          label: "1000元以下",
          value: "1-1000"
        },
        {
          label: "1000-2000元",
          value: "1000-2000"
        },
        {
          label: "2000-3000元",
          value: "2000-3000"
        },
        {
          label: "3000-5000元",
          value: "3000-5000"
        },
        {
          label: "5000-8000元",
          value: "5000-8000"
        },
        {
          label: "8000-10000元",
          value: "8000-10000"
        },
        {
          label: "10000元以上",
          value: "10000"
        }
      ],
      formItem: {
        selectCity: "",
        selectSource: "",
        priceRange: ""
      }
    };
  },
  mounted() {},
  methods: {
    /* city: "上海"
    fromPrice: 2000
    intervalDay: 14
    page: 1
    rentType: null
    size: 30
    source: "douban"
    toPrice: 5000 */
    search() {
      let params = {};

      params.size = 30;
      params.intervalDay = 15;
      params.city = this.formItem.selectCity;
      params.source = this.formItem.selectSource;
      params.fromPrice = parseInt(this.formItem.priceRange.split('-')[0], 10);
      params.toPrice = parseInt(this.formItem.priceRange.split('-')[1], 10);
      this.$emit('search-params', params);
    }
  }
};
</script>

<style>
.search-panel {
  padding: 10px;
}
.search-panel .ivu-form .ivu-form-item-label {
  color: #ddd;
  font-size: 13px;
}
</style>


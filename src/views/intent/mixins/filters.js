export default {
  data () {
    return {
      filter: {
        baseInfo: [],
        paramInfo: [],
        doneInfo: []
      },

      baseInfo: [
        {key: 'number', name: '工程编号'},
        {key: 'year', name: '年份'},
        {key: 'month', name: '月份'},
        {key: 'province', name: '省份'},
        {key: 'city', name: '城市'},
        {key: 'region', name: '区/县'},
        {key: 'town', name: '乡/镇'},
        {key: 'storeName', name: '商场名称'},
        {key: 'brand', name: '品牌名称'},
        {key: 'projectAttribute', name: '工程属性'},
        {key: 'storeAttribute', name: '店铺属性'},
        {key: 'clientName', name: '客户名称'},
        {key: 'deposit', name: '定金(元)'},
        {key: 'responsePerson', name: '业务负责'},
        {key: 'designDepartment', name: '设计部门'}
      ],
      paramInfo: [
        // {key: 'measureDate', name: '测量日期'},
        // {key: 'advanceOpenDate', name: '预开日期'},
        {key: 'businessArea', name: '营业面积'},
        {key: 'cupboardLength', name: '柜台总长'},
        {key: 'backCupboardArea', name: '背柜面积'},
        {key: 'basicEquipResponse', name: '基装责任'}
      ],
      doneInfo: [
        {key: 'orderUrgent', name: '派单级别'},
        {key: 'siteAccuracy', name: '场地准确性'},
        {key: 'metalCrafts', name: '金属工艺'}
      ]
    }
  }
}

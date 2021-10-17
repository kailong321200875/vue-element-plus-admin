export const classicData = [
  {
    label: '即时配送',
    value: true,
    itemType: 'switch',
    field: 'delivery'
  },
  {
    label: '活动名称',
    value: '',
    itemType: 'input',
    field: 'name',
    placeholder: '活动名称',
    clearable: true,
    rules: [
      {
        required: true,
        message: '请输入活动名称'
      }
    ]
  },
  {
    label: '活动区域',
    value: '',
    itemType: 'select',
    placeholder: '活动区域',
    clearable: true,
    field: 'region',
    options: [
      {
        title: '区域一',
        value: 'fujian'
      },
      {
        title: '区域二',
        value: 'beijing'
      }
    ],
    rules: [
      {
        itemType: 'string',
        required: true,
        message: '请选择活动区域'
      }
    ]
  },
  {
    label: '特殊资源',
    value: '2',
    itemType: 'radio',
    field: 'resource',
    radioType: 'button', // button or radio
    options: [
      {
        label: '线上品牌商赞助',
        value: '1'
      },
      {
        label: '线下场地免费',
        value: '2'
      }
    ]
  },
  // {
  //   label: '组织机构',
  //   value: [],
  //   itemType: 'treeSelect',
  //   field: 'company',
  //   allowClear: true,
  //   placeholder: '请选择组织机构',
  //   treeCheckable: false,
  //   maxTagCount: 2,
  //   options: [
  //     {
  //       title: 'Node1',
  //       value: '0-0',
  //       key: '0-0',
  //       children: [
  //         {
  //           title: 'Child Node1',
  //           value: '0-0-0',
  //           key: '0-0-0'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Node2',
  //       value: '0-1',
  //       key: '0-1',
  //       children: [
  //         {
  //           title: 'Child Node3',
  //           value: '0-1-0',
  //           key: '0-1-0',
  //           disabled: true
  //         },
  //         {
  //           title: 'Child Node4',
  //           value: '0-1-1',
  //           key: '0-1-1'
  //         },
  //         {
  //           title: 'Child Node5',
  //           value: '0-1-2',
  //           key: '0-1-2'
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    label: '日选择器',
    value: '',
    itemType: 'datePicker',
    field: 'date1',
    clearable: true,
    format: 'YYYY-MM-DD',
    placeholder: '请选择日期'
  },
  {
    label: '月选择器',
    value: '',
    itemType: 'datePicker',
    field: 'date2',
    clearable: true,
    format: 'YYYY-MM',
    placeholder: '请选择日期'
  },
  {
    label: '范围选择器',
    value: [],
    itemType: 'datePicker',
    field: 'date3',
    clearable: true,
    type: 'daterange',
    rangeSeparator: '至',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期'
  },
  {
    label: '周选择器',
    value: '',
    itemType: 'datePicker',
    field: 'date4',
    type: 'week',
    clearable: true,
    placeholder: '请选择日期'
  }
]

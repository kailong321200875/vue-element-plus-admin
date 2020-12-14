export const classicData = [
  {
    label: '即时配送',
    value: true,
    type: 'switch',
    field: 'delivery'
  },
  {
    label: '活动名称',
    value: '',
    type: 'input',
    placeholder: '活动名称',
    field: 'name',
    allowClear: true,
    rules: [
      {
        required: true,
        message: '请输入活动名称'
      }
    ]
  },
  {
    label: '活动区域',
    value: undefined,
    type: 'select',
    placeholder: '活动区域',
    field: 'region',
    allowClear: true,
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
        type: 'string',
        required: true,
        message: '请选择活动区域'
      }
    ]
  },
  {
    label: '特殊资源',
    value: '2',
    type: 'radio',
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
  {
    label: '组织机构',
    value: [],
    type: 'treeSelect',
    field: 'company',
    allowClear: true,
    placeholder: '请选择组织机构',
    treeCheckable: false,
    maxTagCount: 2,
    options: [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0'
          }
        ]
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0',
            disabled: true
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1'
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2'
          }
        ]
      }
    ]
  },
  {
    label: '日选择器',
    value: null,
    type: 'datePicker',
    field: 'date1',
    allowClear: true,
    valueFormat: 'YYYY-MM-DD',
    placeholder: '请选择日期'
  },
  {
    label: '月选择器',
    value: null,
    type: 'monthPicker',
    field: 'date2',
    valueFormat: 'YYYY-MM',
    allowClear: true,
    placeholder: '请选择日期'
  },
  {
    label: '范围选择器',
    value: null,
    type: 'rangePicker',
    valueFormat: 'YYYY-MM-DD',
    field: 'date3',
    allowClear: true,
    placeholder: ['请选择日期', '请选择日期']
  },
  {
    label: '周选择器',
    value: null,
    type: 'weekPicker',
    field: 'date4',
    valueFormat: 'YYYY-MM-DD',
    allowClear: true,
    placeholder: '请选择日期'
  }
]

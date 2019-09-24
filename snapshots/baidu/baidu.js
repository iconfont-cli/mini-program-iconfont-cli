Component({
  properties: {
    // alipay | user | setup
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      value: '',
    },
    size: {
      type: Number,
      value: 18,
    },
  },
  data: {
    quot: '"',
  },
});

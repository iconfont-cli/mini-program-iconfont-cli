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
      observer: function(size) {
        this.setData({
          svgSize: false ? size / 750 * swan.getSystemInfoSync().windowWidth : size,
        });
      },
    },
  },
  data: {
    quot: '"',
    svgSize: false ? 18 / 750 * swan.getSystemInfoSync().windowWidth : 18,
  },
});

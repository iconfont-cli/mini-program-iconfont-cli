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
      observer: function(color) {
        this.setData({
          colorIsString: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: false ? size / 750 * tt.getSystemInfoSync().windowWidth : size,
        });
      },
    },
  },
  data: {
    svgSize: false ? 18 / 750 * tt.getSystemInfoSync().windowWidth : 18,
    quot: '"',
    colorIsString: false,
  },
});

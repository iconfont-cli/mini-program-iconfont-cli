Component({
  props: {
    // alipay | user | setup
    name: null,
    // string | string[]
    color: '',
    size: 18,
  },
  data: {
    quot: '"',
    svgSize: 18,
  },
  didMount() {
    const size = this.props.size;

    if (size !== this.data.svgSize) {
      this.setData({
        svgSize: size,
      });
    }
  },
  disUpdate(prevProps) {
    const size = this.props.size;

    if (size !== prevProps.size) {
      this.setData({
        svgSize: size,
      });
    }
  },
});

// @vue/component

export default {
  name: 'HomePage',
  data() {
    return {
      test: 1,
    };
  },
  mounted() {
    setTimeout(() => {
      this.test = 2;
      setTimeout(() => {
        this.test = 1;
      }, 2500);
    }, 5000);
  },
};

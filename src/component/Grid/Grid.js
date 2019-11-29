// @vue/component
export default {
  name: 'Grid',
  data() {
    return {
      breakpoints: [
        {
          size: 1024,
          totalColumns: 12,
          gutter: '16px',
          gutterOutside: '40px',
          maxWidth: '1600px',
        },
        {
          size: 768,
          totalColumns: 4,
          gutter: '8px',
          gutterOutside: 0,
          maxWidth: '90%',
        },
      ],
      breakpoint: {},
      currentBreakpoint: {},
    };
  },
  mounted() {
    this.handleResize();
    this.addEventsListeners();
  },
  destroyed() {
    this.removeEventsListeners();
  },
  methods: {
    handleResize() {
      const breakpointMatches = this.breakpoints.filter(
        breakpoint => breakpoint.size <= window.innerWidth,
      );
      const breakpoint = breakpointMatches[0] || this.breakpoints[this.breakpoints.length - 1];
      if (breakpoint !== this.currentBreakpoint) {
        this.breakpoint = breakpoint;
      }

      this.currentBreakpoint = breakpoint;
    },
    addEventsListeners() {
      window.addEventListener('resize', this.handleResize);
    },
    removeEventsListeners() {
      window.removeEventListener('resize', this.handleResize);
    },
  },
};

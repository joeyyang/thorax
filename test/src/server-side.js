describe('serverSide', function() {
  var emit;
  beforeEach(function() {
    window.$serverSide = true;
    window.emit = emit = this.spy();
  });
  afterEach(function() {
    window.$serverSide = false;
  });

  describe('emit', function() {
    it('should emit on setView for non-server views', function() {
      var view = new Thorax.View(),
          layout = new Thorax.LayoutView();

      layout.setView(view);
      expect(emit).to.have.been.calledOnce;
    });
    it('should defer emit for server-side views', function() {
      var view = new Thorax.View({template: function() { return 'bar'; }}),
          layout = new Thorax.LayoutView();

      layout.setView(view, {serverRender: true});
      expect(emit).to.not.have.been.called;

      view = new Thorax.View({
        serverRender: true,
        template: function() { return 'bar'; }
      });
      layout.setView(view);
      expect(emit).to.not.have.been.called;
    });
    it('should emit after timeout');
  });

  describe('events', function() {
    it('should NOP events in server mode');
    it('should NOP loading in server mode');
  });

  describe('rendering', function() {
    it('should track server-side rendering vs. not');
  });

  describe('restore', function() {
    it('should restore views explicitly');
    it('should restore DOM events');
    it('should restore views with a passed el');
    it('should restore views instantiated through the registry');
    it('should restore collection views');
    it('should restore named view references');
    it('should restore helper views');

    it('should replace and log on restore of rendered view');
  });
});

/*
Other concerns:
- Augmenting the view - Will likely require custom logic
- Differentiating between user and non-user data sources
*/

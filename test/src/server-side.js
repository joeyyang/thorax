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
    it('should NOP DOM events in server mode', function() {
      var spy = this.spy();
      var view = new Thorax.View({
        events: {
          click: spy
        },
        template: function() {
          return 'foo';
        }
      });

      view.$el.trigger('click');
      expect(spy).to.not.have.been.called;
    });
    it('should NOP loading in server mode');
  });

  describe('rendering', function() {
    it('should track server-side rendering vs. not');
  });

  describe('restore', function() {
    var fixture;
    beforeEach(function() {
      window.$serverSide = false;

      fixture = $('<div>');
      $(document.body).append(fixture);
    });
    afterEach(function() {
      fixture.remove();
    });

    it('should restore views explicitly', function() {
      var el = $('<div class="foo-view" data-view-server="true">bar');
      fixture.append(el);

      var view = new Thorax.View({
        el: '.foo-view'
      });
      expect(view.el).to.equal(el[0]);
      expect(view._renderCount).to.equal(1);
      expect(el.html()).to.equal('bar');

      view = new Thorax.View({
        el: function() {
          return '.foo-view';
        }
      });
      expect(view.el).to.equal(el[0]);
      expect(view._renderCount).to.equal(1);
      expect(el.html()).to.equal('bar');
    });
    it('should re-render non-server elements on restore', function() {
      var el = $('<div class="foo-view">bar');
      fixture.append(el);

      var view = new Thorax.View({
        el: '.foo-view',
        template: function() {
          return 'bat';
        }
      });
      expect(view.el).to.equal(el[0]);
      expect(view._renderCount).to.equal(1);
      expect(el.html()).to.equal('bat');
    });

    it('should restore views with a passed el', function() {
      var el = $('<div class="foo-view" data-view-server="true">bar');
      fixture.append(el);

      var view = new Thorax.View({});
      view.restore(el);

      expect(view.el).to.equal(el[0]);
      expect(view._renderCount).to.equal(1);
      expect(el.html()).to.equal('bar');
    });

    it('should update view attributes on restore', function() {
      var el = $('<div class="foo-view" data-view-cid="1234" data-view-server="true">bar');
      fixture.append(el);

      var spy = this.spy();
      var view = new Thorax.View({
        events: {
          click: spy
        }
      });
      view.restore(el);

      expect(view.$el.attr('data-view-cid')).to.equal(view.cid);
    });
    it('should restore DOM events', function() {
      var el = $('<div class="foo-view" data-view-server="true">bar');
      fixture.append(el);

      var spy = this.spy();
      var view = new Thorax.View({
        events: {
          click: spy
        }
      });
      view.restore(el);

      el.trigger('click');
      expect(spy).to.have.been.calledOnce;
    });

    describe('view helper', function() {
      describe('registry', function() {
        it('should restore views instantiated through the registry');
        it('should include view args when instantiating view');
        it('should invalidate views with complex args');
      });
      it('should restore named references');
      it('should restore pathed named references');
      it('should restore named references within iterators');
      it('should handle block view helpers'); // {{#view foo}}shit{{/view}}
    });
    describe('collection views', function() {
      it('should restore inline views');
      it('should restore referenced views');
      it('should restore renderItem views');
      it('should restore over non-default collection name');
    });
    it('should restore helper views');

    it('should replace and log on restore of rendered view');
  });
});

/*
Other concerns:
- Augmenting the view - Will likely require custom logic
- Differentiating between user and non-user data sources
*/

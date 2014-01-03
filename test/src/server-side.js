describe('serverSide', function() {
  describe('emit', function() {
    it('should emit on setView for non-server views');
    it('should cancel execution after emit');
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

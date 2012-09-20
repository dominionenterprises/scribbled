/* Let's take a moment to go over requirejs syntax for defining a module.  The
 * define statement acts very similarly to the require statement, but its
 * return value is used whenever somebody requires this file (in this case,
 * 'router') to pass it back to the calling code. */
define(['backbone', 'collections/slides', 'views/slides'], function(Backbone, Slides, SlidesView) {
  /* A backbone router is responsible for responding to changes in the url for
   * the application.  Any url goes through the routes configuration to find a
   * match (wildcards and parameters can be used) and call the appropriate
   * method for that route.  Any parameters captured in the match will get
   * passed to the method. */
  var Router = Backbone.Router.extend({
    routes: {
      /* The empty route is the default route when no path is specified. In
       * this case lets set it up to map to the index method. */
      '': 'index'
    },

    /* We don't want the router to be responsible for loading the base
     * application element from the DOM, so make sure to pull it in via the
     * constructor. */
    initialize: function(options) {
      this.appEl = options.appEl;
    },

    index: function() {
      /* Here, we create a new collection that we will be fetching from our api. */
      this.slides = new Slides();

      /* The pailsView renders a collection of pails, so we use the Backbone.js
       * collection parameter to define the collection that the pails view
       * uses. */
      this.slidesView = new SlidesView({collection: this.slides});

      /* Even though we haven't caused the pailsView to render yet, it already
       * has an element assigned to it (all views do), so lets go ahead and
       * attach its element to the DOM. */
      this.appEl.append(this.slidesView.el);

      /* Now that we have the pails collection hooked into a view, and that
       * view is hooked into the application, we can go ahead and fetch the
       * pails from the API.  Because the pails view is setup to render
       * whenever its collection gets reset, the render will be triggered when
       * the fetch is completed and everything proceeds beautifully. */
      this.slides.fetch();
    }
  });

  return Router;
});
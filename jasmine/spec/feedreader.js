/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    describe('RSS Feeds', function() {

        // ensures allFeeds variable has been defined not empty.

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // ensures it has a URL defined and that the URL is not empty.

         it('have URLs', function(){
           var urls=true;
           if (allFeeds.length === 0){
             urls=false;
           }else {
             for (var i=0; i < allFeeds.length; i++){
               if (!allFeeds[i].url || allFeeds[i].url===""){
                 urls = false;
               }
             }
           }
           expect(urls).toBe(true);
         });

        //ensures it has a name defined and that the name is not empty.

         it('have names', function(){
           var names=true;
           if (allFeeds.length === 0){
             names=false;
           }else {
             for (var i=0; i < allFeeds.length; i++){
               if (!allFeeds[i].name || allFeeds[i].name===""){
                 names = false;
               }
             }
           }
           expect(names).toBe(true);
         });
    });


    describe("The menu", function(){

      //ensures the menu element is hidden by default.

       it("is hidden by dafault",function(){
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });

      // ensures the menu changes visibility when the menu icon is clicked.

        it("changes visibility when clicked", function(){
          $('.menu-icon-link').trigger("click");
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').trigger("click");
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
  });


  describe("Initial Entries", function(){

        //loadFeed is an asynchonous function

         beforeEach(function(done){
           loadFeed(0,function(){
             done();
           });
         });

         it("have at least one entry", function(done){
           expect($(".feed .entry").length).toBeGreaterThan(0); //get all entries and check length
           done();
         });

    });

    describe("New Feed Selection", function(){

        // ensures when a new feed is loaded content actually changes.

         let firstFeedSelection, newFeedSelection;

         beforeEach(function(done){
           loadFeed(0,function(){

             firstFeedSelection = $(".feed").html(); //get initial feed content

             //loading another feed
             loadFeed(1,function(){
               done();
             });
           });
         });

         it("changes content when a new feed is loaded", function(done){
           newFeedSelection = $(".feed").html(); // get new feed content

           expect(newFeedSelection).not.toBe(firstFeedSelection);
           done();
         });

    });

}());

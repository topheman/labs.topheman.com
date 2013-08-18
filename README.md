LABS.TOPHEMAN.COM
=================

This is no more than the repo of [labs.topheman.com](http://labs.topheman.com/), the site where I keep a list of some of the personal side projects I'm on.

### Why would you care about the sources of such a website ?

After all, it's only a static html page ...

Well, when I refactored the site in august 2013, as for all my projects I use grunt and it was the opportunity to test some grunt features such as [grunt-contrib-watch](https://npmjs.org/package/grunt-contrib-watch) with the **livereload** option.

As I didn't want any backend nor bdd, I put the data in data.json file which is processed by [grunt-ejs-static](https://npmjs.org/package/grunt-ejs-static) (I choosed ejs templating engine to dig a little more on it as it is the default engine on expressjs).

Once the grunt tasks configured in the `Gruntfile.js` , any change on the json files or the ejs template will trigger a new render + a reload of the file on your browser.

I agree, there are simplier ways (like I could have put a MySQL db or any other thing), but the goal was to know grunt/ejs/livereload a little more.

If you wan't to try it, you'll need nodeJS + grunt and then :

* `npm install` will install all necessary packages
* `grunt server` will launch a server with livereload connection

You can find [here other stuff about grunt workflow](https://github.com/topheman/bombs/blob/master/GRUNTWORKFLOW.md).
(function(e, a) {
    if (!a.__SV) {
        var b = window;
        try {
            var c, l, i, j = b.location,
                g = j.hash;
            c = function(a, b) {
                return (l = a.match(RegExp(b + "=([^&]*)"))) ? l[1] : null
            };
            g && c(g, "state") && (i = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === i.action && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "", e.title, j.pathname + j.search)))
        } catch (m) {

          alert('ERROR');
        }
        var k, h;
        window.mixpanel = a;
        a._i = [];
        a.init = function(b, c, f) {
            function e(b, a) {
                var c = a.split(".");
                2 == c.length && (b = b[c[0]], a = c[1]);
                b[a] = function() {
                    b.push([a].concat(Array.prototype.slice.call(arguments,
                        0)))
                }
            }
            var d = a;
            "undefined" !== typeof f ? d = a[f] = [] : f = "mixpanel";
            d.people = d.people || [];
            d.toString = function(b) {
                var a = "mixpanel";
                "mixpanel" !== f && (a += "." + f);
                b || (a += " (stub)");
                return a
            };
            d.people.toString = function() {
                return d.toString(1) + ".people (stub)"
            };
            k = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
            for (h = 0; h < k.length; h++) e(d, k[h]);
            a._i.push([b, c, f])
        };
        a.__SV = 1.2;
        b = e.createElement("script");
        b.type = "text/javascript";
        b.async = !0;
        b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
        c = e.getElementsByTagName("script")[0];
        c.parentNode.insertBefore(b, c)
    }
})(document, window.mixpanel || []);
(function() {

  // Localize jQuery variable
  var jQuery;
  mixpanel.init("8f82f6a1e5c4755057c9aef4cfe7b305");
  var css_link = document.createElement('link')
  css_link.setAttribute("type","text/css");
  css_link.setAttribute("rel","stylesheet");
  css_link.setAttribute("href",
  'http://app.aurahealth.io/static/style.css');

  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_link);

  var meta_link = document.createElement('meta')
  meta_link.setAttribute("name","viewport");
  meta_link.setAttribute("content","width=device-width, initial-scale=1");
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(meta_link);

  var fonts_link = document.createElement('link')
  fonts_link.setAttribute("type","text/css");
  fonts_link.setAttribute("rel","stylesheet");
  fonts_link.setAttribute("href",
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(fonts_link);

  var lato_link = document.createElement('link')
  lato_link.setAttribute("type","text/css");
  lato_link.setAttribute("rel","stylesheet");
  lato_link.setAttribute("href",
  'https://fonts.googleapis.com/css?family=Lato:300,400,700');

  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(lato_link);


  // css_link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css")
  // (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_link);

  var firebase_tag = document.createElement('script')
  firebase_tag.setAttribute("type","text/javascript");
  firebase_tag.setAttribute("src",
  'https://www.gstatic.com/firebasejs/4.4.0/firebase.js');

  if (firebase_tag.readyState) {
    firebase_tag.onreadystatechange = function () { // For old versions of IE
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
        firebaseLoadHandler();
      }
    };
  } else {
    firebase_tag.onload = firebaseLoadHandler;
  }
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(firebase_tag);

  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
    "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          scriptLoadHandler();
        }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
  } else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    // firebase = window.firebase;
    main();
  }

  /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
  }

  /******** Called once jQuery has loaded ******/
  function firebaseLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    firebase = window.firebase
    // Call our main function
    main();
  }

  function formatSecondsAsTime(secs, format) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (min < 10){
      min = "0" + min;
    }
    if (sec < 10){
      sec  = "0" + sec;
    }

    return min + ':' + sec;
  }

  /******** Our main function ********/
  async function main() {
    // Initialize Firebase
    firebase.initializeApp({databaseURL: "https://auratech16.firebaseio.com"});
    var content_id = document.getElementById("aura-widget").getAttribute('data-content-id')
    const res = await firebase.database().ref('/meditations/'+content_id).once('value')
    var bg_image = res.val().channel.channelPicture
    if(res.val().photoUrl != undefined && res.val().photoUrl != '') {
      bg_image = res.val().photoUrl
    }
    var div = document.getElementById('aura-widget-div');
    var data = '<div class="audio-con" style="background-image: url('+bg_image+')">'
        +'<div class="overlay"></div>'
        +'<div class="inner">'
          +'<div class="logo">'
            +'<a href="https://www.aurahealth.io/" target="_blank">'
              +'<img id="aura-logo" src="https://firebasestorage.googleapis.com/v0/b/aura-dev.appspot.com/o/widget%2Flogo.png?alt=media&token=2bf7c5c3-410b-4319-b16d-997e1a59930d" alt="">'
            +'</a>'
            +'<a href="#">'
            +' <img id="aura-logo" src="https://firebasestorage.googleapis.com/v0/b/aura-dev.appspot.com/o/widget%2Flogo_neutrogena_768_256.png?alt=media&token=bb956565-642f-459b-934a-4245dce02ac2" alt="">'
            +'</a>'
          +'</div>'

          +'<div class="text-div">'
            +'<h5>'+
              res.val().title
            +'</h5>'
            +'<span>'
              +res.val().channel.channelName
            +'</span>'
          +'</div>'

          +'<div class="audio-main">'
            +'<div class="audio-pre">'
              +'<i class="fa fa-backward"></i>'
            +'</div>'

            +'<div class="audio play">'
              +'<span ><i id="play-btn" class="fa fa-play"></i></span>'
            +'</div>'

            +'<div class="audio-next">'
              +'<i class="fa fa-forward"></i>'
            +'</div>'

            +'<div class="time"><span id="time">00:00</span></div>'
          +'</div>'
        +'</div>'
      +'</div>'


    jQuery("#aura-widget-div").append(data);
    jQuery('audio').bind('contextmenu',function() { return false; });

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', res.val().url10);
    jQuery.get();

    audioElement.ontimeupdate = function() {
      document.getElementById("time").innerHTML = formatSecondsAsTime(audioElement.currentTime);
    };

    audioElement.onended = function() {
      mixpanel.track(
        "Widget play done",
        {"contentId": content_id, "partner": "neutrogena", 'Time': new Date().toTimeString().slice(0,2),
        'Day': new Date().getDay(),}
      );
      jQuery('#play-btn').removeClass('fa-pause');
      jQuery('#play-btn').addClass('fa-play');
      document.getElementById("time").innerHTML = "00:00";
    };

    audioElement.addEventListener("load", function() {
      audioElement.play();
    }, true);

    jQuery('.play').click(function() {
      if(jQuery('.fa-play').length > 0) {
        audioElement.play();
        jQuery('#play-btn').removeClass('fa-play')
        jQuery('#play-btn').addClass('fa-pause')
        mixpanel.track(
          "Widget play",
          {
            "contentId": content_id, "partner": "neutrogena", 'Time': new Date().toTimeString().slice(0,2),
            'Day': new Date().getDay()
          });
      } else if(jQuery('.fa-pause').length > 0 ) {
        audioElement.pause();
        jQuery('#play-btn').removeClass('fa-pause')
        jQuery('#play-btn').addClass('fa-play')
        // mixpanel.track(
        //   "Widget Paused",
        //   {
        //     "contentId": content_id, "partner": "neutrogena", 'Time': new Date().toTimeString().slice(0,2),
        //     'Day': new Date().getDay(),
        //     "DropOffTime": audioElement.currentTime
        //   });
      }
    });

    jQuery('.audio-pre').click(function() {
      if (window.HTMLAudioElement) {
        try {
          audioElement.currentTime -= 15.0;
        }
        catch (e) {
          // Fail silently but show in F12 developer tools console
          if(window.console && console.error("Error:" + e));
        }
      }
    });

    jQuery('.audio-next').click(function() {
      if (window.HTMLAudioElement) {
        try {
          audioElement.currentTime += 15.0;
        }
        catch (e) {
          // Fail silently but show in F12 developer tools console
          if(window.console && console.error("Error:" + e));
        }
      }
    });

  }


})(); // We call our anonymous function immediately

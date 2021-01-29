/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * THIS IS A FORK FROM https://twily.info SO YEAH I KNOW *
 * I STEAL RICES N STUFF BY LOOKING THEIR CODE CUZ I'M   *
 * TOO STUPID TO DO MY OWN PROPER TEMPLATES SO PLEASE    *
 * STEAL THIS PIECE OF WHATEVER IS THIS JUST DO IT DO    *
 * IT DO IT AAAAAAAAAAAAAAAAAAA                          *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*/

// + ------ Settings (JS) - BEGIN ------ +

// Rss URLs (Randomly picked onLoad and after animation ends)
var MIN = 10; var MAX = 20;
var FEED_NUM  = Math.floor(Math.random() * (MAX - MIN) + MIN);
var FPS       = 100;                                             // Animation speed
var STEP      = 1.0;                                            // Animation steps (px)
var enableRSS = true;
const rssSpacer = "";

// Some iter thing don't ask
var stupid = 1;
var tickerItems = new Array();

// ENTRIES ARE STORED HERE
var ENTRIES = [];

var $=function(id) { return document.getElementById(id); }

var FEEDS=[ // Rss URLs (Randomly picked onLoad and after animation ends)                                                                                     
    "http://feeds.feedburner.com/ign/comics-articles.xml",     
    "http://www.gamespot.com/feeds/reviews/",
    "https://www.cbsnews.com/latest/rss/technology",
    "http://reddit.com/r/programming/.rss",
    "http://feeds.feedburner.com/ign/tech-articles.xml",
    "https://www.cbsnews.com/latest/rss/politics",
    "https://blog.codinghorror.com/rss/",
    "https://www.cbsnews.com/latest/rss/science",
];

// Search Engines
var search=[ 
    ["",    "https://duckduckgo.com/?q="],                              // DuckDuckGo (Default)
    ["!g",  "https://www.google.no/#q="],                               // Google
    ["!d",  "https://duckduckgo.com/?q="],                              // DuckDuckGo
    ["!i",  "https://www.google.no/search?tbm=isch&q="],                // Google Images
    ["!y",  "https://www.youtube.com/results?search_query="],           // YouTube
    ["!w",  "http://en.wikipedia.org/w/index.php?search="],             // Wikipedia                                                                    
    ["!s",  "http://www.scpwiki.com/search:site/q/"],                   // SCP Foundation
    ["!t",  "https://tubitv.com/search/"],
    ["!a",  "https://animeheaven.ru/search?q="],
    ["!7a", "https://7anime.io/?s="],
];

// Menu Titles ["Title", width(px)],
var menus=[ 
    ["News",            11],
    ["Reddit",          13],
    ["Entertainment",   10],
    ["Typing",          10],
];

// Link setup (separate with ["", ""],)
// Format: ["Name", "URL"],
var links=[
    // News -           menu-1
    ["Arch Linux",                      "http://archlinux.org"],
    ["GameSpot",                        "http://gamespot.com"],
    ["Hardware",                        "http://hardware.no"],
    ["IGN",                             "http://ign.com"],
    ["The New York Times",              "https://www.nytimes.com/"],

    ["",                                ""],

    // Reddit -  menu-2
    ["r/Unixporn",                      "http://deviantart.com/"],
    ["r/Next Fucking Level",            "https://www.reddit.com/r/nextfuckinglevel/"],
    ["r/Dank Memes",                    "https://www.reddit.com/r/dankmemes/"],
    ["r/Programming",                   "https://www.reddit.com/r/programming/"],
    ["r/Progreamming Horror",           "https://www.reddit.com/r/programminghorror/"],
    ["r/Watch People Die Inside",       "https://www.reddit.com/r/WatchPeopleDieInside/"],
    ["r/Damn That's Interesting",       "https://www.reddit.com/r/Damnthatsinteresting/"],
    ["r/Linux",                         "https://reddit.com/r/Linux"],

    ["",                                ""],

    // Entertainment -  menu-3
    ["Devianart",                      "http://deviantart.com/"],
    ["Imgur",                           "https://imgur.com/"],
    ["Netflix",                         "http://netflix.com"],
    ["Reddit",                          "http://reddit.com"],
    ["YouTube",                         "http://youtube.com"],

    ["",                                ""],

    // Typing -  menu-4
    ["Monkeytype",                      "https://monkeytype.com/"],
    ["TypyingAcademy",                  "https://www.typing.academy"],

    ["",                                ""],
]

// + ------------------------------------- Settings (JS) - END ------------------------------------- +

let ss = "";

function init() { // Initialize
    for(var i=0;i<search.length;i++) {
        if(search[i][0]=="") { ss=search[i][1]; }
    }

    if(ss=="")                       { alert("Error: Missing default search engine!"); }
    if(enableRSS && FEEDS.length==0) { alert("Error: No rss feeds entered!"); enableRSS=false; }

    build();
    if(enableRSS) { 
        feedLoad(); 
    }

    $('q').value="";
    $('q').focus();
}

function build() { // Build menus
    $('mnu').innerHTML="";

    for(var i=0;i<menus.length;i++) { // Menu titles
        $('mnu').innerHTML+="<li><label>"+menus[i][0]+"</label>\n<ul id=\"mnu_"+(i+1)+"\"></ul></li>";
        $('mnu_'+(i+1)).style.width=menus[i][1]+"rem";
    }

    var m=1,skip=false;
    for(var i=0;i<links.length;i++) { // Menu links
        if(links[i][0]=="" && links[i][1]=="") { skip=true; }

        if(!skip) { $('mnu_'+m).innerHTML+="<li><a href=\""+links[i][1]+"\" target=\"_self\">"+links[i][0]+"</a></li>"; }
        else      { skip=false; m++; }
    }
}

function handleQuery(e,q) { // Handle search query
    var key=e.keyCode || e.which;
    // console.log("ok");
    console.log(key)
    if(key==13 || key==1) { // enter
        if(q.lastIndexOf("!")!=-1) {
            var x=q.lastIndexOf("!"),found=false;
            
            for(var i=0;i<search.length;i++) {
                if(search[i][0]==q.substr(x)) { // Find "!?"
                    found=true; window.location=search[i][1]+q.substr(0,x);
                }
            }
            if(!found) { // Invalid "!?", use default
                window.location=ss+q.substr(0,x);
            }
        } else { // "!?" where not specified, use default
            window.location=ss+q;
        }
    }
}

// Toggle
function toggleMnu() {
    var x = document.getElementById("navbox");    

    if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else {

      x.style.visibility = "hidden";
    }
  } 

function hideMnu(event) {
    var x = document.getElementById("navbox");
    var target = event.target.id;
    // console.log(event.target.id)
    // console.log(event.currentTarget === target)
    if (event.currentTarget !== target) {
        x.style.visibility = "hidden";
    }
}

// RSS Feed
// Load all entries into the Feed Div
function rssUpdateItems(items, targetId) {
    $('content').innerHTML="";
    if (items.length > 0) {
        // Add all items
        for (var i = 0; i < items.length; i++) {
            $('content').innerHTML+="<a a id=\"rss-thingy-" + stupid + "\" class=\"rss-title\" onclick=\"javascript: window.location = \'" + items[i][1] + "\';\""  + ">" + items[i][0] + "</a>";
            
            $('content').innerHTML += " " + rssSpacer + " "; 
            stupid += 1;
        }
    }
    // ENTRIES
    w=window.innerWidth; $('content').style.left=w+"px"; pos=parseFloat(w);

    clearInterval(t);
    t=setInterval("animate();",(1000/FPS));
}

function animate() { // Rss scroll animation
    if(!pause) {
        if(pos<=-$('content').offsetWidth) {
            clearInterval(t);
            t=setTimeout("feedLoad();",1500);   
            // t=setTimeout()                                                                                        // Wait before next feed
        } else {
            pos-=STEP;
            $('content').style.left=parseInt(pos)+"px";
        }
    }
}

// Get Entries
function rssLoadEntries(rssStuff) {
    if(!rssStuff.error) {
        
        for(var i=0;i<rssStuff.feed.entries.length;i++) {
            var entries = rssStuff.feed.entries[i]
            var entryLink = entries.link;
            var entryTitle = entries.title;
            
            // Is the feed on full capacity?
            if (ENTRIES.length < FEED_NUM) {

                // Fuck it!!!
                // Current issue, For some reason I'm getting RSS duplicates and can't find a way to NOT add that to the array because F U C K  M EEEEEEEEEEE 
                ENTRIES.push([entryTitle, entryLink])

                clearInterval(t);
                t=setInterval("feedLoad();",(999));
            } else {

                rssUpdateItems(ENTRIES, "content");
                break; // Kill da beeeeeesh!!!
            }     
        }  
    }

    // Insert em on the rss bar
    console.log("STILL RUNNING!!!")
}


if(enableRSS) { google.load("feeds","1"); } // RSS

var w=0,pos=0.0,pause=false,t;
function feedLoaded(result) { // Load and write rss
    if(!result.error) {
        $('content').innerHTML="";

        for(var i=0;i<result.feed.entries.length;i++) {
            var entry=result.feed.entries[i];

            $('content').innerHTML+="<  class=\"rss-title\" onclick=\"javascript: window.location = \'" + entry.link + "\';\""  + ">" + entry.title + "</a>";
            
		    // Rss separator
            if(i<result.feed.entries.length-1) { 
				$('content').innerHTML+=" " + tickySpacer + " "; 
			}
        }

        //Start
        w=window.innerWidth; $('content').style.left=w+"px"; pos=parseFloat(w);

        clearInterval(t);
        t=setInterval("animate();",(1000/FPS));
    }
}

function feedLoad() { // Initialize rss
    clearTimeout(t);

    var feed=new google.feeds.Feed(FEEDS[Math.floor(Math.random()*FEEDS.length)]);

    feed.setNumEntries(FEED_NUM);
    feed.load(rssLoadEntries);
    stupid = 1    
}

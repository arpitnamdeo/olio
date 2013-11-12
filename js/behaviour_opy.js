function populateSidebar() {
    
    var menu = "<ul>";
    menu += "<li><a class='feed-all' >All</a></li>";
    
    for (var category in feeds.categories) {
        var feedColor = feeds.categories[category].color;
        menu += "<li style='color:" + feedColor + "' ><a class='feed-category' >" + category + "</a><ul>"; 
        for (var index = 0; index < feeds.categories[category].sources.length; index++) {
            var src = feeds.categories[category].sources[index];
            menu += "<li class='feed-source' data-color='" + feedColor + "' data-url='" + src.url + "' ><a>" + src.name + "</a></li>";
            
            fetchNewsFeeds(rootElementForStories, src.url, false, feedColor);
        }
        menu += "</ul></li>";
    }
    menu += "</ul>";
    $("#feed-sources").append(menu);
}

function toggleCategory() {
    $(this).next().slideToggle();   
}

function loadFeed() {
    $('#' + rootElementForStories).empty();
    fetchNewsFeeds(rootElementForStories, $(this).data("url"), true, $(this).data("color"));
}

function loadAllFeeds() {
    $('#' + rootElementForStories).empty();
    var allSources = $(".feed-source");
    for (var i = 0; i < allSources.length; i++) {
        var currentSource = allSources[i];
        fetchNewsFeeds(rootElementForStories, $(currentSource).data("url"), false, $(currentSource).data("color"));
    }
}

function fetchNewsFeeds(rootElement, feedurl, refreshData, feedColor) {
    $('#' + rootElement).FeedEk({
        FeedUrl : feedurl,
        RefreshAll: refreshData,
        FeedClass: feedColor
    });
}

function processFeeds(rootElement) {
    numfeedsources--;
    if(numfeedsources == 0) {
        feedarticles.sort(getComparator("publishDate"));
        feedarticles.reverse();
        
        var newArticles = "";
        for (var i = 0; i < feedarticles.length; i++) {
            //$("#" + rootElement).append(feedarticles[i]["content"]);
          /* $("#" + rootElement).append(createArticleElement(feedarticles[i]["data"]));*/
            
            newArticles += createArticleElement(feedarticles[i]["data"]);
            $('#stories_old').append(createArticleElement(feedarticles[i]["data"]));
        }
        
        $("#" + rootElement).isotope('insert', $(newArticles));
        
        feedarticles = [];
    }
}

function getComparator(sortby) {
    return function(a, b) {
        if( a[sortby] > b[sortby])
            return 1;
        if( a[sortby] < b[sortby] )
            return -1;
        return 0;
    };
}


function createArticleElement(feedentry) {    
    
    var currArticle = '<article style="border-right-color:' + feedentry.color +'" ><header><a href="' + feedentry.content.link + '" target="_blank" >' + feedentry.content.title + "</a></header>";

    i = new Date(feedentry.content.publishedDate);
    c = new Date();
    diff = (c.getTime() - i.getTime());
    hrsDiff = Math.floor(diff/(1000*60*60));
    minutesDiff = Math.floor(diff/(1000*60));

    if(hrsDiff < 24){
        if (minutesDiff < 60) {
            strTimeString = minutesDiff + ' minutes ago';
        } else if(hrsDiff == 1) {
            strTimeString = hrsDiff + ' hour ago';
        } else {
            strTimeString = hrsDiff + ' hours ago';
        };
    } else {
        strTimeString = i.toLocaleString();
    }
    currArticle += '<time datetime=' + i.toISOString() + ' pubdate >'  + strTimeString + '<p>' + feedentry.feedSourceTitle + '</p>' + '</time>';
    
    currArticle += '<p class="snippet">' + feedentry.content.contentSnippet + "</p>";

    currArticle += '<img src=' + feedentry.feedSourceLink + "/favicon.ico" + ' ></img>';
    currArticle += "<div class='fullArticle'>" + feedentry.content.content + "</div>";
    currArticle += '</article>';
    
    return currArticle;

}

function openCurrentFeed() {
    $(this).siblings().toggle;
}
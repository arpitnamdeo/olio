function populateSidebar() {
    
    var menu = "<ul>";
    menu += "<li><a class='feed-all' >All</a></li>";
    
    for (var category in feeds.categories) {
        var feedColor = feeds.categories[category].color;
        menu += "<li style='color:" + feedColor + "' ><a class='feed-category' data-filter='" + category + "' >" + category + "</a><ul>"; 
        for (var index = 0; index < feeds.categories[category].sources.length; index++) {
            var src = feeds.categories[category].sources[index];
            menu += "<li class='feed-source " + src.name + "' data-filter=" + src.name + " data-color='" + feedColor + "' data-url='" + src.url + "' ><a>" + src.name + "</a></li>";
            //Fetch feed articles
            fetchNewsFeeds(rootElementForStories, src.url, false, feedColor, category, src.name);
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
    $('#' + rootElementForStories).isotope({ filter: '.'+$(this).data('filter') });
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
}

function loadAllFeeds() {
    $('#' + rootElementForStories).isotope({ filter: '.allfeeds' });
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
}

function fetchNewsFeeds(rootElement, feedurl, refreshData, feedColor, category, sourceName) {
    $('#' + rootElement).FeedEk({
        FeedUrl : feedurl,
        RefreshAll: refreshData,
        FeedClass: feedColor,
        FeedName: sourceName,
        FeedCategory: category
    });
}

function processFeeds(rootElement) {
    numfeedsources--;
    if(numfeedsources == 0) {
        var newArticles = "";
        for (var i = 0; i < feedarticles.length; i++) {
            newArticles += createArticleElement(feedarticles[i]["data"]);
            $('#stories_old').append(createArticleElement(feedarticles[i]["data"]));
        }
        
        setIsotopeOptions();
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
    
    //Get article time difference from current time
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
        strTimeString = i.toLocaleDateString();
    }
    
    var currArticle = '<article data-category="' + feedentry.feedCategory + '" data-source="' + feedentry.feedName + '" '
        + 'class="allfeeds ' + feedentry.feedCategory + " " + feedentry.feedName + '" '
        + 'style="border-right-color:' + feedentry.color +'" >'
        + '<header><a href="' + feedentry.content.link + '" target="_blank" >' + feedentry.content.title + "</a></header>";
    
    currArticle += '<h2>' + strTimeString 
        + '<time datetime=' + i.toISOString() + ' pubdate ></time>' 
        + '<span>' + feedentry.feedSourceTitle + '</span>' + '</h2>';
    
    currArticle += '<p class="snippet">' + feedentry.content.contentSnippet + "</p>";

    currArticle += '<img src=' + feedentry.feedSourceLink + "/favicon.ico" + ' ></img>';
    currArticle += "<div class='fullArticle'>" + feedentry.content.content + "</div>";
    currArticle += '</article>';
    
    return currArticle;

}

function openCurrentCategory() {
    $(this).siblings().toggle;
}

function isotopeInitialize(){
    var $container = $('#' + rootElementForStories);
    $container.isotope({
        itemSelector : 'article',
        layoutMode : 'masonry',
        resizable: false,
        sortBy : 'pubdate',
        sortAscending : false,
        getSortData : {
            pubdate : function($elem){
                return new Date($elem.find('time').attr('datetime'));
            }
        }/*,
        masonry: {
            columnWidth: isotopeColumnWidth
        }*/
    });
}

function isotopeReLayout(){
    var $container = $('#' + rootElementForStories);
    
    //$container.width(($('#interaction-area').innerWidth() - $('nav').outerWidth()));
    //setIsotopeOptions();
    $container.isotope('reLayout');
}
                       
function setIsotopeOptions(){
    var $container = $('#' + rootElementForStories);
    $container.isotope('option', {
        itemSelector : 'article',
        layoutMode : 'masonry',
        resizable: false,
        sortBy : 'pubdate',
        sortAscending : false,
        getSortData : {
            pubdate : function($elem){
                return new Date($elem.find('time').attr('datetime'));
            }
        }/*,
        masonry: {
            cornerStampSelector: 'nav'
        }*/
    });
}
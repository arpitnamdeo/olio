self.addEventListener("message", function(event) {
    var feedurl = event.data.FeedUrl;
    var maxcount = event.data.MaxCount;
    var url = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + maxcount + "&output=json&q=" + encodeURIComponent(feedurl) + "&hl=en";//&callback=?";
    
    var ajaxobject = new XMLHttpRequest();    
    ajaxobject.open("GET", url, false);
    ajaxobject.send(null);
    var response = ajaxobject.response;
    self.postMessage(response);
});


/////// from behaviour.js


function fetchFeeds(options) {
    alert("here");
    var n = {
        FeedUrl : "",
        MaxCount : 15,
        ShowDesc : true,
        ShowPubDate : true,
        CharacterLimit : 200,
        TitleLinkTarget : "_blank",
        RefreshAll: false,
        RootElement: "stories"
    };
    
    if (options) {
        $.extend(n, options);
    }
    
    var data = {};
    data.FeedUrl = n.FeedUrl;
    data.MaxCount = n.MaxCount;
    
    
    /*
    var url = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + n.MaxCount + "&output=json&q=" + encodeURIComponent(n.FeedUrl) + "&hl=en";//&callback=?";
    
    var ajaxobject = new XMLHttpRequest();    
    ajaxobject.open("GET", url, false);
    ajaxobject.send(null);
    var response = ajaxobject.response;*/
    
    $.ajax({
        url : "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + n.MaxCount + "&output=json&q=" + encodeURIComponent(n.FeedUrl) + "&hl=en&callback=?",
        dataType : "json",
        success : function(response) {
            
        
                
    /*var feedWorker = new Worker("../feedFetch.js");        
    feedWorker.onmessage = function(event) { 
        var response = event.data;
      */  
            $.each(response.responseData.feed.entries, function(entry) {
                var s = '<article><header><a href="' + entry.link + '" target="' + n.TitleLinkTarget + '" >' + entry.title + "</a></header>";
                if (n.ShowPubDate) {
                    i = new Date(entry.publishedDate);
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
                    s += '<time datetime=' /*+ i.toISOString()*/ + ' pubdate >'  + strTimeString + '<p>' + response.responseData.feed.title + '</p>' + '</time>';
                }
                if (n.ShowDesc) {
                    s += '<p>' + entry.contentSnippet + "</p>";      
                }
                s += '<img src=' + "" /*feedIconURL*/ + ' ></img>';
                s += '</article>';
                
                $("#" + n.RootElement).append(s);
            });
        }
    });
    
    //};
        
    //feedWorker.postMessage(data);
    
/*    $('#stories').FeedEk({
        FeedUrl : feedUrl,
        RefreshAll: refreshStories
    });*/
}


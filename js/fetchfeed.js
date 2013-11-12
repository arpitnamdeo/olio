
(function (e) {
	e.fn.FeedEk = function (t) {
        numfeedsources++;
        var n = {
			FeedUrl : "",
            FeedName: "",
			MaxCount : 15,
			ShowDesc : true,
			ShowPubDate : true,
			CharacterLimit : 200,
			TitleLinkTarget : "_blank",
            RefreshAll: false,
            FeedClass: "",
            FeedCategory: ""
		};
		if (t) {
			e.extend(n, t)
		}
		var r = e(this).attr("id");
	//	e("#" + r).empty().append('<div style="padding:3px;"><img src="loader.gif" /></div>');
		e.ajax({
			url : "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + n.MaxCount + "&output=json&q=" + encodeURIComponent(n.FeedUrl) + "&hl=en&callback=?",
			dataType : "json",
			success : function(t) {
				
				var s = "";
				var feedTitle = t.responseData.feed.title;
                var feedSourceLink = t.responseData.feed.link;
                var feedIconURL = t.responseData.feed.link + '/favicon.png';
				
                e.each(t.responseData.feed.entries, function(e, t) {
                                    
                    var currArticle = "";
                    var articleData = {};
                    articleData["content"] = t;
                    articleData["feedSourceTitle"] = feedTitle;
                    articleData["feedSourceLink"] = feedSourceLink;
                    articleData["color"] = n.FeedClass;
                    articleData["feedCategory"] = n.FeedCategory;
                    articleData["feedName"] = n.FeedName;
                    
                    var currArticleObject = {};
                    currArticleObject["publishDate"] = new Date(t.publishedDate);
                    currArticleObject["feedSource"] = feedTitle;
                    currArticleObject["data"] = articleData;
                    feedarticles.push(currArticleObject);
                    s += currArticle;
				    
				});
                
                processFeeds(r);
			}
		})
        /*console.log("Return : " + articles.length);
        return articles;*/
	}
})(jQuery)
/*
 * FeedEk jQuery RSS/ATOM Feed Plugin v1.1.2
 * http://jquery-plugins.net/FeedEk/FeedEk.html
 * Author : Engin KIZIL
 * http://www.enginkizil.com
 */
(function (e) {
	e.fn.FeedEk = function (t) {
        numfeedsources++;
        var n = {
			FeedUrl : "",
			MaxCount : 15,
			ShowDesc : true,
			ShowPubDate : true,
			CharacterLimit : 200,
			TitleLinkTarget : "_blank",
            RefreshAll: false,
            FeedClass: ""
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
				//e("#" + r).empty();
              /*  if(n.RefreshAll){
                    e("#" + r).empty();
                }*/
				var s = "";//e("#" + r).html();//"";
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
                    
                	/*currArticle += '<article style="border-right-color:' + n.FeedClass +'" ><header><a href="' + t.link + '" target="' + n.TitleLinkTarget + '" >' + t.title + "</a></header>";
					if (n.ShowPubDate) {
						i = new Date(t.publishedDate);
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
						currArticle += '<time datetime=' + i.toISOString() + ' pubdate >'  + strTimeString + '<p>' + feedTitle   + '</p>' + '</time>';
					}
					if (n.ShowDesc) {
						currArticle += '<p>' + t.contentSnippet + "</p>";
					}*/
                    /*s += '<img src=' + "" feedIconURL + ' ></img>';*/
					//currArticle += '</article>';
                    
                    
                    var currArticleObject = {};
                    currArticleObject["publishDate"] = new Date(t.publishedDate);
                    currArticleObject["feedSource"] = feedTitle;
                    //currArticleObject["content"] = currArticle;
                    currArticleObject["data"] = articleData;
                    feedarticles.push(currArticleObject);
                    //console.log("Pushed : " + feedarticles.length + " >> " + currArticle);
                    s += currArticle;
					//console.log(t.content);
					//console.log('**********************************');
                    
				});
                
                //var newArticles = $(s);
				//e("#" + r).append(s);//.isotope('insert', newArticles);
                processFeeds(r);
			}
		})
        /*console.log("Return : " + articles.length);
        return articles;*/
	}
})(jQuery)
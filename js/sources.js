var useractions = [
    "delete",
    "mark-read",
    "star",
    "share"
];

var feeds =  {
    updated: "UTC",
    categories : {
        "News" : {
            color: "red",
            default: true,
            cached: true,
            sources: [
                {
                    name: "CNN",
                    url: "http://rss.cnn.com/rss/edition.rss",
                    topics: ["", "", ""]
                },
                {
                    name : "BBC News",
                    url: "http://feeds.bbci.co.uk/news/rss.xml",
                    topics: ["", "", ""]
                }
            ]
        },
        "Sports" : {
            color: "green",
            default: true,
            cached: true,
            sources: [
                {
                    name: "ESPN",
                    url: "http://sports.espn.go.com/espn/rss/news",
                    topics: ["", "", ""]
                }
            ]
        },
        "Lifestyle" : {
            color: "purple",
            default: true,
            cached: true,
            sources: [
                {
                    name: "Lifehacker",
                    url: "http://feeds.gawker.com/lifehacker/full.xml",
                    topics: ["", "", ""]
                }
            ]
        },
        "Entertainment" : {
            color: "blue",
            default: true,
            cached: true,
            sources: [
                {
                    name: "MTV News",
                    url: "http://www.mtv.com/rss/news/news_full.jhtml",
                    topics: ["", "", ""]
                }
            ]
        },
        "Jobs" : {
            color: "pink",
            default: true,
            cached: true,
            sources: [
                {
                    name: "Deloitte GTA",
                    url: "http://careers.deloitte.com/jobs/eng-US/rss/c/Canada/r/Ontario/m/Greater-Toronto/a/Experienced-Professionals",
                    topics: ["", "", ""]
                }
            ]
        }
    } //list of categories array
};
from scrapling import StealthyFetcher

# 建议：重新去浏览器拿一次最新的 Cookie，因为之前的 403 可能已经让该 Session 标记为异常
raw_cookie_string = 'bid=owUfrSoIYQ8; Hm_lvt_6d4a8cfea88fa457c3127e14fb5fabc2=1776757846; Hm_lpvt_6d4a8cfea88fa457c3127e14fb5fabc2=1776757846; HMACCOUNT=9FFF627C06BBDF01; ll="108288"; _gid=GA1.2.1339847709.1776757848; ap_v=0,6.0; __utma=30149280.201395888.1776757848.1776757855.1776757855.1; __utmc=30149280; __utmz=30149280.1776757855.1.1.utmcsr=sec.douban.com|utmccn=(referral)|utmcmd=referral|utmcct=/; _ga=GA1.2.201395888.1776757848; _ga_Y4GN1R87RG=GS2.1.s1776757847$o1$g1$t1776757948$j60$l0$h0; dbcl2="254175423:R8jd3DTwAO4"; ck=cB-Q; frodotk_db="ef381972102b806ecda84c563082814a"; push_noty_num=0; push_doumail_num=0; __utmv=30149280.25417; __utmb=30149280.7.10.1776757855; _vwo_uuid_v2=D79F166D0662495A05C8E3D5792595986|bfe38556e90c4ee251f2f4092bab65d6' 

custom_headers = {
    # 删掉 UA，让 real_chrome 自动生成与其版本匹配的真实 UA
    "Cookie": raw_cookie_string,
    "Referer": "https://movie.douban.com/",
    "Accept-Language": "zh-CN,zh;q=0.9",
}

page = StealthyFetcher.fetch(
    url="https://movie.douban.com/subject/1292052/",
    google_search=False,
    real_chrome=True,
    headers=custom_headers,
    # 增加超时容错
    timeout=60000 
)

# 调试：看看这次到底跳没跳验证码
if "sec.douban.com" in page.url:
    print("糟了，还是被重定向到了验证码页面！")
    print("建议：手动在浏览器打开该 URL，滑过验证码后再运行脚本。")
else:
    title = page.css('h1 span::text').get()
    year = page.css('h1 span.year::text').get()
    rating = page.css('.rating_num::text').get()
    print(f"标题: {title}  年份: {year}  评分: {rating}")
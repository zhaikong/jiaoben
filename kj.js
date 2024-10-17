/*
 *
 *
脚本功能：会员课+付费课+大师课+直播课
软件版本：3.1.2
下载地址：
脚本作者：**
更新时间：2024-2-3
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
******************************
[rewrite_local]
# > 芬空间,会员课+付费课+大师课+直播课
^https?:\/\/api\.zhangdefenspace\.com\/api\/(course\/getCoursePeriodList|course\/getCourseDetails|user\/getIndexUser|v2\/live\/getLiveDetails).*$ url script-response-body https://raw.githubusercontent.com/zhaikong/jiaoben/main/kj.js

[mitm] 
hostname = api.zhangdefenspace.com


*
*
*/

let body = $response.body;
let url = $request.url;
let obj = JSON.parse(body);

const vipPattern = /\/user\/getIndexUser/;
const coursePattern = /\/(course\/getCourseDetails|course\/getCoursePeriodList|v2\/live\/getLiveDetails)/;

try {
    if (vipPattern.test(url)) {
        if (obj.data && obj.data.vipInfo) {
            obj.data.vipInfo.isVip = true;
            obj.data.vipInfo.vipEndTime = "2099-12-31 23:59:59";
            obj.data.vipInfo.vipLevel = 3;
        }
    } else if (coursePattern.test(url)) {
        if (obj.data) {
            obj.data.isBuy = true;
            obj.data.isVip = true;
            obj.data.canWatch = true;
        }
    }

    body = JSON.stringify(obj);
} catch (err) {
    console.log('芬空间解锁脚本运行出错：' + err);
}

$done({body});

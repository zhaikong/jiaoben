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
*******************************
[rewrite_local]
# > 芬空间,会员课+付费课+大师课+直播课
^https?:\/\/api\.zhangdefenspace\.com\/api\/(course\/getCoursePeriodList|course\/getCourseDetails|user\/getIndexUser|v2\/live\/getLiveDetails).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/Fkj.js

[mitm] 
hostname = api.zhangdefenspace.com


*
*
*/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const vip = '/user/getIndexUser';
const course = '/course/getCourseDetails';
const coursePeriod = '/course/getCoursePeriodList';
const live = '/v2/live/getLiveDetails';

if (url.indexOf(vip) != -1) {
    obj.data.vipInfo.isVip = true;
    obj.data.vipInfo.vipEndTime = "2099-12-31 23:59:59";
    obj.data.vipInfo.vipLevel = 3;
} else if (url.indexOf(course) != -1 || url.indexOf(coursePeriod) != -1 || url.indexOf(live) != -1) {
    if (obj.data.hasOwnProperty('isBuy')) {
        obj.data.isBuy = true;
    }
    if (obj.data.hasOwnProperty('isVip')) {
        obj.data.isVip = true;
    }
    if (obj.data.hasOwnProperty('canWatch')) {
        obj.data.canWatch = true;
    }
}

body = JSON.stringify(obj);
$done({body});

/*
 *
 *
脚本功能：会员课+付费课+大师课+直播课
软件版本：3.1.2
下载地址：
脚本作者：**
更新时间：2024-2.3$
电报频道：https://t.me/GieGie777
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


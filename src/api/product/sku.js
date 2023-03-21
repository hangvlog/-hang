//sku模块
import request from '@/utils/request';

// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) =>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
// attrInfoList
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
//sku列表的接口
///admin/product/list/{page}/{limit}
export const reqSkuList = (page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'}); 

//上架
///admin/product/onSale/{skuId}
export const reqSale = (skuId)=>request({url:`/admin/product/onSale/${skuId}`,method:'get'});

//下架
///admin/product/cancelSale/{skuId}
export const reqCancel = (skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'});

//获取SKU详情的接口
///admin/product/getSkuById/{skuId}  get
export const reqSkuById = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'});


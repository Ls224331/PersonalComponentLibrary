const app = getApp()
const regeneratorRuntime = app.globalData.regeneratorRuntimeconst
const util = require('../../utils/util.js')
import {
  getSelectQurey,
  getWxImageInfo,
  canvasToTempFilePath,
  saveImageToPhotosAlbum
} from 'common.js'

Page({
  data: {
    isShowCanvas: false, // 是否显示canvas    
    wxaCode: '/images/poster_qrcode.png', // 商品小程序码
    goodsImageUrl: '/images/poster_qrcode.png', // 商品图片    
    canvasTempFilePath: '', // canvas导出生成图片的临时路径  
  },

  // 点击显示要生成的canvas  
  getCanvas(e) {
    if (!this.data.wxaCode) {
      util.showToast('二维码生成失败');
      return;
    }
    this.setData({
      isShowCanvas: true
    }, () => {
      this.createCanvas();
    })
  },

  // 隐藏canvas  
  hideCanvas() {
    this.setData({
      isShowCanvas: false
    })
  },

  // 创建canvas  
  async createCanvas() {
    wx.showLoading({
      title: '图片生成中...'
    })
    const _this = this

    // 创建节点选择器    
    const res = await getSelectQurey('#qrCanvas');

    // canvas的宽高    
    const cvWidth = res[0].width;
    const cvHeight = res[0].height;
    const cvSubValue = cvHeight - cvWidth
    const qrWidth = cvSubValue / 1.5
    const qrMargin = (cvSubValue - qrWidth) / 2
    const qrX = cvWidth - qrWidth - qrMargin / 2
    const qrY = cvWidth + qrMargin
    const shopNameY = cvWidth + cvSubValue - qrWidth

    // 二维码网络图片转临时路径    
    let qrImagePath = '';
    try {
      const wxaCode = _this.data.wxaCode;
      const qrImage = await getWxImageInfo(wxaCode);
      qrImagePath = qrImage.path
    } catch (e) {
      wx.hideLoading();
      this.hideCanvas();
      util.showToast('二维码生成失败');
      return;
    }

    // 商品网络图片转临时路径    
    let goodsImagePath = '/images/poster_qrcode.png';
    const goodsImage = _this.data.goodsImageUrl;
    if (goodsImage) {
      const goodsImageRes = await getWxImageInfo(goodsImage);
      goodsImagePath = goodsImageRes.path;
    }

    // 创建canvas    
    var ctx = wx.createCanvasContext('qrCanvas', _this);

    // 设置背景    
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 0, cvWidth, cvHeight);

    // 设置商品图片 商品图宽高是一样的    
    ctx.drawImage(goodsImagePath, 0, 0, cvWidth, cvWidth);

    // 设置二维码图片    
    ctx.drawImage(qrImagePath, qrX, qrY, qrWidth, qrWidth);

    // 设置店铺名称    
    const shopName = '我是店铺名称';
    ctx.setFillStyle('black')
    ctx.setFontSize(16)
    ctx.setTextAlign('left')
    ctx.fillText(shopName, 10, shopNameY, cvWidth - qrWidth);

    // 设置商品名称 文字不能换行，这里只是简单的处理了一下    
    const goodsName = '一个名字很长很长的商品就问你怕不怕';
    let goodsName1 = '';
    let goodsName2 = '';
    ctx.setFillStyle('black')
    ctx.setFontSize(14)
    ctx.setTextAlign('left')
    if (goodsName.length <= 10) {
      ctx.fillText(goodsName, 10, shopNameY + 30, cvWidth - qrWidth);
    } else
      if (goodsName.length > 10 && goodsName.length <= 22) {
        goodsName1 = goodsName.substring(0, 10);
        goodsName2 = goodsName.substring(10);
        ctx.fillText(goodsName1, 10, shopNameY + 30, cvWidth - qrWidth);
        ctx.fillText(goodsName2, 10, shopNameY + 50, cvWidth - qrWidth);
      } else {
        goodsName1 = goodsName.substring(0, 10);
        goodsName2 = goodsName.substring(10, 22) + '...';
        ctx.fillText(goodsName1, 10, shopNameY + 30, cvWidth - qrWidth);
        ctx.fillText(goodsName2, 10, shopNameY + 50, cvWidth - qrWidth);
      }

    // 设置提示    
    const tipText = '长按识别小程序，马上下单！';
    ctx.setFillStyle('gray')
    ctx.setFontSize(8)
    ctx.setTextAlign('center')
    ctx.fillText(tipText, cvWidth / 2, cvHeight - 10);

    // 完成    
    ctx.draw(false, () => {
      wx.hideLoading();
      _this.canvasToTempFilePathFunc(cvWidth, cvHeight, 'qrCanvas')
    });
  },

  // 把当前画布指定区域的内容导出生成指定大小的图片  
  async canvasToTempFilePathFunc(cvWidth, cvHeight, qrCanvas) {
    try {
      let res = await canvasToTempFilePath(cvWidth, cvHeight, qrCanvas);
      this.setData({
        canvasTempFilePath: res.tempFilePath
      });
    } catch (error) {
      console.log(error);
      util.showToast(error.errMsg);
    }
  },

  // 保存图片到本地  
  async saveImageToPhotosAlbumFunc() {
    try {
      let res = await saveImageToPhotosAlbum(this.data.canvasTempFilePath);
      console.log(res);
      this.hideCanvas();
      util.showToast('图片保存成功');
    } catch (err) {
      console.log(err);
    }
  }
})

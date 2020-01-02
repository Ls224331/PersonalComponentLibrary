// 封装获取微信图片信息。
export const getWxImageInfo = (imgPath) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: imgPath,
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

// 封装获取节点选择器信息
export const getSelectQurey = (queryStr) => {
  return new Promise(resolve => {
    var query = wx.createSelectorQuery();
    query.select(queryStr).boundingClientRect();
    query.exec(res => {
      resolve(res)
    })
  })
}

// 封装把画布导出生成指定大小的图片
export const canvasToTempFilePath = (width, height, canvasId, fileType = 'jpg') => {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      width,
      height,
      canvasId,
      fileType,
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

// 封装保存图片到系统相册
export const saveImageToPhotosAlbum = (filePath) => {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath,
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

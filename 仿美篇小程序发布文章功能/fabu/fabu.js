// pages/fabu/fabu.js
const app = getApp()
function Detail(placeName, number, status, text,tanchu,tanchu1,tanchu2, image, image1, video, content,tantext,tantext1,tantext2,viewTop) {
  this.viewTop = viewTop;
  this.placeName = placeName;
  this.number = number;
  this.status = status;
  this.text = text;
  this.tanchu = tanchu;
  this.tanchu1=tanchu1;
  this.tanchu2=tanchu2;
  this.image = "../../images/load.png";
  this.image1 = image1;
  this.video = video;
  this.content = content,
  this.tantext = '';
  this.tantext1 = '';
  this.tantext2 = '';
  this.viewTop = 0;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    smallsize: 10,
    middlesize: 12,
    bigsize: 14,
    showView: false,
    text:false,
    img:false,
    id:0,
    fenlei:'添加分类',
    uploaderList: [],
    uploaderList1: ["../../images/load.png"],
    uploaderList2:[],
    uploaderList3: [],
    uploaderList4: [],
    fengmian:'',
    fengmian1:'',
    fengmian2:'',
    loadimg:'',
    wenzi:'图片',
    wenzi1:'文字',
    wenzi2:'视频',
    info: {
      details: []
    },
    src: '',
    text:'',
    length: 0,
    tantext:'',
    tantext1:'',
    length1:0,
    tantext2:'',
    length2:0,
    color:'',
    gongsi:"",
    title:'',
    photography:'',
    author:'',
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
    console.log(e)
    if(e.id){          // 第二阶段  判断id是否存在
      that.setData({
        edit_id : e.id
      })
    }
    console.log(that.data.edit_id)
    console.log(e.index)
    var index = e.index
    console.log(that.data.uploaderList)
    that.size()
     that.addItem()   //初始化调用增加功能代码块
    that.bianshen()
    that.bianshen2()
    that.daohang()
    if(that.data.edit_id){    // 第二阶段  如果id存在执行文章编辑接口
      that.edit()
    }
    
  },
  edit:function(){         //第二阶段 文章编辑接口，传入已经编辑好的文章id
    var that = this
    wx.request({
      url: 'https://dt.qiweibang.com/web/index.php?r=api%2Ftopic%2Fview-release&',
      data:{
        store_id : 2,
        id:that.data.edit_id
      },
      method: "GET",
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        var data = res.data.data
        // console.log(data.cov_pic1)
        if(data.name){
          that.setData({
            fenlei : data.name
          })
        }
        if(data.cov_pic1){
          that.setData({
            fengmian:data.cov_pic1
          })
        }
        if (data.cov_pic2) {
          that.setData({
            fengmian1: data.cov_pic2
          })
        }
        if (data.cov_pic3) {
          that.setData({
            fengmian2: data.cov_pic3
          })
        }
        if(data.title){
          that.setData({
            title:data.title
          })
        }
        if(data.author){
          that.setData({
            author : data.author
          })
        }
        if (data.photography){
          that.setData({
            photography: data.photography
          })
        }
        if (data.wx_content){
          var info = that.data.info
          info.details = data.wx_content
          that.setData({
            info: info
          })
        }
       
      
      }
    })
  },



  // 文章标题
  title:function(e){
    console.log(e.detail.value)
    this.setData({
      title:e.detail.value
    })
  },
  // 作者
  author:function(e){
    console.log(e.detail.value)
    this.setData({
      author: e.detail.value
    })
  },
  // 摄影
  photography:function(e){
    console.log(e.detail.value)
    this.setData({
      photography: e.detail.value
    })
  },
  // 顶部自定义公司名称
  bianshen: function () {
    var that = this
    wx.request({
      url: 'http://dt.qiweibang.com/web/index.php?r=api/setting/setting&',
      // console.log(data),
      data: {
        store_id: 2
      },
      method: "GET",
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          gongsi: res.data.data.text,

        })

      }
    })
  },
  // 顶部自定义颜色
  bianshen2: function () {
    var that = this
    wx.request({
      url: 'https://dt.qiweibang.com/web/index.php?r=api/setting/setting-info&',
      // console.log(data),
      data: {
        store_id: 2
      },
      method: "GET",
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          color: res.data.data.color,

        })

      }
    })
  },
  // 填写文字弹出层
  mInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      tantext: e.detail.value,
      length: e.detail.value.length
    })
  },
  // 填写文字弹出层
  mInput1: function (e) {
    console.log(e.detail.value)
    this.setData({
      tantext1: e.detail.value,
      length1: e.detail.value.length
    })
  },
  // 填写文字弹出层
  mInput2: function (e) {
    console.log(e.detail.value)
    this.setData({
      tantext2: e.detail.value,
      length2: e.detail.value.length
    })
  },
  // 自定义字体大小   目前没有使用
  size: function () {
    console.log(11111)
    var that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log(res.data)
        var data = parseInt(res.data)
        that.setData({
          middlesize: data
        })
      }
    })
  },
  // 文字弹出层
  setModalStatus: function (e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index
    var status = e.currentTarget.dataset.status 
    console.log(index)
    var tan = !that.data.info.details[index].tanchu
    var info = that.data.info
    info.details[index].tanchu = tan
    console.log(that.data.tantext)
      if(tan == false){
        that.setData({
          tantext: info.details[index].tantext,
          length:0
        })
      }else{
        info.details[index].tantext = that.data.tantext
      }
    that.setData({
      info: info
    })
    
    // if (info.details[index].tantext) {
    //   var info = this.data.info
    //   var index = e.currentTarget.dataset.index
    //   info.details[index].tantext = ' '
    //   that.setData({
    //     info: info
    //   })

    // }



    // console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    // var animation = wx.createAnimation({
    //   duration: 200,
    //   timingFunction: "linear",
    //   delay: 0
    // })
    // this.animation = animation
    // animation.translateY(300).step()
    // this.setData({
    //   animationData: animation.export()
    // })
    // if (e.currentTarget.dataset.status == 1) {
    //   this.setData(
    //     {
    //       showModalStatus: true
    //     }
    //   );
    // }
    // setTimeout(function () {
    //   animation.translateY(0).step()
    //   this.setData({
    //     animationData: animation
    //   })
    //   if (e.currentTarget.dataset.status == 0) {
    //     this.setData(
    //       {
    //         showModalStatus: false
    //       }
    //     );
    //   }
    // }.bind(this), 200)
  },
  // 图片弹出层
  setModalStatus1: function (e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index
    console.log(index)
    var tan1 = !that.data.info.details[index].tanchu1
    var info = that.data.info
    info.details[index].tanchu1 = tan1
    if (tan1 == false) {
      that.setData({
        tantext1: info.details[index].tantext1,
        lenght1:0
      })
    } else {
      info.details[index].tantext1 = that.data.tantext1
    }
    that.setData({
      info: info
    })
  },
  // 视频弹出层
  setModalStatus2: function (e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index
    console.log(index)
    var tan2 = !that.data.info.details[index].tanchu2
    var info = that.data.info
    info.details[index].tanchu2 = tan2
    if (tan2 == false) {
      that.setData({
        tantext2: info.details[index].tantext2,
        length2:0
      })
    } else {
      info.details[index].tantext2 = that.data.tantext2
    }
    that.setData({
      info: info
    })
  },
// 已废除的填写文字页面
  writeText:function(e){
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../writeText/writeText?index='+index
    })
  },
  // 追加功能代码块
  addItem: function (e) {
    console.log(e)
    let info = this.data.info;

    info.details.push(new Detail(1,1,1,1,1,1,1,''));
    this.setData({
      info: info
    });
    console.log(this.data.info.details)
  },
  // 移除当前点击的数据块
  removeItem: function (e) {
    console.log(e.currentTarget.dataset.index)
    var info = this.data.info;
    console.log(info)
    for (var i = 0; i < info.details.length; i++) {
      console.log(11111)
      if (i == e.currentTarget.dataset.index) {
        console.log(i)
        console.log(info)
        info.details.splice(i,1)
        console.log(info)
        this.setData({
          info: info
        })
        console.log(this.data.info)
      }
    }
  },
  setPlace: function (e) {
    let index = parseInt(e.currentTarget.id);
    console.log(index)
    console.log(e)
    let place = e.detail.value;
    console.log(place)
    let info = this.data.info;
    info.details[index].placeName = place;
    this.setData({
      info: info
    });
  },

  setNumber: function (e) {
    let index = parseInt(e.currentTarget.id);
    console.log(index)
    console.log(e)
    let number = e.detail.value;
    console.log(number)
    let info = this.data.info;
    info.details[index].number = number;
    this.setData({
      info: info
    });
  },
  // 删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据   
        nowList.push(uploaderList)   
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //上传图片
  upload: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)     
    var that = this;
    if (that.data.uploaderList.length > 0) {
      that.setData({
        uploaderList:[]
      })
    }
    console.log(that.data.uploaderList)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        console.log(uploaderList[0])
          // let info = that.data.info;
          // info.details[index].image = uploaderList[0]
          // that.setData({
          //   info : info
          // })
        console.log(that.data.uploaderList)
        wx.uploadFile({
          url: 'https://dt.qiweibang.com/web/index.php?r=api%2Fcommon%2Fupload',//自己的接口地址
          filePath:uploaderList[0],
          name: 'file',
          method: "POST",
          data: {
            uploaderList: [],
          },
          header: {
            "Content-Type": "multipart/form-data",
          },
          formData: ({//上传图片所要携带的参数
          }),
          success: function (res) {
            console.log(res)
             console.log(that.data.uploaderList)
             console.log(JSON.parse(res.data))
             var data = JSON.parse(res.data)
            var ow_certificates = data.data
            console.log(ow_certificates[0])
            let info = that.data.info;
            info.details[index].image = ow_certificates[0]
            that.setData({
              info: info
            })
            console.log(that.data.info)
          },
          fail: function (res) {
            // 这里是失败的回调，  
            console.log(res)
          }
        })
      } 
    })
  },
  //上传图片
  upload1: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var that = this;
    if (that.data.uploaderList1.length > 0) {
      that.setData({
        uploaderList1: []
      })
    }
    console.log(that.data.uploaderList1)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList1 = that.data.uploaderList1.concat(tempFilePaths);
        console.log(uploaderList1[0])
      
        console.log(that.data.uploaderList1)
        wx.uploadFile({
          url: 'https://dt.qiweibang.com/web/index.php?r=api%2Fcommon%2Fupload',//自己的接口地址
          filePath: uploaderList1[0],
          name: 'file',
          method: "POST",
          data: {
            uploaderList: [],
          },
          header: {
            "Content-Type": "multipart/form-data",
          },
          formData: ({//上传图片所要携带的参数
          }),
          success: function (res) {
            console.log(res)
            console.log(that.data.uploaderList1)
            console.log(JSON.parse(res.data))
            var data = JSON.parse(res.data)
            var ow_certificates = data.data
            console.log(ow_certificates[0])
            let info = that.data.info;
            console.log(ow_certificates[0])
            info.details[index].image1 = ow_certificates[0]
            that.setData({
              info: info
            })
            console.log(that.data.info)
          },
          fail: function (res) {
            // 这里是失败的回调，  
            console.log(res)
          }
        })
      }
    })
  },
  //上传图片
  upload2: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var that = this;
    if (that.data.uploaderList2.length > 0) {
      that.setData({
        uploaderList2: []
      })
    }
    console.log(that.data.uploaderList2)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList2 = that.data.uploaderList2.concat(tempFilePaths);
        console.log(uploaderList2[0])

        console.log(that.data.uploaderList2)
        wx.uploadFile({
          url: 'https://dt.qiweibang.com/web/index.php?r=api%2Fcommon%2Fupload',//自己的接口地址
          filePath: uploaderList2[0],
          name: 'file',
          method: "POST",
          data: {
            uploaderList: [],
          },
          header: {
            "Content-Type": "multipart/form-data",
          },
          formData: ({//上传图片所要携带的参数
          }),
          success: function (res) {
            console.log(res)
            console.log(JSON.parse(res.data))
            var data = JSON.parse(res.data)
            var ow_certificates = data.data
            console.log(ow_certificates[0])
            that.setData({
              fengmian: ow_certificates[0]
            })
           
          },
          fail: function (res) {
            // 这里是失败的回调，  
            console.log(res)
          }
        })
      }
    })
  },
  upload3: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var that = this;
    if (that.data.uploaderList3.length > 0) {
      that.setData({
        uploaderList3: []
      })
    }
    console.log(that.data.uploaderList3)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList3 = that.data.uploaderList3.concat(tempFilePaths);
        console.log(uploaderList3[0])

        console.log(that.data.uploaderList3)
        wx.uploadFile({
          url: 'https://dt.qiweibang.com/web/index.php?r=api%2Fcommon%2Fupload',//自己的接口地址
          filePath: uploaderList3[0],
          name: 'file',
          method: "POST",
          data: {
            uploaderList3: [],
          },
          header: {
            "Content-Type": "multipart/form-data",
          },
          formData: ({//上传图片所要携带的参数
          }),
          success: function (res) {
            console.log(res)
            console.log(JSON.parse(res.data))
            var data = JSON.parse(res.data)
            var ow_certificates = data.data
            console.log(ow_certificates[0])
            that.setData({
              fengmian1: ow_certificates[0]
            })

          },
          fail: function (res) {
            // 这里是失败的回调，  
            console.log(res)
          }
        })
      }
    })
  },
  upload4: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var that = this;
    if (that.data.uploaderList4.length > 0) {
      that.setData({
        uploaderList4: []
      })
    }
    console.log(that.data.uploaderList4)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList4 = that.data.uploaderList4.concat(tempFilePaths);
        console.log(uploaderList4[0])

        console.log(that.data.uploaderList4)
        wx.uploadFile({
          url: 'https://dt.qiweibang.com/web/index.php?r=api%2Fcommon%2Fupload',//自己的接口地址
          filePath: uploaderList4[0],
          name: 'file',
          method: "POST",
          data: {
            uploaderList4: [],
          },
          header: {
            "Content-Type": "multipart/form-data",
          },
          formData: ({//上传图片所要携带的参数
          }),
          success: function (res) {
            console.log(res)
            console.log(JSON.parse(res.data))
            var data = JSON.parse(res.data)
            var ow_certificates = data.data
            console.log(ow_certificates[0])
            that.setData({
              fengmian2: ow_certificates[0]
            })

          },
          fail: function (res) {
            // 这里是失败的回调，  
            console.log(res)
          }
        })
      }
    })
  },
  onChange:function(){
    this.setData({
        showView: (!this.data.showView),   
    })
  },
  onChangeShowState: function (e) {
  
    var that = this;
    var index = e.currentTarget.dataset.index
    console.log(index)
    var st = !that.data.info.details[index].status

    let info = this.data.info
    info.details[index].status = st

    that.setData({
      //  showView: (!that.data.showView),
      // ['st']: (!st)
      info:info
    })
  },

  //点击选择视频
  chooseVideo: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    var te = !that.data.info.details[index].text
    var info = that.data.info
    info.details[index].text = te
    if (that.data.info.details[index].placeName == 0) {
      var pl = !that.data.info.details[index].placeName
      var info = that.data.info
      info.details[index].placeName = pl
      that.setData({
        info: info
      })
    } else if (that.data.info.details[index].number == 0) {
      var nu = !that.data.info.details[index].number
      var info = that.data.info
      info.details[index].number = nu
      that.setData({
        info: info
      })
    } else {
      that.setData({
        info: info
      })
      var st = !that.data.info.details[index].status
      var info = that.data.info
      info.details[index].status = st
      that.setData({
        info: info
      })
      that.addItem()     //选择指定功能后继续追加功能代码块
    }
    // that.setData({
    //   info: info
    // })
    // wx.chooseVideo({
    //   success: function (res) {
    //     that.setData({
    //       src: res.tempFilePath,
    //     })
    //   }
    // })
  },
  // 上传视频
  videoo:function(e){
    var that = this;
    var opentype = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res)
        wx.uploadFile({
          url: 'https://dt.qiweibang.com/web/index.php?r=api%2Fcommon%2Fupload',//服务器接口
          method: 'POST',//这句话好像可以不用
          filePath: res.tempFilePath,
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: ({//上传图片所要携带的参数
            sum : 11111
          }),
          name: 'file',//服务器定义的Key值
          success: function (res) {
            console.log(res)
            var data = JSON.parse(res.data)
            var ow_certificates = data.data
            console.log(ow_certificates[0])
            var info = that.data.info
            info.details[index].video = ow_certificates[0]
            that.setData({
              info: info
            })
          },
          fail: function () {
            console.log('接口调用失败')
          }
        })
        // var info = that.data.info
        // info.details[index].video = res.tempFilePath
        // console.log(res.tempFilePath)
        // that.setData({
        //   info: info
        // })
        // that.setData({
        //   src: res.tempFilePath,
        // })
      }
    })
  },

//点击选择文字
  onChangeShowtext:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index
    var nu = !that.data.info.details[index].number
    var info = this.data.info
    info.details[index].number = nu
    // console.log(index)
    if (that.data.info.details[index].placeName == 0) {
      var pl = !that.data.info.details[index].placeName
      var info = this.data.info
      info.details[index].placeName = pl
      that.setData({
        info: info
      })
    } else if (that.data.info.details[index].text == 0){
      var te = !that.data.info.details[index].text
      var info = this.data.info
      info.details[index].text = te
      that.setData({
        info: info
      })
    }else{
      that.setData({
        info: info
      })
      var st = !that.data.info.details[index].status
      var info = this.data.info
      info.details[index].status = st
      that.setData({
        info: info
      })
      that.addItem()    //选择指定功能后继续追加功能代码块
    }  
  },
  //点击选择图片
  onChangeShowimg: function(e) {
    var that = this;
    console.log(e)
    var index = e.currentTarget.dataset.index
    var pl = !that.data.info.details[index].placeName
    var info = this.data.info
    info.details[index].placeName = pl
    // console.log(index)  
    if(that.data.info.details[index].number == 0){
      var nu = !that.data.info.details[index].number
      var info = this.data.info
      info.details[index].number = nu
      that.setData({
        info: info
      })
    } else if (that.data.info.details[index].text == 0){
      var te = !that.data.info.details[index].text
      var info = this.data.info
      info.details[index].text = te
      that.setData({
        info: info
      })
    }else{
      that.setData({
        info: info
      })
      var st = !that.data.info.details[index].status
      var info = this.data.info
      info.details[index].status = st
      that.setData({
        info: info
      })
      that.addItem()      //选择指定功能后继续追加功能代码块
    }
    if (that.data.info.details[index].number == 0 || that.data.info.details[index].placeName == 0) {     
      
    }
   


    // if (that.data.img == true) {
    //   that.setData({
    //     img: true
    //   })
    // } else {
    //   that.setData({
    //     img: (!that.data.img)
    //   })
    // }
  },
  closeText:function(){
    var that = this
    console.log(that.data.text)
    that.setData({
      text:false
    })
  },
  closeImg:function(){
    var that = this
    console.log(that.data.img)
    that.setData({
      img: false
    })
  },
  // 顶部返回箭头
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },


  // 已废除的添加页面
  tianjia:function(){
    wx.navigateTo({
      url: '../tianjia/tianjia'
    })
  },
// 完成发布
  sunccess:function(){
    console.log(this.data.info.details)
    if(this.data.edit_id){
      var edit_id = this.data.edit_id
    }else{
      var edit_id = ''
    }
   
    console.log(edit_id)
    var that = this
    var id = that.data.status   //分类id
    console.log(id)
    var fengmian = that.data.fengmian   //封面图1
    console.log(fengmian)
    var fengmian1 = that.data.fengmian1   //封面图1
    console.log(fengmian1)
    var fengmian2 = that.data.fengmian2   //封面图1
    console.log(fengmian2)
    var title= that.data.title    //标题
    console.log(title)
    var author = that.data.author  // 作者
    console.log(author)
    var photography = that.data.photography   //摄影  
    console.log(photography)
    var content = that.data.info.details
    wx.request({
      url: 'https://dt.qiweibang.com/web/index.php?r=api%2Ftopic%2Fadd-topic&',
      data: {
        store_id : 2,
        id: edit_id,
        type : id,
        cover_pic1: fengmian,
        cover_pic2: fengmian1,
        cover_pic3: fengmian2,
        title : title,
        author : author,
        photography: photography,
        content:content,
        access_token: getApp().core.getStorageSync(getApp().const.ACCESS_TOKEN)
      },
      method: "GET",
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        if(res.data.code == 1){
          wx.showToast({
            title: '必填项不能为空',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }else{
          wx.showToast({
            title: '发布成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }      
      }
    })
  },

// 分类弹窗
  setModalStatus11: function (e) {
    console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.statu);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.statu == 1) {
      this.setData(
        {
          showModalStatus11: true
        }
      );
    } else {
      this.setData(
        {
          showModalStatus11: false
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.statu == 0) {

      }
    }.bind(this), 200)
  },

  // 分类
  daohang: function () {
    var that = this
    wx.request({
      url: 'https://dt.qiweibang.com/web/index.php?r=api%2Ftopic-types%2Flist',
      // console.log(data),
      method: "GET",
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data[0].id);
        that.setData({

          cat_list1: res.data.data,
          status: res.data.data[0].id   //获得初始化导航第一个导航的id准备传递
        })

      }
    })
  },
  // 点击分类
  bindTap11(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    console.log(name)
    const status = parseInt(e.currentTarget.dataset.status);   //获得当前点击导航的id
    console.log(status)
    const index = parseInt(e.currentTarget.dataset.index);
    console.log(index)
    this.setData({
      curIndex: index,
      status: status,
      fenlei : name     //更改公共状态id准备传递
    })
    var that = this
    if (e.currentTarget.dataset.statu == 1) {
      this.setData(
        {
          showModalStatus11: true
        }
      );
    } else {
      this.setData(
        {
          showModalStatus11: false
        }
      );
    }
  },


  // 向上移动 价值五十块钱的代码
  great:function(e){
    console.log(e)
    console.log(this.data.info.details)
    var that = this
    var index = e.currentTarget.dataset.index
    if(index == 0){
      wx.showToast({
        title: '已经是第一个啦',
        icon: 'none',
      })
      return;
    }
    var info = this.data.info
    info.details[index].viewTop -= 105      //向上移动当前下标内容
    info.details[index-1].viewTop +=105     //像下移动当前下标前一个下标内容
    
    that.setData({
      info: info
    })
    var info = this.data.info
    // var info = that.data.info
     var index11 = info.details[index]      //自定义获取当前下标内容
    var index12 = info.details[index - 1]     //自定义获取当前小标前一个内容
     console.log(index11)
    info.details[index-1]=index11         //为前一个小标内容复制取得的当前下标的内容
     
     console.log(index12)
     info.details[index] = index12      //为当前下标赋值取得的前一个下标的内容
    info.details[index].viewTop = 0     //此处可以清空移动的数值
    info.details[index - 1].viewTop = 0
    // info.details.splice(info.details[index], 1, index12);
    // info.details.splice(info.details[index-1], 1, index11);

    // [info.details[index-1],info.details[index]] = [info.details[index],info.details[index-1]]

    // info.details = info.details.splice(info.details[index], 1, info.details[index - 1])
    console.log(info)
    that.setData({
      info: info          //重新赋值
    })
    console.log(that.data.info.details)
    // var arr = [1, 2, 3, 4];
    // [arr[0], arr[1]] = [arr[1], arr[0]];
    // console.log(arr)
  },

// 向下移动
  downward:function(e){
    console.log(e)
    console.log(this.data.info.details)
    var that = this
    var index = e.currentTarget.dataset.index
    var info = this.data.info
    if (index == info.details.length-2) {
      wx.showToast({
        title: '已经是最后一个啦',
        icon: 'none',
      })
      return;
    }
    
    info.details[index].viewTop += 105      //向下移动当前下标内容
    info.details[index + 1].viewTop -= 105     //像下移动当前下标后一个下标内容

    that.setData({
      info: info
    })
    var info = this.data.info

    var index21 = info.details[index]      //自定义获取当前下标内容
    var index22 = info.details[index + 1]     //自定义获取当前小标前一个内容
    console.log(index21)
    info.details[index + 1] = index21         //为前一个小标内容复制取得的当前下标的内容

    console.log(index22)
    info.details[index] = index22     //为当前下标赋值取得的前一个下标的内容
    info.details[index].viewTop = 0     //此处可以清空移动的数值
    info.details[index + 1].viewTop = 0

    console.log(info)
    that.setData({
      info: info          //重新赋值
    })
    console.log(that.data.info.details)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


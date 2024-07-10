import {
  Plugin,
  PluginKey
} from '@tiptap/pm/state'

// export const pluginkey = new PluginKey('image')

export const ImagePlugin = ({ editor, pluginkey }) => {
  return new Plugin({
    key: pluginkey,
    props: {
      // handlePaste: (view, event) => handlePaste(view, event),
      handleDrop: (view, e) => {
        e.preventDefault()
        // e.stopPropagation()
        var files = e.dataTransfer.files;
        // 遍历文件列表
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          // 判断文件类型为图片
          if (file.type.startsWith('image/')) {
            var reader = new FileReader();

            // 读取文件内容
            reader.onload = function (event) {
              var base64String = event.target.result;
              // console.log('图片文件名：', file.name);
              // console.log('Base64编码：', base64String);
              // console.log(editor)
              editor.view.focus()
              editor.commands.insertContent({
                type: 'image',
                attrs: {
                  src: base64String
                }
              })
              // 这里可以执行上传Base64编码后的数据的操作
              // 例如，可以将base64String发送到服务器端进行处理
            };

            // 将文件读取为Data URL（Base64编码）
            reader.readAsDataURL(file);
          } else {
            console.log('忽略非图片文件：', file.name);
          }
        }
        // if (event.dataTransfer.files.length > 0) {
        //   const files = event.dataTransfer.files
        //   if (files.length > 0) {
        //     const file = files[0]
        //     const reader = new FileReader()

        //     reader.onload = async function (e) {
        //       // const data = await saveImageByFile(file)
        //       // _createAndInsertImageNode(view, data.name, event)
        //     }
        //     reader.readAsDataURL(file)
        //   }
        // }
        // // TODO:当能够判断是否是拖拽上船图像之后，这里可以区分返回
        // return false
      }
    }
  })
}
require('codemirror/lib/codemirror.css'); // codemirror
require('tui-editor/dist/tui-editor.css'); // editor ui
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/github.css'); // code block highlight
var Editor = require('tui-editor');

export default {
    data() {
        return {
            mdEditor: null,
            mdSwitchType: 'md',
        }
    },
    methods:{
        initEditorMD() {
            let self = this;
            new Editor({
                el: document.querySelector('#editorMD'),
                height: '100%',
                //language:'zh_CN', //todo:会显示台湾的语言
                hideModeSwitch: true,
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                usageStatistics: false,
                initialValue: this.articleContent,
                events: {
                    load: function (editor) {
                        self.mdEditor = editor;
                        //editor.setHtml(this.)
                    },
                    change:function(){
                        self.needSave = true;
                    }
                },
                hooks: {
                    addImageBlobHook: function (file, cb, source) {
                        //source of an event the item belongs to. 'paste', 'drop', 'ui'
                        self.imgSaveFileObj(file, (id, fullName, err) => {
                            let imgDom = '<img id="' + id + '" src="file://' + fullName + '" />';
                            self.mdEditor.insertText(imgDom);
                            self.needSave = true;
                        })
                        
                    }
                }
            });
        }
    }
}